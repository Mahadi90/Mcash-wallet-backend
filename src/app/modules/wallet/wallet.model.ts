import { model, Schema, Types } from "mongoose"
import { IWallet, WalletStatus } from "./wallet.interface"

export interface WalletDocument extends IWallet, Document {
  owner: Types.ObjectId
}

const WalletSchema = new Schema<WalletDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 50,
    },
    isActive: {
      type: String,
      enum: Object.values(WalletStatus),
      default: WalletStatus.ACTIVE,
    },
    currency: {
      type: String,
      enum: ["BDT"],
      default: "BDT",
    },
  },
  {
    timestamps: true,
    versionKey : false
  }
)

export const Wallet = model<WalletDocument>("Wallet", WalletSchema)
