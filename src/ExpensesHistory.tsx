import React, { Fragment } from 'react'
import { Record } from './store/expenses/types'
import uuid from 'uuid/v4'
import {
  Box,
  List,
  ListItem,
  FormHelperText,
} from '@material-ui/core'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';


type Props = {
  records: Record[]
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
    text: {
    },
    paper: {
      paddingBottom: 50,
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
    subheader: {

    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }),
);


const ExpensesHistory: React.FC<Props> = ({ records }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <List className={classes.list}>
        <Fragment>
          {
            records.map((record: Record, index) => (
              <ListItem key={uuid()} className={classes.listItem} divider>
                {index === 0 && <ListSubheader className={classes.subheader}>History</ListSubheader>}
                {/*{index === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
                {index === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>} */}

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
              </ListItem>
            ))
          }
        </Fragment>
      </List>
    </Fragment >
  )
}

export default ExpensesHistory