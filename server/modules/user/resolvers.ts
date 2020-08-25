import User, { UserRole } from "../../models/User";

const resolvers = {
  Query: {
    me: async (_: any, __: any, { user, models: { Log } }: any) => {
      const { _id: userId } = user;
      await Log.create({ userId });
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
    loginAdmin: async (
      _: any,
      __: any,
      { user, models: { Log }, req, res }: any
    ) => {
      const { token } = req;
      const { _id: userId } = user;
      await Log.create({ userId });
      res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      return user;
    },
  },
};

export default resolvers;
