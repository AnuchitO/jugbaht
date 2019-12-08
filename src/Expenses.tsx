import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Input, TextField } from '@material-ui/core'
import uuid from 'uuid/v4'
import ExpensesHistory from './ExpensesHistory'
import { connect } from 'react-redux'
import { AppState } from './store'
import { updateAmount, updateNote, updateMemberChecked, addExpense } from './store/expenses/actions'
import { Member, ExpenseState } from './store/expenses/types'

type AmountProps = {
  updateAmount: typeof updateAmount
}
// TODO: change to number format : https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
const amount: React.FC<AmountProps> = (props) => (
  <TextField variant="outlined" fullWidth label='Amount'>
    <Input type='number' onChange={(e) => props.updateAmount(+e.currentTarget.value)} />
  </TextField>
)

const Amount = connect((state: AppState) => ({}), { updateAmount })(amount)


type NoteProps = {
  notes: string[],
  note: string,
  updateNote: typeof updateNote
}
const note: React.FC<NoteProps> = (props) => (
  <Fragment>
    <label htmlFor="note" >Note</label >
    <select name="note" id="note"
      value={props.note}
      onChange={(e) => props.updateNote(e.target.value)}>
      {props.notes.map((n) => <option key={n} value={n}>{n}</option>)}
    </select>
  </Fragment>
)

const Note = connect(
  (state: AppState) => ({ notes: state.expenses.notes, note: state.expenses.note }),
  { updateNote })(note)


type MembersProps = {
  members: Member[],
  updateMemberChecked: typeof updateMemberChecked
}

// TODO: change to mobile picker like iPhone
const members: React.FC<MembersProps> = ({ members, updateMemberChecked }) => (
  <Fragment>
    <fieldset>
      <legend>My friends</legend>
      {
        members.map((member) =>
          <div key={member.id.toString()}>
            <input type="checkbox" id={member.id.toString()}
              name="members"
              checked={member.checked}
              onChange={(e) => { updateMemberChecked(member.id) }} />
            <label htmlFor="1">{member.name}</label>
          </div>)
      }
    </fieldset>
  </Fragment>
)

const Members = connect((state: AppState) => ({ members: state.expenses.members }), { updateMemberChecked })(members)

type Props = {
  expenses: ExpenseState
  addExpense: typeof addExpense
  history: any
}

class Expenses extends React.Component<Props, {}> {

  save({ amount, members, note, payer }: ExpenseState) {
    const record = {
      id: uuid(),
      amount: amount,
      payer: payer,
      owes: members.filter(m => m.checked),
      note: note
    }

    this.props.addExpense(record)
    this.props.history.push("/summary")
  }


  render() {
    return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ExpensesHistory records={this.props.expenses.records} />
          </Grid>
          <Grid item xs={12}>
            <Amount />
          </Grid>
          <Grid item xs={12}>
            <Members />
          </Grid>
          <Grid item xs={12}>
            <Note />
          </Grid>
          <Grid item xs={12}>
            <button type="button" onClick={() => this.save(this.props.expenses)}>Save</button>
          </Grid>
        </Grid>
      </Fragment >
    )
  }
}

export default withRouter(connect(
  (state: AppState) => ({ expenses: state.expenses }),
  {
    addExpense
  })(Expenses));