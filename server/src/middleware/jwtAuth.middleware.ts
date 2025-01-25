import { Request, Response, NextFunction } from 'express';
import passport from '../configs/passport.config';
import { UserDocument } from '../types/auth.type';
import ApiError from '../utils/ApiError';

type PassportInfo={message:string;}

const jwtAuthMiddleware = (req:Request, res:Response, next:NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user:UserDocument, info:PassportInfo) => { 
      if (err) {
        return next(new ApiError(401,"Invalid token"))};
      if (!user) {
        return next(new ApiError(401,info.message||"Unauthorized")); 
      }
      
      req.authInfo = info; 
      req.user = user; 
      next();
    })(req, res, next);
  };

export default jwtAuthMiddleware;