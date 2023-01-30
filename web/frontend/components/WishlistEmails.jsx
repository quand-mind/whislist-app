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
    setEmails(query.data)
    setIsLoading(false);
  }
  if(emails.length > 0) {
    for (const email of emails) {
      console.log(email.products)
    }
  }
  let index = 0

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
                const {email, products} = item;
                const media = <Avatar customer size="medium" name={email.email} />;

                return (
                  <ResourceItem
                    id={email._id}
                    url={
                      {
                      onAction: () => navigate("/wishlist_email/" + email._id)
                      }
                    }
                    media={media}
                    accessibilityLabel={`View details for ${email.email}`}
                    
                  >
                    <TextContainer variant="bodyMd" fontWeight="bold" as="h3" >
                      <div style={{display: "flex", justifyContent:"space-between"}}>
                        <span>{email.email}</span>

                        <span>
                          <span style={{display:"none"}}> {index = 0}</span>
                          <span>
                            {products.map( product => {
                              let response = ""
                              if (index == 0) {
                                index++
                                response = product.title
                              }

                              return response
                              
                            })}
                          </span>
                          <span>
                            <button
                            style={{
                              background: "transparent",
                              border: "0px",
                              color: "blue",
                              textDecoration:"underline",
                              cursor:"pointer",

                            }}
                            onClick={() => navigate(`/wishlist_email/${email._id}`)}
                            >
                              +{products.length - 1} products more...
                            </button>
                          </span>

                        </span>
                        
                      </div>
                    </TextContainer>
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

