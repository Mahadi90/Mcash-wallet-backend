import { Types } from "mongoose";
import { TransactionStatus, TransactionType } from "../transaction/transaction.interface";
import { Transaction } from "../transaction/transaction.model";
import { Wallet } from "./wallet.model";
import { WalletStatus } from "./wallet.interface";

// User mobile recharge (dummy)
const rechargeMobile = async (userId: Types.ObjectId, mobileNumber: string, operator: string, amount: number) => {
  if (!mobileNumber || !operator || amount <= 0) {
    throw new Error("Invalid request");
  }

  const wallet = await Wallet.findOne({ owner: userId, isActive: "ACTIVE" });
  if (!wallet) {
    throw new Error("Wallet not found or blocked");
  }
  if (wallet.balance < amount) {
    throw new Error("Insufficient balance");
  }

  wallet.balance -= amount;
  await wallet.save();

  await Transaction.create({
    type: TransactionType.MOBILE_RECHARGE,
    from: userId,
    to: null,
    amount,
    status: TransactionStatus.COMPLETED,
    details: { mobileNumber, operator },
  });

  return wallet;
}




const agentCashIn = async (agentId: Types.ObjectId, userId: Types.ObjectId, amount: number) => {
  if (!userId || amount <= 0) throw new Error("Invalid request");

  const wallet = await Wallet.findOne({ owner: userId, isActive: "ACTIVE" });

  if (!wallet) {
    throw new Error("User wallet not found or blocked");

  }
  const agentWallet = await Wallet.findOne({ owner: agentId, isActive: "ACTIVE" });
  if (!agentWallet) {
    throw new Error("Do not get your agent wallet");
  }

  if (agentWallet.balance < amount) {
    throw new Error("Insufficient balance");
  }

  wallet.balance += amount;
  await wallet.save();

  agentWallet.balance -= amount;
  await agentWallet.save()

  await Transaction.create({
    type: TransactionType.CASH_IN,
    from: agentId,
    to: userId,
    amount,
    status: TransactionStatus.COMPLETED,
  });

  return agentWallet;
}


const setWalletStatus = async (walletId: Types.ObjectId, status: WalletStatus) => {
  const wallet = await Wallet.findById(walletId);
  if (!wallet) throw new Error("Wallet not found");

  wallet.isActive = status;
  await wallet.save();

  return wallet;
}

const getWalletByUser = async (userId: Types.ObjectId) => {
  const wallet = await Wallet.findOne({ owner: userId });
  if (!wallet) {
    throw new Error("Wallet not found");
  }
  return wallet;
}



export const walletService = {
  rechargeMobile,
  agentCashIn,
  setWalletStatus,
  getWalletByUser
}