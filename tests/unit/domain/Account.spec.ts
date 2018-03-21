import { GenerateAccountTable, InitialAccountTable } from '@/domain/Account';

describe('Initialize Account Table', () => {
  describe('create two dimension array', () => {
    it('from empty members', () => {
      const members: any[] = [];

      const accountTable = InitialAccountTable(members);

      expect(accountTable).toEqual([[0]]);
    });

    it('from one members', () => {
      const members = ['Nong'];

      const accountTable = InitialAccountTable(members);

      expect(accountTable).toEqual([[0]]);
    });

    it('from two members', () => {
      const members = ['Nong', 'Kob'];

      const accountTable = InitialAccountTable(members);

      expect(accountTable).toEqual([
        [0, 0],
        [0, 0],
      ]);
    });

    it('should no have side effect when update value in account table', () => {
      const accountTable = InitialAccountTable(['Nong', 'Kob', 'Tom']);

      accountTable[0][0] += 1;
      accountTable[1][1] += 2;
      accountTable[2][2] += 3;

      expect(accountTable).toEqual([
        [1, 0, 0],
        [0, 2, 0],
        [0, 0, 3],
      ]);
    });
  });
});

describe('Fill shared cost Account table', () => {
  it('generate table from one account', () => {
    const accountIndex = { Nong: 0 };
    const owes = ['Nong'];
    const accountTable = InitialAccountTable(owes);
    const transactions = [{ payer: 'Nong', owes, amount: 5 }];

    const result = GenerateAccountTable(transactions, accountTable, accountIndex);

    expect(result).toEqual([
      [0],
    ]);
  });

  it('generate table from two account', () => {
    const accountIndex = {
      Nong: 0,
      Kob: 1,
    };
    const owes = ['Nong', 'Kob'];
    const accountTable = InitialAccountTable(owes);
    const transactions = [
      { payer: 'Nong', owes, amount: 10 },
    ];

    const result = GenerateAccountTable(transactions, accountTable, accountIndex);

    expect(result).toEqual([
      [0, 0],
      [5, 0],
    ]);
  });

  it('generate table from three account', () => {
    const accountIndex = {
      Nong: 0,
      Kob: 1,
      Tom: 2,
    };
    const owes = ['Nong', 'Kob', 'Tom'];
    const accountTable = InitialAccountTable(owes);
    const transactions = [
      { payer: 'Tom', owes, amount: 30 },
    ];

    const result = GenerateAccountTable(transactions, accountTable, accountIndex);

    expect(result).toEqual([
      [0, 0, 10],
      [0, 0, 10],
      [0, 0, 0],
    ]);
  });

  it('generate by accumulate table from three account', () => {
    const accountIndex = {
      Nong: 0,
      Kob: 1,
      Tom: 2,
    };
    const accountTable = [
      [0, 1, 2],
      [3, 0, 5],
      [6, 7, 0],
    ];
    const owes = ['Nong', 'Kob', 'Tom'];
    const transactions = [
      { payer: 'Tom', owes, amount: 3 },
      { payer: 'Kob', owes, amount: 3 },
      { payer: 'Nong', owes, amount: 3 },
    ];

    const result = GenerateAccountTable(transactions, accountTable, accountIndex);

    expect(result).toEqual([
      [0, 2, 3],
      [4, 0, 6],
      [7, 8, 0],
    ]);
  });
});
