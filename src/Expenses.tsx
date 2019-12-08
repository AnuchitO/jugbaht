import React, { Fragment, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogTitle,
  Divider,
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
  TextField
} from '@material-ui/core'

import {
  MonetizationOnOutlined as MonetizationOnOutlinedIcon,
  Person as PersonIcon,
} from '@material-ui/icons'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
// TODO: close keyboard when hit enter
const amount: React.FC<AmountProps> = (props) => (
  <TextField variant="outlined" required fullWidth
    label='Amount'
    type='number'
    onChange={(e) => props.updateAmount(+e.currentTarget.value)} />
)

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
      <Badge badgeContent={'payer'} color="primary">
        <Chip
          id="bootstrap-input"
          variant="outlined"
          avatar={<Avatar>{props.payer.name.slice(0, 2)}</Avatar>}
          label={props.payer.name}
          onClick={openDialog} />
      </Badge>
      {/* TODO: adjust width of dialog, its too small */}
      <Dialog onClose={closeDialog} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Choose Payer</DialogTitle>
        <List>
          {props.members.map(member => (
            <ListItem button
              autoFocus={member.id === props.payer.id} // TODO: add background for current payer
              onClick={() => changePayer(member)} key={"new-payer-option-" + member.id}>
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
      <FormControl component="fieldset" className={classes.payer}>
        <Payer members={props.members} payer={props.payer} changePayer={props.changePayer} />
      </FormControl>
      <FormControl component="fieldset" fullWidth className={classes.formControl}>
        <Amount />
      </FormControl>
      <FormControl component="fieldset" fullWidth className={classes.formControl}>
        <FormLabel component="legend">Paid for</FormLabel>
        <Grid container spacing={2}>
          {
            state.map((m: OwesMember) =>
              <Grid item xs={4} md={3} key={'member-' + m.id}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={m.checked} onChange={handleChange(m)} />}
                    label={m.name}
                  />
                </FormGroup>
              </Grid>
            )
          }
        </Grid>

      </FormControl>
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel htmlFor="note">Note</InputLabel>
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
class Expenses extends React.Component<Props, {}> {

  save({ amount, owes, note, payer }: ExpenseState) {
    const record = {
      id: uuid(),
      amount,
      payer,
      owes,
      note
    }

    // TODO: add snackbar after success: https://material-ui.com/components/snackbars/#customized-snackbars
    this.props.addExpense(record)
    // this.props.history.push("/summary")
  }

  render() {
    return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* TODO: hide top one when overflow */}
            <ExpensesHistory records={this.props.expenses.records} />
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
          {/* TODO: fix position of expense history and expense form */}
          <Grid item xs={12}>
            <ExpensesForm
              updateOwes={this.props.updateOwes}
              updateNote={this.props.updateNote}
              note={this.props.expenses.note}
              notes={this.props.expenses.notes}
              members={this.props.expenses.members}
              payer={this.props.expenses.payer}
              changePayer={this.props.changePayer}
            />
          </Grid>
          <Grid item xs={12} >
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              startIcon={<MonetizationOnOutlinedIcon />}
              onClick={() => this.save(this.props.expenses)}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Fragment >
    )
  }
}

export default withRouter(connect(
  (state: AppState) => ({ expenses: state.expenses }),
  {
    addExpense,
    updateOwes,
    updateNote,
    changePayer
  })(Expenses));