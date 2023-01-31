import { useState, useCallback, useMemo, React } from "react";
import {gql, useMutation } from '@apollo/client'
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useQuery } from "react-query";
import {
  Button
} from "@shopify/polaris";

export function ScriptPage () {
  const createScript = useCallback (async () => {
    const authenticatedFetch = useAuthenticatedFetch();
    const fetch = useMemo(() => {
      return async () => {
        const response = await authenticatedFetch('/api/creatScript', {
          method: 'GET'
        });
        return response.json();
      };
    }, ['/api/creatScript', JSON.stringify({method: 'GET'})]);
    
  
    const query = useQuery('/api/creatScript', fetch, {
      reactQueryOptions: {
        onSuccess: () => {
          setIsLoading(false);
        },
      },
      refetchOnWindowFocus: false,
    });
    console.log(query)
  })
  // createScript()

  return (
    <>
    <Button
      onClick={useEffect(createScript)}
    >
      Start Using Wishlist App
    </Button>
    </>
  );
}