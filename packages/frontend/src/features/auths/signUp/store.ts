import { useCreateUserMutation } from "./mutation";

export const useCreateUser = () => {
  const [createUser, { error }] = useCreateUserMutation();

  if (error) {
    throw error;
  }

  return { createUser };
};
