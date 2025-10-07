/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { transactionService } from "./transaction.service";



 const getAllTransactions = async (req: Request, res: Response) => {
  try {
    
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

 const getUserTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const transactions = await transactionService.getUserTransactions(userId);
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getMyTransactions = async (req: any, res: Response) => {
  try {
    const transactions = await transactionService.getMyTransactions(req.user.id);

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const transactionController = {
    getAllTransactions,
    getUserTransactions,
    getMyTransactions
}
