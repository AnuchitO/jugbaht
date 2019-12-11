import { Member } from './store/expenses/types'

type Ledgers = { creditor: Member, amount: number, debtor: Member }[]

export const reckon = (balances: any, ledgers: Ledgers): any => {
  let max = balances.reduce((p: any, c: any, index: number) => (c.balance > p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })
  let min = balances.reduce((p: any, c: any, index: number) => (c.balance < p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })

  if (min.balance === 0 && max.balance === 0) {
    return ledgers
  }

  let diff = Math.min(max.balance, -min.balance)
  let reBalances = balances.map((b: any, index: number) => {
    if (index === max.index) {  // creditor
      // TODO: !!!!CRITICAL!!! :BUG: fix when no balance Max recursion exceed.
      return { ...b, balance: b.balance - diff }
    }

    if (index === min.index) { // debtor
      return { ...b, balance: b.balance + diff }
    }

    return b
  })

  ledgers.push({
    debtor: min.member,
    amount: diff,
    creditor: max.member
  })

  return reckon(reBalances, ledgers)
}