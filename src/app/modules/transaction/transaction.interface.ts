/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export enum TransactionType {
  ADD_MONEY = "ADD_MONEY",
  WITHDRAW = "WITHDRAW",
  SEND_MONEY = "SEND_MONEY",
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
  MOBILE_RECHARGE = "MOBILE_RECHARGE"
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}


export interface ITransaction {
  _id?: Types.ObjectId;
  type: TransactionType;
  from: Types.ObjectId; 
  to?: Types.ObjectId | null; 
  amount: number;
  status: TransactionStatus;
  details?: Record<string, any>; 
  createdAt?: Date;
  updatedAt?: Date;
}
