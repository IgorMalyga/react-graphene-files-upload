import React from "react";
import ReactDOM from "react-dom";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";

import BoardNewsInput from "./App";
import * as serviceWorker from "./serviceWorker";

const cache = new InMemoryCache({
  dataIdFromObject: (o) => `${o.__typename}-${o.id}`,
});

const httpLink = new createUploadLink({
  uri: "http://localhost:8000/graphql/",
});

const authLink = setContext((_, { headers }) => {
  let data = JSON.parse(localStorage.getItem("token"));
  data = data && data.token === "token" ? "" : data;
  return {
    headers: {
      ...headers,
      authorization: data ? `Bearer ${data.token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache.restore(window.__APOLLO_STATE__ || {}),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BoardNewsInput />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
