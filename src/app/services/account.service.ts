import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { TransferDto } from '../models/transfer.model';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../environments/environment';
import { AppConstants } from '../constants/app.constants';

// This service is provided at the root level
@Injectable({
  providedIn: 'root',
})

/**
 * AccountService handles all operations related to bank accounts.
 * It has methods to:
 * - Fetch all accounts
 * - Fetch a specific account by its number
 * - Create a new account
 * - Deposit or withdraw funds from an account
 * - Transfer money between accounts
 * - Fetch transaction history for an account
 * - Delete an account
 *
 * This service uses Angular's HttpClient to make HTTP requests to the backend API.
 */
export class AccountService {
  private apiURL = environment.apiURL; // Base API URL from environment configuration

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
