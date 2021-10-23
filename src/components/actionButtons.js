import { ButtonGroup } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const ActionButtonStyles = styled.div`
  .MuiButtonGroup-root {
    column-gap: 0rem;
  }
  .MuiButtonGroup-groupedTextHorizontal {
    border-radius: 2rem;
    &:not(:last-child) {
      border-right: none;
    }
  }
  .MuiIconButton-colorPrimary {
    color: ${({ theme }) => theme.themeColor.tertiary};
    &:hover {
      color: ${({ theme }) => theme.themeColor.primaryLite};
      background-color: transparent;
    }
  }
  .MuiIconButton-root.Mui-disabled {
    color: lightgray;
    cursor: none;
  }
  .MuiSvgIcon-root,
  svg {
    font-size: 1rem;
  }
  .MuiButtonGroup-grouped {
    min-width: 25px;
  }
`;

const ActionButtons = ({ children }) => {
  return (
    <ActionButtonStyles>
      <ButtonGroup
        variant="text"
        size="small"
        aria-label="small outlined button group"
      >
        {children}
      </ButtonGroup>
    </ActionButtonStyles>
  );
};

export default ActionButtons;
