import React, { useState, useEffect } from "react";
import LayoutStyleWrapper from "../brand/brandStyle";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  TextFieldInputs,
  AutocompleteInputs,
  TableRow,
  TableContainer,
  Column,
  ResponsiveTable,
  CustomSwitch,
  PageHeader,
  Container,
  FilterRow,
  HeroSection,
  Button,
  TableHeader,
  ActionButtons,
  Badge,
  SubHeaderLabel,
} from "components";
import {
  createVariant,
  getAllSubGroup,
  getAllVariant,
  updateVariant,
} from "./variants.service.js";
import { MSG_TYPE, useToaster, useDialog } from "components/toastBar";
import { toTitleCase } from "utils/utilsFunc";
import { IconButton, TablePagination } from "@material-ui/core";

const grouphead = [
  {
    id: "name",
    align: "left",
    label: "Variant",
    width: "20%",
  },
  {
    id: "group",
    label: "Sub Group",
    width: "30%",
    align: "left",
  },
  {
    id: "subGroup",
    label: "Group",
    align: "left",
    width: "20%",
  },
  {
    id: "status",
    label: "Status",
    width: "8%",
  },
  {
    id: "action",
    label: "Action",
    width: "10%",
  },
];

const statusOptions = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];

const initialValues = {
  variantsname: "",
  subGroup: "",
  status: true,
  isImage: false,
  btnTxt: "ADD",
};

const validationSchema = Yup.object().shape({
  variantsname: Yup.string()
    .min(1, "Must be exactly 1 character")
    .required("Required!"),
  subGroup: Yup.object().required("Required!"),
});

function Variants() {
  const toaster = useToaster();
  const { handleOpenDialog, handleCloseDialog } = useDialog();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [subGroupDropdown, setSubGroupDropdown] = useState([]);
  const [group, setGroup] = useState("");
  const [variants, setVariants] = useState([]);
  const [state, setState] = useState(initialValues);
  const [filter, setFilter] = useState({
    name: "",
    subGroup: "",
    status: "",
  });

  useEffect(() => {
    fetchFunc();
  }, []);

  const onActiveInactive = async (item) => {
    try {
      await updateVariant(
        item.id,
        { status: !item.status },
        "toggle_status=true"
      );
      fetchFunc();
      handleCloseDialog();
      toaster(MSG_TYPE.SUCCESS, "Status updated successfully");
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  const handleClickOpen = (callbackFunc, callbackValue) => () => {
    const dialogContent = {
      alertTitle: `${callbackValue.status ? "Inactivate" : "Activate"} variant`,
      alertAction: `${callbackValue.status ? "inactive" : "active"}`,
      ContentText: `Are you sure you want to ${
        callbackValue.status ? "inactivate" : "activate"
      } this variant`,
    };
    handleOpenDialog(dialogContent, callbackFunc, callbackValue);
  };

  const fetchFunc = async () => {
    const { data } = await getAllSubGroup();
    setSubGroupDropdown(data);

    const { data: variantData } = await getAllVariant();
    setVariants(variantData);
  };

  const onEditVariant = (item) => {
    setGroup(item.sub_group.group?.name ? item.sub_group.group.name : "");
    setState({
      ...state,
      variantsname: item.name,
      status: item.status,
      isImage: item.isImage,
      subGroup: item.sub_group,
      id: item.id,
      btnTxt: "UPDATE",
      prdVariantsLength: item.product_variants.length,
      checkIsImg: item.isImage,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onsubmit = async (values, submitProps) => {
    if (values && values.id) {
      try {
        if (
          values.isImage !== values.checkIsImg &&
          values.prdVariantsLength > 0
        ) {
          return toaster(
            MSG_TYPE.WARNING,
            "Product has been added for this variant!"
          );
        }

        const data = {
          name: values.variantsname.trim().replace(/ +(?= )/g, ""),
          status: values.status,
          isImage: values.isImage,
          subGroupId: values.subGroup.id,
        };

        let flag = false;
        variants.forEach((foo) => {
          if (
            foo.name.toLowerCase() === data.name.toLowerCase() &&
            foo.subGroupId === data.subGroupId &&
            values.id !== foo.id
          ) {
            flag = true;
          }
        });

        if (flag) {
          toaster(MSG_TYPE.WARNING, "Variant already exits");
        } else {
          await updateVariant(values.id, data);

          submitProps.resetForm();
          fetchFunc();
          setState(initialValues);
          setGroup("");
          toaster(MSG_TYPE.SUCCESS, "Variant updated successfully");
        }
      } catch (err) {
        toaster(MSG_TYPE.WARNING, err);
      }
    } else {
      try {
        const data = {
          name: values.variantsname.trim().replace(/ +(?= )/g, ""),
          status: values.status,
          isImage: values.isImage,
          subGroupId: values.subGroup.id,
        };

        let flag = false;
        variants.forEach((foo) => {
          if (
            foo.name.toLowerCase() === data.name.toLowerCase() &&
            foo.subGroupId === data.subGroupId
          ) {
            flag = true;
          }
        });

        if (flag) {
          toaster(MSG_TYPE.WARNING, "Variant already exits");
        } else {
          await createVariant(data);

          submitProps.resetForm();
          setGroup("");
          fetchFunc();
          setState(initialValues);
          toaster(MSG_TYPE.SUCCESS, "Variant created successfully");
        }
      } catch (err) {
        toaster(MSG_TYPE.WARNING, err);
      }
    }
  };

  const filterStatus = (filter, item) => {
    if (filter.status) return item.status === filter.status.value;
    else return item;
  };

  const filterVariant = (filter, item) => {
    return item.name.toLowerCase().includes(filter.name.toLowerCase());
  };

  const filterSubGroup = (filter, item) => {
    if (filter.subGroup) return item.sub_group.id === filter.subGroup.id;
    else return item;
  };

  const filterItems = (filter, item) => {
    return (
      filterVariant(filter, item) &&
      filterStatus(filter, item) &&
      filterSubGroup(filter, item)
    );
  };

  const filterFunction = (item) => {
    if (filter && (filter.name || filter.subGroup || filter.status)) {
      if (filterItems(filter, item)) return item;
    } else {
      return item;
    }
  };

  const handleFilter = (labelName) => (e, val) => {
    setFilter({
      ...filter,
      [labelName]: labelName === "name" ? e.target.value : val || "",
    });
  };

  const variantPaginate = (variantArr) => {
    return variantArr.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  const currentListCount = () => variants.filter(filterFunction).length;

  return (
    <>
      <HeroSection listType="Variants" IconVisible totalLists={variants.length} isListing />
      <LayoutStyleWrapper>
        <Container>
          <div className="container-one">
            <PageHeader Title="Variants" />
            <FilterRow>
              <TextFieldInputs
                className="filter-column"
                placeholder="Search Variants Name"
                InputProps={<SearchIcon />}
                variant="filled"
                name="name"
                value={filter.name}
                onChange={handleFilter("name")}
              />
              <AutocompleteInputs
                options={subGroupDropdown}
                placeholder="Select Sub Group"
                variant="filled"
                optionLabel="name"
                name="subGroup"
                onChange={handleFilter("subGroup")}
              />
              <AutocompleteInputs
                options={statusOptions}
                placeholder="Select Status"
                variant="filled"
                optionLabel="label"
                onChange={handleFilter("status")}
              />
            </FilterRow>
            <ResponsiveTable>
              <TableHeader>
                {grouphead.map((column) => (
                  <Column
                    key={column.id}
                    size={column.width}
                    alignTo={column.align}
                  >
                    {column.label}
                  </Column>
                ))}
              </TableHeader>
              <TableContainer>
                {variantPaginate(variants.filter(filterFunction)).map(
                  (row, index) => {
                    return (
                      <TableRow key={index}>
                        <Column size="20%" alignTo="left">
                          {row.name}
                        </Column>
                        <Column size="30%" alignTo="left">
                          {row.sub_group.name}
                        </Column>
                        <Column size="20%" alignTo="left">
                          {row.sub_group.group.name}
                        </Column>
                        <Column size="8%">
                          <Badge badgeType={row.status ? "Active" : "Inactive"}>
                            {row.status ? "Active" : "Inactive"}
                          </Badge>
                        </Column>
                        <Column size="10%">
                          <ActionButtons>
                            {/* <IconButton
                              size="small"
                              color="primary"
                              component="span"
                            >
                              <VisibilityIcon />
                            </IconButton> */}
                            <IconButton
                              size="small"
                              color="primary"
                              component="span"
                              onClick={() => onEditVariant(row)}
                            >
                              <CreateIcon />
                            </IconButton>
                            {!row.status ? (
                              <IconButton
                                size="small"
                                color="primary"
                                component="span"
                                onClick={handleClickOpen(onActiveInactive, row)}
                              >
                                <AddCircleIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                size="small"
                                color="primary"
                                component="span"
                                onClick={handleClickOpen(onActiveInactive, row)}
                              >
                                <RemoveCircleIcon />
                              </IconButton>
                            )}
                            <IconButton
                              size="small"
                              color="primary"
                              component="span"
                              onClick={() => onEditVariant(row)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ActionButtons>
                        </Column>
                      </TableRow>
                    );
                  }
                )}
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={currentListCount()}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </ResponsiveTable>
          </div>
        </Container>
        <Container>
          <Formik
            initialValues={state}
            onSubmit={onsubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                resetForm,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <div className="container-two">
                    <div className="scrollcontainer">
                      <div className="add">
                        <div className="input-height mt-2 mb-3">
                          <TextFieldInputs
                            className="inputField"
                            autoComplete="off"
                            id="variantsname"
                            label="Name *"
                            name="variantsname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.variantsname}
                            helperText={
                              errors.variantsname &&
                              touched.variantsname &&
                              errors.variantsname
                            }
                            error={errors.variantsname && touched.variantsname}
                          />
                        </div>
                        <div className="input-height mt-2 mb-2">
                          <AutocompleteInputs
                            options={subGroupDropdown}
                            label="Sub Group *"
                            id="subGroup"
                            name="subGroup"
                            optionLabel="name"
                            onBlur={handleBlur}
                            onChange={(e, value) => {
                              setGroup(
                                value.group?.name ? value.group.name : ""
                              );
                              setFieldValue(
                                "subGroup",
                                value !== null ? value : initialValues.subGroup
                              );
                            }}
                            value={values.subGroup}
                            helperText={
                              errors.subGroup &&
                              touched.subGroup &&
                              errors.subGroup
                            }
                            error={errors.subGroup && touched.subGroup}
                          />
                        </div>
                        <div className="text-display my-4">
                          <div className="label-title">
                            Group&nbsp;&nbsp;:&nbsp;&nbsp;
                          </div>
                          <SubHeaderLabel textappear="normal">
                            {toTitleCase(group)}
                          </SubHeaderLabel>
                        </div>
                        
                          <CustomSwitch
                            name="isImage"
                            label="Images Required"
                            onChange={handleChange}
                            checked={values.isImage}
                            labelPlacement="start"
                          />

                        <div className="status my-4">
                          <CustomSwitch
                            name="status"
                            label="Status"
                            onChange={handleChange}
                            checked={values.status}
                            labelPlacement="start"
                          />
                        </div>
                        <div className="brandbtn">
                          <Button
                            variant="buttonprimary"
                            onClick={() => {
                              resetForm();
                              setGroup("");
                              setState(initialValues);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button variant="buttonprimary" type="submit" disabled={!values.variantsname}>
                            {values.btnTxt}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Container>
      </LayoutStyleWrapper>
    </>
  );
}
export default Variants;
