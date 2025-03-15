import { createSchema } from "graphql-yoga";
import _ from "lodash";

// Import từng module GraphQL
import { typeDef as hello, resolvers as helloResolvers } from "./hello.js";
import { typeDef as salute, resolvers as saluteResolvers } from "./salute.js";
import { typeDef as products, resolvers as productsResolvers } from "./products.js";
import { typeDef as categories, resolvers as categoriesResolvers } from "./categories.js";
import { typeDef as login, resolvers as loginResolvers } from "./authentication.js";
import { typeDefs as serviceTypeDefs, resolvers as serviceResolvers } from "./graphql/Services.js";  // ✅ Fix

// 🛠 Định nghĩa Query và Mutation gốc
const baseTypeDefs = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _emptyAction: String
  }
`;

// 🔗 Gom tất cả typeDefs lại
const typeDefs = [
  baseTypeDefs, 
  hello, 
  salute, 
  categories, 
  products, 
  login, 
  serviceTypeDefs
];

// 🔗 Gom tất cả resolvers lại
const resolvers = _.merge(
  helloResolvers,
  saluteResolvers,
  categoriesResolvers,
  productsResolvers,
  loginResolvers,
  serviceResolvers
);

// 🚀 Tạo schema GraphQL
export const schema = createSchema({
  typeDefs,
  resolvers,
});
