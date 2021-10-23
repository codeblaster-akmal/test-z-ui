import { FormControl } from "@material-ui/core";
import React from "react";
import styled, { css } from "styled-components";

const RadioWrapper = styled.div`
  .MuiIconButton-colorSecondary {
    color: ${({ theme }) => theme.themeColor.primary};
    padding: 0rem;
    &:hover {
      background-color: ${({ theme }) => theme.themeColor.secondary};
    }
  }
  .MuiRadio-colorSecondary.Mui-checked {
    color: ${({ theme }) => theme.themeColor.primary};
    &:hover {
      background-color: ${({ theme }) => theme.themeColor.secondary};
    }
  }
  .MuiFormControlLabel-root {
    margin-left: -2px;
    column-gap: 0.3rem;
    &:last-child {
      margin-right: 0;
    }
  }
  .MuiFormGroup-root {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  ${({ gridColumn }) =>
    gridColumn &&
    css`
      display: flex;
      column-gap: 1.5rem;
      align-items: center;
      @media ${({ theme }) => theme.breakpoint.small}{
        display: block;
      }
    `}
  .MuiTypography-body1 {
    font: ${({ theme }) => theme.fontAppearance.defaultBold};
  }
  .radioLabel {
    font: ${({ theme }) => theme.fontAppearance.default};
  }
`;

const Radiobutton = ({ Title, children, gridColumn, className }) => {
  return (
    <RadioWrapper className={className} gridColumn={gridColumn}>
      <span className="radioLabel">{Title}</span>
      <FormControl component="fieldset">{children}</FormControl>
    </RadioWrapper>
  );
};

export default Radiobutton;
