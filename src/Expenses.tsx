import React, { useState, Fragment } from 'react'


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
  notes: { selected: boolean, name: string }[]
}

class Expenses extends React.Component<{}, ExpenseState> {
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
        { selected: false, name: "Food" },
        { selected: false, name: "Drink" },
        { selected: false, name: "Snack" },
        { selected: false, name: "Coffee" },
        { selected: false, name: "Fuel" }
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
        {notes.map((n) => <option key={n.name} value={n.name}>{n.name}</option>)}
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
  }

  render() {
    return (
      <Fragment>
        {/* Amount */}
        < input type="number" onChange={(e) => this.setState({ amount: +e.target.value })} placeholder="0 bath" />

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

export default Expenses;