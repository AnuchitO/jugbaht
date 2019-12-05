import React, { Component } from 'react'

type SummaryState = {
  transactions: { creditor: string, amount: number, debtor: string }[]
}
class Summary extends React.Component<{}, SummaryState> {
  constructor(props: any) {
    super(props)
    this.state = {
      transactions: [
        { creditor: 'AnuchitO', amount: 10, debtor: 'Kob' },
        { creditor: 'AnuchitO', amount: 10, debtor: 'Tom' },
        { creditor: 'AnuchitO', amount: 10, debtor: 'Offlane' },
      ]
    }
  }

  renderTransactions({ transactions }: SummaryState) {
    return <tbody>
      {
        transactions.map(t =>
          <tr>
            <td>{t.debtor}</td>
            <td>{t.amount}</td>
            <td>{t.creditor}</td>
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
          this.renderTransactions(this.state)
        }
      </table>
    </div>
  }
}

export default Summary