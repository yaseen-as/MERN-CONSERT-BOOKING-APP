import jwt from 'jsonwebtoken'
import ApiError from './ApiError';
 
 const jwtVerify=(token: string, secret: string) =>{
    try {
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        console.error('Invalid token');
        throw new ApiError(400,"invalid token")
      } else if (error instanceof jwt.TokenExpiredError) {
        console.error('Token expired');
        throw new ApiError(401,"expired token")
      } else {
        console.error('Token verification failed:', error);
        throw new ApiError(500," something went wrong")
      }
    }
  }

  export {
    jwtVerify,
  }
