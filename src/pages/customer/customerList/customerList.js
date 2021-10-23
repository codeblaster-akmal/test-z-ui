import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
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
import { status } from "./customerlistData";
import SearchIcon from "@material-ui/icons/Search";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { tableHead, innertableData } from "./customerlistData";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Avatar, Collapse, TablePagination } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import { OrderlistingStyles } from "../../orderlisting/orderlistingstyles";
import ProductImage from "assets/images/Product Images/Artboard 11.png";
import { getCustomers } from "./customers.service";

const InnerRow = ({ innerrow }) => {
  const [show] = useState(false);
  return (
    <>
      <TableRow>
        <Column size="5%" alignTo="left">
          <CustomCheckbox color="primary" />
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
        <Column size="7%" alignTo="left">
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

const Row = (props) => {
  const { data, index, setOpen, open, baseUrl } = props;
  console.log(656757756576, data);
  const history = useHistory();
  return (
    <ActiveRowWrapper active={index === open}>
      <TableRow onClick={() => setOpen(index === open ? false : index)}>
        <Column size="10%" alignTo="left">
          <Avatar
            variant="circle"
            alt="Item Image"
            src={`${baseUrl}/${data.image}`}
          />
        </Column>
        <Column size="18%" alignTo="left">
          {`${data.firstName} ${data.lastName}`}
        </Column>
        <Column size="15%" alignTo="left">
          {data.email}
        </Column>
        <Column size="10%" alignTo="left">
          {data.mobile}
        </Column>
        <Column size="10%">{data.customer_addresses.city.name}</Column>
        <Column size="10%">
          <Badge badgeType={data.status ? "Active" : "Inactive"}>
            {data.status ? "Active" : "Inactive"}
          </Badge>
        </Column>
        <Column size="10%">
          <ActionButtons>
            <IconButton
              size="small"
              color="primary"
              component="span"
              onClick={() => history.push(`/customerView/${data.id}`)}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton size="small" color="primary" component="span">
              <BlockIcon />
            </IconButton>
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
                <div className="value">{data.email}</div>
                <div className="property">Phone No</div>
                <div className="divider">:</div>
                <div className="value">{data.mobile}</div>
                <div className="property">Address</div>
                <div className="divider">:</div>
                <div className="value">{`${data.customer_addresses.address1} ${data.customer_addresses.address2}`}</div>
                <div className="property">City</div>
                <div className="divider">:</div>
                <div className="value">{data.customer_addresses.city.name}</div>
                <div className="property">County</div>
                <div className="divider">:</div>
                <div className="value">{`${data.customer_addresses.city.county.name}-${data.customer_addresses.postcode}`}</div>
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
          <div className="inner-table">
            <ResponsiveTable>
              <TableHeader className="subtable-header" subTableRow>
                <Column size="5%" alignTo="left">
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
                <Column size="7%" alignTo="left">
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

function CustomerList() {
  const [open, setOpen] = useState();
  const [view, setView] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [dateTime, setDateTime] = useState(
    new Date("2021-01-01T00:00:00.000Z")
  );
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const customerDataHandler = async () => {
    const { data } = await getCustomers();
    const alterData = data.map((customer) => {
      return {
        ...customer,
        customer_addresses: customer.customer_addresses.find(
          (address) => address.isDefault === true
        ),
      };
    });
    setCustomerData(alterData);
  };

  console.log(41243224, customerData);
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
    setView(!view);
  };

  useEffect(() => {
    customerDataHandler();
  }, []);
  return (
    <OrderlistingStyles>
      <HeroSection
        // handlePrint={handlePrint}
        listType="Customers Today"
        // totalLists={products.length}
        isListing
        IconVisible
      />
      <Container>
        <PageHeader Title="Customer List">
          {/* <Button>Add</Button> */}
        </PageHeader>
        <FilterRow>
          <TextFieldInputs
            placeholder="Search Name/MobileNo/Email"
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
          <TextFieldInputs
            placeholder="Search City"
            InputProps={<SearchIcon />}
            variant="filled"
          />
          <AutocompleteInputs
            variant="filled"
            optionLabel="name"
            placeholder="Status"
            options={status}
          />
        </FilterRow>
        <ResponsiveTable>
          <TableHeader>
            {tableHead.map((item) => (
              <Column key={item.id} size={item.maxWidth} alignTo={item.align}>
                {item.label}
              </Column>
            ))}
          </TableHeader>
          <TableContainer>
            {customerData.map((data, index) => {
              return (
                <Row
                  key={data.id}
                  data={data}
                  setOpen={setOpen}
                  open={open}
                  index={index}
                  baseUrl={baseUrl}
                  handleOpen={handleOpen}
                />
              );
            })}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            size="small"
            count={customerData.length}
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

export default CustomerList;
