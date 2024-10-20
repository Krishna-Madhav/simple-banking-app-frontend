import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountFormComponent } from './account-form.component';
import { Account } from '../../../models/account.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountFormComponent, FormsModule], // Ensure FormsModule is imported for ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges(); // Run initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit accountCreated event when form is valid and createAccount is called', () => {
    spyOn(component.accountCreated, 'emit'); // Spy on accountCreated event emitter

    // Set valid account details
    component.newAccount.accountNr = '9876543210';
    component.newAccount.balance = 500;

    component.createAccount();

    expect(component.accountCreated.emit).toHaveBeenCalledWith({
      accountNr: '9876543210',
      balance: 500,
      transactions: [],
    });
  });

  it('should reset the form after creating an account', () => {
    component.newAccount.accountNr = '9876543210';
    component.newAccount.balance = 500;

    component.createAccount(); // Call createAccount

    expect(component.newAccount.accountNr).toBe(''); // Form should be reset
    expect(component.newAccount.balance).toBe(0);
  });

  it('should alert the user if the account number is missing', () => {
    spyOn(window, 'alert');

    component.newAccount.accountNr = ''; // Simulate missing account number
    component.createAccount(); // Try to create account

    expect(window.alert).toHaveBeenCalledWith(
      "Please fill in required field: 'Account Number'"
    );
  });

  it('should emit formCancelled event when cancel is called', () => {
    spyOn(component.formCancelled, 'emit'); // Spy on formCancelled event emitter

    component.cancel(); // Call cancel

    expect(component.formCancelled.emit).toHaveBeenCalled();
  });

  it('should reset the form when cancel is called', () => {
    component.newAccount.accountNr = '123456789';
    component.newAccount.balance = 1000;

    component.cancel(); // Call cancel

    expect(component.newAccount.accountNr).toBe(''); // Ensure form is reset
    expect(component.newAccount.balance).toBe(0);
  });
});
