import { ObjectId } from "mongodb";

export const typeDefs = `#graphql
  type Service {
    id: ID!
    name: String!
    price: Int!
    description: String!
  }

  extend type Query {
    services: [Service]
    service(id: ID!): Service
  }

  extend type Mutation {
    createService(name: String!, price: Int!, description: String!): Service
    updateService(id: ID!, name: String, price: Int, description: String): Service
    deleteService(id: ID!): String
  }
`;

export const resolvers = {
  Query: {
    services: async (_, __, { db }) => await db.collection("services").find().toArray(),
    service: async (_, { id }, { db }) => await db.collection("services").findOne({ _id: new ObjectId(id) }),
  },
  Mutation: {
    createService: async (_, { name, price, description }, { db }) => {
      const newService = await db.collection("services").insertOne({ name, price, description });
      return { id: newService.insertedId, name, price, description };
    },
    updateService: async (_, { id, name, price, description }, { db }) => {
      await db.collection("services").updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, price, description } }
      );
      return { id, name, price, description };
    },
    deleteService: async (_, { id }, { db }) => {
      await db.collection("services").deleteOne({ _id: new ObjectId(id) });
      return "Service deleted successfully";
    },
  },
};
