import mongoose from "mongoose";

const centralUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  school: { type: String, required: true },
  role: { type: String, enum: ["admin", "teacher", "parent"], required: true },
});


export default centralUserSchema;

