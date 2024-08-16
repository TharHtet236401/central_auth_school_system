import mongoose from "mongoose";

const dbConfig = {
  master: 'mongodb://localhost:27017/master',
  school1: 'mongodb://localhost:27017/school1',
  school2: 'mongodb://localhost:27017/school2',
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