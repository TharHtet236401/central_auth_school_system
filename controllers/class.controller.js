import classSchema from "../models/class.model.js";
import userSchema from "../models/users.model.js";
import connectToDatabase from "../config/database.js";
import mongoose from 'mongoose';

export const createClass = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const { name, classCode } = req.body;

    const savedClass = {
      name,
      classCode,
      school: req.user.school,
    };

    const Class = userDB.model("Class", classSchema);
    const newClass = new Class(savedClass);
    await newClass.save();

    res.status(201).json({ message: "Class created successfully", savedClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClasses = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const Classes = userDB.model("Class", classSchema);

    const classes = await Classes.find();

    res.status(200).json({ message: "Classes fetched successfully", classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClass = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const Classes = userDB.model("Class", classSchema);

    const foundClass = await Classes.findById(req.params.classId);

    res.status(200).json({ message: "Class fetched successfully", foundClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const Classes = userDB.model("Class", classSchema);

    const updatedClass = await Classes.findByIdAndUpdate(req.params.classId, req.body, { new: true });

    res.status(200).json({ message: "Class updated successfully", updatedClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const Classes = userDB.model("Class", classSchema);

    await Classes.findByIdAndDelete(req.params.classId);

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinClassByTeachers = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const Classes = userDB.model("Class", classSchema);
    const Users = userDB.model("User", userSchema);

    // Find the user by email
    const foundUser = await Users.findOne({ email: req.user.email });
    const foundClass = await Classes.findOne({ classCode: req.body.classCode });

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push the user's ID into the teachers array
    if (!foundClass.teachers.includes(foundUser._id)) { 
      foundClass.teachers.push(foundUser._id);
    }

    await foundClass.save(); // Save the updated class

    // Populate the teachers field
    const populatedClass = await Classes.findById(foundClass._id).populate("teachers");

   
    res.status(200).json({ message: "Class joined successfully", foundClass: populatedClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};