// Import paket-paket yang diperlukan
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserGoogle from "../models/UserGoogle.js";
import passport from "passport";
import jwt from "jsonwebtoken";

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
      const { id: googleId, emails } = profile;
      const googleEmail = emails[0].value;
      const existingUser = await UserGoogle.findOne({ googleId });

      if (existingUser) {
        console.log("Existing user:", existingUser);
        const token = jwt.sign({ userId: existingUser._id }, "sidata", {
          expiresIn: "1h",
        });
        return done(null, existingUser, token);
      } else {
        new UserGoogle({
          googleId: profile.id,
          googleEmail: googleEmail,
          username: profile.displayName,
        })
          .save()
          .then((newUser) => {
            console.log("New user:", newUser);

            const token = jwt.sign({ userId: newUser._id }, "sidata", {
              expiresIn: "1h",
            });
            return done(null, newUser, token);
          })
          .catch((error) => {
            console.error(error);
            return done(error, null);
          });
      }
    } catch (error) {
      console.error(error);
      return done(error, null);
    }
  }
);
