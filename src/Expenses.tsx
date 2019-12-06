import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { ExpenseState as ESS, updateAmount } from './store/reducers'

type AmountProps = {
  updateAmount: typeof updateAmount
}
const amount: React.FC<AmountProps> = (props) => (
  < input type="number" onChange={(e) => props.updateAmount(+e.target.value)} placeholder="0 bath" />
)

const Amount = connect((state: ESS) => ({}), { updateAmount })(amount)

export type Transaction = {
  payer: string;
  owes: string[];
  amount: number;
};

type Member = {
  checked: boolean
  id: number
  name: string
}

type ExpenseState = {
  members: Member[]
  amount: number
  note: string
  notes: string[]
}

type Props = {
  expenses: ESS
}

class Expenses extends React.Component<Props, ExpenseState> {
  constructor(props: any) {
    super(props)

    this.state = {
      members: [
        { checked: true, id: 1, name: "AnuchitO" },
        { checked: true, id: 2, name: "Kob" },
        { checked: true, id: 3, name: "Tom" },
        { checked: true, id: 4, name: "Offlane" }
      ],
      amount: 0,
      note: "Food",
      notes: [
        "Food",
        "Drink",
        "Snack",
        "Coffee",
        "Fuel"
      ]
    }
  }

  renderMembers({ members }: ExpenseState) {
    return members.map((member) =>
      <div key={member.id.toString()}>
        <input type="checkbox" id={member.id.toString()}
          name="members"
          checked={member.checked}
          onChange={(e) => this.setState({
            members: this.state.members.map(m => {
              if (m.id === member.id) {
                return { ...m, checked: !m.checked }
              }
              return m
            })
          })} />
        <label htmlFor="1">{member.name}</label>
      </div>)
  }

  renderNote({ notes }: ExpenseState) {
    return <div>
      <label htmlFor="note" >Note</label >
      <select name="note" id="note"
        value={this.state.note}
        onChange={(e) => this.setState({ note: e.target.value })}>
        {notes.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    </div>
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
    console.log(this.props.expenses)
  }


  render() {
    return (
      <Fragment>
        <Amount />


        {/* Members */}
        <Fragment>
          {
            this.renderMembers(this.state)
          }
        </Fragment >

        {/* Note */}
        <Fragment>
          {
            this.renderNote(this.state)
          }
        </Fragment>

        <button type="button" onClick={() => this.save(this.state)}>Save</button>
      </Fragment >
    )
  }
}

export default connect((state: ESS) => ({ expenses: state }))(Expenses);