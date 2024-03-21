import { GraphQLClient } from "graphql-request";

const graphqlClientInstance = {
  default: new GraphQLClient(
    process.env.API_URL || "http://localhost:4000/graphql"
  ),
} as const;

export const getGraphqlClient = async (
  instance: keyof typeof graphqlClientInstance = "default"
) => {
  return graphqlClientInstance[instance];
};
