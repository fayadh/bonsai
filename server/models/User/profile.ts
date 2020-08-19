import { Schema } from "mongoose";

export interface Profile {
  name: string;
}

const Profile: Schema = new Schema(
  {
    name: { type: String, default: null },
  },
  { _id: false }
);

export default Profile;
