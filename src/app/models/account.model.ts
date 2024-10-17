import { Transaction } from './transaction.model';

export interface Account {
  id?: number; // Mark id as optional
  accountNr: string;
  balance: number;
  transactions?: Transaction[]; // Mark transactions as optional
}
