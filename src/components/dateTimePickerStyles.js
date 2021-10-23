import React from "react";
import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { themeColor } from "template/theme/variables";

const DatePickerStyle = styled.div`
  .MuiInput-root {
    margin-top: 0.7rem;
  }
  .MuiFormHelperText-root {
    margin-top: 3px;
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 8px) scale(0.8);
  }
  .MuiFormLabel-root,
  .MuiInputBase-root {
    font: ${({ theme }) => theme.fontAppearance.inputdefault};
  }
  .MuiInputBase-input {
    padding: 5px 0;
  }
  .MuiIconButton-root {
    padding: 0;
  }
  .MuiFormHelperText-root.Mui-error {
    font: ${({ theme }) => theme.fontAppearance.errormessage};
  }
  .MuiInputAdornment-positionEnd {
    color: ${(props) => props.theme.themeColor.grey};
    .MuiSvgIcon-root {
      font-size: 1rem;
    }
  }
  .MuiFilledInput-root {
    background-color: #fff !important;
    border-radius: ${({ shape }) => (shape === "rounded" ? "0.3rem" : "1rem")};
    .MuiInputBase-input {
      padding: 6px 15px;
    }
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
  .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"]
    .MuiAutocomplete-input {
    width: 100%;
    padding: 8px 15px;
  }
`;
const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: themeColor.primary,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: themeColor.primary,
        backgroundColor: themeColor.secondary,
      },
    },
    MuiPickersDay: {
      day: {
        color: themeColor.primary,
      },
      daySelected: {
        backgroundColor: themeColor.primary,
        "&:hover": {
          backgroundColor: themeColor.primaryLite,
        },
      },
      dayDisabled: {
        color: themeColor.primary,
      },
      current: {
        color: themeColor.primary,
      },
    },
    MuiButton: {
      textPrimary: {
        color: themeColor.primary,
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: themeColor.primary,
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: themeColor.primary,
      },
      thumb: {
        backgroundColor: themeColor.secondary,
        borderColor: themeColor.primary,
      },
      noPoint: {
        backgroundColor: themeColor.secondary,
      },
    },
  },
});

export const DateTimePickerWrapper = ({ children }) => {
  return (
    <DatePickerStyle>
      <ThemeProvider theme={materialTheme}>{children}</ThemeProvider>
    </DatePickerStyle>
  );
};

export default DateTimePickerWrapper;
