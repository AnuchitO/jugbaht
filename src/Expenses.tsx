import React, { Fragment, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  NativeSelect,
  TextField
} from '@material-ui/core'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import uuid from 'uuid/v4'
import ExpensesHistory from './ExpensesHistory'
import { connect } from 'react-redux'
import { AppState } from './store'
import { updateAmount, updateNote, addExpense, updateOwes } from './store/expenses/actions'
import { Member, ExpenseState } from './store/expenses/types'

type AmountProps = {
  updateAmount: typeof updateAmount
}
// TODO: change to number format : https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
const amount: React.FC<AmountProps> = (props) => (
  <TextField variant="outlined" required fullWidth
    label='Amount'
    type='number'
    onChange={(e) => props.updateAmount(+e.currentTarget.value)}
  >
  </TextField>
)

const Amount = connect((state: AppState) => ({}), { updateAmount })(amount)


type NoteProps = {
  notes: string[],
  note: string,
  updateNote: typeof updateNote
}
const note: React.FC<NoteProps> = (props) => (
  <Fragment>
    <label htmlFor="note" >Note</label >
    <select name="note" id="note"
      value={props.note}
      onChange={(e) => props.updateNote(e.target.value)}>
      {props.notes.map((n) => <option key={n} value={n}>{n}</option>)}
    </select>
  </Fragment>
)

const Note = connect(
  (state: AppState) => ({ notes: state.expenses.notes, note: state.expenses.note }),
  { updateNote })(note)


type Props = {
  expenses: ExpenseState
  addExpense: typeof addExpense
  updateOwes: typeof updateOwes
  updateNote: typeof updateNote
  history: any
}

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
  }),
);

type OwesMember = Member & {
  checked: boolean
}

type ExpensesFormProps = {
  updateOwes: typeof updateOwes
  updateNote: typeof updateNote
  members: Member[]
  notes: string[]
  note: string
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
      <FormControl component="fieldset" fullWidth className={classes.formControl}>
        <Amount />
      </FormControl>
      <FormControl component="fieldset" fullWidth className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
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
              members={this.props.expenses.members}
              updateNote={this.props.updateNote}
              note={this.props.expenses.note}
              notes={this.props.expenses.notes}
            />
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Note />
          </Grid>
          <Grid item xs={12}>
            <button type="button" onClick={() => this.save(this.props.expenses)}>Save</button>
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
    updateNote
  })(Expenses));