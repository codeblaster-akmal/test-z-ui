import React from "react";
import styled from "styled-components";
import { toTitleCase } from "utils/utilsFunc";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import CustomCheckbox from "./customCheckbox";
const Autocompletestyle = styled.div`
  .MuiFormLabel-root.Mui-focused {
    color: #395f7f !important;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.themeColor.primary};
  }
  .MuiInputLabel-formControl {
    transform: translate(0, 28px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 8px) scale(0.8);
  }
  .MuiFormLabel-root {
    font: ${({ theme }) => theme.fontAppearance.inputdefault};
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid #395f7f !important;
  }
  .MuiFormControl-root {
    width: 100%;
  }
  .MuiInputBase-input {
    padding: 6px 0px;
    font: ${({ theme }) => theme.fontAppearance.inputdefault};
  }
  .MuiFilledInput-root {
    background-color: #fff !important;
    border-radius: ${({ shape }) => (shape === "rounded" ? "0.3rem" : "1rem")};
    &:hover {
      background-color: #fff !important;
    }
  }
  .MuiFilledInput-input {
    font: ${({ theme }) => theme.fontAppearance.default};
  }
  .MuiFilledInput-underline:before,
  .MuiFilledInput-underline:after {
    border-bottom: none !important;
  }
  .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"] {
    padding-top: 0 !important;
    padding-left: 8px !important;
  }
  .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"]
    .MuiAutocomplete-input {
    width: 100%;
    padding: 6px 15px;
  }
  .MuiInput-root {
    margin-top: 0.7rem;
  }
  .MuiFormHelperText-root.Mui-error {
    font: ${({ theme }) => theme.fontAppearance.errormessage};
  }
  .MuiFormHelperText-root {
    margin-top: 3px;
  }
  .MuiSvgIcon-fontSizeSmall {
    font-size: 0.7rem;
  }
  .MuiAutocomplete-endAdornment {
    top: calc(50% - 12px);
  }
  .MuiAutocomplete-clearIndicator {
    padding: 1px;
  }
  .MuiIconButton-root,
  .PrivateSwitchBase-root-1,
  .MuiAutocomplete-popupIndicator {
    padding: 0;
  }
  .MuiIconButton-colorSecondary,
  .MuiCheckbox-colorPrimary.Mui-checked,
  .MuiCheckbox-colorSecondary.Mui-checked {
    color: ${({ theme }) => theme.themeColor.primary};
    &:hover {
      background-color: ${({ theme }) => theme.themeColor.secondary};
    }
  }
  .MuiAutocomplete-Popper {
    transform: translate3d(386px, 295px, 0);
  }
  .MuiAutocomplete-tag {
    display: none;
  }
  .option-image {
    margin: 0 1rem;
  }
`;

const OptionMenuList = styled.div`
  display: flex;
  align-items: center;
  font: ${({ theme }) => theme.fontAppearance.default};
`;

const ShowImage = (props) => {
  const { optionPic } = props;
  return (
    <img
      src={optionPic}
      alt="Img"
      className="option-image"
      width="5%"
      style={{ marginRight: 15 }}
    />
  );
};
const ShowCheckbox = (props) => {
  const { selected } = props;
  return (
    <CustomCheckbox
      size="small"
      checked={selected}
      style={{ marginRight: 2 }}
    />
  );
};

const AutocompleteInputs = ({
  style,
  label,
  shape,
  variant,
  optionPic,
  className,
  optionLabel,
  optionImage,
  optionCheck,
  placeholder,
  renderOption,
  error = false,
  helperText = false,
  ...props
}) => {
  return (
    <Autocompletestyle className={className} shape={shape}>
      <Autocomplete
        style={style}
        renderOption={(option, { selected }) => (
          <OptionMenuList>
            {optionCheck && <ShowCheckbox selected={selected} />}
            {optionImage && <ShowImage optionPic={option[optionPic]} />}
            {toTitleCase(option[optionLabel])}
          </OptionMenuList>
        )}
        getOptionLabel={(option) => option[optionLabel] || ""}
        {...props}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant={variant}
            error={error}
            helperText={helperText}
          />
        )}
      />
    </Autocompletestyle>
  );
};
export default AutocompleteInputs;
