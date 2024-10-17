import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { TransferDto } from '../models/transfer.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiURL = 'http://localhost:8080/accounts';

  constructor(private http: HttpClient) {}

  // Fetch all accounts
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiURL);
  }

  // Fetch account by account number
  getAccountByNumber(accountNumber: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiURL}/${accountNumber}`);
  }

  // Create account
  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiURL, account);
  }

  // Deposit money
  deposit(accountNumber: string, amount: number): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/${accountNumber}/deposit`, null, {
      params: { amount },
    });
  }

  // Withdraw money
  withdraw(accountNumber: string, amount: number): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/${accountNumber}/withdraw`, null, {
      params: { amount },
    });
  }

  // Transfer money
  transfer(transferDTO: TransferDto): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/transfer`, transferDTO);
  }

  // Fetch transactions for a specific account
  getTransactionsByAccountNumber(accountNumber: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiURL}/${accountNumber}/transactions`);
  }

  // Delete account by account number
  deleteAccount(accountNumber: string): Observable<void> {
    // Changed from Account to string
    return this.http.delete<void>(`${this.apiURL}/${accountNumber}`);
  }
}
