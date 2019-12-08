import React, { Fragment, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
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
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'

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
  const [newPayer, setNewPayer] = React.useState(props.payer)
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
      <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="payer-dialog-title">Choose payer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel htmlFor="note">Payer</InputLabel>
            <NativeSelect
              value={newPayer.id}
              onChange={(e) => {
                const payer = props.members.find(m => m.id.toString() === e.target.value) || newPayer
                setNewPayer(payer)
              }}
              inputProps={{
                name: 'new-payer',
                id: 'new-payer-id',
              }}
            >
              {
                props.members.map(m => <option key={'new-payer-' + m.name} value={m.id}>{m.name}</option>)
              }
            </NativeSelect>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => changePayer(newPayer)} color="primary">
            Change
          </Button>
        </DialogActions>
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
    _updateOwes(state)
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
        <FormGroup>
          {
            state.map((m: OwesMember) =>
              <FormControlLabel
                key={'member-' + m.id}
                control={<Checkbox checked={m.checked} onChange={handleChange(m)} />}
                label={m.name}
              />)
          }
        </FormGroup>
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
            <ExpensesHistory records={this.props.expenses.records} />
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
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