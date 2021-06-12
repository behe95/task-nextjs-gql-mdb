import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "http://localhost:3000/api/graphql",
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: {
//           getAllSubjects: {
//             merge: (existing, incoming) => {
//               return incoming;
//             }
//           }
//         }
//       }
//     }
//   }),
//   connectToDevTools: true
// });

let apolloClient;

function createApolloClinet() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClinet();
  console.log("_apolloCLIENT ============================== ",_apolloClient);
  console.log("apolloCLIENT ============================== ",apolloClient);

  if(initialState){
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({...existingCache, ...initialState});
  }

  if(typeof window === 'undefined') return _apolloClient;

  if(!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}


export function useApollo(initialState) {
  const store = React.useMemo(() => initializeApollo(initialState),[initialState]);

  return store;
}

export default apolloClient;