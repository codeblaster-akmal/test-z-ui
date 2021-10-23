import styled from "styled-components";

export const OrderRefundStyles = styled.div`
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 1rem;
    margin: 0 2rem;
    .MuiInputBase-input {
      padding: 4px 6px;
    }
    .MuiOutlinedInput-inputAdornedEnd {
      font: 500 0.6rem "Monserrat";
    }
    .MuiFormControl-root {
      background-color: #fff;
    }
  }
  .check {
    .MuiSvgIcon-root {
      width: 1.1rem;
      height: 1.1rem;
    }
  }
`;
