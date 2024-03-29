import { useCreateUserMutation } from "./mutation";

export const useCreateUser = () => {
  const { mutateAsync: createUser, error } = useCreateUserMutation();

  if (error) {
    throw error;
  }

  return { createUser };
};
