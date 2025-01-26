import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { User } from "../models/auth.model";
import { IJwtPayload, UserDocument } from "../types/auth.type";
import ApiError from "../utils/ApiError";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET as string,
  //issuer
  //audience
};

passport.use(
  new JwtStrategy(options, async (jwtPayload: IJwtPayload, done) => {
    try {
      const currentTime = Math.floor(Date.now() / 1000);
      if (jwtPayload.exp && jwtPayload.exp < currentTime) {
        console.log("token expired in passport auth");
        const error = new ApiError(401, "Token Expired");
        return done(error, false, { message: "Token expired" });
      }

      if (!jwtPayload._id) {
        return done(null, false, { message: "Invalid token payload" });
      }

      const user = (await User.findById(jwtPayload._id)) as UserDocument | null;
      if (user) {
        console.log("passport auth success");
        return done(null, user);
      }
      return done(null, false, { message: "User not found" });
    } catch (error) {
      return done(error, false, { message: "Something went wrong" });
    }
  })
);

export default passport;
