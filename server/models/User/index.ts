import { model, Model, Document, Schema } from "mongoose";

import auth, { Auth } from "./auth";
import profile, { Profile } from "./profile";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface User extends Document {
  email: string;
  auth: Auth;
  profile: Profile;
  role: UserRole;
}

export const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
  auth: { type: auth, select: false },
  profile: { type: profile },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
});

const User: Model<User> = model("User", UserSchema);

export default User;
