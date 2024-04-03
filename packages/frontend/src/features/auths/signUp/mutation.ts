import { CreateUserDocument } from "@/graphql/graphql";
import { useMutation } from "@apollo/client";

export const useCreateUserMutation = () => {
  return useMutation(CreateUserDocument);
};
