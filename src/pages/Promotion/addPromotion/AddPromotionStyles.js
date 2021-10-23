import styled from "styled-components";

const AddPromotionStyles = styled.div`
  /* .fieldLayout-container {
    ${({ theme }) =>
      theme.gridLayout.grid({
        rows: 2,
        rHeight: "6vh",
        minCol: "190px",
        alignItems: "center",
      })}
    column-gap: 2rem;
    }     */
    .end-align{
      align-self: flex-end;
    .field-6 {
      display: grid;
      grid-template-columns: 2fr 1fr;
      align-items: center;
      .align-left {
        justify-content: flex-start;
        .MuiSvgIcon-root{
          width: 1.1rem;
          height: 1.1rem;
          margin-right: 0.3rem;
        }
        .MuiFormControlLabel-labelPlacementStart{
          flex-direction: row;
        }
        .MuiIconButton-colorSecondary:hover {
          background-color: transparent;
        }
      }
      .align-right {
        justify-content: flex-end;
      }
    }
  }
  .field{
    height: 1.7vw;
  }
  .add{
    position: relative;
    bottom: -15px;
  }
  .add-check{
    position: relative;
    bottom: -10px;
  }
    .field-9 {
      margin-top: 1rem;
    }
  }
  .table{
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #EBEBEB;
  }
  .twoColumn-field {
    ${({ theme }) =>
      theme.gridLayout.grid({
        rows: 2,
        rHeight: "6vh",
        minCol: "250px",
        alignItems: "baseline",
      })}
    column-gap: 1.5rem;
    margin-bottom: 1rem;    
  }
  .add-button {
      align-self: flex-end;
    }
  .selectField {
    .option-image {
      margin: 0 1rem;
    }
  }
  .bottom-section {
    display: flex;
    column-gap: 1rem;
    justify-content: flex-end;
  }
  .title {
    font: ${({ theme }) => theme.fontAppearance.default};
    span {
      font: ${({ theme }) => theme.fontAppearance.defaultBold};
      color: ${({ theme }) => theme.themeColor.primary};
    }
  }
  .radio-grid{
    display: flex;
    align-items: center;
    column-gap: 3rem;
    position: relative;
    top: 1.2rem;
    .MuiTypography-body1{
      font: ${({ theme }) => theme.fontAppearance.default};
    }
  }
  .status{
    padding-left: 2rem;
    .MuiFormControlLabel-root{
      row-gap: 0.4rem;
    }
    .MuiTypography-root{
      margin-right: 0;
    }
  }
  .subtitle{
    font: ${({ theme }) => theme.fontAppearance.defaultBold};
    color: ${({ theme }) => theme.themeColor.primary};
  }
  .MuiFormGroup-root{
    column-gap: 6rem;
  }
  .promo-grid {
    align-items: end;
  }
  .offer-field {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    .MuiAvatar-root {
      width: 10em !important;
      height: 4em !important;
    }
  }
  
  .generateButton {
    background-color: ${({ theme }) => theme.themeColor.primary};
    color: #fff;
    font-weight: 500;
    font-size: 9px;
    letter-spacing: 1px;
    border-radius: 5px;
    padding: 0 0.2rem;
    border: none;
  }
  .image-holder {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    width: 16em;
    height: 16em;
    margin-top: 1em;
    .image {
      width: 8em;
      height: 8em;
      img {
        max-width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      }
    }
`;

export default AddPromotionStyles;
