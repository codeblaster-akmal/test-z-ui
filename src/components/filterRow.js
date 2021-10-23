import React from "react";
import styled from "styled-components";

const FilterRowWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spaces.xtrasmall};
  padding: 6px 10px;
  grid-gap: 10px;
  column-gap: ${({ theme }) => theme.spaces.xtrasmall};
  background-color: ${({ theme }) => theme.themeColor.secondary};
  border-radius: ${({ theme }) => theme.shape.round};
  transition: all 300ms ease 0s;
  @media print{
    display: none;
  }
`;

const FilterRow = ({ children }) => {
  return <FilterRowWrapper>{children}</FilterRowWrapper>;
};

export default FilterRow;
