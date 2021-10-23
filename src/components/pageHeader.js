import React from "react";
import styled from "styled-components";

const PageHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-content: space-between;
  padding: 0.2rem 0;
  margin-bottom: ${({ theme }) => theme.spaces.xtrasmall};
  grid-gap: 10px;
  column-gap: 10px;
  border-radius: 5px;
  border-bottom: 2px solid #e7ecef;
  transition: all 300ms ease 0s;
  .page-title {
    display: inline-block;
    font: 700 1.3rem/1.43 "Rajdhani";
  }
  .section-right {
    display: flex;
    column-gap: 1rem;
    justify-content: flex-end;
    align-items: center;
  }
  @media print{
    display: none;
  }
`;

const PageHeader = ({ Title, children }) => {
  return (
    <PageHeaderWrapper>
      <div className="page-title">{Title}</div>
      <div className="section-right">{children}</div>
    </PageHeaderWrapper>
  );
};

export default PageHeader;
