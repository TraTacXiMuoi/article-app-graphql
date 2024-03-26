import Article from "./models/article.model";
import Category from "./models/category.model";

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
    },
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false
      });

      return categories;
    }
  },
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;

      const record = new Article(article);
      await record.save();

      return record;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;
      
      await Article.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      });

      return "Đã xóa!";
    },
    updateArticle: async (_, args) => {
      const { id, article } = args;

      await Article.updateOne({
        _id: id
      }, article);

      const newData = await Article.findOne({
        _id: id
      }); 

      return newData;
    },

    createCategory: async (_, args) => {
      const { category } = args;

      const record = new Category(category);
      await record.save();

      return record;
    },
    deleteCategory: async (_, args) => {
      const { id } = args;
      
      await Category.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      });

      return "Đã xóa!";
    },
    updateCategory: async (_, args) => {
      const { id, category } = args;

      await Category.updateOne({
        _id: id
      }, category);

      const newData = await Category.findOne({
        _id: id
      }); 

      return newData;
    },
  }
}