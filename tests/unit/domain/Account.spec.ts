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
