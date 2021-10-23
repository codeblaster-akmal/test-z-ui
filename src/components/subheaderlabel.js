import React from "react";
import styled from "styled-components";

const SubHeaderStyles = styled.div`
  color: ${({ theme }) => theme.themeColor.primary};
  font: ${({ theme }) => theme.fontAppearance.defaultBold};
  margin: ${({ margin }) => (margin ? "1rem 0 0.5rem" : "")};
  text-transform: ${({ textappear }) =>
    textappear === "normal" ? "capitalize" : "uppercase"};
  &.error-text {
    margin-top: 2rem;
    color: ${({ theme }) => theme.themeColor.red};
    font: ${({ theme }) => theme.fontAppearance.errormessage};
  }
`;

const SubHeaderLabel = ({ children, className, margin, textappear }) => {
  return (
    <SubHeaderStyles
      className={className}
      margin={margin}
      textappear={textappear}
    >
      {children}
    </SubHeaderStyles>
  );
};

export default SubHeaderLabel;
