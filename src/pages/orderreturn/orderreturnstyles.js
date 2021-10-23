import styled from "styled-components";

export const OrderReturnStyles = styled.div`
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 1rem;
    margin: 0 2rem;
  }
  .check {
    .MuiSvgIcon-root {
      width: 1.1rem;
      height: 1.1rem;
    }
  }
`;

export const ReturnDetailsStyles = styled.div`
  .title-section {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    padding: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadow};
    .modal-title {
      font: ${({ theme }) => theme.fontAppearance.tableheader};
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .MuiIconButton-colorPrimary {
      justify-self: flex-end;
      color: ${({ theme }) => theme.themeColor.grey};
      &:hover {
        color: ${({ theme }) => theme.themeColor.primaryLite};
      }
    }
  }
  .condition-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 1rem;
    padding-right: 1.5rem;
    .MuiInput-root{
      width: 70%;
    }      
  }
  .return {
    padding: 0.5rem 2rem;
  }
  .inputs {
    align-self: flex-start;
    text-align: end;
    font: ${({ theme }) => theme.fontAppearance.tablelist};
    color: ${({ theme }) => theme.themeColor.grey};
  }
  .end {
    align-self: flex-end;
    color: #000;
    font-size: 0.8rem;
  }
  .input-grid {
    display: grid;
    grid-template-rows: repeat(3, 8vh);
    padding: 0.5rem 0rem;
  }
  .submit-button {
    text-align: center;
    padding: 2rem 0;
  }
`;
