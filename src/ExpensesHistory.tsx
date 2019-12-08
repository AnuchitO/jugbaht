import React, { Fragment } from 'react'
import { Record } from './store/expenses/types'
import uuid from 'uuid/v4'
import {
  Avatar,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
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
      marginBottom: theme.spacing(1),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
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
      <Paper square>
        <Typography variant="h6" gutterBottom>
          History
        </Typography>
        <List className={classes.list}>
          <Fragment>
            {/* {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
              {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>} */}
            <ListItem>
              <Grid container>
                <Grid item xs={12}>
                  {
                    records.map((record: Record) => (
                      <Grid container justify="center" spacing={1} key={uuid()}>
                        <Grid item xs={1} className={classes.center}>
                          <FastfoodOutlinedIcon />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="button">
                            {record.payer.name}
                          </Typography>
                          <FormHelperText className={classes.description}>
                            paid for : {record.owes.map(o => o.name).join(",")}
                          </FormHelperText>
                          <Typography variant="caption">
                            {record.note}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} className={classes.center}>
                          <Typography className={classes.amount} variant="h6" gutterBottom>
                            ฿{record.amount}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
            </ListItem>
            <Divider variant="middle" />
          </Fragment>
        </List>
      </Paper>
    </Fragment>
  )
}

export default ExpensesHistory