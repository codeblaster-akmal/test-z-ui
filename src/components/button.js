import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { Button as Matbutton } from "@material-ui/core";

const ButtonWrapper = styled.div`
  .MuiButton-root:hover {
    background-color: ${({ theme }) => theme.themeColor.primary};
  }
  .button {
    color: #ffffff;
    min-width: 5.6rem;
    border-radius: 1.5rem;
    padding: 0.6rem 1.2rem;
    text-transform: capitalize;
    font: ${({ theme }) => theme.fontAppearance.tableheader};
    background-color: ${({ theme }) => theme.themeColor.primary};
  }
  .Mui-disabled {
    background-color: lightgray;
    color: #707070;
  }
  .MuiButton-outlined,
  .MuiButton-outlinedSizeSmall {
    padding: 0.2rem;
    background-color: transparent;
    color: ${({ theme }) => theme.themeColor.primary};
    font: ${({ theme }) => theme.fontAppearance.errormessage};
    min-width: ${({ textButton }) => (textButton ? "3rem" : "5rem")};
    border: ${({ textButton }) =>
      textButton
        ? "none"
        : `2px solid ${({ theme }) => theme.themeColor.primary}`};
    &:hover {
      background-color: ${({ theme }) => theme.themeColor.secondary};
    }
  }
  .MuiButton-textSizeSmall {
    min-width: 4rem;
    padding: 0.3rem;
    font: ${({ theme }) => theme.fontAppearance.errormessage};
    background-color: ${({ theme }) => theme.themeColor.primaryLite};
  }
  .MuiButton-iconSizeSmall > :first-child {
    font-size: 0.7rem;
  }
  .MuiButton-startIcon {
    margin-right: 2px;
  }
`;

function Button(props) {
  const { children, className, size, textButton, disabled, ...rest } = props;
  return (
    <ButtonWrapper className={className} textButton={textButton}>
      <Matbutton className={`button`} {...rest} size={size} disabled={disabled}>
        {children}
      </Matbutton>
    </ButtonWrapper>
  );
}
Button.propTypes = {
  children: propTypes.any,
};

export default Button;
