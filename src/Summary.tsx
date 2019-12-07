import React from 'react'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { AppState } from './store'
import { ExpenseState, Member } from './store/expenses/types'

type Ledgers = { creditor: Member, amount: number, debtor: Member }[]
type SummaryState = {
  ledgers: Ledgers
}

type Props = {
  expenses: ExpenseState
}
class Summary extends React.Component<Props, SummaryState> {
  state = this.initialize()

  reckon(balances: any, ledgers: Ledgers): any {
    let max = balances.reduce((p: any, c: any, index: number) => (c.balance > p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })
    let min = balances.reduce((p: any, c: any, index: number) => (c.balance < p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })

    if (min.balance === 0 && max.balance === 0) {
      return ledgers
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

    ledgers.push({
      debtor: min.member,
      amount: diff,
      creditor: max.member
    })

    return this.reckon(reBalances, ledgers)
  }

  initialize() {
    const { records, members } = this.props.expenses
    const wallets = members.map(m => ({
      member: m,
      credit: records.reduce((prev, curr) => (curr.payer.id === m.id) ? curr.amount + prev : prev, 0.0),
      debt: records.reduce((prev, curr) => (curr.owes.some(o => o.id === m.id)) ? (curr.amount / curr.owes.length) + prev : prev, 0.0)
    }))

    const balances = wallets.map(w => ({
      member: w.member,
      balance: w.credit - w.debt
    }))

    return {
      ledgers: this.reckon(balances, [])
    }
  }
  renderExpenses({ ledgers }: SummaryState) {
    return <tbody>
      {
        ledgers.map(t =>
          <tr key={uuid()}>
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
          <tr>
            <th>คุณ</th>
            <th>ต้องจ่าย</th>
            <th>ให้</th>
          </tr>
        </thead>
        {
          this.renderExpenses(this.state)
        }
      </table>
    </div>
  }
}

export default connect((state: AppState) => ({ expenses: state.expenses }), {})(Summary)