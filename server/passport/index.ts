import * as mongoose from "mongoose";
import * as passport from "passport";

import strategies from "./strategies";
import UserModel, { IUser } from "../models/User";

strategies.map((strategy) => passport.use(strategy));

passport.serializeUser(function (user: IUser, done: any) {
  console.log("in serializer", { user });
  done(null, user);
});

passport.deserializeUser(function (
  _id: string | mongoose.Types.ObjectId,
  done: any
) {
  console.log("in deserializer", _id);
  UserModel.findById(_id, function (err, user) {
    done(err, user);
  });
});

export default passport;
