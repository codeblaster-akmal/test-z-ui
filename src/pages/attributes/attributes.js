import React, { useEffect, useState } from "react";
import LayoutStyleWrapper from "../brand/brandStyle";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import { upperCaseFunc, toTitleCase } from "utils/utilsFunc";
import {
  createAttribute,
  updateAttribute,
  getAllAttribute,
  getAllSubGroup,
  getAllUom,
  getAllVariant,
} from "./attributes.service.js";
import { MSG_TYPE, useToaster, useDialog } from "components/toastBar";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
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
import { IconButton, TablePagination } from "@material-ui/core";

const grouphead = [
  {
    id: "name",
    align: "left",
    label: "Attribute",
    width: "10%",
  },
  {
    id: "variant",
    label: "Variant",
    align: "left",
    width: "10%",
  },
  {
    id: "subgroup",
    label: "Sub Group",
    align: "left",
    width: "20%",
  },
  {
    id: "group",
    label: "Group",
    align: "left",
    width: "20%",
  },
  {
    id: "category",
    label: "Category",
    align: "left",
    width: "15%",
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
  variants: "",
  attributevalue: "",
  uom: "",
  subgroup: "",
  status: true,
  btnTxt: "ADD",
};

const validationSchema = Yup.object().shape({
  variants: Yup.object().required("Required!"),
  attributevalue: Yup.string().required("Required!"),
  subgroup: Yup.object().required("Required!"),
});

function Attributes() {
  const toaster = useToaster();
  const { handleOpenDialog, handleCloseDialog } = useDialog();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [dropDown, setDropDown] = useState({
    variants: [],
    subGroups: [],
    group: "",
    disable: true,
    uom: [],
  });
  const [dropDownFilter, setDropDownFilter] = useState({
    variants: [],
    subGroups: [],
  });
  const [state, setState] = useState(initialValues);
  const [attributes, setAttributes] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    variant: "",
    subGroup: "",
    status: "",
  });

  useEffect(() => {
    fetchFunc();
  }, []);

  const fetchFunc = async () => {
    const { data } = await getAllSubGroup();
    const { data: uomData } = await getAllUom();
    const { data: attrData } = await getAllAttribute();
    const { data: varData } = await getAllVariant();

    setDropDown({ ...dropDown, subGroups: data, uom: uomData });
    setDropDownFilter({
      ...dropDownFilter,
      subGroups: data,
      variants: varData,
    });
    setAttributes(attrData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (callbackFunc, callbackValue) => () => {
    const dialogContent = {
      alertTitle: `${
        callbackValue.status ? "Inactivate" : "Activate"
      } attribute`,
      alertAction: `${callbackValue.status ? "inactive" : "active"}`,
      ContentText: `Are you sure you want to ${
        callbackValue.status ? "inactivate" : "activate"
      } this attribute`,
    };
    handleOpenDialog(dialogContent, callbackFunc, callbackValue);
  };

  const onActiveInactive = async (item) => {
    try {
      await updateAttribute(
        item.id,
        { status: !item.status },
        "toggle_status=true"
      );
      await fetchFunc();
      handleCloseDialog();
      toaster(MSG_TYPE.SUCCESS, "Status updated successfully");
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  const onEditAttribute = (item) => {
    setState({
      ...state,
      status: item.status,
      id: item.id,
      uom: item.uom,
      attributevalue: item.name,
      variants: item.variant,
      subgroup: item.variant.sub_group,
      btnTxt: "UPDATE",
    });
    setDropDown({
      ...dropDown,
      disable: false,
      variants: dropDown.subGroups.filter(
        (foo) => foo.id === item.variant.sub_group.id
      )[0].variants,
      group: item.variant.sub_group.group.name,
    });
  };

  const onsubmit = async (values, submitProps) => {
    if (values && values.id) {
      try {
        const data = {
          name: values.attributevalue.trim().replace(/ +(?= )/g, ""),
          status: values.status,
          uomId: values.uom ? values.uom.id : null,
          variantId: values.variants.id,
        };

        let flag = false;
        attributes.forEach((foo) => {
          if (
            foo.name.toLowerCase() === data.name.toLowerCase() &&
            foo.variantId === data.variantId &&
            values.id !== foo.id
          ) {
            flag = true;
          }
        });

        if (flag) {
          toaster(MSG_TYPE.WARNING, "Attribute already exits");
        } else {
          const res = await updateAttribute(values.id, data);

          if (res) {
            fetchFunc();
            setState(initialValues);
            submitProps.resetForm();
            toaster(MSG_TYPE.SUCCESS, "Attribute updated successfully");
          }
        }
      } catch (err) {
        toaster(MSG_TYPE.WARNING, err);
      }
    } else {
      try {
        const data = {
          name: values.attributevalue.trim().replace(/ +(?= )/g, ""),
          status: values.status,
          uomId: values.uom.id,
          variantId: values.variants.id,
        };

        let flag = false;
        attributes.forEach((foo) => {
          if (
            foo.name.toLowerCase() === data.name.toLowerCase() &&
            foo.variantId === data.variantId
          ) {
            flag = true;
          }
        });

        if (flag) {
          toaster(MSG_TYPE.WARNING, "Attribute already exits");
        } else {
          const res = await createAttribute(data);
          if (res) {
            fetchFunc();
            submitProps.resetForm();
            toaster(MSG_TYPE.SUCCESS, "Attribute created successfully");
          }
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

  const filterAttribute = (filter, item) => {
    return item.name.toLowerCase().includes(filter.name.toLowerCase());
  };

  const filterSubGroup = (filter, item) => {
    if (filter.subGroup)
      return item.variant.sub_group.id === filter.subGroup.id;
    else return item;
  };

  const filterVariant = (filter, item) => {
    if (filter.variant) return item.variant.id === filter.variant.id;
    else return item;
  };

  const filterItems = (filter, item) => {
    return (
      filterAttribute(filter, item) &&
      filterVariant(filter, item) &&
      filterSubGroup(filter, item) &&
      filterStatus(filter, item)
    );
  };

  const filterFunction = (item) => {
    if (
      filter &&
      (filter.name || filter.variant || filter.subGroup || filter.status)
    ) {
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

  const attributePaginate = (attributeArr) => {
    return attributeArr.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  const currentListCount = () => attributes.filter(filterFunction).length;

  return (
    <>
      <HeroSection
        listType="Attributes"
        totalLists={attributes.length}
        isListing
        IconVisible
      />
      <LayoutStyleWrapper>
        <Container>
          <div className="contanierone">
            <PageHeader Title="Attributes"></PageHeader>
            <FilterRow>
              <TextFieldInputs
                placeholder="Search Attribute Name"
                InputProps={<SearchIcon />}
                variant="filled"
                name="name"
                value={filter.name}
                onChange={handleFilter("name")}
              />
              <AutocompleteInputs
                options={dropDownFilter.variants}
                placeholder="Select Variant"
                variant="filled"
                optionLabel="name"
                name="variant"
                onChange={handleFilter("variant")}
              />
              <AutocompleteInputs
                options={dropDownFilter.subGroups}
                placeholder="Select Sub group"
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
                {attributePaginate(attributes.filter(filterFunction)).map(
                  (row, index) => {
                    return (
                      <TableRow key={index}>
                        <Column size="10%" alignTo="left">
                          {upperCaseFunc(row.name)}
                        </Column>
                        <Column size="10%" alignTo="left">
                          {row.variant.name}
                        </Column>
                        <Column size="20%" alignTo="left">
                          {row.variant.sub_group.name}
                        </Column>
                        <Column size="20%" alignTo="left">
                          {row.variant.sub_group.group.name}
                        </Column>
                        <Column size="15%" alignTo="left">
                          {row.variant.sub_group.group.category.name}
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
                              onClick={() => onEditAttribute(row)}
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
                        <div className="input-height my-2">
                          <AutocompleteInputs
                            options={dropDown.subGroups}
                            label="Sub Group *"
                            id="subgroup"
                            name="subgroup"
                            optionLabel="name"
                            onBlur={handleBlur}
                            onChange={(e, value) => {
                              if (value) {
                                setFieldValue(
                                  "variants",
                                  initialValues.variants
                                );
                                setDropDown({
                                  ...dropDown,
                                  variants: value.variants,
                                  disable: false,
                                  group: value.group.name,
                                });
                              } else {
                                setFieldValue(
                                  "variants",
                                  initialValues.variants
                                );
                                setDropDown({
                                  ...dropDown,
                                  variants: [],
                                  disable: true,
                                  group: "",
                                });
                              }

                              setFieldValue(
                                "subgroup",
                                value !== null ? value : initialValues.subgroup
                              );
                            }}
                            value={values.subgroup}
                            helperText={
                              errors.subgroup &&
                              touched.subgroup &&
                              errors.subgroup
                            }
                            error={errors.subgroup && touched.subgroup}
                          />
                        </div>
                        <div className="input-height mt-2 mb-2">
                          <AutocompleteInputs
                            options={dropDown.variants}
                            disabled={dropDown.disable}
                            label="Variant *"
                            id="variants"
                            name="variants"
                            optionLabel="name"
                            onBlur={handleBlur}
                            onChange={(e, value) => {
                              setFieldValue(
                                "variants",
                                value !== null ? value : initialValues.variants
                              );
                            }}
                            value={values.variants}
                            helperText={
                              errors.variants &&
                              touched.variants &&
                              errors.variants
                            }
                            error={errors.variants && touched.variants}
                          />
                        </div>
                        <div className="text-display mt-4 mb-2">
                          <div className="label-title">
                            Group&nbsp;&nbsp;:&nbsp;&nbsp;
                          </div>
                          <SubHeaderLabel textappear="normal">
                            {toTitleCase(dropDown.group)}
                          </SubHeaderLabel>
                        </div>
                        <div className="input-height mt-2 mb-3">
                          <TextFieldInputs
                            className="inputField"
                            autoComplete="off"
                            id="attributevalue"
                            label="Attribute Value *"
                            name="attributevalue"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.attributevalue}
                            helperText={
                              errors.attributevalue &&
                              touched.attributevalue &&
                              errors.attributevalue
                            }
                            error={
                              errors.attributevalue && touched.attributevalue
                            }
                          />
                        </div>
                        <div className="input-height mt-2 mb-2">
                          <AutocompleteInputs
                            options={dropDown.uom}
                            label="UOM"
                            id="uom"
                            name="uom"
                            optionLabel="name"
                            onBlur={handleBlur}
                            onChange={(e, value) => {
                              setFieldValue(
                                "uom",
                                value !== null ? value : initialValues.uom
                              );
                            }}
                            value={values.uom}
                          />
                        </div>
                        <div className="status my-4">
                          <CustomSwitch
                            checked={values.status}
                            onChange={handleChange}
                            labelPlacement="start"
                            name="status"
                            label="Status"
                          />
                        </div>
                        <div className="brandbtn">
                          <Button
                            variant="buttonprimary"
                            onClick={() => {
                              resetForm();
                              setState(initialValues);
                              setDropDown({
                                ...dropDown,
                                variants: [],
                                group: "",
                              });
                            }}
                          >
                            Cancel
                          </Button>
                          <Button variant="buttonprimary" type="submit" disabled={!values.subgroup}>
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
export default Attributes;
