import { getGraphqlClient } from "@/libs/graphql-client";
import { CreateUserInput, getSdk } from "./../../graphql/graphql";
import { useMutation } from "react-query";

export const useCreateUserMutation = () => {
  return useMutation<unknown, unknown, CreateUserInput>({
    mutationKey: ["createUser"],
    mutationFn: async (input) => {
      return await getSdk(await getGraphqlClient()).createUser({ input });
    },
  });
};
