import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetailComponent } from './account-detail.component';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Account } from '../../models/account.model';
import { TransferDto } from '../../models/transfer.model';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountInfoComponent } from './account-info/account-info.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AccountActionsComponent } from './account-actions/account-actions.component';

class MockAccountService {
  getAccountByNumber(accountNr: string) {
    return of({ accountNr, balance: 1500, transactions: [] });
  }
  getTransactionsByAccountNumber(accountNr: string) {
    return of([]); // No transactions for simplicity
  }
  getAccounts() {
    return of([
      { accountNr: '12345', balance: 1000 },
      { accountNr: '67890', balance: 2000 },
    ]);
  }
}

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;
  let accountService: AccountService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountDetailComponent, // Import the standalone component
        RouterTestingModule,
        CommonModule,
        FormsModule,
      ],
      providers: [
        { provide: AccountService, useClass: MockAccountService },
        { provide: ActivatedRoute, useValue: { params: of({ id: '12345' }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load account details on init', () => {
    component.ngOnInit();
    expect(component.account.accountNr).toBe('12345');
    expect(component.isLoadingAccountDetails).toBe(false);
  });

  it('should handle error when loading account details', () => {
    spyOn(accountService, 'getAccountByNumber').and.returnValue(
      throwError('Error loading account')
    );
    component.ngOnInit();
    expect(component.isLoadingAccountDetails).toBe(false);
  });

  it('should load all accounts for transfer', () => {
    component.ngOnInit();
    // Only one account should be returned
    expect(component.accounts.length).toBe(1);
  });

  it('should navigate to account list', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToAccountList();
    expect(navigateSpy).toHaveBeenCalledWith(['/accounts']);
  });

  it('should refresh account details', () => {
    spyOn(component, 'loadAccountDetails').and.callThrough();
    component.refreshAccountDetails();
    expect(component.loadAccountDetails).toHaveBeenCalledWith(
      component.account.accountNr
    );
  });
});
