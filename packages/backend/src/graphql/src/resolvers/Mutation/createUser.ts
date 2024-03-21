import type { MutationResolvers } from "./../../../types.generated";
import * as bcrypt from "bcrypt";
export const createUser: NonNullable<MutationResolvers['createUser']> = async (
  _parent,
  _arg,
  _ctx
) => {
  /* Implement Mutation.createUser resolver logic here */
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = bcrypt.hashSync(_arg.input.password, salt);

    await _ctx.prisma.user.create({
      data: {
        email: _arg.input.email,
        name: _arg.input.name,
        password: hashedPassword,
        is_admin: _arg.input.isAdmin,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};
