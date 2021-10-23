import React from "react";
import styled from "styled-components";

const ContainerWrapper = styled.section`
  position: relative;
  background-color: #fff;
  padding: 0.2rem ${({ theme }) => theme.spaces.small};
  border-radius: 1rem 1rem 0rem 0rem;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  height: calc(100vh - 42px);

  @media print {
    box-shadow: none;
    padding: 0;
  }
`;

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Container;
