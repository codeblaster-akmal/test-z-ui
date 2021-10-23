import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const Inputstyle = styled.div`
  .MuiFormLabel-root.Mui-focused {
    color: #395f7f !important;
  }
  .MuiInputBase-input {
    padding: 6px 0px;
    font: ${({ theme }) => theme.fontAppearance.inputtext};
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 8px) scale(0.8);
  }
  .MuiFilledInput-input {
    padding: 6px 15px;
    font: 500 0.640 "Montserrat";
  }
  .MuiOutlinedInput-inputAdornedEnd {
    font: ${({ theme }) => theme.fontAppearance.default};
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid #395f7f !important;
  }
  .MuiFormControl-root {
    width: 100%;
  }
  .MuiFormLabel-root {
    font: ${({ theme }) => theme.fontAppearance.inputtext};
  }
  .MuiFilledInput-root:hover {
    background-color: #fff !important;
  }
  .MuiFilledInput-root {
    background-color: #fff !important;
    border-radius: 1rem;
  }
  .MuiFilledInput-underline {
    border-bottom: none !important;
    &:before,
    &:after {
      border-bottom: none !important;
    }
  }
  .MuiInputAdornment-positionEnd {
    color: ${(props) => props.theme.themeColor.grey};
    .MuiSvgIcon-root {
      font-size: 1rem;
    }
  }
  .MuiFormHelperText-root.Mui-error {
    font: ${({ theme }) => theme.fontAppearance.errormessage};
  }
  .MuiFormHelperText-root {
    margin-top: 3px;
  }
  label + .MuiInput-formControl {
    margin-top: 0.8rem;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.themeColor.primary};
  }
`;

const TextFieldInputs = ({
  variant,
  className,
  InputProps = "",
  readOnly = false,
  ...props
}) => {
  return (
    <Inputstyle className={className}>
      <TextField
        variant={variant}
        fullWidth
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{InputProps}</InputAdornment>
          ),
          readOnly,
        }}
        {...props}
      />
    </Inputstyle>
  );
};

export default TextFieldInputs;
