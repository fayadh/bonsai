import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Merchant {
    index: Int
    guid: String
    logo: String
    dateCreated: String
    publishedState: Boolean
    brands: [String]
    merchant: String
    products: [Product]
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
    publishedDate: String
    publishedBy: MerchantUser
    companyDescription: String
  }
  type Product {
    belongsToBrand: Int
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image: String
  }
  type MerchantUser {
    userId: String
  }
  extend type Query {
    merchants: [Merchant!]!
  }
  extend type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
  }
`;

export default typeDefs;
