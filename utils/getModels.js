import connectToDatabase from "../config/database.js";
import userSchema from "../models/users.model.js";

export const getUserModel = async (school) => {
    const userDB = await connectToDatabase(school);
    return userDB.model("User", userSchema);
  };