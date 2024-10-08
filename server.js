import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

import authRoute from "./routes/auth.route.js";
import studentRoute from "./routes/student.route.js";
import classRoute from "./routes/class.route.js";
import schoolRoute from "./routes/school.route.js";
import userRoute from "./routes/user.route.js";

app.use("/api/auth", authRoute);
app.use("/api/students", studentRoute);
app.use("/api/classes", classRoute);
app.use("/api/schools", schoolRoute);
app.use("/api/users", userRoute);

app.use("/*", (req, res) => {
  res.status(404).send("Route Not Found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
