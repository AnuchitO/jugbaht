import { Member, Record } from './store/expenses/types'

type Ledgers = { creditor: Member, amount: number, debtor: Member }[]

type Balance = {
  member: Member
  balance: number
  index: number
}

export const reckon = (balances: any, ledgers: Ledgers): any => {
  let max = balances.reduce((p: any, c: any, index: number) => (c.balance > p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })
  let min = balances.reduce((p: any, c: any, index: number) => (c.balance < p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })

  if (min.balance === 0 && max.balance === 0) {
    return ledgers
  }

  let diff = Math.min(max.balance, -min.balance)
  let reBalances = balances.map((b: Balance, index: number) => {
    if (index === max.index) {  // creditor
      // TODO: !!!!CRITICAL!!! :BUG: fix when no balance Max recursion exceed.
      return { member: b.member, index: b.index, balance: b.balance - diff }
    }

    if (index === min.index) { // debtor
      return { member: b.member, index: b.index, balance: b.balance + diff }
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


export const doBalances = (records: Record[], members: Member[]) => {
  const wallets = members.map((m: Member) => ({
    member: m,
    credit: records.reduce((prev, curr) => (curr.payer.id === m.id) ? curr.amount + prev : prev, 0.0),
    debt: records.reduce((prev, curr) => (curr.owes.some(o => o.id === m.id)) ? (curr.amount / curr.owes.length) + prev : prev, 0.0)
  }))

  return wallets.map(w => ({
    member: w.member,
    balance: w.credit - w.debt
  }))
}