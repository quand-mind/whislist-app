import { useState, useCallback, useMemo } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { ImageMajor, AlertMinor } from "@shopify/polaris-icons";
import { useQuery } from "react-query";
import {
  Card,
  Thumbnail,
  TextField,
  FormLayout,
  TextContainer,
  useIndexResourceState,
  IndexTable,
} from "@shopify/polaris";

export function EmailInfo() {
  const authenticatedFetch = useAuthenticatedFetch();

  let [email, setEmail] = useState('')
  let [products, setProducts] = useState([])
  let [keys, setKeys] = useState([])
  let [isLoading, setIsLoading] = useState(true);
  const emptyToastProps = { content: null };
  let [toastProps, setToastProps] = useState(emptyToastProps);

  const routeSplited = window.location.href.split("wishlist_email/")
  const routeSplited2 = routeSplited[1].split("?")
  let [id, setId] = useState(routeSplited2[0])

  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(`/api/wishlist/getProducts/${id}`, {
        method: 'GET'
      });
      return response.json();
    };
  }, ['/api/wishlist/getProducts/'+ id, JSON.stringify({method: 'GET'})]);

  const query = useQuery(`/api/wishlist/getProducts/${id}`, fetch, {
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
    refetchOnWindowFocus: false,
  });

  if(query.data && products.length < 1) {
    setProducts(query.data.products)
    setEmail(query.data.email)
    const keysA = []
    let index = 0
    for ( let product of query.data.products){
      if(index == 0) {
        keysA.push(Object.keys(product))
        index++
      } else {
        break
      }
    }
    setKeys(keysA)
    console.log(keys)
    setIsLoading(false);
  }
  
  const {selectedResources, allResourcesSelected, handleSelectionChange} =
  useIndexResourceState(products);

  const rowMarkup = products.map(
    ({_id, title, createdAt}, index) => (
      <IndexTable.Row
        id={_id}
        key={_id}
        selected={selectedResources.includes(_id)}
        position={index}
      >
        <IndexTable.Cell>
          <Thumbnail
            source={ImageMajor}
            alt="placeholder"
            color="base"
            size="small"
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <TextContainer variant="bodyMd" fontWeight="bold" as="span">
            {title}
          </TextContainer>
        </IndexTable.Cell>
        <IndexTable.Cell>{createdAt.split('T')[0]}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };



  return (
    <>
      <Card
        title="Email Info"
        sectioned
      >
        <Card.Section>
          <TextContainer spacing="loose">
            <p>
              The email info contains the created at date, and the products added in the wishlist
            </p>
          </TextContainer>
        </Card.Section>
        <Card.Section>
          <FormLayout>
            <FormLayout.Group>
              <TextField
                label="Email"
                value={email.email}
                disabled
                autoComplete="off"
              />
              <TextField
                label="Registered At"
                value={email.createdAt}
                disabled
                autoComplete="off"
              />
            </FormLayout.Group>
          </FormLayout>
        </Card.Section>
        <Card.Section>
          <IndexTable
          resourceName={resourceName}
          itemCount={products.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            {title: 'Image'},
            {title: 'Name'},
            {title: 'Saved Date'}
          ]}
          >
            {rowMarkup}
          </IndexTable>
        </Card.Section>
        
      </Card>
    </>
  );
}