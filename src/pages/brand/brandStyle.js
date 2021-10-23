import styled from "styled-components";

const LayoutStyleWrapper = styled.div`
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  column-gap: 0.81rem;
  .container-one {
    .filter-column {
      grid-column: 1 / 3;
    }
  }
  .avatarCenter {
    .MuiAvatar-root {
      width: 35px;
      height: 35px;
    }
  }
  .container-two {
    border-radius: 1.5rem 0rem 0rem 0rem;
    .text-display {
      display: flex;
      .label-title {
        font: ${({ theme }) => theme.fontAppearance.default};
      }
      .center {
        align-self: center;
      }
    }
    .add {
      padding: 0.3rem 0.5rem;
    }
    .input-height {
      height: 2.5rem;
    }
    .brandbtn {
      display: flex;
      column-gap: 1rem;
      margin-top: 2rem;
      justify-content: center;
    }
  }
  .upload-banner {
    margin-bottom: 2rem;
    .MuiAvatar-root {
      width: 11em;
      height: 5em !important;
    }
  }
`;
export default LayoutStyleWrapper;
