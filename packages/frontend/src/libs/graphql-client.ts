import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLClient } from "graphql-request";

export const client = new ApolloClient({
  uri: process.env.API_URL || "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

const graphqlClientInstance = {
  default: new GraphQLClient(
    process.env.API_URL || "http://localhost:3001/graphql"
  ),
} as const;

export const getGraphqlClient = async (
  instance: keyof typeof graphqlClientInstance = "default"
) => {
  return graphqlClientInstance[instance];
};
