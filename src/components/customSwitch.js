import React from "react";
import { Switch, FormControlLabel, withStyles } from "@material-ui/core";
import styled from "styled-components";

const CustomSwitchWrapper = styled.div`
  .MuiFormControlLabel-labelPlacementStart {
    margin-left: 0;
  }
  .MuiTypography-root {
    margin-right: 1rem;
    font: ${({ theme }) => theme.fontAppearance.default};
  }
`;
const DesignedSwitch = withStyles((theme) => ({
  root: {
    width: 35,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(18px)",
      color: "#ffffff",
      "& + $track": {
        opacity: 1,
        backgroundColor: "hsl(185deg, 100%, 23%)",
        borderColor: "hsl(185deg, 100%, 23%)",
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: "1.5rem",
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const CustomSwitch = ({ checked, onChange, name, value, label, labelPlacement, ...props }) => {
  return (
    <CustomSwitchWrapper>
      <FormControlLabel
        value={value}
        control={
          <DesignedSwitch
            checked={checked}
            onChange={onChange}
            name={name}
            {...props}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
    </CustomSwitchWrapper>
  );
};

export default CustomSwitch;
