import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { AppState } from './store'
import { updateAmount, updateNote, updateMemberChecked } from './store/expenses/actions'
import { Member } from './store/expenses/types'

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

const members: React.FC<MembersProps> = (props) => (
  <Fragment>
    {
      props.members.map((member) =>
        <div key={member.id.toString()}>
          <input type="checkbox" id={member.id.toString()}
            name="members"
            checked={member.checked}
            onChange={(e) => { props.updateMemberChecked(member.id) }} />
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


type ExpenseState = {
  members: Member[]
  amount: number
  note: string
  notes: string[]
}

type Props = {
}

class Expenses extends React.Component<Props, ExpenseState> {
  constructor(props: any) {
    super(props)

    this.state = {
      members: [],
      amount: 0,
      note: "Food",
      notes: []
    }
  }

  save({ amount, members, note }: ExpenseState) {
    const record = {
      amount: amount,
      payer: "AnuchitO",
      owes: members.filter(m => m.checked).map(m => m.id),
      note: note
    }

    console.log(record)
    console.log(this.state.amount)
  }


  render() {
    return (
      <Fragment>
        <Amount />
        <Members />
        <Note />
        <button type="button" onClick={() => this.save(this.state)}>Save</button>
      </Fragment >
    )
  }
}

export default Expenses;