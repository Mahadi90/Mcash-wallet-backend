/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Response } from "express";
import { walletService } from "./wallet.service";


export const rechargeMobile = async (req: any, res: Response) => {
    try {
        console.log(req.user.id);
        const { mobileNumber, operator, amount } = req.body;
        const wallet = await walletService.rechargeMobile(req.user?.id, mobileNumber, operator, amount);
        res.status(200).json({ message: "Recharge successful", remaining_balance: wallet.balance });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};


const agentCashIn = async (req: any, res: Response) => {
    try {
        const { userId, amount } = req.body;
        const wallet = await walletService.agentCashIn(req.user.id, userId, amount);
        res.status(200).json({ message: "Cash-in successful", remaining_Balance: wallet.balance });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

const setWalletStatus = async (req: any, res: Response) => {
    try {
        const { walletId, status } = req.body;
        
        const wallet = await walletService.setWalletStatus(walletId, status);
        res.status(200).json({ message: `Wallet ${status}`, wallet });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getWalletByUser = async (req: any, res: Response) => {
  try {
    
    const wallet = await walletService.getWalletByUser(req.params.userId);
    res.status(200).json({ wallet });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const walletController = {
    rechargeMobile,
    agentCashIn,
    setWalletStatus,
    getWalletByUser
}