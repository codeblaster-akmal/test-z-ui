import React, { useState, useRef } from "react";
import { OrderCancelStyles } from "./ordercancelstyles";
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
} from "components";
import {
  status,
  tableTitle,
  tablelist,
  innerData,
} from "pages/ordercancel/ordercancelData";
import ProductImage from "../../assets/images/Product Images/Artboard 12.png";
import SearchIcon from "@material-ui/icons/Search";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Avatar, Collapse, TablePagination } from "@material-ui/core";

const Row = ({ row, index, setOpen, open }) => {
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
          {row.discount}
        </Column>
        <Column size="10%" alignTo="left" key={index}>
          &#163;{row.totalamount}
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
          <Button size="small" component="span">
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
            <Column size="5%" alignTo="left">
              Quantity
            </Column>
            <Column size="8%" alignTo="left">
              Amount
            </Column>
            <Column size="18%" alignTo="left">
              Reason
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
                  <Column size="8%" alignTo="left">
                    &#163;{pro.amount}
                  </Column>
                  <Column size="18%" alignTo="left">
                    {pro.reason}
                  </Column>
                  <Column size="7%" alignTo="left">
                    {pro.status}
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

function OrderCancel() {
  const ref = useRef();
  const [open, setOpen] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateTime, setDateTime] = useState(
    new Date("2021-01-01T00:00:00.000Z")
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <OrderCancelStyles>
      <HeroSection listType="Cancel Orders Today" isListing IconVisible />
      <Container>
        <PageHeader Title="Order Cancel"></PageHeader>
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
    </OrderCancelStyles>
  );
}

export default OrderCancel;
