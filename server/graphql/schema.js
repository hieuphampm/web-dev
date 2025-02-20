// import { createSchema } from "graphql-yoga";
// import _ from "lodash";

// import { typeDef as hello, resolvers as helloResolvers } from "./hello.js";
// import { typeDef as salute, resolvers as saluteResolvers } from "./salute.js";
// import { typeDef as products, resolvers as productsResolvers } from "./products.js";
// import {
//   typeDef as categories,
//   resolvers as categoriesResolvers,
// } from "./categories.js";

// const query = `
//   type Query {
//     _empty: String
//   }

//   type Mutation {
//     _emptyAction: String
//   }
// `;
// const typeDefs = [query, hello, salute, categories, products];
// const resolvers = _.merge(helloResolvers, saluteResolvers, categoriesResolvers, productsResolvers);

// export const schema = createSchema({
//   typeDefs: typeDefs,
//   resolvers: resolvers,
// });


import { createSchema } from "graphql-yoga";
import _ from "lodash";

import { typeDef as hello, resolvers as helloResolvers } from "./hello.js";
import { typeDef as salute, resolvers as saluteResolvers } from "./salute.js";
import { typeDef as products, resolvers as productsResolvers } from "./products.js";
import { typeDef as categories, resolvers as categoriesResolvers } from "./categories.js";

const query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _emptyAction: String
  }
`;

const typeDefs = [query, hello, salute, categories, products];
const resolvers = _.merge(
  helloResolvers,
  saluteResolvers,
  categoriesResolvers,
  productsResolvers
);

export const schema = createSchema({
  typeDefs,
  resolvers,
});
