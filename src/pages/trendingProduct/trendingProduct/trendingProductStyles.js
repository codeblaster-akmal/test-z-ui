import styled from "styled-components";

const TrendingProductStyleWrapper = styled.div`
  .fieldLayout-container {
    ${({ theme }) =>
      theme.gridLayout.grid({
        rows: 3,
        rHeight: "6vh",
        minCol: "250px",
        alignItems: "center",
      })}
    column-gap: 2rem;
    margin-bottom: 1rem;
    .field-2 {
      ${({ theme }) =>
        theme.gridLayout.grid({
          rows: 1,
          rHeight: "6vh",
          minCol: "50px",
          alignItems: "flex-end",
        })}
    }
    .field-7 {
      align-self: flex-end;
    }
  }
  .bottom-section {
    display: flex;
    margin-top: 0.5rem;
    column-gap: 1rem;
    justify-content: flex-end;
  }
`;

export default TrendingProductStyleWrapper;
