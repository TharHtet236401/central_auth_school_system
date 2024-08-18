
import { getUserModel } from "../utils/getModels.js";

import connectToDatabase from "../config/database.js";

export const getUsers = async (req, res) => {
  try {
    const school = req.user.school;
    const users = await getUserModel(school);
    const allUsers = await users.find();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const school = req.user.school;
    const users = await getUserModel(school);
    const user = await users.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const school = req.user.school;
    const users = await getUserModel(school);

    const user = await users.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const school = req.user.school;
    const users = await getUserModel(school);
    const user = await users.findByIdAndUpdate(req.params.userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};