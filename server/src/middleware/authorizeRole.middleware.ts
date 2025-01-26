import { NextFunction, Request,Response } from "express";
import { UserDocument, UserRole } from "../types/auth.type";
import ApiError from "../utils/ApiError";


const authorizeRole=(requiredRole:UserRole)=>{
     return (req:Request,res:Response,next:NextFunction)=>{
        const user = req.user as UserDocument;
        if(!user){
            throw new ApiError(401,"user not authenticated")
        }
        if(user.role !== requiredRole){
            throw new ApiError(403,"only admin can access")
        }
        next()
    }
}

export default authorizeRole