import React, { useState } from "react";
import { useHistory } from "react-router";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { offerList, statusOption, promotionList } from "../fromData";
import {
  Container,
  FilterRow,
  PageHeader,
  TextFieldInputs,
  AutocompleteInputs,
  DateTimePickerWrapper,
  ResponsiveTable,
  TableHeader,
  Column,
  TableRow,
  Button,
  HeroSection,
  ActionButtons,
  TableContainer,
  Badge,
} from "components";
import { TablePagination } from "@material-ui/core";

const PromotionList = () => {
  const history = useHistory();
  const [dateTime, setDateTime] = useState(
    new Date("2021-01-01T00:00:00.000Z")
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <HeroSection
        IconVisible
        isListing
        listType="Product"
        totalLists={promotionList.length}
      />
      <Container>
        <PageHeader Title="Offers List">
          <Button onClick={() => history.push("/promoAdd")}>Add</Button>
        </PageHeader>
        <FilterRow>
          <AutocompleteInputs
            variant="filled"
            optionLabel="name"
            placeholder="Type"
            options={offerList}
          />
          <TextFieldInputs
            placeholder="Title"
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
            options={statusOption}
          />
        </FilterRow>
        <ResponsiveTable>
          <TableHeader>
            <Column size="10%">Date</Column>
            <Column alignTo="left" size="10%">
              Title
            </Column>
            <Column size="10%" alignTo="left">
              Offer type
            </Column>
            <Column size="10%">Discount</Column>
            <Column size="10%">Date from</Column>
            <Column size="10%">Expiry Date</Column>
            <Column size="10%">Offers for</Column>
            <Column size="10%">Status</Column>
            <Column size="10%">Action</Column>
          </TableHeader>
          <TableContainer>
            {promotionList.map((product, index) => (
              <TableRow key={index}>
                <Column size="10%" data-label="Date">
                  {product.date}
                </Column>
                <Column alignTo="left" size="10%" data-label="Title">
                  {product.title}
                </Column>
                <Column size="10%" alignTo="left" data-label="Offer type">
                  {product.type}
                </Column>
                <Column size="10%" data-label="Discount">
                  {product.discount}%
                </Column>
                <Column size="10%" data-label="Date from">
                  {product.fromDate}
                </Column>
                <Column size="10%" data-label="Expiry Date">
                  {product.expiryDate}
                </Column>
                <Column size="10%" data-label="Offers for">
                  {product.for}
                </Column>
                <Column size="10%" data-label="Status">
                  <Badge 
                  enabled={product.status === "Enabled" ? true : false}
                  disabled={product.status === "Disabled" ? true : false}
                  >
                    {product.status}
                  </Badge>
                </Column>
                <Column size="10%" data-label="Action">
                  <ActionButtons>
                    <IconButton size="small" color="primary" component="span">
                      <CreateIcon />
                    </IconButton>
                    <IconButton size="small" color="primary" component="span">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" color="primary" component="span">
                      <RemoveCircleIcon />
                    </IconButton>
                  </ActionButtons>
                </Column>
              </TableRow>
            ))}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            size="small"
            count={promotionList.length}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Rows"
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ResponsiveTable>
      </Container>
    </>
  );
};

export default PromotionList;
