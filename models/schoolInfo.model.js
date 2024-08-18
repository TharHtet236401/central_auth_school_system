import mongoose from "mongoose";

const schoolInfoSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
});

export default schoolInfoSchema;
