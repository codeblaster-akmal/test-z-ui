import React from "react";
import CustomerStyleWrapper from "../customer.styled";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import DateRangeIcon from "@material-ui/icons/DateRange";
import RoomIcon from "@material-ui/icons/Room";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Grid } from "@material-ui/core";

const CustomerProfile = (props) => {
  const { showCustomer } = props;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  console.log(51423412, showCustomer);

  return (
    <CustomerStyleWrapper>
      <div className="main-container">
        <div className="title">Customer Information</div>
        <div className="container-one">
          <div className="customer-card">
            <picture className="customer-photo">
              {showCustomer.image && (
                <img
                  className="image-section"
                  src={`${baseUrl}/${showCustomer.image}`}
                  alt=""
                  srcSet=""
                />
              )}
            </picture>
            <div className="customer-details">
              <div>
                <AccountCircleIcon fontSize="small" />
              </div>
              <div>{`${showCustomer.firstName} ${showCustomer.lastName}`}</div>
              <div>
                <PhoneIcon fontSize="small" />
              </div>
              <div>{showCustomer.mobile}</div>
              <div>
                <EmailIcon fontSize="small" />
              </div>
              <div>{showCustomer.email}</div>
              <div>
                <DateRangeIcon fontSize="small" />
              </div>
              <div>{"-"}</div>
              <div>
                <RoomIcon fontSize="small" />
              </div>
              <div>{"-"}</div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="subtitle mt-3 mb-2">Address</div>
        <Grid container>
          <Grid item sm={12} md={12} lg={10} className="addressSection">
            {showCustomer.customer_addresses?.map((item, index) => (
              <div className="addressContanier" key={index}>
                <div className="subaddress">
                  {/* <div className="element">
                    <CreateIcon fontSize="small" />
                    <DeleteOutlineIcon fontSize="small" />
                  </div> */}
                  <div className="customer-grid">
                    <div className="addresstitle">Name</div>
                    <div className="seperator">:</div>
                    <div>{item.name}</div>
                  </div>
                  <div className="customer-grid">
                    <div className="addresstitle">Email-id</div>
                    <div className="seperator">:</div>
                    <div className="value">{`${item.name}@gmail.com`}</div>
                  </div>
                  <div className="customer-grid">
                    <div className="addresstitle">Phone No</div>
                    <div className="seperator">:</div>
                    <div>{item.phone}</div>
                  </div>
                  <div className="customer-grid">
                    <div className="addresstitle">Address</div>
                    <div className="seperator">:</div>
                    <div>{`${item.address1} ${item.address2} ${item.city.name} ${item.city.county.name}-${item.postcode}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </CustomerStyleWrapper>
  );
};

export default CustomerProfile;
