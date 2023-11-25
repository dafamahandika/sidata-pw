import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import passport from "passport";

const GOOGLE_CLIENT_ID =
  "1065873934901-r2uq3md5p70rgeia09etopm8h6gi9682.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const callback = "http://localhost:3000/auth/google/callback";

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: callback,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ googleId: profile.id });

      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
        });
        await newUser.save();
        done(null, newUser);
      }
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  }
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default googleStrategy;
