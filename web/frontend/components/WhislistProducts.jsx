import { useState, useEffect } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";

export function WhislistProducts() {

  const fetch = useAuthenticatedFetch();
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);

  let [products, setProducts] = useState([])
  const getProducts = async () => {
    const response = await fetch('/api/products/getAll', {
      method: 'GET'
    })
    setProducts(await response.json())
    setIsLoading(false)
    
  }
  getProducts()

  return (
    <>
      <Card
        title="Whislist Products"
        sectioned
      >
        <h1>Hello</h1>
        <span>{isLoading ? "-" : products[0].handle}</span>
      </Card>
    </>
  );
}