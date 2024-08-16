import  userSchema from "../models/centralUsers.model.js";
import connectToDatabase from "../config/database.js";
import centralUsersSchema from "../models/users.model.js";

import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const {username,email,password,confirmedPassword,role,school} = req.body;
    
    if (password != confirmedPassword){
        return res.status(400).json({message:"Password and confirmed password do not match"})
    }

    if (!username || !email || !password || !confirmedPassword || !role || !school){
        return res.status(400).json({message:"All fields are required"})
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);

    let toSave = req.body;
    toSave.password = hashedPassword;

    const userDB = await connectToDatabase(school);
    const User = userDB.model('User', userSchema);
    
    const centralDB = await connectToDatabase("master");
    const centralUser = centralDB.model('centralUser',centralUsersSchema)
  
    await new centralUser(toSave).save()
    await new User(toSave).save();
   
    
}   