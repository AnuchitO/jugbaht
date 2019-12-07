import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { AppState } from './store'
import { updateAmount, updateNote, updateMemberChecked, addExpense } from './store/expenses/actions'
import { Member, ExpenseState } from './store/expenses/types'

type AmountProps = {
  updateAmount: typeof updateAmount
}
const amount: React.FC<AmountProps> = (props) => (
  < input type="number" onChange={(e) => props.updateAmount(+e.target.value)} placeholder="0 bath" />
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

const members: React.FC<MembersProps> = ({ members, updateMemberChecked }) => (
  <Fragment>
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
  </Fragment>
)

const Members = connect((state: AppState) => ({ members: state.expenses.members }), { updateMemberChecked })(members)

export type Transaction = {
  payer: string;
  owes: string[];
  amount: number;
};

type Props = {
  expenses: ExpenseState
  addExpense: typeof addExpense
}

class Expenses extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props)
  }

  save({ amount, members, note, payer }: ExpenseState) {
    const record = {
      id: 0,
      amount: amount,
      payer: payer,
      owes: members.filter(m => m.checked).map(m => m.id),
      note: note
    }

    this.props.addExpense(record)
  }


  render() {
    return (
      <Fragment>
        <Amount />
        <Members />
        <Note />
        <button type="button" onClick={() => this.save(this.props.expenses)}>Save</button>
      </Fragment >
    )
  }
}

export default connect((state: AppState) => ({ expenses: state.expenses }), {
  addExpense
})(Expenses);