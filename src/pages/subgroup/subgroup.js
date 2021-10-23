import React, { useState, useEffect } from "react";
import LayoutStyleWrapper from "../brand/brandStyle";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  getAllGroup,
  createSubGroup,
  getAllSubGroup,
  updateSubGroup,
} from "./subGroups.service";
import {
  TextFieldInputs,
  AutocompleteInputs,
  TableRow,
  TableContainer,
  Column,
  Radiobutton,
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
  CustomFileUpload,
} from "components";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { MSG_TYPE, useToaster, useDialog } from "components/toastBar";
import {
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  TablePagination,
} from "@material-ui/core";
import {
  nameTrimHandler,
  stringSliceHandler,
  toTitleCase,
} from "utils/utilsFunc";

const grouphead = [
  {
    id: "name",
    align: "left",
    label: "Sub Group",
    width: "20%",
  },
  {
    id: "group",
    label: "Group",
    align: "left",
    width: "22%",
  },
  {
    id: "returnaccepted",
    label: "Accepted",
    width: "7%",
  },
  {
    id: "Products",
    label: "No. of products",
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
  subgroupname: "",
  group: "",
  returnstatus: "no",
  status: true,
  btnTxt: "ADD",
  image: "",
  fileName: "",
  imageUrl: "",
  imagePreview: "",
};

const validationSchema = Yup.object().shape({
  image: Yup.string().required("Required"),
  subgroupname: Yup.string()
    .min(1, "Must be exactly 1 character")
    .required("Required!"),
  group: Yup.object().required("Required!"),
});

function SubGroup() {
  const toaster = useToaster();
  const { handleOpenDialog, handleCloseDialog } = useDialog();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [groupDropdown, setGroupDropdown] = useState([]);
  const [category, setCategory] = useState("");
  const [subGroups, setSubGroups] = useState([]);
  const [previewImage, setPreviewImage] = useState(false);
  const [state, setState] = useState(initialValues);
  const [filter, setFilter] = useState({
    name: "",
    group: "",
    status: "",
  });

  const handleUploadChange = (e, setFieldValue) => {
    setPreviewImage(false);
    setFieldValue("image", e.target.files[0]);
    setFieldValue("fileName", `${e.target.files[0].name}`);
    setFieldValue("imageUrl", URL.createObjectURL(e.target.files[0]));
  };

  const handleRemoveImage = (setFieldValue) => {
    setPreviewImage(false);
    setFieldValue("image", "");
    setFieldValue("fileName", "");
    setFieldValue("imageUrl", "");
    setFieldValue("imagePreview", "");
    if (state.id) {
      setState({
        ...state,
        image: "",
        fileName: "",
        imageUrl: "",
        imagePreview: "",
      });
    }
  };

  useEffect(() => {
    fetchFunc();
  }, []);

  const fetchFunc = async () => {
    const { data: groupData } = await getAllGroup();
    setGroupDropdown(groupData);

    const { data } = await getAllSubGroup();
    setSubGroups(data);
  };

  const onActiveInactive = async (item) => {
    try {
      await updateSubGroup(item.id, { status: !item.status });
      fetchFunc();
      handleCloseDialog();
      toaster(MSG_TYPE.SUCCESS, "Sub group status updated successfully");
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  const handleClickOpen = (callbackFunc, callbackValue) => () => {
    const dialogContent = {
      alertTitle: `${
        callbackValue.status ? "Inactivate" : "Activate"
      } sub group`,
      alertAction: `${callbackValue.status ? "Inactive" : "active"}`,
      ContentText: `Are you sure you want to ${
        callbackValue.status ? "inactivate" : "activate"
      } this sub group`,
    };
    handleOpenDialog(dialogContent, callbackFunc, callbackValue);
  };

  const onEditSubGroup = (item) => {
    setCategory(
      item && item.group && item.group.category && item.group.category.name
        ? item.group.category.name
        : ""
    );
    setState({
      ...state,
      imagePreview: `${baseUrl}/${item.image}`,
      image: `${baseUrl}/${item.image}`,
      fileName: stringSliceHandler(item.image),
      subgroupname: item.name,
      status: item.status,
      group: item.group,
      id: item.id,
      returnstatus: item.isReturn ? "yes" : "no",
      btnTxt: "UPDATE",
    });
    setPreviewImage(true);
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
        const data = {
          name: values.subgroupname.trim().replace(/ +(?= )/g, ""),
          status: values.status,
          groupId: values.group.id,
          isReturn: values.returnstatus === "yes" ? true : false,
        };

        let flag = false;
        subGroups.forEach((foo) => {
          if (
            foo.name.toLowerCase() === data.name.toLowerCase() &&
            foo.groupId === data.groupId &&
            values.id !== foo.id
          ) {
            flag = true;
          }
        });

        if (flag) {
          toaster(MSG_TYPE.WARNING, "Sub Group already exits");
        } else {
          await updateSubGroup(values.id, data);

          submitProps.resetForm();
          fetchFunc();
          setState(initialValues);
          setCategory("");
          toaster(MSG_TYPE.SUCCESS, "Sub Group updated successfully");
        }
      } catch (err) {
        toaster(MSG_TYPE.WARNING, err);
      }
    } else {
      try {
        const data = {
          name: values.subgroupname.trim().replace(/ +(?= )/g, ""),
          status: values.status,
          groupId: values.group.id,
          isReturn: values.returnstatus === "yes" ? true : false,
          image: values.image,
        };

        let flag = false;
        subGroups.forEach((foo) => {
          if (
            foo.name.toLowerCase() === data.name.toLowerCase() &&
            foo.groupId === data.groupId
          ) {
            flag = true;
          }
        });

        if (flag) {
          toaster(MSG_TYPE.WARNING, "Sub Group already exits");
        } else {
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("status", data.status);
          formData.append("groupId", data.groupId);
          formData.append("isReturn", data.isReturn);
          formData.append("subGroupImage", data.image);
          const res = await createSubGroup(formData);
          submitProps.resetForm();
          fetchFunc();
          setState(initialValues);
          setCategory("");
          toaster(MSG_TYPE.SUCCESS, "Sub Group created successfully");
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

  const filterSubGroup = (filter, item) => {
    return item.name.toLowerCase().includes(filter.name.toLowerCase());
  };

  const filterGroup = (filter, item) => {
    if (filter.group) return item.group.id === filter.group.id;
    else return item;
  };

  const filterItems = (filter, item) => {
    return (
      filterSubGroup(filter, item) &&
      filterStatus(filter, item) &&
      filterGroup(filter, item)
    );
  };

  const filterFunction = (item) => {
    if (filter && (filter.name || filter.group || filter.status)) {
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

  const subGroupPaginate = (subGroupArr) => {
    return subGroupArr.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  const currentListCount = () => subGroups.filter(filterFunction).length;

  return (
    <>
      <HeroSection
        listType="SubGroups"
        totalLists={subGroups.length}
        isListing
        IconVisible
      />
      <LayoutStyleWrapper>
        <Container>
          <div className="container-one">
            <PageHeader Title="Sub Group"></PageHeader>
            <FilterRow>
              <TextFieldInputs
                className="filter-column"
                placeholder="Search Sub Group Name"
                InputProps={<SearchIcon />}
                variant="filled"
                name="name"
                value={filter.name}
                onChange={handleFilter("name")}
              />
              <AutocompleteInputs
                options={groupDropdown}
                placeholder="Select Group"
                variant="filled"
                optionLabel="name"
                name="group"
                onChange={handleFilter("group")}
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
                {subGroupPaginate(subGroups.filter(filterFunction)).map(
                  (row, index) => {
                    return (
                      <TableRow key={index}>
                        <Column size="20%" alignTo="left">
                          {row.name}
                        </Column>
                        <Column size="22%" alignTo="left">
                          {row.group.name}
                        </Column>
                        <Column size="7%">{row.isReturn ? "Yes" : "No"}</Column>
                        <Column size="15%">{row.productCount}</Column>
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
                              onClick={() => onEditSubGroup(row)}
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
                              onClick={handleClickOpen(onActiveInactive, row)}
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
                            id="subgroupname"
                            label="Name *"
                            name="subgroupname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.subgroupname}
                            helperText={
                              errors.subgroupname &&
                              touched.subgroupname &&
                              errors.subgroupname
                            }
                            error={errors.subgroupname && touched.subgroupname}
                          />
                        </div>
                        <div className="input-height my-2">
                          <AutocompleteInputs
                            options={groupDropdown}
                            label="Group *"
                            id="group"
                            name="group"
                            optionLabel="name"
                            onBlur={handleBlur}
                            onChange={(e, value) => {
                              setCategory(
                                value && value.category && value.category.name
                                  ? value.category.name
                                  : ""
                              );
                              setFieldValue(
                                "group",
                                value !== null ? value : initialValues.group
                              );
                            }}
                            value={values.group}
                            helperText={
                              errors.group && touched.group && errors.group
                            }
                            error={errors.group && touched.group}
                          />
                        </div>
                        <div className="text-display my-4">
                          <div className="label-title">
                            Category&nbsp;&nbsp;:&nbsp;&nbsp;
                          </div>
                          <SubHeaderLabel textappear="normal">
                            {toTitleCase(category)}
                          </SubHeaderLabel>
                        </div>
                        <Radiobutton Title="Accept Returns" gridColumn>
                          <RadioGroup
                            aria-label="gender"
                            name="returnstatus"
                            value={values.returnstatus}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio size="small" />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio size="small" />}
                              label="No"
                            />
                          </RadioGroup>
                        </Radiobutton>
                        <div className="status my-4">
                          <CustomSwitch
                            checked={values.status}
                            onChange={handleChange}
                            labelPlacement="start"
                            name="status"
                            label="Status"
                          />
                        </div>
                        <CustomFileUpload
                          uploadType="Image"
                          fileIndex="image"
                          isImage={values.image}
                          fileName={
                            values.fileName
                              ? nameTrimHandler(values.fileName)
                              : ""
                          }
                          errorText={errors.image}
                          onChange={(e) =>
                            handleUploadChange(e, setFieldValue, "image")
                          }
                          onRemove={() => {
                            handleRemoveImage(setFieldValue, "image");
                          }}
                          previewUrl={
                            previewImage ? values.imagePreview : values.imageUrl
                          }
                        />
                        <div className="brandbtn">
                          <Button
                            variant="buttonprimary"
                            onClick={() => {
                              resetForm();
                              setState(initialValues);
                              setCategory("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="buttonprimary"
                            type="submit"
                            disabled={!values.subgroupname}
                          >
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
export default SubGroup;
