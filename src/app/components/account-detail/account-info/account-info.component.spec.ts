import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountInfoComponent } from './account-info.component';
import { Account } from '../../../models/account.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AccountInfoComponent', () => {
  let component: AccountInfoComponent;
  let fixture: ComponentFixture<AccountInfoComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountInfoComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display account details correctly', () => {
    // Arrange
    const mockAccount: Account = {
      accountNr: '1234567890',
      balance: 1000,
    };

    component.account = mockAccount;

    // Act
    fixture.detectChanges();

    // Assert
    const accountNrElement = el.query(By.css('.account-number-highlight')).nativeElement;
    const balanceElement = el.query(By.css('.balance-success')).nativeElement;

    expect(accountNrElement.textContent).toContain(mockAccount.accountNr);
    expect(balanceElement.textContent).toContain('$1,000.00'); // Assuming currency pipe formats correctly
  });

  it('should handle account input with balance zero', () => {
    // Arrange
    const mockAccount: Account = {
      accountNr: '9876543210',
      balance: 0,
    };

    component.account = mockAccount;

    // Act
    fixture.detectChanges();

    // Assert
    const accountNrElement = el.query(By.css('.account-number-highlight')).nativeElement;
    const balanceElement = el.query(By.css('.balance-success')).nativeElement;

    expect(accountNrElement.textContent).toContain(mockAccount.accountNr);
    expect(balanceElement.textContent).toContain('$0.00'); // Handling zero balance
  });
});
