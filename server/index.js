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

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
  plugins: [useGraphQLMiddleware([permissions])],
  context: async ({ request }) => {
    return {
      db, 
      secret: request.headers.get("secret"),
    };
  },
});

const server = createServer(yoga);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
