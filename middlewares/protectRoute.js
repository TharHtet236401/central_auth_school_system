import jwt from 'jsonwebtoken';
// Ensure the path and extension are correct

//for web base application
export const protectRoute = async (req, res, next) => {
    try{
       const token = req.cookies.jwt;
       if(!token){
        return res.status(401).json({message: "No Token, Unauthorized"});
       }
       const decoded = jwt.verify(token, process.env.JWT_SECRET);

       if(!decoded){
        return res.status(401).json({message: "Invalid Token"});
       }

       const user = await User.findById(decoded.id).select("-password");

       if(!user){
        return res.status(401).json({message: "User not found"});
       }
       
       req.user = user; 
       next();       
       
    }catch(error){
        res.status(500).json({message: "error.Message"});
    }
}

//for api base application
export const validateToken = () => {
    return (req, res, next) => {
        
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(" ")[1];
            try {
                let tokenUser = jwt.verify(token, process.env.JWT_SECRET);
                req.user = tokenUser.data;
                next();
            } catch (error) {
                next(new Error("Invalid token"));
            }   
        } else {
           res.status(401).json({message: "No Token, Unauthorized"});
        }
    }
}
