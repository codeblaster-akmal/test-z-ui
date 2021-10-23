import styled from "styled-components";

const CustomerStyleWrapper = styled.div`
  padding: 0.5rem 0;
  height: calc(100vh - 150px);
  font: ${({ theme }) => theme.fontAppearance.default};
  .main-container {
    max-width: 95em;
    padding: 1rem;
    background-color: #F3F5F7;
    border-radius: 0.5rem;
  }
  .title{
    font: 600 1.3rem/1 "Rajdhani";
  }
  .container-one {
    ${({ theme }) =>
      theme.gridLayout.grid({
        rows: 1,
        rHeight: "auto",
        minCol: "200px",
        alignItems: "flex-start",
        colGap: "2rem",
        rowGap: "2rem",
      })}
  }
  .customer-card {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 1rem;
    column-gap: 1rem;
    /* background-color: ${({ theme }) => theme.themeColor.secondary}; */
    border-radius: ${({ theme }) => theme.shape.rounded};
  }
  .account-level {
    position: absolute;
    top: -0.5rem;
    right: 1rem;
    width: 15%;
  }
  .customer-details {
    display: grid;
    grid-template-columns: 0.1fr 1fr;
    column-gap: 0.5rem;
    align-items: baseline;
    div:nth-child(odd) {
      color: ${({ theme }) => theme.themeColor.primaryLite};
      justify-self: center;
    }
    .MuiSvgIcon-fontSizeSmall {
      font-size: 1rem;
      color: #000;
    }
  }
  .image-section {
    width: 100%;
    height: 90%;
    object-fit: cover;
    object-position: center;
    border-radius: ${({ theme }) => theme.shape.rounded};
    border: 2px solid ${({ theme }) => theme.themeColor.primaryLite};
  }
  .subtitle {
    font: 600 1.3rem/1 "Rajdhani";
  }
  .addressSection {
    ${({ theme }) =>
      theme.gridLayout.grid({
        rows: 1,
        rHeight: "auto",
        minCol: "350px",
        alignItems: "flex-start",
        colGap: "0.5rem",
        rowGap: "0.5rem",
      })}
    height: calc(100vh - 59vh);
    padding: 0.5rem;
    overflow: overlay;
    border: 1px solid ${({ theme }) => theme.themeColor.secondary};
    border-radius: ${(props) => props.theme.shape.rounded};
    /* background-color: ${({ theme }) => theme.themeColor.secondary}; */    
    .addressContanier:nth-child(odd){
      position: relative;
      &::after{
      position: absolute;
      content: "";
      width: 2px;
      height: 100%;
      right: 0;
      top:0;
      background-color: ${({ theme }) => theme.themeColor.secondary};
    }
  }
}
  .subaddress {
    position: relative;
    padding: 1rem;
    background-color: transparent;
    line-height: 1.1rem;
    border-radius: ${({ theme }) => theme.shape.rounded}; 
    .customer-grid{
      display: grid;
      grid-template-columns: 1fr 0.3fr 3fr;
      align-items: baseline;
    }   
    .addresstitle {
      font: ${({ theme }) => theme.fontAppearance.defaultBold};      
    }

    .value {
      font: ${({ theme }) => theme.fontAppearance.default};
    }
    .element {
      display: flex;
      position: absolute;
      top: 5%;
      right: 1%;
      visibility: hidden;
      cursor: pointer;
      .MuiSvgIcon-root {
        color: ${({ theme }) => theme.themeColor.tertiary};
        &:hover,
        &.element {
          color: ${({ theme }) => theme.themeColor.primary};
        }
      }
    }
    &:hover {
      .element {
        visibility: visible;
      }
    }    
  }
`;
export default CustomerStyleWrapper;
