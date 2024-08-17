import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateofBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  school: {
    type: String,
  },
});

export default studentSchema;
