import React from "react";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";
const LoaderWrapper = styled.div`
  .MuiCircularProgress-root {
    width: 40px !important;
    height: 40px !important;
  }
  .MuiCircularProgress-colorPrimary {
    color: #3b617f;
  }
  .MuiCircularProgress-indeterminate {
    animation: MuiCircularProgress-keyframes-circular-rotate 10s linear infinite;
  }
`;
function Loader() {
  return (
    <LoaderWrapper>
      <CircularProgress />
    </LoaderWrapper>
  );
}

export default Loader;
