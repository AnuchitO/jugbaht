import React, { Fragment, useEffect, SyntheticEvent } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Avatar,
  Badge,
  Button,
  Box,
  Checkbox,
  Chip,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Snackbar,
} from '@material-ui/core'

import {
  MonetizationOnOutlined as MonetizationOnOutlinedIcon,
  Person as PersonIcon,
} from '@material-ui/icons'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { SnackbarContentWrapper } from './SnackbarContentWrapper'
import uuid from 'uuid/v4'
import ExpensesHistory from './ExpensesHistory'
import { connect } from 'react-redux'
import { AppState } from './store'
import { updateAmount, updateNote, addExpense, updateOwes, changePayer } from './store/expenses/actions'
import { Member, ExpenseState } from './store/expenses/types'

type AmountProps = {
  updateAmount: typeof updateAmount
}
// TODO: change to number format : https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
const amount: React.FC<AmountProps> = (props) => {
  const id = 'amount'
  const onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    props.updateAmount(+event.currentTarget.value)
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    hideKeyboard(event.keyCode)
  }

  const hideKeyboard = (keyCode: number) => {
    if (keyCode === 13) {
      const el: any = document.querySelector('#amount')
      el.blur()
    }
  }


  return (
    <TextField variant='outlined' required fullWidth
      id={id}
      label='Amount'
      type='number'
      onKeyUp={onKeyUp}
      onChange={onchange} />
  )
}


const Amount = connect((state: AppState) => ({}), { updateAmount })(amount)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      marginTop: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    payer: {

    },
  }),
);

const Payer: React.FC<PayerProps> = (props) => {
  const [open, setOpen] = React.useState(false)
  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const changePayer = (payer: Member) => {
    props.changePayer(payer)
    closeDialog()
  }

  return (
    <Fragment>
      <Badge badgeContent={'payer'} color='secondary'>
        <Chip
          id='bootstrap-input'
          size="medium"
          variant='outlined'
          avatar={<Avatar>{props.payer.name.slice(0, 2)}</Avatar>}
          label={props.payer.name}
          onClick={openDialog} />
      </Badge>
      {/* TODO: adjust width of dialog, its too small */}
      <Dialog onClose={closeDialog} aria-labelledby='simple-dialog-title' open={open}>
        <DialogTitle id='simple-dialog-title'>Choose Payer</DialogTitle>
        <List>
          {props.members.map(member => (
            <ListItem button
              autoFocus={member.id === props.payer.id} // TODO: add background for current payer
              onClick={() => changePayer(member)} key={'new-payer-option-' + member.id}>
              <ListItemAvatar>
                <Avatar >
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={member.name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Fragment>
  )
}

type Props = {
  expenses: ExpenseState
  addExpense: typeof addExpense
  updateOwes: typeof updateOwes
  updateNote: typeof updateNote
  changePayer: typeof changePayer
  history: any
}

type OwesMember = Member & {
  checked: boolean
}

type PayerProps = {
  members: Member[]
  payer: Member
  changePayer: typeof changePayer
}

type NoteProps = {
  notes: string[]
  note: string
  updateNote: typeof updateNote
}

type ExpensesFormProps = PayerProps & NoteProps & {
  updateOwes: typeof updateOwes
  members: Member[]
}

const ExpensesForm: React.FC<ExpensesFormProps> = (props) => {
  const classes = useStyles()

  const list: OwesMember[] = props.members.reduce((prev: any, curr: Member) => ([...prev, { ...curr, checked: true }]), [])
  const [state, setState] = React.useState(list);

  useEffect(() => {
    _updateOwes(state) // eslint-disable-next-line
  }, [state])

  const _updateOwes = (members: OwesMember[]) => {
    const owes = members.filter((m: OwesMember) => m.checked).map((m: OwesMember) => ({ id: m.id, name: m.name }))
    props.updateOwes(owes)
  }

  const handleChange = (member: OwesMember) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const checking = state.map((m: OwesMember) => ((m.id === member.id) ? { ...m, checked: !m.checked } : m))
    setState(checking);
  };

  return (
    <Fragment>
      <FormControl component='fieldset' className={classes.payer}>
        <Payer members={props.members} payer={props.payer} changePayer={props.changePayer} />
      </FormControl>
      <FormControl component='fieldset' fullWidth className={classes.formControl}>
        <Amount />
      </FormControl>
      <FormControl component='fieldset' fullWidth className={classes.formControl}>
        <FormLabel component='legend'>Paid for</FormLabel>
        <Grid container>
          {
            state.map((m: OwesMember) =>
              <Grid item xs={4} md={3} key={'member-' + m.id}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={m.checked} color="primary" onChange={handleChange(m)} />}
                    label={m.name}
                  />
                </FormGroup>
              </Grid>
            )
          }
        </Grid>

      </FormControl>
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel htmlFor='note'>Note</InputLabel>
        <NativeSelect
          value={props.note}
          onChange={(e) => props.updateNote(e.target.value)}
          inputProps={{
            name: 'note',
            id: 'note',
          }}
        >
          {
            props.notes.map(n => <option key={'note-' + n} value={n}>{n}</option>)
          }
        </NativeSelect>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
    </Fragment>
  )
}

const useExpensesStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // border: "2px solid red",
      flex: "1 1 auto",
    },
    first: {
      alignContent: "flex-start",
      display: "flex",
      flex: "1 1 auto",
      flexWrap: "wrap",
      height: '25vh',
      maxWidth: '100%',
      overflow: 'scroll',
    },
    second: {
      display: "flex",
      flex: "1 1 auto",
      flexWrap: "wrap",
      height: '50vh',
      overflow: 'scroll',
    },
    third: {
      alignContent: "flex-end",
      display: "flex",
      flex: "1 1 auto",
      flexWrap: "wrap",
    }
  })
);

const Expenses: React.FC<Props> = (props) => {
  const classes = useExpensesStyles()

  const [open, setOpen] = React.useState(false);

  const popupSnackbar = () => {
    setOpen(true);
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const save = ({ amount, owes, note, payer }: ExpenseState) => {
    if (amount === 0) {
      // TODO: form valiation before submit
      alert("please input amount")
      return
    }
    if (owes.length === 0) {
      // TODO: form valiation before submit
      alert("please select member who you paid for.")
      return
    }

    const record = {
      id: uuid(),
      amount,
      payer,
      owes,
      note
    }

    // TODO: BUG : first time open and save then try to go to /summary it broken. (open form a Line app)
    props.addExpense(record)
    popupSnackbar()
    // TODO: clear amount state after save
    // TODO: auto scroll history afte save
    // props.history.push('/summary')
  }

  return (
    <div className={classes.root}>
      <Box className={classes.first}
        // border="2px solid white"
        p={1} // padding
        m={1} // marginTop
      >
        {/* // bgcolor="background.paper" */}
        <ExpensesHistory records={props.expenses.records} />
      </Box>
      <Box
        className={classes.second}
        border="2px solid white"
        p={1}
        m={1}
        bgcolor="red.300"
      >
        {/* bgcolor="grey.300" */}
        <Box p={1} m={1} >
          {/* TODO: fix full screen desktop */}
          <ExpensesForm
            updateOwes={props.updateOwes}
            updateNote={props.updateNote}
            note={props.expenses.note}
            notes={props.expenses.notes}
            members={props.expenses.members}
            payer={props.expenses.payer}
            changePayer={props.changePayer}
          />
        </Box>
      </Box>
      <Box
        className={classes.third}
        // border="2px solid green"
        p={1}
        m={1}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          fullWidth
          startIcon={<MonetizationOnOutlinedIcon />}
          onClick={() => save(props.expenses)}>
          Save
          </Button>
      </Box>
      <Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <SnackbarContentWrapper
            onClose={handleClose}
            variant="success"
            message="success!"
          />
        </Snackbar>
      </Fragment>
    </div>
  )
}

export default withRouter(connect(
  (state: AppState) => ({ expenses: state.expenses }),
  {
    addExpense,
    updateOwes,
    updateNote,
    changePayer
  })(Expenses));