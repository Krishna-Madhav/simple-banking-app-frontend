import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountCardComponent } from '../../account-list/account-card/account-card.component';
import { Account } from '../../../models/account.model';
import { CurrencyPipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AccountCardComponent', () => {
  let component: AccountCardComponent;
  let fixture: ComponentFixture<AccountCardComponent>;
  let el: DebugElement;
  let mockAccount: Account;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCardComponent],
      providers: [CurrencyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    mockAccount = { accountNr: '1234567890', balance: 1000 };
    component.account = mockAccount;
    component.onView = jasmine.createSpy('onView');
    component.onDelete = jasmine.createSpy('onDelete');

    fixture.detectChanges(); // Run initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display account number and balance', () => {
    const title = el.query(By.css('.card-title')).nativeElement;
    const balance = el.query(By.css('.card-text')).nativeElement;

    expect(title.textContent).toContain(mockAccount.accountNr);
    expect(balance.textContent).toContain('€1,000.00'); // Assuming currency pipe works
  });

  it('should call onView when the "View" button is clicked', () => {
    const viewButton = el.query(By.css('.btn-primary')).nativeElement;
    viewButton.click();

    expect(component.onView).toHaveBeenCalledWith(mockAccount);
  });

  it('should call onDelete when the "Delete" button is clicked', () => {
    const deleteButton = el.query(By.css('.btn-danger')).nativeElement;
    deleteButton.click();

    expect(component.onDelete).toHaveBeenCalledWith(mockAccount);
  });
});
