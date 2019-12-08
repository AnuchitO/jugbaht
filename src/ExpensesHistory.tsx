import React, { Fragment } from 'react'
import { Record } from './store/expenses/types'
import uuid from 'uuid/v4'
import {
  Paper,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

type Props = {
  records: Record[]
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    // minWidth: 650,
  },
});


const ExpensesHistory: React.FC<Props> = ({ records }) => {
  const classes = useStyles()

  return (

    < Fragment >
      {
        // records.map(record => (
        //   <div key={record.id}>
        //     <h3>{record.amount}</h3>
        //     <div>
        //       {record.payer.name}
        //       paid for
        //       <div>
        //         {record.owes.map(o => o.name).join(",")}
        //       </div>
        //     </div>
        //   </div>
        // ))

        < Paper className={classes.root} >
          <Table stickyHeader className={classes.table} size="small" aria-label="history">
            <TableHead>
              <TableRow>
                <TableCell align="right">Payer</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Paid for</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map(record => (
                <TableRow key={uuid()}>
                  <TableCell component="th" scope="row">
                    {record.payer.name}
                  </TableCell>
                  <TableCell align="right">{record.amount}</TableCell>
                  <TableCell align="right"> {record.owes.map(o => o.name).join(",")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper >
      }
      <Button color='primary' >view</Button>
      {/* <FormControlLabel
        control={}
        label="Dense padding"
      /> */}
    </Fragment >
  )
}

export default ExpensesHistory