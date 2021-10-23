export const themeColor = {
  primary: "#39607F", //Theme dark color
  secondary: "#E7ECEF", //Theme light color
  tertiary: "#B5C4CF", // Icon color
  active: "#006D77", //active status color
  grey: "#707070", //Dark grey
  lightGrey: "#fafafa", //Light grey
  red: "#AF0007", //Dialog box delete text
  pink: "#D35C61", // Dialog box button
  primaryLite: "#6493b9",
};
export const shape = {
  rounded: "0.3rem",
  round: "1.5rem",
};
export const shadow =
  "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,rgba(0, 0, 0, 0.05) 0px 1px 1px 0px";
export const insetShadow = `rgb(231, 236, 239) 0px 3px 6px 0px inset,
  rgba(231, 236, 239, 0.5) -3px -3px 6px 1px inset;`;
export const smooth = `all 300ms cubic-bezier(0.2, 0, 0, 1) 0s`;
export const spaces = {
  large: "1.5rem",
  medium: "1rem",
  small: "0.875rem",
  xtrasmall: "0.675rem",
};
export const fontAppearance = {
  header: "900 1.5rem/1 'Rajdhani'",
  subheader: "900 1rem/0.8 'Rajdhani'",
  default: "500 0.675rem 'Montserrat'",
  defaultBold: "900 0.675rem 'Montserrat'",
  tablelist: "500 0.775rem/1 'Montserrat'",
  tableheader: "900 0.775rem/1 'Montserrat'",
  inputtext: "600 0.675rem/0.5rem 'Montserrat'",
  inputdefault: "600 0.675rem/0rem 'Montserrat'",
  errormessage: "600 0.5rem/0.5rem 'Montserrat'",
};
export const breakpoint = {
  xtraLarge: `(min-width:1919px) and (max-width:2304px)`,
  large: `(min-width:1439px) and (max-width:1918px)`,
  medium: `(min-width:1280px) and (max-width:1438px)`,
  small: `(max-width:800px)`,
};

export const customScrollbar = {
  scrollbar: `
  ::-webkit-scrollbar {
    display: block;
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    display: none;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 1rem;
  } 
/* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background: #39607F;
  }
  &::-webkit-scrollbar-thumb:window-inactive {
	background-color: rgba(255,0,0,0.4); 
  }`,
};

export const gridLayout = {
  grid: ({
    rows,
    rHeight,
    minCol,
    alignItems,
    justifyContent,
    colGap,
    rowGap,
  }) => {
    return `
      display: grid;
      grid: repeat(${rows}, ${rHeight}) / repeat(auto-fit, minmax(${minCol}, 1fr));
      ${alignItems ? `align-items: ${alignItems}` : ""};
      ${justifyContent ? `justify-content: ${justifyContent}` : ""};
      grid-gap: ${rowGap} ${colGap};
    `;
  },
};
