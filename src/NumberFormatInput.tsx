import React from "react";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { updateAmount } from './store/expenses/actions'

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      inputMode="numeric"
      autoComplete='off'
      inputprops={{ pattern: "[0-9]*" }}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="฿"
    />
  );
}

interface Props {
  onKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => any
  updateAmount: typeof updateAmount
  amount: number | string
}


interface State {
  numberformat: string
}

export const FormattedInputs: React.FC<Props> = (props) => {
  const [values, setValues] = React.useState<State>({
    numberformat: ""
  });

  React.useEffect(() => {
    if (props.amount === "") {
      setValues({ ...values, numberformat: "" })
    }
  }, [props.amount])

  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setValues({
      ...values,
      [name]: value
    });
    props.updateAmount(+value)
  };

  return (
    <div>
      <FormControl fullWidth>
        <TextField
          label="amount"
          id="id-input-amount"
          value={values.numberformat}
          onChange={handleChange("numberformat")}
          onKeyUp={props.onKeyUp}
          InputProps={{
            inputComponent: NumberFormatCustom as any
          }}
        />
      </FormControl>
    </div>
  )
}
