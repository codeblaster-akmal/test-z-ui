import styled, { css } from "styled-components";

const ResponsiveTable = styled.ul`
  padding: 0;
  margin: 0.5rem 0;
  .MuiTablePagination-toolbar {
    min-height: 35px;
    border-top: 2px solid #e7ecef;
  }
`;
const TableHeader = styled.li`
  top: 0;
  z-index: 1;
  display: flex;
  position: sticky;
  text-align: center;
  align-items: center;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.shape.rounded}
    ${({ theme }) => theme.shape.rounded} 0 0;
  color: ${({ theme }) => theme.themeColor.primary};
  font: ${({ theme }) => theme.fontAppearance.tableheader};
  background-color: ${({ theme }) => theme.themeColor.lightGrey};
  ${({ subTableRow }) =>
    subTableRow &&
    css`
      margin-bottom: 0.3rem;
      border-radius: ${({ theme }) => theme.shape.rounded};
      background-color: ${({ theme }) => theme.themeColor.secondary};
    `}
  @media all and (max-width: 767px) {
    display: none;
  }
`;
const Column = styled.div`
  flex-basis: ${({ size }) => (size ? size : "")};
  text-align: ${({ alignTo }) => (alignTo ? alignTo : "center")};
  margin: 0 auto;
  .MuiAvatar-root {
    width: 22px;
    height: 22px;
  }
  @media all and (max-width: 767px) {
    display: flex;
    padding: 10px 0;
    align-items: center;
    &:before {
      color: ${({ theme }) => theme.themeColor.secondary};
      flex-basis: 40%;
      text-align: left;
      padding-right: 10px;
      content: attr(data-label);
    }
  }
`;
const TableRow = styled.li`
  display: flex;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  font: ${({ theme }) => theme.fontAppearance.tablelist};
  &:hover {
    background-color: ${({ theme }) => theme.themeColor.lightGrey};
  }
  ${({ subTableRow }) =>
    subTableRow &&
    css`
      margin-bottom: 0.3rem;
      border-radius: ${({ theme }) => theme.shape.rounded};
      background-color: ${({ theme }) => theme.themeColor.secondary};
      &:hover {
        background-color: ${({ theme }) => theme.themeColor.secondary};
      }
    `}

  @media all and (max-width: 767px) {
    display: block;
    border-bottom: 1px solid ${({ theme }) => theme.themeColor.secondary};
  }
`;

const TableContainer = styled.div(({ staticHeight = "35vh", theme }) => {
  return {
    overflowY: "auto",
    height: `calc(100vh - ${staticHeight}); ${theme.customScrollbar.scrollbar}`,
  };
});

const ActiveRowWrapper = styled.div((props) => {
  const { active, theme } = props;
  if (active) {
    return {
      margin: `0 0.4rem`,
      padding: `0 0.4rem`,
      transform: `translateY(-3px)`,
      borderRadius: `${theme.shape.rounded}`,
      background: `${theme.themeColor.lightGrey}`,
      boxShadow: `${theme.themeColor.secondary} 0 1px 5px 3px;`,
    };
  }
});
export {
  Column,
  TableRow,
  TableHeader,
  TableContainer,
  ResponsiveTable,
  ActiveRowWrapper,
};
