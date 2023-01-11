import { useState, useCallback, useMemo } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useQuery } from "react-query";
import {
  Card,
  Checkbox,
  TextField,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";

export function AddWishlistProducts() {
  const authenticatedFetch = useAuthenticatedFetch();

  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch('/api/products/getAll', {
        method: 'GET'
      });
      return response.json();
    };
  }, ['/api/products/getAll', JSON.stringify({method: 'GET'})]);
  

  const query = useQuery('/api/products/getAll', fetch, {
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
    refetchOnWindowFocus: false,
  });

  async function addProductsToWhislist() {

    if(email) {
      if(email.includes("@") && email.includes(".com")) {
        console.log('adding products...')
        const response = await authenticatedFetch("/api/products/registerProducts", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'products': products,
            'email': email
          })
        });
        
        if (response.ok) {
          console.log(await response.json())
          console.log('products added')
        } else {
          setIsLoading(false);
        }
      } else {
        console.log('email is not valid')
      }
    }
    else {
      console.log('email is empty')
    }

  };

  const handleChangeEmail = useCallback((newValue) => setEmail(newValue), []);

  const handleChange = useCallback((newChecked, id) => {
    let idSplited = id.split('-')
    idSplited = parseInt(idSplited[1])
    console.log(idSplited)
    let index = 0
    const productsMapped = products.map( product => {
      if(index == idSplited) {
        console.log(!product.checked)
        product.checked = !product.checked
        return product;
      }
      index++

      return product
    })
    console.log(productsMapped)
    // setProducts(productsMapped)
    
  }, []);
  

  
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);

  let [products, setProducts] = useState([])
  let [email, setEmail] = useState('')

  if(query.data && products.length < 1) {
    const dataWithChecked = query.data.map( product => product = {...product, checked: false})
    setProducts(dataWithChecked)
    setIsLoading(false);
  }


  return (
    <>
      <Card
        title="Adding Products"
        sectioned
        primaryFooterAction={{
          content: "Add Products",
          onAction: addProductsToWhislist,
          disabled: !email
        }}
      >
        <TextContainer spacing="loose">
        <p>
            This is a tool that allows you to manually add products to an email
          </p>
        </TextContainer>
        <div style={{marginTop: 10 + "px", marginBottom: 15 + "px"}}>
          <h4 style={{marginBottom: 10 + "px"}}>Products</h4>
          {
            isLoading ? "-" : products.map( (product, index) => 
              <div key={index}>
                <Checkbox
                  id={"index-" + index}
                  checked={product.checked}
                  label={product.handle}
                  onChange={handleChange}
                />
              </div>
                  
            )
          }
        </div>
        <TextField
          label="Email"
          value={email}
          onChange={handleChangeEmail}
          autoComplete="off"
          type="email"
        />
      </Card>
    </>
  );
}