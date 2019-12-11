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
import { reckon } from './Reckon'

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
      ledgers: reckon(balances, [])
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