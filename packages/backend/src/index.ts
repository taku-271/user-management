import { buildSubgraphSchema } from "@apollo/federation";
import { createYoga } from "graphql-yoga";
import createContext from "./context";
import { resolvers } from "./graphql/resolvers.generated";
import { typeDefs } from "./graphql/typeDefs.generated";

const yoga = createYoga({
  landingPage: false,
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
  context: createContext(),
});

const server = Bun.serve({
  port: process.env.PORT || 4000,
  fetch: yoga,
});

console.log(`Server is running on http://${server.hostname}:${server.port} `);
