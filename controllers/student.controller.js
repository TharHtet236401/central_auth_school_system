import studentSchema from "../models/student.model.js";
import connectToDatabase from "../config/database.js";

export const createStudent = async (req, res) => {
  try {
    const school = req.user.school;
    console.log(school);

    const userDB = await connectToDatabase(school);
    const Student = userDB.model("Student", studentSchema);

    req.body.school = school;

    const student = new Student(req.body);
    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const school = req.user.school;

    const userDB = await connectToDatabase(school);
    const Student = userDB.model("Student", studentSchema);

    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const Student = userDB.model("Student", studentSchema);

    const student = await Student.findById(req.params.studentId);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const Student = userDB.model("Student", studentSchema);

    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const Student = userDB.model("Student", studentSchema);

    await Student.findByIdAndDelete(req.params.studentId);
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
