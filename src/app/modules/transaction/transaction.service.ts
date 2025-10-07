import { Transaction } from "./transaction.model";


const getAllTransactions = async () => {
    return await Transaction.find()
        .populate("from", "name phone role")
        .populate("to", "name phone role")
        .sort({ createdAt: -1 });
};


const getUserTransactions = async (userId: string) => {
    return await Transaction.find({
        $or: [{ from: userId }, { to: userId }],
    })
        .populate("from", "name phone role")
        .populate("to", "name phone role")
        .sort({ createdAt: -1 });
};

const getMyTransactions = async (userId: string) => {
  return await Transaction.find({
    $or: [{ from: userId }, { to: userId }],
  })
    .populate("from", "name mobileNumber role")
    .populate("to", "name mobileNumber role")
    .sort({ createdAt: -1 });
};


export const transactionService = {
    getAllTransactions,
    getUserTransactions,
    getMyTransactions
}