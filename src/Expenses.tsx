import React, { useState, Fragment } from 'react'


export type Transaction = {
  payer: string;
  owes: string[];
  amount: number;
};


class Expenses extends React.Component {
  constructor(props: any) {
    super(props)

    this.state = {
      payer: "",
      owes: [],
      amount: 0
    }
  }

  render() {
    return (
      <Fragment>
        {/* Amount */}
        < input type="number" onChange={(e) => this.setState({ amount: e.target.value })} placeholder="0 bath" />

        {/* Members */}
        < div >
          <div>
            <input type="checkbox" id="1" name="members" onChange={(e) => console.log(e.target.value)} checked />
            <label htmlFor="1">AnuchitO</label>
          </div>
          <div>
            <input type="checkbox" id="2" name="members" onChange={(e) => console.log(e.target.value)} checked />
            <label htmlFor="2">Kob</label>
          </div>
          <div>
            <input type="checkbox" id="3" name="members" onChange={(e) => console.log(e.target.value)} checked />
            <label htmlFor="3">Tom</label>
          </div>
          <div>
            <input type="checkbox" id="4" name="members" onChange={(e) => console.log(e.target.value)} checked />
            <label htmlFor="4">offlane</label>
          </div>
        </div >

        {/* Note */}
        < label htmlFor="note" > Note</label >
        <select name="note" id="note" >
          <option value="food">Food</option>
          <option value="drink">Drink</option>
          <option value="fuel">Fuel</option>
          <option value="snack">Snack</option>
        </select>

        <button type="button" onClick={() => console.log(this.state)}>Save</button>

      </Fragment >
    )
  }
}

export default Expenses;