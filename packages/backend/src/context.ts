import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type GraphQLContext = {
  prisma: PrismaClient;
};

const createContext = (): GraphQLContext => {
  return {
    prisma,
  };
};

export default createContext;
