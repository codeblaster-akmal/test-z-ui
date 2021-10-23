import { KeyboardDateTimePicker } from "@material-ui/pickers";
import {
  ActionButtons,
  ActiveRowWrapper,
  AutocompleteInputs,
  Column,
  DateTimePickerWrapper,
  FilterRow,
  ResponsiveTable,
  TableContainer,
  TableHeader,
  TableRow,
  TextFieldInputs,
} from "components";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  innertableData,
  orderlist,
  status,
} from "pages/orderlisting/orderlistingData";
import {
  Avatar,
  Collapse,
  IconButton,
  TablePagination,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ProductImage from "assets/images/Product Images/Artboard 11.png";
import { orderTableHead } from "../customerData";
import { OrderlistingStyles } from "pages/orderlisting/orderlistingstyles";

const InnerRow = ({ innerrow }) => {
  const [show] = useState(false);
  return (
    <>
      <TableRow>
        <Column size="5%" alignTo="left">
          <Avatar variant="circle" alt="Item Image" src={ProductImage} />
        </Column>
        <Column size="20%" alignTo="left">
          {innerrow.name}
        </Column>
        <Column size="7%" alignTo="left">
          {innerrow.quantity}
        </Column>
        <Column size="5%" alignTo="left">
          &#163;{innerrow.amount}
        </Column>
        <Column size="10%" alignTo="left">
          &#163;{innerrow.totalamount}
        </Column>
        <Column size="10%" alignTo="left">
          {innerrow.orderstatus}
        </Column>
        <Column size="10%" alignTo="left">
          <ActionButtons>
            <IconButton size="small" color="primary" component="span">
              <AddCircleIcon />
            </IconButton>
            <IconButton size="small" color="primary" component="span">
              <RemoveCircleIcon />
            </IconButton>
          </ActionButtons>
        </Column>
      </TableRow>
      <Collapse in={show} mountOnEnter unmountOnExit>
        <div className="subinner-table">
          <div className="grid-value">
            <div className="props">Logistic Partner</div>
            <div className="values">fedEx Express</div>
          </div>
          <div className="grid-value">
            <div className="props">Tracking Number</div>
            <div className="values">ZBT001</div>
          </div>
          <div className="grid-value">
            <div className="props">Shipment Date</div>
            <div className="values">02 sep 2021</div>
          </div>
          <div className="grid-value">
            <div className="props">Expected Delivery</div>
            <div className="values">07 sept 2021</div>
          </div>
          <div className="grid-value">
            <div className="props">Delivert Date</div>
            <div className="values">07 sept 2021</div>
          </div>
          <div className="grid-value">
            <div className="props">Shipment Status</div>
            <div className="values">Success</div>
          </div>
        </div>
      </Collapse>
    </>
  );
};

const Row = ({ row, index, setOpen, open }) => {
  return (
    <ActiveRowWrapper active={index === open}>
      <TableRow onClick={() => setOpen(index === open ? false : index)}>
        <Column size="10%" alignTo="left" key={index}>
          {" 11/30/1970"}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          {row.orderno}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          {row.city}
        </Column>
        <Column size="10%" alignTo="center" key={index}>
          {row.quantity}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          {row.totalamount}
        </Column>
        <Column size="15%" alignTo="left" key={index}>
          {row.orderstatus}
        </Column>
        <Column size="10%">
          <ActionButtons>
            <IconButton size="small" color="primary" component="span">
              <VisibilityIcon />
            </IconButton>
          </ActionButtons>
        </Column>
      </TableRow>
      <Collapse in={index === open} mountOnEnter unmountOnExit>
        <div className="details">
          <div className="order-details">
            <div className="address-details">
              Address
              <div className="address">
                <div className="property">Name</div>
                <div className="divider">:</div>
                <div className="value">kalimuthu</div>
                <div className="property">Phone No</div>
                <div className="divider">:</div>
                <div className="value">7474747474</div>
                <div className="property">Address</div>
                <div className="divider">:</div>
                <div className="value">12, Newtown</div>
                <div className="property">City</div>
                <div className="divider">:</div>
                <div className="value">Los Angeles</div>
                <div className="property">County</div>
                <div className="divider">:</div>
                <div className="value">Bristol-787878</div>
              </div>
            </div>
            <div className="address-details">
              Delivery Details
              <div className="address">
                <div className="property">Delivery Partner</div>
                <div className="divider">:</div>
                <div className="value">FedEx Express</div>
                <div className="property">Tracking ID</div>
                <div className="divider">:</div>
                <div className="value">ZB00002</div>
                <div className="property">Dispatch Date</div>
                <div className="divider">:</div>
                <div className="value">1 Sep 2021</div>
                <div className="property">Expected Date</div>
                <div className="divider">:</div>
                <div className="value">05 Sep 2021</div>
              </div>
            </div>
            <div className="address-details">
              Payment Details
              <div className="address">
                <div className="property">Discount</div>
                <div className="divider">:</div>
                <div className="value">0%</div>
                <div className="property">Total Amount</div>
                <div className="divider">:</div>
                <div className="value">&#163; 550</div>
                <div className="property">Payment Status</div>
                <div className="divider">:</div>
                <div className="value">SUCCESS</div>
                <div className="property">Order Status</div>
                <div className="divider">:</div>
                <div className="value">SUCCESS</div>
              </div>
            </div>
          </div>
          <div className="inner-table">
            <ResponsiveTable>
              <TableHeader className="subtable-header" subTableRow>
                <Column size="5%" alignTo="left">
                  Image
                </Column>
                <Column size="20%" alignTo="left">
                  Product Name
                </Column>
                <Column size="7%" alignTo="left">
                  Quantity
                </Column>
                <Column size="5%" alignTo="left">
                  Amount
                </Column>
                <Column size="10%" alignTo="left">
                  Total Amount
                </Column>
                <Column size="10%" alignTo="left">
                  Delivery Status
                </Column>
                <Column size="10%" alignTo="left">
                  Action
                </Column>
              </TableHeader>
              <TableContainer staticHeight="auto">
                {innertableData.map((data, index) => {
                  return <InnerRow key={index} innerrow={data} index={index} />;
                })}
              </TableContainer>
            </ResponsiveTable>
          </div>
        </div>
      </Collapse>
    </ActiveRowWrapper>
  );
};

const CustomerOrderHistory = () => {
  const [open, setOpen] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [view, setView] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpen = () => {
    setView(!view);
  };
  const [dateTime, setDateTime] = useState(
    new Date("2021-01-01T00:00:00.000Z")
  );

  return (
    <OrderlistingStyles paddingTop="0.5rem">
      <FilterRow>
        <TextFieldInputs
          placeholder="Order Number"
          InputProps={<SearchIcon />}
          variant="filled"
        />
        <DateTimePickerWrapper>
          <KeyboardDateTimePicker
            variant="inline"
            inputVariant="filled"
            fullWidth
            ampm={false}
            hideTabs
            autoOk
            placeholder="From Date"
            value={dateTime}
            onChange={setDateTime}
            onError={console.log}
            format="yyyy/MM/dd HH:mm"
          />
        </DateTimePickerWrapper>
        <DateTimePickerWrapper>
          <KeyboardDateTimePicker
            variant="inline"
            inputVariant="filled"
            fullWidth
            ampm={false}
            hideTabs
            autoOk
            placeholder="To Date"
            value={dateTime}
            onChange={setDateTime}
            onError={console.log}
            format="yyyy/MM/dd HH:mm"
          />
        </DateTimePickerWrapper>
        <AutocompleteInputs
          variant="filled"
          optionLabel="name"
          placeholder="Status"
          options={status}
        />
      </FilterRow>
      <ResponsiveTable>
        <TableHeader>
          {orderTableHead.map((item) => (
            <Column key={item.id} size={item.maxWidth} alignTo={item.align}>
              {item.label}
            </Column>
          ))}
        </TableHeader>
        <TableContainer staticHeight="40vh">
          {orderlist.map((title, index) => {
            return (
              <Row
                key={index}
                row={title}
                setOpen={setOpen}
                open={open}
                index={index}
                handleOpen={handleOpen}
              />
            );
          })}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          size="small"
          count={orderlist.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Rows"
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ResponsiveTable>
    </OrderlistingStyles>
  );
};

export default CustomerOrderHistory;
