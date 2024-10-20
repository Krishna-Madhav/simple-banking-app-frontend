import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountListComponent } from './account-list.component';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Account } from '../../models/account.model';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

class MockAccountService {
  getAccounts() {
    return of([
      { accountNr: '12345', balance: 1000 },
      { accountNr: '67890', balance: 2000 },
    ]);
  }
  createAccount(account: Account) {
    return of(null);
  }
  deleteAccount(accountNr: string) {
    return of(null);
  }
}

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let accountService: AccountService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountListComponent, // Import the standalone component
        RouterTestingModule,
        FormsModule,
        CommonModule,
      ],
      providers: [{ provide: AccountService, useClass: MockAccountService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load accounts on init', () => {
    component.ngOnInit();
    expect(component.accounts.length).toBe(2);
  });

  it('should create account and hide the form', () => {
    const newAccount: Account = { accountNr: '11111', balance: 1500 };
    spyOn(window, 'alert'); // Spy on alert function
    component.onAccountCreated(newAccount);
    expect(window.alert).toHaveBeenCalledWith(
      `Account ${newAccount.accountNr} created successfully!`
    );
    expect(component.showCreateAccountForm).toBe(false);
  });

  it('should confirm account deletion', () => {
    const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
    const accountToDelete: Account = { accountNr: '12345', balance: 1000 };

    spyOn(component, 'deleteAccount').and.callThrough();
    component.confirmDelete(accountToDelete);

    expect(confirmSpy).toHaveBeenCalledWith(
      `Are you sure you want to delete the account: ${accountToDelete.accountNr}?`
    );
    expect(component.deleteAccount).toHaveBeenCalledWith(accountToDelete);
  });

  it('should navigate to account details', () => {
    const account: Account = { accountNr: '12345', balance: 1000 };
    const navigateSpy = spyOn(router, 'navigate');

    component.viewAccountDetails(account);
    expect(navigateSpy).toHaveBeenCalledWith(['/account-detail', account.accountNr]);
  });

  it('should hide the create account form', () => {
    component.onFormCancelled();
    expect(component.showCreateAccountForm).toBe(false);
  });
});
