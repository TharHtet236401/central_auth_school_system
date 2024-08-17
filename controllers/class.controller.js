import classSchema from "../models/class.model.js";
import connectToDatabase from "../config/database.js";

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
