const resolvers = {
  Query: {
    user: (_: any, __: any, { user }: any) => {
      return user;
    },
  },
};

export default resolvers;
