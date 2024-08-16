import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  master: process.env.MASTER_DB,
  school1: process.env.SCHOOL1_DB,
  school2: process.env.SCHOOL2_DB,
};

const connections = {};

async function connectToDatabase(school) {
  if (!connections[school]) {
    connections[school] = await mongoose.createConnection(dbConfig[school], {
    });
    console.log("newDatabase Connected "+ school)
  }
  return connections[school];
}

export default connectToDatabase;