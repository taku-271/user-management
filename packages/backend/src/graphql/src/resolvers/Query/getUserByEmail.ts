import type { QueryResolvers } from "./../../../types.generated";
import type { User } from "@prisma/client";
export const getUserByEmail: NonNullable<QueryResolvers['getUserByEmail']> = async (_parent, _arg, _ctx) => {
  console.log("RUN");
  /* Implement Query.getUserByEmail resolver logic here */
  const user = await _ctx.prisma.user.findUnique({
    where: {
      email: _arg.email,
    },
  });

  if (!user) {
    return null;
  }

  return convertUser(user);
};

const convertUser = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  password: user.password,
  isAdmin: user.is_admin,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});
