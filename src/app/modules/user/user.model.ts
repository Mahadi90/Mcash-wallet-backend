import mongoose, { Schema } from "mongoose";
import { IUser, Role, IAUTH } from "./user.interface";


const AuthSchema = new Schema<IAUTH>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true},
    phone: { type: String, required: true, unique: true },
    email: { type: String},
    password: { type: String, required: true},
    img: { type: String },
    address: { type: String },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    isVerified : {type : Boolean, default : false},
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    auth: { type: [AuthSchema], required: true, default: [] }
  },
  {
    timestamps: true,
    versionKey : false
  }
);

UserSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true, $ne: null } } }
);

export const User = mongoose.model<IUser>("User", UserSchema);
