import { model, Schema } from "mongoose";
import { ITransaction ,TransactionStatus,TransactionType} from "./transaction.interface";


export interface TransactionDocument extends ITransaction, Document {}

const TransactionSchema = new Schema<TransactionDocument>(
  {
    type: { type: String, enum: Object.values(TransactionType), required: true },
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", default: null },
    amount: { type: Number, required: true },
    status: { type: String, enum: Object.values(TransactionStatus), default: TransactionStatus.COMPLETED },
    details: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Transaction = model<TransactionDocument>("Transaction", TransactionSchema);
