// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import '@shopify/shopify-api/adapters/node';
import {shopifyApi, LATEST_API_VERSION} from '@shopify/shopify-api';

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

import { connect, model, Schema } from 'mongoose';

const ProductSchema = new Schema ({
  handle: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  id_product: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})

const Product = model('Product', ProductSchema);

const EmailSchema = new Schema ({
  email: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})

const Email = model('Email', EmailSchema);

run().catch(err => console.log(err));
async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb+srv://wl-blankdev:HD4tpby0EM9rF8Lx@cluster0.e7fyoub.mongodb.net/whislist-data');
 // 'bill@initech.com'
}

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10); 


const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/getAll", async (_req, res) => {
  const retrieveData = await shopify.api.rest.Product.all({
    session: res.locals.shopify.session,
  });

  // console.log(retrieveData[0].handle)
  res.status(200).send(retrieveData);
});

app.get("/api/wishlist/getAll", async (_req, res) => {
  const retrieveData = await Email.find()

  // console.log(retrieveData[0].handle)
  res.status(200).send(retrieveData);
});

app.get("/api/wishlist/getProducts/:id", async (_req, res) => {
  const findedEmail = await Email.findById(_req.params.id)
  console.log(findedEmail)
  if(findedEmail) {
    const products = await Product.find({'email': findedEmail.email})
    const retrieveData = {
      email: findedEmail,
      products: products
    }
    res.status(200).send(retrieveData);
  }
  else {
    res.status(500).send("Cannot find email");
  }
});

app.post("/api/products/registerProducts", async (_req, res) => {
  const products = _req.body.products
  const emailData = _req.body.email
  const findedEmail = await Email.findOne({'email': _req.body.email})
  if(findedEmail) {

  } else {
    const email = new Email({
      email: _req.body.email
    });
    await email.save();
  }

  // console.log(products)
  for (const productData of products) {

    const findedProduct = await Product.findOne({'id_product':productData.id,'email': _req.body.email})
    if(findedProduct) {

    } else {
      const product = new Product({
        handle: productData.handle,
        title: productData.title,
        id_product: productData.id,
        email: emailData
      });
      await product.save();
    }
  }


  res.status(200).send(_req.body);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
