import { Types } from "mongoose"

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export type Currency = "BDT"

export interface IWallet {
  _id?: Types.ObjectId
  owner: Types.ObjectId  
  balance: number
  isActive: WalletStatus,
  commission: number,
  currency: Currency
  createdAt?: Date
  updatedAt?: Date
}

export interface IWalletCreate {
  owner: string
  initialBalance?: number 
  status?: WalletStatus     
  currency?: Currency       
}

export interface IWalletUpdate {
  isActive?: WalletStatus     
}

export type IWalletLean = Pick<IWallet, "_id" | "owner" | "balance" | "isActive">

export interface IWalletQuery {
  owner?: string
  status?: WalletStatus
  minBalance?: number
  maxBalance?: number
  page?: number
  limit?: number
  sort?: string
}
