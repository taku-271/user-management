import { createSchema, createYoga } from "graphql-yoga";
import createContext from "./context";
import { typeDefs } from "./graphql/typeDefs.generated";
import { resolvers } from "./graphql/resolvers.generated";

const yoga = createYoga({
  landingPage: false,
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: createContext(),
});

const server = Bun.serve({
  port: process.env.PORT || 4000,
  fetch: yoga,
});

console.log(`Server is running on http://localhost:${server.port} `);
