import md5 from "md5";
import User from "../models/user.model";
import { generateRandomString } from "../helpers/generate.helper";

export const resolversUser = {
  Mutation: {
    registerUser: async (_, args) => {
      const { user } = args;

      const emailExist = await User.findOne({
        email: user.email,
        deleted: false
      });

      if(emailExist) {
        return {
          code: 400,
          message: "Email đã tồn tại!"
        }
      } else {
        user.password = md5(user.password);
        user.token = generateRandomString(30);

        const newUser = new User(user);
        await newUser.save();

        return {
          code: 200,
          message: "Thành công!",
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          token: newUser.token,
        };
      }
    },
  }
}