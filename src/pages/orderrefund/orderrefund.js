import React, { useState, useRef } from "react";
import {
  HeroSection,
  PageHeader,
  Container,
  Button,
  FilterRow,
  TextFieldInputs,
  DateTimePickerWrapper,
  AutocompleteInputs,
  ResponsiveTable,
  TableHeader,
  TableContainer,
  ActiveRowWrapper,
  TableRow,
  Column,
  ActionButtons,
  CustomCheckbox,
  Badge,
} from "components";
import {
  status,
  tableHead,
  tableData,
  innertableData,
} from "./orderrefundData";
import { OrderRefundStyles } from "./orderrefundstyles";
import ProductImage from "../../assets/images/Product Images/Artboard 10.png";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import {
  IconButton,
  Collapse,
  Avatar,
  TablePagination,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";

const Row = ({ row, index, setOpen, open }) => {
  return (
    <ActiveRowWrapper active={index === open}>
      <TableRow onClick={() => setOpen(index === open ? false : index)}>
        <Column size="10%" alignTo="left">
          {row.date}
        </Column>
        <Column size="10%" alignTo="left">
          {row.orderid}
        </Column>
        <Column size="10%" alignTo="left">
          {row.type}
        </Column>
        <Column size="10%" alignTo="left">
          &#163;{row.refundamount}
        </Column>
        <Column size="10%" alignTo="left">
          <Badge
            success={row.status === "Success" ? true : false}
            failure={row.status === "Failure" ? true : false}
            pending={row.status === "Pending" ? true : false}
          >
            {row.status}
          </Badge>
        </Column>
        <Column size="5%" alignTo="left">
          <ActionButtons>
            <IconButton size="small" color="primary" component="span">
              <VisibilityIcon />
            </IconButton>
          </ActionButtons>
        </Column>
      </TableRow>
      <Collapse in={index === open} mountOnEnter unmountOnExit>
        <div className="buttons">
          <TextFieldInputs placeholder="Reference ID" variant="outlined" />
          <Button size="small" component="span">
            Refund
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
            <Column size="13%" alignTo="left">
              Refund Amount
            </Column>
            <Column size="18%" alignTo="left">
              Reason
            </Column>
            <Column size="7%" alignTo="left">
              Status
            </Column>
          </TableHeader>
          <TableContainer staticHeight="auto">
            {innertableData.map((pro, index) => (
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
                  <Column size="13%" alignTo="left">
                    &#163;{pro.refunditemamount}
                  </Column>
                  <Column size="18%" alignTo="left">
                    {pro.reason}
                  </Column>
                  <Column size="7%" alignTo="left">
                    <Badge
                      success={pro.status === "Success" ? true : false}
                      failure={pro.status === "Failure" ? true : false}
                      pending={pro.status === "Pending" ? true : false}
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

function OrderRefund() {
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
    <OrderRefundStyles>
      <HeroSection listType="Refund Orders Today" isListing IconVisible />
      <Container>
        <PageHeader Title="Order Refund"></PageHeader>
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
            {tableHead.map((head, index) => (
              <Column key={head.id} size={head.maxWidth} alignTo={head.align}>
                {head.label}
              </Column>
            ))}
          </TableHeader>
          <TableContainer>
            {tableData.map((data, index) => {
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
            count="2"
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Rows"
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ResponsiveTable>
      </Container>
    </OrderRefundStyles>
  );
}

export default OrderRefund;
