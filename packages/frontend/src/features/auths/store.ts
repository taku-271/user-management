import { useCreateUserMutation } from "./mutation";

export const useCreateUser = () => {
  const [createUser, { data, loading, error }] = useCreateUserMutation();

  if (error) {
    throw error;
  }

  return { createUser };
};
