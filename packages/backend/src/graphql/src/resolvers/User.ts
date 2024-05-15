import type { UserResolvers } from "./../../types.generated";
import type { User as UserType } from "@prisma/client";

export const User: UserResolvers = {
  /* Implement User resolver logic here */

  async __resolveReference(_arg, _ctx) {
    const user = await _ctx.prisma.user.findUnique({
      where: {
        id: _arg.id,
      },
    });

    if (!user) {
      return null;
    }

    return convertUser(user);
  },
};

const convertUser = (user: UserType) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  password: user.password,
  isAdmin: user.is_admin,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});
