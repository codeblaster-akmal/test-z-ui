import styled from "styled-components";

export const OrderlistingStyles = styled.div`
padding-top: ${({ paddingTop }) => paddingTop || ""};
.details{
    .order-details{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 1rem;
        padding: 0.5rem 0;
        margin-bottom: 1rem;
        .address-details{
            border: 1px solid #e0e0e0;
            border-radius: 0.5rem;
            font: ${({ theme }) => theme.fontAppearance.tableheader};
            padding: 1rem 1rem 0.5rem 1rem;
        }
        .address{
            display: grid;
            grid-template-columns: 4fr 1fr 5fr;
            padding: 1rem 0 0 0;
            .property, .divider{
                color: ${({ theme }) => theme.themeColor.grey};
                font: ${({ theme }) => theme.fontAppearance.tablelist};
                padding-bottom: 0.5rem;
                background-color: transparent;
                height: auto;
            }
            .value{
                /* color: ${({ theme }) => theme.themeColor.grey}; */
                font: ${({ theme }) => theme.fontAppearance.tablelist};
            }
        }
    }
}
.check{
  .MuiSvgIcon-root{
    width: 1.1rem;
    height: 1.1rem;
  }
}
.buttons{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 1rem;
    margin: 0 2rem;
}
.subinner-table{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 0.5rem 4rem;
  grid-gap: 2rem;
  /* border-bottom: 1px solid #D5E2EC; */
  .grid-value{
    /* border-right: 1px solid #D5E2EC;  */
    position: relative; 
    &::after{
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 1px;
      background-color: #D5E2EC;
    }

    .props{
      font: ${({ theme }) => theme.fontAppearance.tableheader};
      color: ${({ theme }) => theme.themeColor.primary};
    }
    .values{
      font: ${({ theme }) => theme.fontAppearance.tablelist};
      color: ${({ theme }) => theme.themeColor.grey};
      padding: 0.5rem 0;
    }
  }
  .none{
    position: relative;
    &::after{
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 1px;
      background-color: transparent;
    }
    .props{
      font: ${({ theme }) => theme.fontAppearance.tableheader};
      color: ${({ theme }) => theme.themeColor.primary};
    }
    .values{
      font: ${({ theme }) => theme.fontAppearance.tablelist};
      color: ${({ theme }) => theme.themeColor.grey};
      padding: 0.5rem 0;
    }
  }
}
`;

export const OrderShipmentStyles = styled.div`
  .title-section {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    padding: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadow};
    .modal-title {
      font: ${({ theme }) => theme.fontAppearance.tableheader};
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .MuiIconButton-colorPrimary {
      justify-self: flex-end;
      color: ${({ theme }) => theme.themeColor.grey};
      &:hover {
        color: ${({ theme }) => theme.themeColor.primaryLite};
      }
    }
  }
  .inputs {
    align-self: flex-end;
    min-height: 8vh;
    .MuiFilledInput-root .MuiInputBase-input {
      padding: 8px 0;
    }
    /* .MuiFilledInput-underline:before, .bwIxDS .MuiFilledInput-underline:after{
          border-bottom: 1px solid;
      } */
  }
  .shipment {
    display: grid;
    grid-template-rows: repeat(4, 9vh);
    padding: 0.5rem 3rem;
    .MuiGrid-container {
      align-items: end;
    }
    .MuiInput-root {
      margin-top: 0;
    }
    .MuiInputLabel-formControl {
      top: -1rem;
    }
  }
  .submit-button {
    text-align: center;
    padding: 1rem 0;
  }
`;
