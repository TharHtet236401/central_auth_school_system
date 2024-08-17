import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  classCode: { type: String, required: true },
  school: { type: String, required: true },
});

export default classSchema;
