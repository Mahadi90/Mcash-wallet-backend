/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { Types } from "mongoose";

export interface AuthRequest extends Request {
  user: {
    _id: Types.ObjectId;
    role: string;
    [key: string]: any;
  };
}
