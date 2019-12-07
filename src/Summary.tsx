import React from 'react'
import { connect } from 'react-redux'
import { AppState } from './store'
import { ExpenseState, Member } from './store/expenses/types'

type SummaryState = {
  expenses: { creditor: Member, amount: number, debtor: Member }[]
}

type Props = {
  expenses: ExpenseState
}
class Summary extends React.Component<Props, SummaryState> {
  state = this.initialize()

  constructor(props: Props) {
    super(props)
  }

  reckon(balances: any, expenses: any): any {
    let max = balances.reduce((p: any, c: any, index: any) => (c.balance > p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })
    console.log("max:", max)
    let min = balances.reduce((p: any, c: any, index: any) => (c.balance < p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })
    console.log("min:", min)

    if (min.balance === 0 && max.balance === 0) {
      return expenses
    }

    let diff = Math.min(max.balance, -min.balance)
    let reBalances = balances.map((b: any, index: number) => {
      if (index === max.index) {  // creditor
        return { ...b, balance: b.balance - diff }
      }

      if (index === min.index) { // debtor
        return { ...b, balance: b.balance + diff }
      }

      return b
    })

    expenses.push({
      debtor: min.member,
      amount: diff,
      creditor: max.member
    })

    return this.reckon(reBalances, expenses)
  }

  initialize() {
    const { records, members } = this.props.expenses
    const wallets = members.map(m => ({
      member: m,
      credit: records.reduce((prev, curr) => {
        if (curr.payer.id === m.id) {
          return curr.amount + prev
        }

        return prev
      }, 0.0),
      debt: records.reduce((prev, curr) => {
        if (curr.owes.some(o => o.id === m.id)) {
          return (curr.amount / curr.owes.length) + prev
        }
        return prev
      }, 0.0)
    }))

    console.log("wallets")
    console.log(wallets)

    const balances = wallets.map(w => ({
      member: w.member,
      balance: w.credit - w.debt
    }))

    return {
      expenses: this.reckon(balances, [])
    }
  }
  renderExpenses({ expenses }: SummaryState) {
    return <tbody>
      {
        expenses.map(t =>
          <tr>
            <td>{t.debtor.name}</td>
            <td>{t.amount}</td>
            <td>{t.creditor.name}</td>
          </tr>
        )
      }
    </tbody>
  }

  render() {
    return <div>
      <table>
        <caption>Summary</caption>
        <thead>
          <th>คุณ</th>
          <th>ต้องจ่าย</th>
          <th>ให้</th>
        </thead>
        {
          this.renderExpenses(this.state)
        }
      </table>
    </div>
  }
}

export default connect((state: AppState) => ({ expenses: state.expenses }), {})(Summary)