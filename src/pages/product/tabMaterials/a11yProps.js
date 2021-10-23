const a11yProps = (index) => {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
};

export default a11yProps;
