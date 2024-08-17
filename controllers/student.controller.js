import studentSchema from "../models/student.model.js";
import connectToDatabase  from "../config/database.js";

export const createStudent = async (req, res) => {
    const school = req.user.school;
    console.log(school)

    const userDB = await connectToDatabase(school);
    const Student = userDB.model("Student", studentSchema);

    const student = new Student(req.body);
    await student.save();

    res.status(201).json(student);
}