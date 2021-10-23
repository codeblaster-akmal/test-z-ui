import { TabStyleWrapper } from "pages/product/productStyleWrapper";
import React, { useEffect, useState } from "react";
import { HeroSection, Container, PageHeader, Button } from "components";
import { TabPanel, a11yProps, customerTabs } from "../../product/tabMaterials";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { CustomerProfile, CustomerOrderHistory } from "./components";
import { viewCustomerDetail } from "../customerList/customers.service";
import { useHistory } from "react-router";

const CustomerView = (props) => {
  const { id } = props.match.params;
  const [tabState, setTabState] = useState({
    currentTab: "customer profile",
    customerTabs,
  });
  const [showCustomer, setShowCustomer] = useState({});
  const history = useHistory();

  const onCustomerDetailRecive = async () => {
    const { data } = await viewCustomerDetail(id);
    setShowCustomer(data);
    console.log(523213, data);
  };

  const handleChange = (event, newValue) => {
    setTabState((tbVal) => ({ ...tbVal, currentTab: newValue }));
  };

  useEffect(() => {
    onCustomerDetailRecive();
  }, []);

  return (
    <TabStyleWrapper tabWidth="27.3%">
      <HeroSection />
      <Container>
        <PageHeader Title="Customer view">
          {/* <Button onClick={() => history.goBack()}>Add</Button> */}
        </PageHeader>
        <div className="px-3">
          <AppBar position="static">
            <Tabs
              value={tabState.currentTab}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabState.customerTabs.map((tab, tabIndex) => (
                <Tab
                  // disabled={tab.isDisable}
                  key={tabIndex}
                  value={tab.label}
                  label={<div className="tabsLabel">{tab.label}</div>}
                  wrapped
                  {...a11yProps(tab.label)}
                />
              ))}
            </Tabs>
          </AppBar>
          <TabPanel value={tabState.currentTab} index="customer profile">
            <CustomerProfile showCustomer={showCustomer} />
          </TabPanel>
          <TabPanel value={tabState.currentTab} index="order history">
            <CustomerOrderHistory />
          </TabPanel>
        </div>
      </Container>
    </TabStyleWrapper>
  );
};

export default CustomerView;
