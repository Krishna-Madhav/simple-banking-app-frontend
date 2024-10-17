export interface Transaction {
  id: number;
  transactionType: string;
  timeStamp: string;
  transactionAmount: number;
  oldBalance: number;
  newBalance: number;
  targetAccountNr?: string;
}
