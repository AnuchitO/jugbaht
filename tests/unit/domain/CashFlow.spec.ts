import { CashFlow } from '@/domain/CashFlow';
describe('Cal sample', () => {
  it('no one paid', () => {
    const accounts = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      ];

     const minCashFlow = CashFlow(accounts)

     expect(minCashFlow).toEqual([])
  })

  it('tree person', () => {
  const accounts = [
    [0, 10, 20],
    [0, 0,  0],
    [0, 0, 0],
    ];

   const minCashFlow = CashFlow(accounts)

   expect(minCashFlow).toEqual([
    { debtorIndex: 0, payAmount: 20, creditorIndex: 2 },
    { debtorIndex: 0, payAmount: 10, creditorIndex: 1 }
   ])
  })

  it('four person', () => {
  const accounts = [
    [0, 10, 0, 0],
    [0, 0, 10, 0],
    [0, 0, 0, 10],
    [11, 0, 0, 0]];

   const minCashFlow = CashFlow(accounts)

   expect(minCashFlow).toEqual([
    { debtorIndex: 3, payAmount: 1, creditorIndex: 0 }
   ])
  })
})
