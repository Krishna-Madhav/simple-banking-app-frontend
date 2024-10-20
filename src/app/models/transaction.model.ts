// Interface representing a transaction activity

export interface Transaction {
  id: number;
  transactionType: string;
  timeStamp: string;
  transactionAmount: number;
  oldBalance: number;
  newBalance: number;
  targetAccountNr?: string; // Optional target account number for transfers; not required for deposits/withdrawals
}
