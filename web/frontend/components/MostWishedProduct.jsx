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
  Stack
} from "@shopify/polaris";

export function MostWishedProduct() {
  const authenticatedFetch = useAuthenticatedFetch();

  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);

  let [mostWishedProduct, setMostWishedProduct] = useState('')

  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch('/api/wishlist/getMostWishedProduct', {
        method: 'GET'
      });
      return response.json();
    };
  }, ['/api/wishlist/getMostWishedProduct', JSON.stringify({method: 'GET'})]);

  const query = useQuery('/api/wishlist/getMostWishedProduct', fetch, {
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
    refetchOnWindowFocus: false,
  });

  if(query.data && mostWishedProduct == '') {
    setMostWishedProduct(query.data)
    
    setIsLoading(false);
  }
  if( mostWishedProduct ) {
    console.log(mostWishedProduct)
  }

  

  return (
    <>
    	<Stack vertical>
        <Card sectioned title="Most Wished Product">
        </Card>
      </Stack>
    </>
  );
}