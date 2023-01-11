import { useState, useCallback, useMemo, React } from "react";
import {gql, useMutation } from '@apollo/client'
export function ScriptPage () {
  const CREATE_SCRIPTTAG_QUERY = gql `mutation {
    scriptTagCreate(input: {
      cache: false,
      displayScope: ONLINE_STORE,
      src: "/scriptTag.js"
    }) {
      scriptTag {
        id
        src
        displayScope
      }
    }
  }`
  const [createSciptTagMutation, {data}] = useMutation(CREATE_SCRIPTTAG_QUERY)
  
  createSciptTagMutation()
}