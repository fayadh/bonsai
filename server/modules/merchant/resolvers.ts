const { merchants } = require("../../../mockMerchantData");

const resolvers = {
  Query: {
    merchants: () => merchants,
  },
};

export default resolvers;
