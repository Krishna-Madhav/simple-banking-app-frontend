export const AppConstants = {
  API_METHOD: {
    ACCOUNTS: 'accounts',
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
    TRANSACTIONS: 'transactions',
    TRANSFER: 'transfer',
  },
  MESSAGES: {
    INVALID_DEPOSIT_AMOUNT:
      'Transaction cancelled! Deposit amount must be a positive value.',
    INVALID_WITHDRAWAL_AMOUNT:
      'Transaction cancelled! Withdrawal amount must be a positive value.',
    EXCEEDS_BALANCE_WITHDRAWAL:
      'Transaction cancelled! Withdrawal amount exceeds current balance.',
    INVALID_TRANSFER_AMOUNT: 'Transfer amount should be a positive value.',
    NO_TARGET_ACCOUNT: 'Please select a target account.',
    EXCEEDS_BALANCE_TRANSFER:
      'Transaction cancelled! Your transfer amount exceeds the current balance.',
    GENERAL_DEPOSIT_ERROR: 'An error occurred while depositing.',
    GENERAL_WITHDRAWAL_ERROR: 'An error occurred while withdrawing.',
    GENERAL_TRANSFER_ERROR: 'An error occurred while transferring.',
    MISSING_ACCOUNT_AND_AMOUNT:
      'Please select a target account and enter a valid transfer amount.',
    MISSING_TARGET_ACCOUNT: 'Please select a target account.',
  },
};
