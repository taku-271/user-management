import type { User } from "@prisma/client";
import type { QueryResolvers } from "./../../../types.generated";
export const user: NonNullable<QueryResolvers['user']> = async (
  _parent,
  _arg,
  _ctx
) => {
  const user = await _ctx.prisma.user.findUnique({
    where: { id: _arg.id },
  });

  if (!user) {
    throw new Error("User not found");
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
