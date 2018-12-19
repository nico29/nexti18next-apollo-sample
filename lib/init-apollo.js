import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import fetch from "isomorphic-unfetch";
let apolloClient = null;

if (!process.browser) global.fetch = fetch;

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: "https://rickandmortyapi-gql.now.sh/",
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data isn't shared between connections
  if (!process.browser) return create(initialState);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = create(initialState);

  return apolloClient;
}
