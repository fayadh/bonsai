import { model, Model, Document, Schema } from "mongoose";

import profile, { Profile } from "./profile";

export interface User extends Document {
  email: string;
  profile: Profile;
}

export const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
  profile: { type: profile },
});

const User: Model<User> = model("User", UserSchema);

export default User;
