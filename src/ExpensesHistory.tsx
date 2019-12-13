import React, { Fragment } from 'react'
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { Record } from './store/expenses/types'
import uuid from 'uuid/v4'
import {
  Box,
  ListItem,
  FormHelperText,
  IconButton,
} from '@material-ui/core'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import { Delete as DeleteIcon } from '@material-ui/icons'
import { deleteExpense } from './store/expenses/actions'



type Props = {
  records: Record[]
  deleteExpense: typeof deleteExpense
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    amount: {
      color: `rgb(102, 103, 100, 1)`,
      fontWeight: 900,
    },
    description: {
      margin: 0,
    },
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      width: '100%',
    },
    listItem: {
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      padding: 0,
    },
    item: {
      padding: 0,
      flexShrink: 0,
      paddingBottom: '2px',
      display: 'flex',
      width: '100%',
    },
    ul: {
      padding: 0,
    },
    noRecord: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: '100%',
      height: '100%',
    }
  }),
);

const ExpensesHistory: React.FC<Props> = (props) => {
  const classes = useStyles();
  const records = props.records

  const deleteRecord = (record: Record) => {
    console.log(`delete ${record}`)
    props.deleteExpense(record)
  }

  return (records.filter(r => !r.makeAsDelete).length === 0) ?
    <Box p={1} className={classes.noRecord}>
      <Typography variant="button">NO RECORD</Typography>
    </Box>
    : (
      <Fragment>
        <SwipeableList>
          {
            records.map((record: Record, index) => (
              <SwipeableListItem
                key={uuid()}
                swipeLeft={{
                  content: <IconButton color="secondary" edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>,
                  action: () => deleteRecord(record)
                }}
                swipeRight={{
                  content: <IconButton color="secondary" edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>,
                  action: () => deleteRecord(record)
                }}
              >
                {!record.makeAsDelete && <ListItem className={classes.listItem} divider>
                  <Box display="flex" p={1} className={classes.item}>
                    <Box p={1} flexGrow={1} className={classes.center}><FastfoodOutlinedIcon /></Box>
                    <Box p={1} flexGrow={5}>
                      <Typography variant="button">
                        {record.payer.name}
                      </Typography>
                      <FormHelperText className={classes.description}>
                        paid for : {record.owes.map(o => o.name).join(",")}
                      </FormHelperText>
                      <Typography variant="caption">
                        {record.note}
                      </Typography>
                    </Box>
                    <Box p={1} flexGrow={1} className={classes.center}>
                      <Typography className={classes.amount} variant="h6" gutterBottom>
                        ฿{record.amount}
                      </Typography></Box>
                  </Box>
                </ListItem>}
              </SwipeableListItem>
            ))
          }
          <SwipeableListItem>
            <ListItem className={classes.listItem} id="id-last-history-item-dummy"></ListItem>
          </SwipeableListItem>
        </SwipeableList>
      </Fragment>
    )
}

export default ExpensesHistory