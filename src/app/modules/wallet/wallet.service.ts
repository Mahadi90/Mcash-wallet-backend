import { Types } from "mongoose";
import { TransactionStatus, TransactionType } from "../transaction/transaction.interface";
import { Transaction } from "../transaction/transaction.model";
import { Wallet } from "./wallet.model";
import { WalletStatus } from "./wallet.interface";
import { User } from "../user/user.model";


// User mobile recharge
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




const agentCashIn = async (agentId: Types.ObjectId, userNumber: string, amount: number) => {
  if (!userNumber || amount <= 0) throw new Error("Invalid request");

  const receiverUser = await User.findOne({ phone: userNumber });
  if (!receiverUser) {
    throw new Error("User Number not found or blocked");

  }
  const wallet = await Wallet.findOne({ owner: receiverUser._id });

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
    details : {
      from: agentId,
      to : {
        phone : userNumber,
        name : receiverUser.name
      }
    },
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


const withdrawMoney = async (userId: Types.ObjectId, agentMobile: string, amount: number) => {
  if (!agentMobile || amount <= 0) throw new Error("Invalid request");

  const userWallet = await Wallet.findOne({ owner: userId, isActive: "ACTIVE" });
  if (!userWallet) throw new Error("User wallet not found or blocked");

  const agentUser = await User.findOne({ phone: agentMobile, role: "AGENT" });
  if (!agentUser) throw new Error("No agent found with this mobile number");

  const agentWallet = await Wallet.findOne({ owner: agentUser._id, isActive: "ACTIVE" });
  if (!agentWallet) throw new Error("Agent wallet not found or blocked");


  if (userWallet.balance < amount) throw new Error("Insufficient balance");


  userWallet.balance -= amount;
  agentWallet.balance += amount;

  await userWallet.save();
  await agentWallet.save();

  await Transaction.create({
    type: TransactionType.WITHDRAW,
    from: userId,
    to: agentUser._id,
    amount,
    status: TransactionStatus.COMPLETED,
    details: { agentMobile },
  });

  return userWallet;
};

const sendMoney = async (senderId: Types.ObjectId, receiverNumber: string, amount: number) => {
  if (!receiverNumber || amount <= 0) throw new Error("Invalid request");

  const receiverUser = await User.findOne({ phone: receiverNumber });
  if (!receiverUser || receiverUser.role !== 'USER') throw new Error("Invalid receiver ID: No user found with this ID");

  const senderWallet = await Wallet.findOne({ owner: senderId, isActive: "ACTIVE" });
  const receiverWallet = await Wallet.findOne({ owner: receiverUser._id, isActive: "ACTIVE" });



  if (!senderWallet) throw new Error("Sender wallet not found or blocked");
  if (!receiverWallet) throw new Error("Receiver wallet not found or blocked");

  if (senderWallet.balance < amount) throw new Error("Insufficient balance");

  senderWallet.balance -= amount;
  receiverWallet.balance += amount;

  await senderWallet.save();
  await receiverWallet.save();

  await Transaction.create({
    type: TransactionType.SEND_MONEY,
    from: senderId,
    amount,
    details: {
      from: senderId,
      to: receiverNumber
    },
    status: TransactionStatus.COMPLETED,
  });

  return senderWallet;
};



const agentCashOut = async (
  agentId: string,
  targetMobileNumber: string,
  amount: number
) => {
  if (amount <= 0) throw new Error("Invalid amount");


  const user = await User.findOne({ phone: targetMobileNumber, role: "USER" });
  if (!user) throw new Error("Target user not found");


  const agentWallet = await Wallet.findOne({ owner: agentId, isActive: "ACTIVE" });
  if (!agentWallet) throw new Error("Agent wallet not found or blocked");

  const userWallet = await Wallet.findOne({ owner: user._id, isActive: "ACTIVE" });
  if (!userWallet) throw new Error("User wallet not found or blocked");


  if (userWallet.balance < amount) throw new Error("User has insufficient balance");


  userWallet.balance -= amount;
  await userWallet.save();

  agentWallet.balance += amount;
  await agentWallet.save();


  await Transaction.create({
    type: TransactionType.CASH_OUT,
    from: user._id,
    to: agentId,
    amount,
    status: TransactionStatus.COMPLETED,
    details: { note: `Agent withdrew from user ${user.phone}` },
  });

  return { agentWallet, userWallet };
};



export const walletService = {
  rechargeMobile,
  agentCashIn,
  setWalletStatus,
  getWalletByUser,
  withdrawMoney,
  sendMoney,
  agentCashOut
}