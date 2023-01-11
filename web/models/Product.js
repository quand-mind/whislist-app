import { Schema, model } from 'mongoose';

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
  email_id: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})

// module.exports = model('Product', ProductSchema);
export default ProductSchema;