// import { createServer } from "node:http";
// import { createYoga } from "graphql-yoga";
// import { schema } from "./graphql/schema.js";
// import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
// import { permissions } from "./permissions.js";
// import { db } from "./config.js";

// import dotenv from "dotenv";
// dotenv.config();

// import {initDatabase} from "./data/init.js"
// await initDatabase();


// const yoga = createYoga({
//     schema,
//     graphqlEndpoint: "/",
//     plugins: [useGraphQLMiddleware([permissions])],
//     context: async ({ request }) => {
//       return {
//         db: db,
//         secret: request.headers.get("secret"),
//       };
//     },
//   });
// const server = createServer(yoga);

// const PORT = 4000;
// server.listen(PORT, () => {
//     console.info(`Server is running on http://localhost:${PORT}`);
//   });



import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema.js";
import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
import { permissions } from "./permissions.js";
import dotenv from "dotenv";


dotenv.config();

import { initDatabase } from "./data/init.js";
import { db } from "./data/mongoRepo.js"; 

await initDatabase();

const signingKey = process.env.JWT_SECRET;
import jwt from "jsonwebtoken";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
  plugins: [useGraphQLMiddleware([permissions])],
  context: async ({ request }) => {
    const authorization = request.headers.get("authorization") ?? "";

    if (authorization.startsWith("Bearer")) {
      const token = authorization.substring(7, authorization.length);
      jwt.verify(token, signingKey, function (error, decoded) {
        let user = null;
        if (!error) {
          user = decoded;
        }

        return {
          db: db,
          user: user,
        };
      });
    }
    return {
      db: db,
    };
  },
  cors: {
    origin: '*',
    credentials: true,
    allowedHeaders: ['X-Custom-Header', "content-type"],
    methods: ['POST', 'GET']
  }
});

const server = createServer(yoga);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
