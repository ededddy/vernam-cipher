import React from "react";
import { Wrapper } from "./CustomForm.styles";
import { TextField } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

type Props = {
  formType: string;
  plainTextValue: string;
  cipherKeyValues: string;
  errorFlag: boolean;
  plainTextOnChange: (value: string) => void;
  cipherKeyOnChange: (value: string) => void;
};

const CustomForm: React.FC<Props> = ({
  formType,
  plainTextValue,
  cipherKeyValues,
  errorFlag,
  plainTextOnChange,
  cipherKeyOnChange,
}) => {
  return (
    <Wrapper>
      <h3>{formType}</h3>
      <TextField
        type="text"
        multiline
        rows={6}
        fullWidth
        error={errorFlag}
        value={plainTextValue}
        onChange={(e) => plainTextOnChange(e.target.value)}
        label={
          formType === "Encrypt"
            ? "Plain Text (No Spaces)"
            : "Cipher Text (No separation)"
        }
        variant="outlined"
      />
      <TextField
        type="text"
        multiline
        fullWidth
        error={errorFlag}
        value={cipherKeyValues}
        onChange={(e) => cipherKeyOnChange(e.target.value)}
        label="Cipher Key"
        margin="normal"
        placeholder="Left empty for random key"
        variant="outlined"
      />
      {errorFlag ? (
        <MuiAlert elevation={6} variant="filled" severity="error">
          Check your input.
          <br />
          <ul>
            <li>No separation between words.</li>
            <li>
              Number of characters should <strong>EQUAL</strong> to number of
              cipher key, or you can left empty for random key
            </li>
            <li>
              <strong>NO</strong> special characters like !,@,#,$,%,^,&,*,(,)
            </li>
          </ul>
        </MuiAlert>
      ) : null}
    </Wrapper>
  );
};

export default CustomForm;
