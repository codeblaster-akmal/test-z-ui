import styled from "styled-components";

//* styles for main product page
export const TabStyleWrapper = styled.section`
  .MuiTabs-indicator {
    background: transparent;
  }
  .MuiTab-root,
  .MuiTabs-root {
    min-height: 0;
  }
  .MuiAppBar-colorPrimary {
    border-radius: ${({ theme }) => theme.shape.round};
    background-color: ${({ theme }) => theme.themeColor.secondary};
    box-shadow: none;
    max-width: ${({ tabWidth }) => tabWidth || "71%"};
    .MuiTab-textColorInherit.Mui-selected {
      transition: ${({ theme }) => theme.smooth};
      background-color: ${({ theme }) => theme.themeColor.primary};
      .MuiTab-wrapper {
        color: #ffffff;
        text-align: center;
      }
    }
  }
  .MuiTab-wrapper {
    color: ${({ theme }) => theme.themeColor.primary};
  }
  .MuiTabs-flexContainer {
    justify-content: start;
  }
  .MuiTab-textColorInherit {
    background-color: transparent;
    border-radius: ${({ theme }) => theme.shape.round};
    padding: 0.6rem 0.8rem;
  }
  .tabsLabel {
    display: block;
    text-align: center;
    line-height: 0;
    font: 900 0.62rem/1 "Montserrat";
  }
`;

//* styles for product info tab
export const ProductInfoWrapper = styled.div`
  .productinfo-grid {
    display: grid;
    column-gap: 5rem;
    grid-template-columns: repeat(2, 1fr);
    .left-section {
      .input-area {
        ${({ theme }) =>
          theme.gridLayout.grid({
            rows: 4,
            rHeight: "6.5vh",
            minCol: "100px",
            alignItems: "baseline",
          })}
        column-gap: 2rem;
        grid-template-areas:
          "product-name product-name product-name product-name "
          "brand brand category category  "
          "sub-group sub-group group group"
          "gender stock vat markup"
          "return return type type"
          "status empty empty empty";
        .field-1 {
          grid-area: product-name;
        }
        .field-2 {
          grid-area: brand;
        }
        .field-3 {
          grid-area: sub-group;
        }
        .field-4 {
          grid-area: group;
        }
        .field-4,
        .field-5 {
          display: grid;
          margin-top: 1rem;
          column-gap: 0.5rem;
          align-self: center;
          grid-template-columns: 1fr 0.1fr 3fr;
          > div {
            &:first-child {
              align-self: center;
              font: ${({ theme }) => theme.fontAppearance.default};
            }
            &:last-child {
              align-self: center;
            }
          }
        }
        .field-5 {
          grid-area: category;
        }
        .field-6 {
          grid-area: UOM;
        }
        .field-7 {
          grid-area: markup;
        }
        .field-8 {
          grid-area: vat;
        }
        .field-9 {
          grid-area: stock;
        }
        .field-10 {
          grid-area: gender;
        }
        .field-11 {
          grid-area: status;
          align-self: flex-end;
          margin-top: 0.5rem;
          .MuiSwitch-root {
            margin-right: 0.8rem;
          }
        }
        .field-12 {
          grid-area: type;
          align-self: flex-end;
        }
        .field-13 {
          grid-area: return;
          align-self: flex-end;
          margin-top: 0.5rem;
        }
      }
    }
    .subheader-label {
      margin: 1.5rem 0 0.8rem;
      text-transform: uppercase;
      color: ${({ theme }) => theme.themeColor.primary};
      font: ${({ theme }) => theme.fontAppearance.defaultBold};
      .MuiSvgIcon-root {
        font-size: 1.2rem;
        margin-left: 0.5rem;
      }
    }
    .right-section {
      display: grid;
      .returnPoicy-field .MuiOutlinedInput-inputAdornedEnd {
        min-height: 4rem;
      }
      .MuiOutlinedInput-inputAdornedEnd {
        min-height: 8rem;
      }
    }
  }
  .bottom-section {
    margin: 1rem 0 0;
    display: flex;
    column-gap: 1rem;
    align-self: flex-end;
    justify-content: flex-end;
  }
`;

//*Styles for Variants tab
export const VariantsTabWrappper = styled.div`
  .outer-container {
    height: 70vh;
    max-width: 60em;
    padding: 0.5rem 0;
    overflow-y: auto;
    .variantHero-section {
      padding: 0 1rem;
      .product-brand {
        display: grid;
        grid-template-columns: 2fr repeat(2, 1fr);
        align-items: flex-end;
        column-gap: 1rem;
        padding: 0 0 0.5rem;
        .product {
          color: ${({ theme }) => theme.themeColor.primary};
          font: ${({ theme }) => theme.fontAppearance.tableheader};
          span {
            font: ${({ theme }) => theme.fontAppearance.tablelist};
            color: #000;
          }
        }
      }
    }
    .responsive-table {
      padding: 0;
      margin: 0.5rem 0;
      font: ${({ theme }) => theme.fontAppearance.default};
      border-radius: ${({ theme }) => theme.shape.rounded};
      background-color: ${({ theme }) => theme.themeColor.lightGrey};
      .variant-selection,
      .selection-field {
        display: flex;
        column-gap: 1rem;
        align-items: center;
        justify-content: space-between;
        .MuiFormControlLabel-root {
          margin-right: 0;
        }
        .MuiTypography-body1 {
          margin: 0;
        }
        .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"]
          .MuiAutocomplete-input {
          padding: 4px 15px;
        }
        .MuiIconButton-root:hover {
          background-color: transparent;
        }
      }
      .MuiSvgIcon-root {
        width: 1rem;
        height: 1rem;
        margin-right: 0.2rem;
      }
      li {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: space-between;
      }
      .table-header {
        top: -0.5rem;
        z-index: 1;
        position: sticky;
        padding: 0.8rem 0.5rem;
        font: ${({ theme }) => theme.fontAppearance.defaultBold};
        background-color: ${({ theme }) => theme.themeColor.secondary};
      }
      .table-row {
        padding: 0.5rem;
      }
      .col {
        .MuiAvatar-root {
          cursor: pointer;
          border: 1px solid ${({ theme }) => theme.themeColor.secondary};
          &:not(:last-child) {
            margin-right: 0.5rem;
          }
          .MuiAvatar-img {
            object-fit: contain;
          }
        }
        .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"]
          .MuiAutocomplete-input {
          padding: 4xp 15px;
        }
        .MuiIconButton-root:hover {
          background-color: transparent;
        }
      }
      .col-1 {
        flex-basis: 10%;
        .MuiIconButton-colorPrimary {
          color: #fff;
          background-color: ${({ theme }) => theme.themeColor.secondary};
        }
        .MuiIconButton-sizeSmall {
          padding: 0.5rem;
        }
      }
      .col-2 {
        flex-basis: 25%;
        text-align: left;
      }
      .col-3 {
        flex-basis: 15%;
        text-transform: none;
        .fileUpload-btn {
          display: none;
        }
      }
      .col-4 {
        display: flex;
        flex-basis: 30%;
        column-gap: 0.5rem;
        .imageUploadHover {
          position: relative;
          .uploadImageClose {
            right: 0;
            z-index: 1;
            padding: 2px;
            cursor: pointer;
            position: absolute;
            color: ${({ theme }) => theme.themeColor.secondary};
            background-color: ${({ theme }) => theme.themeColor.primary};
          }
          .matDeleteIconSize {
            font-size: 0.5rem;
          }
        }
      }
      .col-5 {
        flex-basis: 15%;
        .add-button {
          padding: 2px;
          min-width: 22px;
          border: 1px solid;
          /* svg {
          font-size: 0.7rem;
        } */
        }
      }
      @media all and (max-width: 767px) {
        .table-header {
          display: none;
        }
        .table-row {
        }
        li {
          display: block;
        }
        .col {
          flex-basis: 100%;
        }
        .col {
          display: flex;
          padding: 10px 0;
          &:before {
            color: #6c7a89;
            flex-basis: 50%;
            text-align: right;
            padding-right: 10px;
            content: attr(data-label);
          }
        }
      }
    }
    .add-variants {
      justify-self: flex-end;
      padding-left: 1rem;
    }
  }
  .bottom-section {
    display: flex;
    column-gap: 1rem;
    justify-content: flex-end;
  }
  .popper {
    padding: 0.5rem;
    background: lightgray;
    width: 5rem;
    height: 5rem;
    overflow: hidden;
    .popper-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

//Styles for popver in variants tab

export const PopoverStyleWrapper = styled.div`
  .popper {
    padding: 0.5rem;
    background-color: #fff;
    width: 18rem;
    height: 18rem;
    overflow: hidden;
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.2);
    .popper-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

//* Styles for variant details tab
export const VariantDetailsWrapper = styled.div`
  .tablerow-flex {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    grid-gap: 10px;
    padding: 2px 2px 2px 15px;
    .MuiFormControl-root {
      width: 100% !important;
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: rgba(0, 0, 0, 0.23);
    }
  }
  .edit-icons {
    justify-content: center;
    display: flex;
    align-self: center;
    svg {
      font-size: 1rem;
      margin-left: 0.5rem;
      color: #b5c4cf;
      cursor: pointer;
      &:hover {
        color: #3d6382;
      }
    }
  }
  .MuiTableCell-root {
    padding: 2px;
    border-bottom: none;
    color: #739679;
  }
  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding: 0;
  }
  .MuiInputBase-input {
    padding: 5px !important;
  }
  .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon
    .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding-right: 38px;
  }
  .MuiTableRow-root {
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(0, 0, 0, 0.23);
    }
  }
  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]
    .MuiAutocomplete-endAdornment {
    right: 0;
  }
  .MuiFormControl-root {
    width: 85% !important;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: transparent;
  }
  .product-brand {
    display: grid;
    grid-template-columns: 2fr repeat(2, 1fr);
    align-items: baseline;
    padding: 1rem;
    .product {
      color: ${({ theme }) => theme.themeColor.primary};
      font: ${({ theme }) => theme.fontAppearance.tableheader};
      span {
        color: #000;
        font: ${({ theme }) => theme.fontAppearance.tablelist};
      }
    }
  }
  .MuiFormControl-root {
    width: 90% !important;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.23);
  }
  .warehouse {
    .MuiFormControl-root {
      max-width: 90%;
    }
  }
  .MuiAutocomplete-popper {
    .MuiAutocomplete-listbox {
      .MuiListSubheader-root {
        top: 0;
        line-height: 1rem;
      }
      .MuiAutocomplete-groupLabel {
        top: 0;
      }
    }
  }

  .checkbox {
    text-align: right;
  }
  .details-auto {
    display: grid;
    grid-template-columns: 5fr repeat(6, 1fr);
    padding: 0.3rem;
    font-size: 0.9rem;
    column-gap: 5px;
    margin-top: 10px;
    align-items: center;
  }
  .select-attribute {
    font-size: 0.775rem;
    color: ${({ theme }) => theme.themeColor.primary};
    padding: 0 15px;
    font-weight: 900;
  }
  .variant {
    outline: none;
  }
  .subtable-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .manual-table {
    .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }
  }
  .bottom-section {
    display: flex;
    column-gap: 1rem;
    justify-content: flex-end;
  }
`;
//* Styles for simple variant component
export const SimpleVariantWrapper = styled.div`
  .field-row {
    display: grid;
    column-gap: 1rem;
    grid-auto-rows: 6vh;
    align-items: end;
    grid-auto-rows: 7vh;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  .dropdown {
    display: grid;
    column-gap: 2rem;
    grid-template-rows: 5vh;
    justify-content: space-between;
    grid-template-columns: repeat(3, 1fr);
    .retail-price {
      display: flex;
      column-gap: 0.3rem;
      align-items: flex-end;
      font: ${({ theme }) => theme.fontAppearance.default};
      .value {
        font: ${({ theme }) => theme.fontAppearance.defaultBold};
      }
    }
    .markup {
      font: ${({ theme }) => theme.fontAppearance.default};
      align-self: end;
      color: ${({ theme }) => theme.themeColor.grey};
    }
  }
  .subheader-label {
    margin: 1.5rem 0 0.8rem;
    text-transform: uppercase;
    font: ${({ theme }) => theme.fontAppearance.defaultBold};
    color: ${({ theme }) => theme.themeColor.primary};
  }
  .add-btn {
    padding: 0.5rem;
  }
`;

//* Styles for related product tab
export const RelatedProductWrapper = styled.div`
  padding: 0.5rem 0;
  .product-brand {
    display: grid;
    grid-template-columns: 7fr 5fr;
    align-items: baseline;
    padding: 1rem 1.5rem 0 1rem;
    width: 53em;
    .product {
      color: ${({ theme }) => theme.themeColor.primary};
      font: ${({ theme }) => theme.fontAppearance.tableheader};
      span {
        font: ${({ theme }) => theme.fontAppearance.tablelist};
        color: #000;
      }
    }
  }
  .productOption-menu {
    width: 30%;
  }
  .related {
    display: flex;
    flex-direction: row;
    align-items: end;
    column-gap: 2rem;
    width: 53em;
    height: 37px;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
  .status {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
    font: 500 13px "Montserrat";
  }
  .outer-container {
    max-width: 53em;
  }
  .subheader-label {
    margin: 1.5rem 0 0.8rem 1rem;
    text-transform: uppercase;
    font: ${({ theme }) => theme.fontAppearance.defaultBold};
    color: ${({ theme }) => theme.themeColor.primary};
  }
  .image-container {
    display: flex;
    flex-flow: row wrap;
    padding: 0.5rem 0;
    min-height: calc(100vh - 45vh);
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    .products-list {
      position: relative;
      flex-basis: 100px;
      height: 110px;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 1rem;
      }
      .MuiSvgIcon-root {
        width: 0.5em;
        height: 0.5em;
        position: absolute;
        right: 2px;
        top: 2px;
        visibility: hidden;
      }
      img {
        border: 1px solid;
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
      .product-name {
        margin-top: 0.5rem;
        font: ${({ theme }) => theme.fontAppearance.default};
      }
      &:hover {
        .MuiSvgIcon-root {
          visibility: visible;
        }
      }
    }
  }
  .bottom-section {
    display: flex;
    column-gap: 1rem;
    justify-content: flex-end;
  }
  .MuiAutocomplete-option {
    .MuiSvgIcon-root {
      width: 1rem;
      height: 1rem;
    }
  }
`;

//* styles for SEO tab
export const SeoStyleWrapper = styled.div`
  .product-brand {
    display: grid;
    grid-template-columns: 7fr 5fr;
    align-items: baseline;
    padding: 1.5rem 1.5rem 0 1rem;
    .product {
      color: ${({ theme }) => theme.themeColor.primary};
      font: ${({ theme }) => theme.fontAppearance.tableheader};
      span {
        font: ${({ theme }) => theme.fontAppearance.tablelist};
        color: #000;
      }
    }
  }
  .seo-grid {
    display: grid;
    column-gap: 5rem;
    overflow: scroll;
    padding: 0.5rem 0;
    min-height: calc(100vh - 55vh);
    grid-template-columns: repeat(2, 1fr);
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .subheader-label {
    margin: 1.5rem 0 0.8rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.themeColor.primary};
    font: ${({ theme }) => theme.fontAppearance.defaultBold};
  }
  .left-section {
    padding-left: 1rem;
    .text-box {
      .MuiInputBase-input {
        padding: 0.4rem 1rem;
      }
      .MuiOutlinedInput-inputAdornedEnd {
        min-height: 1rem;
      }
    }
  }
  .right-section {
    .MuiOutlinedInput-inputAdornedEnd {
      max-height: 8.6rem;
      min-height: 8.6rem;
    }
  }
`;
