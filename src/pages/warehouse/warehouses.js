import React, { useEffect, useState } from "react";
import AddWarehouse from "./addWarehouse";
import CreateIcon from "@material-ui/icons/Create";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import SearchIcon from "@material-ui/icons/Search";
import { WarehouseStyles } from "./warehouseStyles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  Container,
  FilterRow,
  HeroSection,
  PageHeader,
  Button,
  TextFieldInputs,
  AutocompleteInputs,
  Badge,
  Column,
  TableContainer,
  TableHeader,
  TableRow,
  ResponsiveTable,
  ActionButtons,
} from "components";
import { TablePagination, IconButton } from "@material-ui/core";
import { getWarehouse, updateWarehouse } from "./warehouse.service";
import { MSG_TYPE, useDialog, useToaster } from "components/toastBar";

const statusoptions = [
  { title: "Active", value: true },
  { title: "InActive", value: false },
];

const typeDropDown = [
  { title: "Warehouse", value: "WAREHOUSE" },
  { title: "Showroom", value: "SHOWROOM" },
  { title: "Salon", value: "SALON" },
];

const initialValues = {
  type: "",
  name: "",
  addressLine1: "",
  addressLine2: "",
  county: "",
  cityId: "",
  zipcode: "",
  status: false,
  contactPerson: "",
  phone: "",
  email: "",
  btnText: "Save",
};

const Warehouse = () => {
  const toaster = useToaster();
  const { handleOpenDialog, handleCloseDialog } = useDialog();
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [warehouseData, setWarehouseData] = useState({
    values: [],
    initialValues: initialValues,
  });

  const [filter, setFilter] = useState({
    name: "",
    email: "",
    phone: "",
    contactPerson: "",
    status: "",
  });

  const warehouseDataHandler = async () => {
    const { data } = await getWarehouse();
    setWarehouseData({ ...warehouseData, values: data });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilter = (labelName) => (e, val) => {
    setFilter({
      ...filter,
      [labelName]: val ? val : e?.target?.value || "",
    });
  };

  const filterName = (filter, item) => {
    return item.name.toLowerCase().includes(filter.name.toLowerCase());
  };
  const filterContactPerson = (filter, item) => {
    return item.contactPerson
      .toLowerCase()
      .includes(filter.contactPerson.toLowerCase());
  };
  const filterPhoneNo = (filter, item) => {
    return item.phone.toLowerCase().includes(filter.phone.toLowerCase());
  };
  const filterEmail = (filter, item) => {
    return item.email.toLowerCase().includes(filter.email.toLowerCase());
  };
  const filterStatus = (filter, item) => {
    if (filter.status) return item.status === filter.status.value;
    else return item;
  };

  const filterItems = (filter, item) => {
    return (
      filterName(filter, item) &&
      filterContactPerson(filter, item) &&
      filterPhoneNo(filter, item) &&
      filterEmail(filter, item) &&
      filterStatus(filter, item)
    );
  };

  const filterationHandler = (item) => {
    if (
      filter.name ||
      filter.email ||
      filter.phone ||
      filter.contactPerson ||
      filter.status
    ) {
      if (filterItems(filter, item)) return item;
    } else {
      return item;
    }
  };

  const warehousePaginate = (warehouseArr) => {
    return warehouseArr.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  const onEditWarehouse = (item) => () => {
    handleOpen();
    setWarehouseData({
      ...warehouseData,
      initialValues: {
        ...warehouseData.initialValues,
        type: typeDropDown.find((type) => type.value === item.type),
        name: item.name,
        addressLine1: item.addressLine1,
        addressLine2: item.addressLine2,
        contactPerson: item.contactPerson,
        phone: item.phone,
        email: item.email,
        zipcode: item.zipcode,
        status: item.status,
        cityId: item.city,
        county: item.city.county,
        id: item.id,
        btnText: "Update",
      },
    });
  };

  const handleClickOpen = (callbackFunc, callbackValue) => () => {
    const dialogContent = {
      alertTitle: `${callbackValue.status ? "Inactivate" : "Activate"}`,
      alertAction: `${callbackValue.status ? "Inactive" : "active"}`,
      ContentText: `Are you sure you want to ${
        callbackValue.status ? "inactivate" : "activate"
      } this Warehouse`,
    };
    handleOpenDialog(dialogContent, callbackFunc, callbackValue);
  };

  const onActiveInactive = async (item) => {
    try {
      await updateWarehouse(item.id, { status: !item.status });
      warehouseDataHandler();
      handleCloseDialog();
      toaster(
        MSG_TYPE.SUCCESS,
        `Warehouse ${item.status ? "Inactivated" : "Activated"} successfully!`
      );
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  useEffect(() => {
    warehouseDataHandler();
  }, []);

  return (
    <WarehouseStyles>
      <HeroSection
        listType="Store"
        totalLists={warehouseData.values.length}
        isListing
      />
      <Container>
        <AddWarehouse
          open={open}
          handleClose={handleClose}
          typeDropDown={typeDropDown}
          initialValues={warehouseData.initialValues}
          warehouseDataHandler={warehouseDataHandler}
        />
        <PageHeader Title="Store">
          <Button onClick={handleOpen}>Add</Button>
        </PageHeader>
        <FilterRow>
          <TextFieldInputs
            className="filter-column"
            placeholder="Search Name"
            InputProps={<SearchIcon />}
            variant="filled"
            name="name"
            onChange={handleFilter("name")}
          />
          <TextFieldInputs
            placeholder="Search Contact person"
            InputProps={<SearchIcon />}
            variant="filled"
            name="contactPerson"
            onChange={handleFilter("contactPerson")}
          />
          <TextFieldInputs
            placeholder="Search Phone"
            InputProps={<SearchIcon />}
            variant="filled"
            name="phone"
            onChange={handleFilter("phone")}
          />
          <TextFieldInputs
            placeholder="Search Email"
            InputProps={<SearchIcon />}
            variant="filled"
            name="email"
            onChange={handleFilter("email")}
          />
          <AutocompleteInputs
            variant="filled"
            optionLabel="title"
            placeholder="Status"
            options={statusoptions}
            name="status"
            onChange={handleFilter("status")}
          />
        </FilterRow>
        <ResponsiveTable>
          <TableHeader>
            <Column size="12%" alignTo="left">
              Type
            </Column>
            <Column size="12%" alignTo="left">
              Name
            </Column>
            <Column size="15%" alignTo="left">
              Address
            </Column>
            <Column size="12%" alignTo="left">
              Contact Person
            </Column>
            <Column size="12%" alignTo="left">
              Phone
            </Column>
            <Column size="12%" alignTo="left">
              Email
            </Column>
            <Column size="8%">Status</Column>
            <Column size="8%">Action</Column>
          </TableHeader>
          <TableContainer>
            {warehousePaginate(
              warehouseData.values.filter(filterationHandler)
            ).map((column, index) => (
              <TableRow key={index}>
                <Column size="12%" alignTo="left" data-label="Type">
                  {column.type}
                </Column>
                <Column size="12%" alignTo="left" data-label="Name">
                  {column.name}
                </Column>
                <Column size="15%" alignTo="left" data-label="Address">
                  {`${column.addressLine1} ${
                    column.addressLine2 ? column.addressLine2 : ""
                  } ${column?.city?.name} ${column.city?.county?.name} - ${
                    column.zipcode
                  }`}
                </Column>
                <Column size="12%" alignTo="left" data-label="Contact Name">
                  {column.contactPerson}
                </Column>
                <Column size="12%" alignTo="left" data-label="Phone">
                  {column.phone}
                </Column>
                <Column size="12%" alignTo="left" data-label="Email">
                  {column.email}
                </Column>
                <Column size="8%" data-label="Status">
                  <Badge badgeType={column.status ? "Active" : "Inactive"}>
                    {column.status ? "Active" : "Inactive"}
                  </Badge>
                </Column>
                <Column size="8%" data-label="Action">
                  <ActionButtons>
                    <IconButton
                      size="small"
                      color="primary"
                      component="span"
                      onClick={onEditWarehouse(column)}
                    >
                      <CreateIcon />
                    </IconButton>
                    {!column.status ? (
                      <IconButton
                        size="small"
                        color="primary"
                        component="span"
                        onClick={handleClickOpen(onActiveInactive, column)}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        color="primary"
                        component="span"
                        onClick={handleClickOpen(onActiveInactive, column)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    )}
                  </ActionButtons>
                </Column>
              </TableRow>
            ))}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={warehouseData.values.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ResponsiveTable>
      </Container>
    </WarehouseStyles>
  );
};

export default Warehouse;
