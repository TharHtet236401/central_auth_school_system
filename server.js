import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());


import authRoute from "./routes/auth.route.js";
import studentRoute from "./routes/student.route.js";

app.use("/api/auth", authRoute);
app.use("/api/students", studentRoute);




app.use("/*", (req, res) => {
  res.status(404).send("Route Not Found");
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});