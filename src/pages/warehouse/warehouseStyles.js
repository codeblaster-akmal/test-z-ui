import styled from "styled-components";

export const WarehouseStyles = styled.div`
.filter-column{
  grid-column: 1 / 3;
}
`;

export const WarehouseModalStyles = styled.div`
  .title-section {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    padding: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadow};
    .modal-title {
      font: ${({ theme }) => theme.fontAppearance.tableheader};
    }
    .MuiIconButton-colorPrimary {
      justify-self: flex-end;
      color: ${({ theme }) => theme.themeColor.grey};
      &:hover {
        color: ${({ theme }) => theme.themeColor.primaryLite};
      }
    }
  }
  .container-shadow {
    padding: 0.5rem 4rem;
  }
  .input-area {
    ${({ theme }) =>
      theme.gridLayout.grid({
        rows: 8,
        rHeight: "7vh",
        minCol: "100px",
        alignItems: "baseline",
      })}
    column-gap: 2rem;
    .field-2,
    .field-3,
    .field-4,
    .field-9,
    .field-10,
    .field-11 {
      grid-column: 1 / span 2;
    }
    .field-8 {
      align-self: center;
    }
  }
  .ModalBtn-group {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
  }
`;
