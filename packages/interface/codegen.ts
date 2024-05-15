import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";

const config: CodegenConfig = {
  schema: "./src/schema.graphql",
  documents: ["./src/documents/**/*.graphql"],
  generates: {
    "../backend/src/graphql": defineConfig({
      typesPluginsConfig: {
        contextType: "../context#GraphQLContext",
        federation: true,
      },
    }),
    "../frontend/src/graphql/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-graphql-request",
        "typescript-operations",
      ],
    },
  },
};

export default config;
