import { useState, useCallback, useMemo } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useQuery } from "react-query";
import { useNavigate } from "@shopify/app-bridge-react";
import {
  Card,
  Checkbox,
  Button,
  TextField,
  Heading,
  TextContainer,
  DisplayText,
  Avatar,
  ResourceList,
  ResourceItem
} from "@shopify/polaris";

export function WishlistEmails() {

  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);

  let [emails, setEmails] = useState('')

  const authenticatedFetch = useAuthenticatedFetch();

  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch('/api/wishlist/getAll', {
        method: 'GET'
      });
      return response.json();
    };
  }, ['/api/wishlist/getAll', JSON.stringify({method: 'GET'})]);

  const query = useQuery('/api/wishlist/getAll', fetch, {
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
    refetchOnWindowFocus: false,
  });

  if(query.data && emails.length < 1) {
    console.log(query.data)
    setEmails(query.data)
    setIsLoading(false);
  }

  const navigate = useNavigate();
  
  return (
    <>
      <Card
          title="Wishlist Emails"
          sectioned
        >
          <TextContainer spacing="loose">
            <p>
              Show a list of emails registered in the apps
            </p>
          </TextContainer>
          <div style={{marginTop: 10 + "px", marginBottom: 10 + "px"}}>
          <ResourceList 
            items={emails}
            renderItem={
              (item) => {
                const {_id, email, createdAt} = item;
                const media = <Avatar customer size="medium" name={email} />;

                return (
                  <ResourceItem
                    id={_id}
                    url={
                      {
                      onAction: () => navigate("/wishlist_email/" + _id)
                      }
                    }
                    media={media}
                    accessibilityLabel={`View details for ${email}`}
                    
                  >
                    <TextContainer variant="bodyMd" fontWeight="bold" as="h3" >
                      <div style={{display: "flex", justifyContent:"space-between"}}>
                        {email}
                        <Button
                        onClick={() => navigate(`/wishlist_email/${_id}`)}
                        >
                          View Info
                        </Button>
                      </div>
                    </TextContainer>
                    {/* <div>{location}</div> */}
                  </ResourceItem>
                );
              }
            }
          >
          </ResourceList>
        </div>
        </Card>
    </>
  );



}