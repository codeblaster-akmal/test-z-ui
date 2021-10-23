import styled from "styled-components";

const SectionStyles = styled.div`
  display: grid;
  column-gap: 0.81rem;
  grid-template-columns: 3fr 1fr;
  .filter-column {
    grid-column: 1 / span 2;
  }
  .twoColumn-division {
    display: grid;
    column-gap: 1rem;
    justify-content: space-between;
    grid-template-columns: repeat(2, 1fr);
  }
  .bottom-section {
    display: flex;
    column-gap: 1rem;
    justify-content: center;
    align-items: flex-end;
  }
`;

export default SectionStyles;
