import styled from "styled-components";

const TableStyle = styled.div`
  width: 100%;
  .MuiTableContainer-root {
    ::-webkit-scrollbar {
      display: none;
    }
    height: calc(100vh - 35vh);
    @media ${({ theme }) => theme.breakpoint.xtraLarge} {
      height: calc(100vh - 25vh);
    }
  }
  @media print {
    .MuiTableContainer-root {
      height: auto;
      overflow: scroll;
    }
    .MuiTablePagination-toolbar {
      display: none;
    }
  }
  .MuiTableCell-root {
    height: 1rem;
    padding: 0.2rem 1rem;
    font: ${({ theme }) => theme.fontAppearance.tablelist};
    border-bottom: none;
  }
  .MuiTableCell-head {
    height: 2rem;
    padding: 0.4rem 1rem;
    color: ${({ theme }) => theme.themeColor.primary};
    font: ${({ theme }) => theme.fontAppearance.tableheader};
  }
  .MuiTableRow-root {
    cursor: pointer;
    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  .MuiTablePagination-toolbar {
    min-height: 35px;
    border-top: 2px solid #e7ecef;
  }
  .MuiTypography-body2,
  .MuiSelect-select.MuiSelect-select {
    font: ${({ theme }) => theme.fontAppearance.tablelist};
  }
  .action-icon {
    display: flex;
    justify-content: center;
    align-items: baseline;
    .MuiSvgIcon-root {
      font-size: 1rem;
      margin-left: 0.5rem;
      cursor: pointer;
      color: ${({ theme }) => theme.themeColor.tertiary};
      &:hover,
      &.active-icon {
        color: ${({ theme }) => theme.themeColor.primary};
      }
    }
  }
  .avatar-center {
    display: flex;
    justify-content: center;
    .MuiAvatar-root {
      border: 1px solid #000;
      width: 30px;
      height: 30px;
    }
  }
  .MuiIconButton-root {
    padding: 0;
  }
  .MuiSelect-icon {
    top: calc(50% - 13px);
  }
  .MuiInputBase-input {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
export default TableStyle;
