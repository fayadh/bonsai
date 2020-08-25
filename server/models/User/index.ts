import { model, Model, Document, Schema } from "mongoose";

import auth, { Auth } from "./auth";
import profile, { Profile } from "./profile";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser extends Document {
  email: string;
  auth?: Auth;
  profile: Profile;
  role?: UserRole;
}

export const UserSchema: Schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    auth: { type: auth, select: false },
    profile: { type: profile },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  { timestamps: true }
);

UserSchema.statics.storeGoogleRefreshToken = (
  email: string,
  refreshToken: string
) => {
  return User.findOneAndUpdate(
    { email },
    {
      $set: {
        "auth.google.refreshToken": refreshToken,
      },
    }
  );
};

UserSchema.statics.findOrCreate = async (email: string, name: string) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      profile: {
        name,
      },
    });
  }

  return user;
};

export interface IUserModel extends Model<IUser> {
  findOrCreate(email: string, name: string): IUser;
  storeGoogleRefreshToken(email: string, refreshToken: string): Promise<IUser>;
}

const User = model<IUser, IUserModel>("User", UserSchema);

export default User;
