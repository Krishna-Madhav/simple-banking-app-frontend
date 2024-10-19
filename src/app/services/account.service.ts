import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { TransferDto } from '../models/transfer.model';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../environments/environment';
import { AppConstants } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  // Fetch all accounts
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiURL + AppConstants.API_METHOD.ACCOUNTS);
  }

  // Fetch account by account number
  getAccountByNumber(accountNumber: string): Observable<Account> {
    return this.http.get<Account>(
      this.apiURL + AppConstants.API_METHOD.ACCOUNTS + '/' + accountNumber
    );
  }

  // Create account
  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(
      this.apiURL + AppConstants.API_METHOD.ACCOUNTS,
      account
    );
  }

  // Deposit money
  deposit(
    accountNumber: string,
    amount: number
  ): Observable<{ message: string; newBalance: number }> {
    return this.http.post<{ message: string; newBalance: number }>(
      this.apiURL +
        AppConstants.API_METHOD.ACCOUNTS +
        '/' +
        accountNumber +
        '/' +
        AppConstants.API_METHOD.DEPOSIT,
      null,
      {
        params: { amount },
      }
    );
  }

  // Withdraw money
  withdraw(
    accountNumber: string,
    amount: number
  ): Observable<{ message: string; newBalance: number }> {
    return this.http.post<{ message: string; newBalance: number }>(
      this.apiURL +
        AppConstants.API_METHOD.ACCOUNTS +
        '/' +
        accountNumber +
        '/' +
        AppConstants.API_METHOD.WITHDRAW,
      null,
      {
        params: { amount },
      }
    );
  }

  // Transfer money
  transfer(transferDto: TransferDto): Observable<{
    message: string;
    sourceAccount: string;
    targetAccount: string;
    transferAmount: number;
  }> {
    return this.http.post<{
      message: string;
      sourceAccount: string;
      targetAccount: string;
      transferAmount: number;
    }>(
      this.apiURL +
        AppConstants.API_METHOD.ACCOUNTS +
        '/' +
        AppConstants.API_METHOD.TRANSFER,
      transferDto
    );
  }

  // Fetch transactions for a specific account
  getTransactionsByAccountNumber(accountNumber: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.apiURL +
        AppConstants.API_METHOD.ACCOUNTS +
        '/' +
        accountNumber +
        '/' +
        AppConstants.API_METHOD.TRANSACTIONS
    );
  }

  // Delete account by account number
  deleteAccount(accountNumber: string): Observable<void> {
    return this.http.delete<void>(
      this.apiURL + AppConstants.API_METHOD.ACCOUNTS + '/' + accountNumber
    );
  }
}
