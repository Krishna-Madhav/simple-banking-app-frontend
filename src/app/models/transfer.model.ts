// Data Transfer Object for transferring funds between accounts
export interface TransferDto {
  sourceAccountNumber: string;
  targetAccountNumber: string;
  transferAmount: number;
}
