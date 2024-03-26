import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect as connectDatabase } from "./config/database";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

import Article from "./models/article.model";

const startServer = async () => {
  dotenv.config();
  connectDatabase();
  
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;
  
  // GraphQL API
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
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