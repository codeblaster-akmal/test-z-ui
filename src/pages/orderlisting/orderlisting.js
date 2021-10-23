import React, { useState, useRef } from "react";
import {
  payment,
  status,
  orderlist,
  tableHead,
  innertableData,
} from "./orderlistingData";
import {
  Button,
  Container,
  FilterRow,
  HeroSection,
  PageHeader,
  TextFieldInputs,
  DateTimePickerWrapper,
  AutocompleteInputs,
  ActiveRowWrapper,
  TableRow,
  Column,
  ActionButtons,
  ResponsiveTable,
  TableHeader,
  TableContainer,
  CustomCheckbox,
  Badge,
} from "components";
import OrderShipment from "./ordershipment";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import { OrderlistingStyles } from "./orderlistingstyles";
import SearchIcon from "@material-ui/icons/Search";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { Avatar, Collapse, TablePagination } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ProductImage from "../../assets/images/Product Images/Artboard 11.png";

function InnerRow({ innerrow }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <TableRow>
        <Column size="5%" alignTo="center">
          <CustomCheckbox color="primary" className="check" />
        </Column>
        <Column size="5%" alignTo="left">
          <Avatar variant="circle" alt="Item Image" src={ProductImage} />
        </Column>
        <Column size="10%" alignTo="left">
          {innerrow.suborderno}
        </Column>
        <Column size="20%" alignTo="left">
          {innerrow.name}
        </Column>
        <Column size="5%" alignTo="left">
          &#163;{innerrow.price}
        </Column>
        <Column size="7%" alignTo="center">
          {innerrow.quantity}
        </Column>
        <Column size="5%" alignTo="left">
          &#163;{innerrow.amount}
        </Column>
        <Column size="5%" alignTo="left">
          {innerrow.discount}
        </Column>
        <Column size="8%" alignTo="left">
          &#163;{innerrow.totalamount}
        </Column>
        <Column size="10%" alignTo="left">
          <Badge
            processing={innerrow.orderstatus === "Processing" ? true : false}
          >
            {innerrow.orderstatus}
          </Badge>
        </Column>
        <Column size="10%" alignTo="left">
          <ActionButtons>
            <IconButton
              size="small"
              color="primary"
              component="span"
              onClick={() => setShow(!show)}
            >
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
          <div className="none">
            <div className="props">Shipment Status</div>
            <div className="values">Success</div>
          </div>
          {/* <ResponsiveTable>
            <TableHeader className="subtable-header" subTableRow>
              <Column size="16%" alignTo="left">
                Logistic Partner
              </Column>
              <Column size="16%" alignTo="left">
                Tracking Number
              </Column>
              <Column size="16%" alignTo="left">
                Shipment Date
              </Column>
              <Column size="16%" alignTo="left">
                Expected Delivery
              </Column>
              <Column size="16%" alignTo="left">
                Delivery Date
              </Column>
              <Column size="16%" alignTo="left">
                Shipment Status
              </Column>
            </TableHeader>
            <TableContainer staticHeight="auto">
              {orderlistData.map((sublist, index) => (
                <TableRow key={index}>
                  <Column size="16%" alignTo="left">
                    {sublist.logisticpartner}
                  </Column>
                  <Column size="16%" alignTo="left">
                    {sublist.trackingnumber}
                  </Column>
                  <Column size="16%" alignTo="left">
                    {sublist.shipmentdate}
                  </Column>
                  <Column size="16%" alignTo="left">
                    {sublist.expecteddelivery}
                  </Column>
                  <Column size="16%" alignTo="left">
                    {sublist.deliverydate}
                  </Column>
                  <Column size="16%" alignTo="left">
                    {sublist.shipmentstatus}
                  </Column>
                </TableRow>
              ))}
            </TableContainer>
          </ResponsiveTable> */}
        </div>
      </Collapse>
    </>
  );
}

const Row = ({ row, index, setOpen, open, handleOpen }) => {
  return (
    <ActiveRowWrapper active={index === open}>
      <TableRow onClick={() => setOpen(index === open ? false : index)}>
        <Column size="10%" alignTo="left" key={index}>
          {row.date}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          {row.orderno}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          {row.customername}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          {row.city}
        </Column>
        <Column size="10%" alignTo="center" key={index}>
          {row.quantity}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          &#163;{row.totalamount}
        </Column>
        <Column size="15%" alignTo="left" key={index}>
          <Badge
            paid={row.paymentstatus === "Paid" ? true : false}
            unpaid={row.paymentstatus === "Unpaid" ? true : false}
            refund={row.paymentstatus === "Refund" ? true : false}
          >
            {row.paymentstatus}
          </Badge>
        </Column>
        <Column size="15%" alignTo="left" key={index}>
          <Badge
            processing={row.orderstatus === "Processing" ? true : false}
            delivered={row.orderstatus === "Delivered" ? true : false}
            cancelled={row.orderstatus === "Cancelled" ? true : false}
            shipped={row.orderstatus === "Shipped" ? true : false}
            outfordelivery={
              row.orderstatus === "Out for Delivery" ? true : false
            }
          >
            {row.orderstatus}
          </Badge>
        </Column>
        <Column size="10%">
          <ActionButtons>
            <IconButton size="small" color="primary" component="span">
              <CreateIcon />
            </IconButton>
            {index ? (
              <IconButton size="small" color="primary" component="span">
                <AddCircleIcon />
              </IconButton>
            ) : (
              <IconButton size="small" color="primary" component="span">
                <RemoveCircleIcon />
              </IconButton>
            )}
          </ActionButtons>
        </Column>
      </TableRow>
      <Collapse in={index === open} mountOnEnter unmountOnExit>
        <div className="details">
          <div className="order-details">
            <div className="address-details">
              Delivery Address
              <div className="address">
                <div className="property">E-mail</div>
                <div className="divider">:</div>
                <div className="value">kalimuthu@iwayy.com</div>
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
              Shipping Details
              <div className="address">
                <div className="property">Courier</div>
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
                <div className="property">Shipment Status</div>
                <div className="divider">:</div>
                <div className="value">Processing</div>
              </div>
            </div>
            <div className="address-details">
              Payment Details
              <div className="address">
                <div className="property">Mode of Payment</div>
                <div className="divider">:</div>
                <div className="value">Cash</div>
                <div className="property">VAT</div>
                <div className="divider">:</div>
                <div className="value">49.9</div>
                <div className="property">Discount</div>
                <div className="divider">:</div>
                <div className="value">0%</div>
                <div className="property">Promo Offer</div>
                <div className="divider">:</div>
                <div className="value">0%</div>
                <div className="property">Shipment Charges</div>
                <div className="divider">:</div>
                <div className="value">&#163;50</div>
                <div className="property">Total Amount</div>
                <div className="divider">:</div>
                <div className="value">&#163; 550</div>
                <div className="property">Status</div>
                <div className="divider">:</div>
                <div className="value">SUCCESS</div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <Button size="small" component="span">
              Cancel
            </Button>
            <Button size="small" component="span" onClick={handleOpen}>
              Shipment
            </Button>
          </div>
          <div className="inner-table">
            <ResponsiveTable>
              <TableHeader className="subtable-header" subTableRow>
                <Column size="5%" alignTo="center">
                  <CustomCheckbox color="primary" />
                </Column>
                <Column size="5%" alignTo="left">
                  Image
                </Column>
                <Column size="10%" alignTo="left">
                  SubOrder No
                </Column>
                <Column size="20%" alignTo="left">
                  Item Name
                </Column>
                <Column size="5%" alignTo="left">
                  Price
                </Column>
                <Column size="7%" alignTo="center">
                  Quantity
                </Column>
                <Column size="5%" alignTo="left">
                  Amount
                </Column>
                <Column size="5%" alignTo="left">
                  Discount
                </Column>
                <Column size="8%" alignTo="left">
                  Total Amount
                </Column>
                <Column size="10%" alignTo="left">
                  Order Status
                </Column>
                <Column size="10%" alignTo="left">
                  Action
                </Column>
              </TableHeader>
              <TableContainer staticHeight="auto">
                {innertableData.map((data, index) => (
                  <InnerRow key={index} innerrow={data} />
                ))}
              </TableContainer>
            </ResponsiveTable>
          </div>
        </div>
      </Collapse>
    </ActiveRowWrapper>
  );
};

function OrderListing() {
  const [dateTime, setDateTime] = useState(
    new Date("2021-01-01T00:00:00.000Z")
  );

  const ref = useRef();
  const [open, setOpen] = useState();
  const [view, setView] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setView(true);
  };

  const handleClose = () => {
    setView(false);
  };

  return (
    <OrderlistingStyles>
      <HeroSection
        // handlePrint={handlePrint}
        listType="Orders Today"
        // totalLists={products.length}
        isListing
        IconVisible
      />
      <Container>
        <OrderShipment open={view} handleClose={handleClose} />
        <PageHeader Title="Order List"></PageHeader>
        <FilterRow>
          <TextFieldInputs
            placeholder="Search OrderNo"
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
            placeholder="Payment Status"
            options={payment}
          />
          <AutocompleteInputs
            variant="filled"
            optionLabel="name"
            placeholder="Order Status"
            options={status}
          />
        </FilterRow>
        <ResponsiveTable ref={ref}>
          <TableHeader>
            {tableHead.map((item, index) => (
              <Column key={item.id} size={item.maxWidth} alignTo={item.align}>
                {item.label}
              </Column>
            ))}
          </TableHeader>
          <TableContainer staticHeight="33vh">
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
            // count={currentListCount()}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Rows"
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ResponsiveTable>
      </Container>
    </OrderlistingStyles>
  );
}

export default OrderListing;
