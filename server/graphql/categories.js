// export const typeDef = `
//     type Category {
//         id: ID!
//         name: String! 
//     } 

//     input CategoryInput {
//       name: String!
//     }

//     extend type Query {
//         categories: [Category]
//         category(id: Int!): Category
//     }

//     extend type Mutation {
//       deleteCategory(id: Int!): Int
//       createCategory(input: CategoryInput!): Category
//       updateCategory(id: Int!, input: CategoryInput!): Category
//     }
// `;

// export const resolvers = {
//   Query: {
//     categories: (parent, args, context, info) => {
//       return context.db.categories.getAll();
//     },
//     category: (parent, args, context, info) => {
//         return context.db.categories.findById(args.id);
//       }
//   },
//   Mutation: {
//     deleteCategory: (parent, args, context, info) => {
//       return context.db.categories.deleteById(args.id);
//     },
//     createCategory: (parent, args, context, info) => {
//         return context.db.categories.create(args.input);
//     },
//     updateCategory: (parent, args, context, info) => {
//         return context.db.categories.updateById(args.id, args.input);
//     },
//   },
// };


import gql from "graphql-tag"; 
import { db } from "../data/mongoRepo.js"; 

export const typeDef = gql`
  type Category {
    id: ID!
    name: String!
  }

  input CategoryInput {
    name: String!
  }

  extend type Query {
    categories: [Category]
    category(id: ID!): Category
  }

  extend type Mutation {
    addCategory(input: CategoryInput!): Category
    deleteCategory(id: ID!): Category
    updateCategory(id: ID!, input: CategoryInput!): Category
  }
`;

export const resolvers = {
  Query: {
    categories: async () => await db.categories.getAll(),
    category: async (_, { id }) => await db.categories.findById(id),
  },
  Mutation: {
    addCategory: async (_, { input }) => await db.categories.create(input),
    deleteCategory: async (_, { id }) => await db.categories.deleteById(id),
    updateCategory: async (_, { id, input }) => 
      await db.categories.updateById(id, input),
  },
};
