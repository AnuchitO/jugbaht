import React, { Fragment } from 'react'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { AppState } from './store'
import { ExpenseState, Member } from './store/expenses/types'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableRow,
} from '@material-ui/core'

type Ledgers = { creditor: Member, amount: number, debtor: Member }[]
type SummaryState = {
  ledgers: Ledgers
}

type Props = {
  expenses: ExpenseState
}
class Summary extends React.Component<Props, SummaryState> {
  state = this.initialize()

  componentDidUpdate(prevProps: Props) {
    if (this.props.expenses.records.length !== prevProps.expenses.records.length) {
      this.setState(this.initialize())
    }
  }

  reckon(balances: any, ledgers: Ledgers): any {
    let max = balances.reduce((p: any, c: any, index: number) => (c.balance > p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })
    let min = balances.reduce((p: any, c: any, index: number) => (c.balance < p.balance) ? { ...c, index: index } : p, { index: 0, balance: 0 })

    if (min.balance === 0 && max.balance === 0) {
      // TODO: !!!!CRITICAL!!! :BUG: fix when no balance Max recursion exceed.
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
  renderTableBody({ ledgers }: SummaryState) {
    return (
      <TableBody>
        {ledgers.map(lg => (
          <TableRow key={uuid()}>
            <TableCell component="th" scope="row">
              {lg.debtor.name}
            </TableCell>
            <TableCell align="right">{lg.amount}</TableCell>
            <TableCell>{lg.creditor.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
  }

  render() {
    return <Fragment>
      <Paper>
        <Table aria-label="summary">
          <caption>Summary</caption>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="button">คุณ</Typography></TableCell>
              <TableCell><Typography variant="button">ต้องจ่าย</Typography></TableCell>
              <TableCell><Typography variant="button">ให้</Typography></TableCell>
            </TableRow>
          </TableHead>
          {
            this.renderTableBody(this.state)
          }
        </Table>
      </Paper>
    </Fragment>
  }
}

export default connect((state: AppState) => ({ expenses: state.expenses }), {})(Summary)