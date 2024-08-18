import schoolInfoSchema from "../models/schoolInfo.model.js";
import connectToDatabase from "../config/database.js";

export const createSchoolInfo = async (req, res) => {
  try {
    const school = req.user.school;
    const userDB = await connectToDatabase(school);
    const schoolInfo = userDB.model("schoolInfo", schoolInfoSchema);
    const newSchoolInfo = new schoolInfo(req.body);
     if(newSchoolInfo){
        return res.status(400).json({message: "School info already exists"});
     }

    res.status(201).json({ message: "School info created successfully", newSchoolInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};