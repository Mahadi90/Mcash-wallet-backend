import { Wallet } from "../wallet/wallet.model";

const getAgentCommissionHistoryFromWallet = async (agentId: string) => {

  const agentWallet = await Wallet.findOne({ owner: agentId });
  if (!agentWallet) throw new Error("Agent wallet not found");

  const totalCommission = agentWallet.commission || 0;

  return { totalCommission, wallet: agentWallet };
};

export const commissionService = {
  getAgentCommissionHistoryFromWallet,
};
