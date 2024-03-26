import Article from "./models/article.model";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false
      });

      return articles;
    }
  },
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;

      const record = new Article(article);
      await record.save();

      return record;
    }
  }
}