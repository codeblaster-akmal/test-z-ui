import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import styled from "styled-components";

const CheckboxWrapper = styled.div`
  .MuiCheckbox-colorPrimary.Mui-checked,
  .MuiCheckbox-colorSecondary.Mui-checked,
  .MuiIconButton-colorSecondary {
    color: ${({ theme }) => theme.themeColor.primary};
    &:hover {
      background-color: ${({ theme }) => theme.themeColor.secondary};
    }
  }
  .MuiCheckbox-root {
    color: ${({ theme }) => theme.themeColor.primary};
  }
  .MuiSvgIcon-root {
    font-size: 2.3rem;
    height: 1.3rem;
    width: 1.3rem;
  }
  input[type="checkbox" i] {
    display: none;
  }
  .MuiFormControlLabel-root {
    margin-left: 0;
    margin-right: 0;
  }
  .PrivateSwitchBase-root-1,
  .MuiIconButton-root {
    padding: 0rem;
  }
  .MuiTypography-body1 {
    margin-right: 0.5rem;
    text-transform: capitalize;
    font: ${({ theme }) => theme.fontAppearance.default};
  }
`;
const CustomCheckbox = ({ label, labelPlacement, className, ...props }) => {
  return (
    <CheckboxWrapper className={className}>
      <FormControlLabel
        aria-label="position"
        label={label}
        labelPlacement={labelPlacement}
        control={<Checkbox {...props} />}
      />
    </CheckboxWrapper>
  );
};

export default CustomCheckbox;
