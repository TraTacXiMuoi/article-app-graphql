import express, { Express } from "express";
import dotenv from "dotenv";
import { connect as connectDatabase } from "./config/database";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefts";
import { resolvers } from "./resolvers/index.resolvers";
import { requireAuth } from "./middlewares/auth.middleware";

const startServer = async () => {
  dotenv.config();
  connectDatabase();
  
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;
  
  // GraphQL API
  app.use("/graphql", requireAuth);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { ...req };
    }
  });
  
  await apolloServer.start();
  
  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql"
  });
  
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

startServer();