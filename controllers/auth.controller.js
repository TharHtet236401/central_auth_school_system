import userSchema from "../models/users.model.js";
import connectToDatabase from "../config/database.js";
import centralUserSchema from "../models/centralUsers.model.js";
import classSchema from "../models/class.model.js";

import { genToken } from "../utils/libby.js";

import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  const { username, email, password, confirmedPassword, role, school } =
    req.body;

  if (password != confirmedPassword) {
    return res
      .status(400)
      .json({ message: "Password and confirmed password do not match" });
  }

  if (
    !username ||
    !email ||
    !password ||
    !confirmedPassword ||
    !role ||
    !school
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );

  let toSave = req.body;
  toSave.password = hashedPassword;

  const userDB = await connectToDatabase(school);
  const User = userDB.model("User", userSchema);
  const Classes = userDB.model("Classes", classSchema);

  const classes = await Classes.find();
  console.log(classes);

  const centralDB = await connectToDatabase("master");
  const centralUser = centralDB.model("centralUser", centralUserSchema);

  await new centralUser(toSave).save();
  await new User(toSave).save();

  res.status(201).json({ message: "User created successfully", toSave });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the central database
    const centralDB = await connectToDatabase("master");
    const centralUser = CentralUser;

    const user = await centralUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    user;
    const token = genToken(user);

    const foundUser = {
      username: user.username,
      email: user.email,
      role: user.role,
      school: user.school,
      token: token,
    };

    // Return user data and school information
    return res.status(200).json({ message: "Login successful", foundUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// // Helper function to connect to the central database and get the model
// just testing the function
// const getCentralUserModel = async () => {
//     const centralDB = await connectToDatabase("master");
//     return centralDB.model('centralUser', centralUsersSchema);
// }

// // In the signup and login functions, replace the existing code with:
//     const centralUser = await getCentralUserModel();
