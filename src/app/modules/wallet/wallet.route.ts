// GET /wallets/me → নিজের wallet এর balance/status দেখতে।

import { Router } from "express";
import { walletController } from "./wallet.controller";
import { checkAuth } from "../../middlewares/validationRequest";
import { Role } from "../user/user.interface";

// GET /wallets/:userId → (Admin/Agent এর জন্য) নির্দিষ্ট user এর wallet দেখতে।

// PATCH /wallets/:id/block → Admin user wallet block/unblock করতে।

// GET /wallets → Admin সব wallet দেখতে (pagination সহ)।

const router = Router()

router.post("/top-up-recharge",checkAuth(Role.USER, Role.AGENT), walletController.rechargeMobile);
router.post("/cash-in", checkAuth(Role.AGENT), walletController.agentCashIn);
router.patch('/wallet-status', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), walletController.setWalletStatus)
router.get("/user/:userId",checkAuth(Role.ADMIN, Role.SUPER_ADMIN), walletController.getWalletByUser);

export const walletRouter = router



// import { Wallet } from "./wallet.model";
// import { Transaction } from "./transaction.model";
// import { Types } from "mongoose";
// import { TransactionType, TransactionStatus } from "./transaction.interface";

// class WalletService {
//   // User add money
//   async addMoney(userId: Types.ObjectId, amount: number) {
//     if (amount <= 0) throw new Error("Invalid amount");

//     const wallet = await Wallet.findOne({ owner: userId, status: "ACTIVE" });
//     if (!wallet) throw new Error("Wallet not found or blocked");

//     wallet.balance += amount;
//     await wallet.save();

//     await Transaction.create({
//       type: TransactionType.ADD_MONEY,
//       from: userId,
//       to: userId,
//       amount,
//       status: TransactionStatus.COMPLETED,
//     });

//     return wallet;
//   }

//   // User mobile recharge (dummy)
//   async rechargeMobile(userId: Types.ObjectId, mobileNumber: string, operator: string, amount: number) {
//     if (!mobileNumber || !operator || amount <= 0) throw new Error("Invalid request");

//     const wallet = await Wallet.findOne({ owner: userId, status: "ACTIVE" });
//     if (!wallet) throw new Error("Wallet not found or blocked");
//     if (wallet.balance < amount) throw new Error("Insufficient balance");

//     wallet.balance -= amount;
//     await wallet.save();

//     await Transaction.create({
//       type: TransactionType.MOBILE_RECHARGE,
//       from: userId,
//       to: null,
//       amount,
//       status: TransactionStatus.COMPLETED,
//       details: { mobileNumber, operator },
//     });

//     return wallet;
//   }

//   // Agent cash-in to user
//   async agentCashIn(agentId: Types.ObjectId, userId: Types.ObjectId, amount: number) {
//     if (!userId || amount <= 0) throw new Error("Invalid request");

//     const wallet = await Wallet.findOne({ owner: userId, status: "ACTIVE" });
//     if (!wallet) throw new Error("User wallet not found or blocked");

//     wallet.balance += amount;
//     await wallet.save();

//     await Transaction.create({
//       type: TransactionType.CASH_IN,
//       from: agentId,
//       to: userId,
//       amount,
//       status: TransactionStatus.COMPLETED,
//     });

//     return wallet;
//   }

//   // Admin block/unblock wallet
//   async setWalletStatus(walletId: Types.ObjectId, status: "ACTIVE" | "BLOCKED") {
//     const wallet = await Wallet.findById(walletId);
//     if (!wallet) throw new Error("Wallet not found");

//     wallet.status = status;
//     await wallet.save();

//     return wallet;
//   }

//   // Get wallet by user
//   async getWalletByUser(userId: Types.ObjectId) {
//     const wallet = await Wallet.findOne({ owner: userId });
//     if (!wallet) throw new Error("Wallet not found");
//     return wallet;
//   }
// }

// export const walletService = new WalletService();






// import { Wallet } from "./wallet.model";
// import { Transaction } from "./transaction.model";
// import { Types } from "mongoose";
// import { TransactionType, TransactionStatus } from "./transaction.interface";

// class WalletService {
//   // User add money
//   async addMoney(userId: Types.ObjectId, amount: number) {
//     if (amount <= 0) throw new Error("Invalid amount");

//     const wallet = await Wallet.findOne({ owner: userId, status: "ACTIVE" });
//     if (!wallet) throw new Error("Wallet not found or blocked");

//     wallet.balance += amount;
//     await wallet.save();

//     await Transaction.create({
//       type: TransactionType.ADD_MONEY,
//       from: userId,
//       to: userId,
//       amount,
//       status: TransactionStatus.COMPLETED,
//     });

//     return wallet;
//   }

//   // User mobile recharge (dummy)
//   async rechargeMobile(userId: Types.ObjectId, mobileNumber: string, operator: string, amount: number) {
//     if (!mobileNumber || !operator || amount <= 0) throw new Error("Invalid request");

//     const wallet = await Wallet.findOne({ owner: userId, status: "ACTIVE" });
//     if (!wallet) throw new Error("Wallet not found or blocked");
//     if (wallet.balance < amount) throw new Error("Insufficient balance");

//     wallet.balance -= amount;
//     await wallet.save();

//     await Transaction.create({
//       type: TransactionType.MOBILE_RECHARGE,
//       from: userId,
//       to: null,
//       amount,
//       status: TransactionStatus.COMPLETED,
//       details: { mobileNumber, operator },
//     });

//     return wallet;
//   }

//   // Agent cash-in to user
//   async agentCashIn(agentId: Types.ObjectId, userId: Types.ObjectId, amount: number) {
//     if (!userId || amount <= 0) throw new Error("Invalid request");

//     const wallet = await Wallet.findOne({ owner: userId, status: "ACTIVE" });
//     if (!wallet) throw new Error("User wallet not found or blocked");

//     wallet.balance += amount;
//     await wallet.save();

//     await Transaction.create({
//       type: TransactionType.CASH_IN,
//       from: agentId,
//       to: userId,
//       amount,
//       status: TransactionStatus.COMPLETED,
//     });

//     return wallet;
//   }

//   // Admin block/unblock wallet
//   async setWalletStatus(walletId: Types.ObjectId, status: "ACTIVE" | "BLOCKED") {
//     const wallet = await Wallet.findById(walletId);
//     if (!wallet) throw new Error("Wallet not found");

//     wallet.status = status;
//     await wallet.save();

//     return wallet;
//   }

//   // Get wallet by user
//   async getWalletByUser(userId: Types.ObjectId) {
//     const wallet = await Wallet.findOne({ owner: userId });
//     if (!wallet) throw new Error("Wallet not found");
//     return wallet;
//   }
// }

// export const walletService = new WalletService();







// import { Wallet } from "./wallet.model";
// import { Transaction } from "./transaction.model";
// import { Types } from "mongoose";
// import { TransactionType, TransactionStatus } from "./transaction.interface";

// class WalletService {
//   // User add money
//   async addMoney(userId: Types.ObjectId, amount: number) {
//     if (amount <= 0) throw new Error("Invalid amount");

//     const wallet = await Wallet.findOne({ owner: userId, status: "ACTIVE" });
//     if (!wallet) throw new Error("Wallet not found or blocked");

//     wallet.balance += amount;
//     await wallet.save();

//     await Transaction.create({
//       type: TransactionType.ADD_MONEY,
//       from: userId,
//       to: userId,
//       amount,
//       status: TransactionStatus.COMPLETED,
//     });

//     return wallet;
//   }

//   // User mobile recharge (dummy)
//   async rechargeMobile(userId: Types.ObjectId, mobileNumber: string, operator: string, amount: number) {
//     if (!mobileNumber || !operator || amount <= 0) throw new Error("Invalid request");

//     const wallet = await Wallet.findOne({ owner: userId, status: "ACTIVE" });
//     if (!wallet) throw new Error("Wallet not found or blocked");
//     if (wallet.balance < amount) throw new Error("Insufficient balance");

//     wallet.balance -= amount;
//     await wallet.save();

//     await Transaction.create({
//       type: TransactionType.MOBILE_RECHARGE,
//       from: userId,
//       to: null,
//       amount,
//       status: TransactionStatus.COMPLETED,
//       details: { mobileNumber, operator },
//     });

//     return wallet;
//   }

//   // Agent cash-in to user
//   async agentCashIn(agentId: Types.ObjectId, userId: Types.ObjectId, amount: number) {
//     if (!userId || amount <= 0) throw new Error("Invalid request");

//     const wallet = await Wallet.findOne({ owner: userId, status: "ACTIVE" });
//     if (!wallet) throw new Error("User wallet not found or blocked");

//     wallet.balance += amount;
//     await wallet.save();

//     await Transaction.create({
//       type: TransactionType.CASH_IN,
//       from: agentId,
//       to: userId,
//       amount,
//       status: TransactionStatus.COMPLETED,
//     });

//     return wallet;
//   }

//   // Admin block/unblock wallet
//   async setWalletStatus(walletId: Types.ObjectId, status: "ACTIVE" | "BLOCKED") {
//     const wallet = await Wallet.findById(walletId);
//     if (!wallet) throw new Error("Wallet not found");

//     wallet.status = status;
//     await wallet.save();

//     return wallet;
//   }

//   // Get wallet by user
//   async getWalletByUser(userId: Types.ObjectId) {
//     const wallet = await Wallet.findOne({ owner: userId });
//     if (!wallet) throw new Error("Wallet not found");
//     return wallet;
//   }
// }

// export const walletService = new WalletService();
