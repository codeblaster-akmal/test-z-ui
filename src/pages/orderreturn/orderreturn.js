import React, { useRef, useState } from "react";
import { OrderReturnStyles } from "./orderreturnstyles";
import {
  Container,
  HeroSection,
  PageHeader,
  Button,
  FilterRow,
  TextFieldInputs,
  DateTimePickerWrapper,
  AutocompleteInputs,
  ResponsiveTable,
  TableHeader,
  Column,
  ActiveRowWrapper,
  TableRow,
  TableContainer,
  ActionButtons,
  CustomCheckbox,
  Badge,
} from "components";
import {
  status,
  tableTitle,
  tablelist,
  innerData,
} from "pages/orderreturn/orderreturnData";
import ReturnDetails from "./returndetails";
import SearchIcon from "@material-ui/icons/Search";
import ProductImage from "../../assets/images/Product Images/Artboard 12.png";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Avatar, Collapse, TablePagination } from "@material-ui/core";

const Row = ({ row, index, setOpen, open, view, handleOpen }) => {
  return (
    <ActiveRowWrapper active={index === open}>
      <TableRow onClick={() => setOpen(index === open ? false : index)}>
        <Column size="10%" alignTo="left" key={index}>
          {row.date}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          {row.orderno}
        </Column>
        <Column size="15%" alignTo="left" key={index}>
          {row.customername}
        </Column>
        <Column size="15%" alignTo="left" key={index}>
          {row.address}
        </Column>
        <Column size="10%" alignTo="center" key={index}>
          {row.quantity}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          &#163;{row.totalamount}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          {row.refundable}
        </Column>
        <Column size="15%" alignTo="left" key={index}>
          <Badge
            process={row.status === "Processing" ? true : false}
            completed={row.status === "Completed" ? true : false}
            failed={row.status === "Failed" ? true : false}
          >
            {row.status}
          </Badge>
        </Column>
        <Column size="5%" alignTo="center">
          <ActionButtons>
            <IconButton size="small" color="primary" component="span">
              <VisibilityIcon />
            </IconButton>
          </ActionButtons>
        </Column>
      </TableRow>
      <Collapse in={index === open} mountOnEnter unmountOnExit>
        <div className="buttons">
          <Button size="small" component="span" onClick={handleOpen}>
            Accept
          </Button>
          <Button size="small" component="span">
            Reject
          </Button>
        </div>
        <ResponsiveTable>
          <TableHeader className="subtable-header" subTableRow>
            <Column size="5%" alignTo="center">
              <CustomCheckbox color="primary" />
            </Column>
            <Column size="5%" alignTo="left">
              Image
            </Column>
            <Column size="8%" alignTo="left">
              Item Order ID
            </Column>
            <Column size="18%" alignTo="left">
              Product Name
            </Column>
            <Column size="5%" alignTo="center">
              Quantity
            </Column>
            <Column size="5%" alignTo="left">
              Price
            </Column>
            <Column size="8%" alignTo="left">
              Total Amount
            </Column>
            <Column size="18%" alignTo="left">
              Reason
            </Column>
            <Column size="8%" alignTo="left">
              Tracking ID
            </Column>
            <Column size="7%" alignTo="left">
              Status
            </Column>
          </TableHeader>
          <TableContainer staticHeight="auto">
            {innerData.map((pro, index) => (
              <>
                <TableRow key={index}>
                  <Column size="5%" alignTo="center">
                    <CustomCheckbox color="primary" className="check" />
                  </Column>
                  <Column size="5%" alignTo="left">
                    <Avatar
                      variant="circle"
                      alt="Item Image"
                      src={ProductImage}
                    />
                  </Column>
                  <Column size="8%" alignTo="left">
                    {pro.itemorderid}
                  </Column>
                  <Column size="18%" alignTo="left">
                    {pro.productname}
                  </Column>
                  <Column size="5%" alignTo="center">
                    {pro.quantity}
                  </Column>
                  <Column size="5%" alignTo="left">
                    &#163;{pro.price}
                  </Column>
                  <Column size="8%" alignTo="left">
                    &#163;{pro.totalamount}
                  </Column>
                  <Column size="18%" alignTo="left">
                    {pro.reason}
                  </Column>
                  <Column size="8%" alignTo="left">
                    {pro.trackingid}
                  </Column>
                  <Column size="7%" alignTo="left">
                    <Badge
                      process={pro.status === "Processing" ? true : false}
                      completed={pro.status === "Completed" ? true : false}
                      failed={pro.status === "Failed" ? true : false}
                    >
                      {pro.status}
                    </Badge>
                  </Column>
                </TableRow>
              </>
            ))}
          </TableContainer>
        </ResponsiveTable>
      </Collapse>
    </ActiveRowWrapper>
  );
};

function OrderReturn() {
  const ref = useRef();
  const [open, setOpen] = useState();
  const [view, setView] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateTime, setDateTime] = useState(
    new Date("2021-01-01T00:00:00.000Z")
  );

  const handleOpen = () => {
    console.log(786678687);
    setView(true);
  };

  const handleClose = () => {
    setView(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <OrderReturnStyles>
      <HeroSection listType="Return Orders Today" isListing IconVisible />
      <Container>
        <ReturnDetails open={view} handleClose={handleClose} />
        <PageHeader Title="Order Return"></PageHeader>
        <FilterRow>
          <TextFieldInputs
            placeholder="Search Order No"
            InputProps={<SearchIcon />}
            variant="filled"
          />
          <TextFieldInputs
            placeholder="Search Mobile No"
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
        <ResponsiveTable ref={ref}>
          <TableHeader>
            {tableTitle.map((item, index) => (
              <Column key={item.id} alignTo={item.align} size={item.maxWidth}>
                {item.label}
              </Column>
            ))}
          </TableHeader>
          <TableContainer>
            {tablelist.map((data, index) => {
              return (
                <Row
                  key={index}
                  row={data}
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
    </OrderReturnStyles>
  );
}

export default OrderReturn;
