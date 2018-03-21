import { Transaction, AccountTable, AccountIndex } from '@/domain/Types';

export const GenerateAccountTable = (transactions: Transaction[], accountTable: AccountTable, accountIndex: AccountIndex): AccountTable => {
  transactions.forEach((trans) => {
    const shared = trans.amount / trans.owes.length;
    const payerIndex = accountIndex[trans.payer];
    trans.owes.forEach((owe) => {
      const oweIndex = accountIndex[owe];
      if (owe !== trans.payer) {
        accountTable[oweIndex][payerIndex] += shared;
      }
    });
  });
  return accountTable;
};

export const InitialAccountTable = (members: string[]): AccountTable => {
  if (members.length <= 1) {
    return [[0]];
  }

  const accountTable = [];
  for (let i = 0; i < members.length; i++) {
    const x = [];
    for (let j = 0; j < members.length; j++) {
      x.push(0);
    }
    accountTable.push(x);
  }

  return accountTable;
};
