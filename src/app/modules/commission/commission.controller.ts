/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Response } from "express";
import { commissionService } from "./commission.service";

const getMyCommissionFromWallet = async (req: any, res: Response) => {
  try {
    const agentId = req.user.id; // JWT middleware থেকে
    const result = await commissionService.getAgentCommissionHistoryFromWallet(agentId);

    res.status(200).json({
      success: true,
      totalCommission: result.totalCommission,
      wallet: result.wallet,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const commissionController = {
  getMyCommissionFromWallet,
};
