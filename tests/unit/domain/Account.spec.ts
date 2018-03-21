import { GenerateAccountTable, InitialAccountTable } from '@/domain/Account'

describe('Initialize Account Table', () => {
  describe('create two dimension array', () =>{
    it('from empty members', () =>{
      const members = []

      const accountTable = InitialAccountTable(members)

      expect(accountTable).toEqual([[0]])
    })

    it('from one members', () =>{
      const members = ['Nong']

      const accountTable = InitialAccountTable(members)

      expect(accountTable).toEqual([[0]])
    })

    it('from two members', () =>{
      const members = ['Nong', 'Kob']

      const accountTable = InitialAccountTable(members)

      expect(accountTable).toEqual([
        [0, 0],
        [0, 0]
      ])
    })

    it('should no have side effect when update value in account table', () => {
      const accountTable = InitialAccountTable(['Nong', 'Kob', 'Tom'])

      accountTable[0][0] += 1
      accountTable[1][1] += 2
      accountTable[2][2] += 3

      expect(accountTable).toEqual([
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 3]
      ])
    })
  })
})

describe.skip('Fill Account table', () => {
  it('create table from one account', () => {
    const transactions = [{ payer: 'Nong', owes: ['Nong'], amount: 5 }]

    const accountTable = GenerateAccountTable(transactions)

    expect(accountTable).toEqual([
      [5]
    ])
  })

  it('create table from two account', () => {
  const transactions = [
  { payer: 'Nong', owes: ['Nong', 'Kob'], amount: 10 }
  ]

    const accountTable = GenerateAccountTable(transactions)

    expect(accountTable).toEqual([
      [5]
    ])
  })
})
