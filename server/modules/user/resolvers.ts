import User, { UserRole } from "../../models/User";

const resolvers = {
  Query: {
    user: (_: any, __: any, { user }: any) => {
      return user;
    },
    users: async (_: any, __: any, { user }: any) => {
      if (user.role != UserRole.ADMIN) {
        return null;
      }

      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    loginAdmin: (_: any, __: any, { user, req, res }: any) => {
      const { token } = req;
      res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      return user;
    },
  },
};

export default resolvers;
