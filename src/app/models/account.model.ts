import { Transaction } from './transaction.model';

// Interface representing a bank account
export interface Account {
  id?: number; // Here id optional
  accountNr: string;
  balance: number;
  transactions?: Transaction[]; // ? indicates Transactions as optional
}
