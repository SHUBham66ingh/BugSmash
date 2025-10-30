
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");
const User = require("../models/user");

const  adminMiddleware = async (req , res , next)=>{
    try{
          const {token} = req.cookies;
          if(!token)
            throw new Error("invalid token");
         const payload =  jwt.verify(token , process.env.JWT_KEY);

         const {_id} = payload;

         if(!_id)
         {
            throw new Error("Invalid token");
         }
         const result = await User.findById(_id);

          if(payload.role!='admin')
          {
              throw new Error("inavalid Token")
          }

         if(!result)
         {
            throw new Error("user doesn't exists");
         }

         const IsBlocked = await redisClient.exists(`token:${token}`);

         if(IsBlocked)
         {
            throw new Error("Invalid Token");
         }

         req.result = result;
         next();

    }
    catch(err)
    {
        res.send("Error" + err.message);
    }
}

module.exports =   adminMiddleware;