import styled from "styled-components";

const ForgotPasswordStyles = styled.div`
  .createPasswordBodyBgColor {
    height: 100vh;
    background-color: ${({ theme }) => theme.themeColor.secondary};
    
    .createPasswordRow {
      display: grid;
      grid-template-columns: 2fr 2.2fr 2fr;
      grid-gap: 10px;
      grid-template-areas: "....... passwordCardColumn  ........";
    }
    .passwordCardColumn {
      grid-area: passwordCardColumn;
      background-color: #fff;
      color: #333;
      margin-top: 20%;
      padding: 10%;
      box-shadow: 0px 1px 4px 0px #ccc;
      border-radius: 5px;
    }
    .changePasswordTitle {
      text-align: center;
      font-size: 17px;
      font-weight: 600;
    }
    .headerTitle {
      font-size: 20px;
      font-weight: 600;
      padding: 20px;
    }

    .userName {
      font-size: 14px;
      font-weight: 500;
      margin-top: 7%;
      text-align: center;
      text-transform: capitalize;
    }

    .passwordButtonAlingment {
      position: relative;
      left: 0%;
      margin: 13% 0% 20% 0%;
    }

    .passwordInput {
      text-align: center;
      margin-top: 6%;
    }

    .setPasswordTitle {
      font: ${({ theme }) => theme.fontAppearance.default};
      margin-top: 10%;
    }
  }
`;

export default ForgotPasswordStyles;
