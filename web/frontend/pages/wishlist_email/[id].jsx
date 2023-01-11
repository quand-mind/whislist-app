import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import { useState, useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { ProductsCard, AddWishlistProducts, EmailInfo } from "../../components";

export default function ManageCode() {
  const breadcrumbs = [{ content: "Whisilist App", url: "/" }];

  return (
    <Page>
      <TitleBar
        title="Email Info"
        breadcrumbs={breadcrumbs}
        primaryAction={null}
      />
      <EmailInfo />
    </Page>
  );
}