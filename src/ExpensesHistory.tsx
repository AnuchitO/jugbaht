import React, { Fragment } from 'react'
import { Record } from './store/expenses/types'

type Props = {
  records: Record[]
}

const ExpensesHistory: React.FC<Props> = ({ records }) => (
  <Fragment>
    {
      records.map(record => (
        <div key={record.id}>
          <h3>{record.amount}</h3>
          <div>
            {record.payer.name}
            paid for
            <div>
              {record.owes.map(o => o.name).join(",")}
            </div>
          </div>
        </div>
      ))
    }
  </Fragment>
)

export default ExpensesHistory