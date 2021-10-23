import React, { useEffect, useState } from "react";
import LayoutStyleWrapper from "../brand/brandStyle";
import SearchIcon from "@material-ui/icons/Search";
import TablePagination from "@material-ui/core/TablePagination";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import { MSG_TYPE, useToaster, useDialog } from "components/toastBar";
import {
  createGroup,
  getAllCategory,
  getAllGroup,
  updateGroup,
} from "./groups.service.js";
import {
  TextFieldInputs,
  AutocompleteInputs,
  TableRow,
  TableContainer,
  Column,
  CustomFileUpload,
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
} from "components";
import { Avatar } from "@material-ui/core";
import { nameTrimHandler, stringSliceHandler } from "utils/utilsFunc";
import { IconButton } from "@material-ui/core";

const grouphead = [
  {
    id: "image",
    align: "left",
    label: "Image",
    width: "10%",
  },
  {
    id: "name",
    align: "left",
    label: "Group",
    width: "30%",
  },
  {
    id: "category",
    label: "Category",
    width: "20%",
    align: "left",
  },
  {
    id: "products",
    width: "15%",
    label: "No. of products",
  },
  {
    id: "status",
    width: "8%",
    label: "Status",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
    width: "10%",
  },
];

const statusOptions = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];

const initialValues = {
  groupname: "",
  category: "",
  image: "",
  fileName: "",
  status: true,
  btnTxt: "ADD",
};

const validationSchema = Yup.object().shape({
  groupname: Yup.string()
    .min(1, "Must be exactly 1 character")
    .required("Required!"),
  category: Yup.object().required("Required!"),
});
const initialImage = {
  url: "",
  image: "",
};

function Group() {
  const toaster = useToaster();
  const { handleOpenDialog, handleCloseDialog } = useDialog();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [categoryDropdown, setCategoryDropdown] = useState([]);
  const [groups, setGroups] = useState([]);
  const [state, setState] = useState(initialValues);
  const [picture, setPicture] = useState(initialImage);
  const [previewImage, setPreviewImage] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    category: "",
    status: "",
  });

  const handleUploadChange = (e, setFieldValue) => {
    setPreviewImage(false);
    setState((currState) => ({
      ...currState,
      image: e.target.files[0],
      fileName: `${e.target.files[0].name}`,
      imageUrl: URL.createObjectURL(e.target.files[0]),
    }));
    setFieldValue("image", e.currentTarget.files[0]);
  };

  const onChangePicture = (e) => {
    setPreviewImage(false);
    setPicture({
      ...picture,
      btnTxt: `${e.target.files[0].name}`,
      url: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0],
    });
  };

  const handleClickOpen = (callbackFunc, callbackValue) => () => {
    const dialogContent = {
      alertTitle: `${callbackValue.status ? "Inactivate" : "Activate"} group`,
      alertAction: `${callbackValue.status ? "inactive" : "active"}`,
      ContentText: `Are you sure you want to ${
        callbackValue.status ? "inactivate" : "activate"
      } this group`,
    };
    handleOpenDialog(dialogContent, callbackFunc, callbackValue);
  };

  useEffect(() => {
    fetchFunc();
  }, []);

  const fetchFunc = async () => {
    const { data: categoryData } = await getAllCategory();
    setCategoryDropdown(categoryData);

    const { data } = await getAllGroup();
    setGroups(data);
  };

  const onActiveInactive = async (item) => {
    try {
      await updateGroup(item.id, { status: !item.status }, true);
      fetchFunc();
      handleCloseDialog();
      toaster(MSG_TYPE.SUCCESS, "Status updated successfully");
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  const onEditGroup = (item) => {
    setPreviewImage(true);
    setState({
      ...state,
      groupname: item.name,
      status: item.status,
      category: item.category,
      id: item.id,
      btnTxt: "UPDATE",
    });
    setPicture({
      ...picture,
      btnTxt: stringSliceHandler(item.image),
      preview: `${baseUrl}/${item.image}`,
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
    const formData = new FormData();
    formData.append("name", values.groupname.trim().replace(/ +(?= )/g, ""));
    formData.append("status", values.status);
    formData.append("categoryId", values.category.id);
    formData.append("groupImage", picture.image);
    if (values && values.id) {
      try {
        await updateGroup(values.id, formData, false);

        submitProps.resetForm();
        setPicture(initialImage);
        fetchFunc();
        setState(initialValues);
        toaster(MSG_TYPE.SUCCESS, "Group updated successfully");
      } catch (err) {
        toaster(MSG_TYPE.WARNING, err);
      }
    } else {
      try {
        await createGroup(formData);

        submitProps.resetForm();
        setPicture(initialImage);
        fetchFunc();
        setState(initialValues);
        toaster(MSG_TYPE.SUCCESS, "Group created successfully");
      } catch (err) {
        toaster(MSG_TYPE.WARNING, err);
      }
    }
  };

  const filterStatus = (filter, item) => {
    if (filter.status) return item.status === filter.status.value;
    else return item;
  };

  const filterGroup = (filter, item) => {
    return item.name.toLowerCase().includes(filter.name.toLowerCase());
  };

  const filterCategory = (filter, item) => {
    if (filter.category) return item.category.name === filter.category.name;
    else return item;
  };

  const filterItems = (filter, item) => {
    return (
      filterGroup(filter, item) &&
      filterStatus(filter, item) &&
      filterCategory(filter, item)
    );
  };

  const filterFunction = (item) => {
    if (filter && (filter.name || filter.category || filter.status)) {
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

  const groupPaginate = (groupArr) => {
    return groupArr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const currentListCount = () => groups.filter(filterFunction).length;

  const totalPrdFunc = (value) => {
    let num = 0;
    value.sub_groups.forEach((val) => {
      num += val.products.length;
    });
    return num;
  };

  return (
    <>
      <HeroSection
        listType="Groups"
        IconVisible
        totalLists={groups.length}
        isListing
      />
      <LayoutStyleWrapper>
        <Container>
          <div className="container-one">
            <PageHeader Title="Group"></PageHeader>
            <FilterRow>
              <TextFieldInputs
                className="filter-column"
                placeholder="Search Group Name"
                InputProps={<SearchIcon />}
                variant="filled"
                name="name"
                value={filter.name}
                onChange={handleFilter("name")}
              />
              <AutocompleteInputs
                options={categoryDropdown}
                placeholder="Select Category"
                variant="filled"
                optionLabel="name"
                name="category"
                onChange={handleFilter("category")}
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
                {groupPaginate(groups.filter(filterFunction)).map(
                  (row, index) => {
                    return (
                      <TableRow key={index}>
                        <Column size="10%">
                          <Avatar
                            variant="circle"
                            alt="Product Image"
                            src={`${baseUrl}/${row.image}`}
                          />
                        </Column>
                        <Column size="30%" alignTo="left">
                          {row.name}
                        </Column>
                        <Column size="20%" alignTo="left">
                          {row.category.name}
                        </Column>
                        <Column size="15%">{totalPrdFunc(row)}</Column>
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
                              onClick={() => onEditGroup(row)}
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
                            id="groupname"
                            label="Name *"
                            name="groupname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.groupname}
                            helperText={
                              errors.groupname &&
                              touched.groupname &&
                              errors.groupname
                            }
                            error={errors.groupname && touched.groupname}
                          />
                        </div>
                        <div className="input-height mt-2 mb-2">
                          <AutocompleteInputs
                            options={categoryDropdown}
                            placeholder="Select Category"
                            label="Category *"
                            id="category"
                            name="category"
                            optionLabel="name"
                            onBlur={handleBlur}
                            onChange={(e, value) => {
                              setFieldValue(
                                "category",
                                value !== null ? value : initialValues.category
                              );
                            }}
                            value={values.category}
                            helperText={
                              errors.category &&
                              touched.category &&
                              errors.category
                            }
                            error={errors.category && touched.category}
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
                        <CustomFileUpload
                          uploadType="Banner"
                          isImage={picture.btnTxt}
                          fileName={
                            picture.btnTxt
                              ? nameTrimHandler(picture.btnTxt)
                              : ""
                          }
                          onChange={onChangePicture}
                          onRemove={() => {
                            setPicture(initialImage);
                          }}
                          previewUrl={
                            previewImage ? picture.preview : picture.url
                          }
                        />
                        <div className="brandbtn">
                          <Button
                            variant="buttonprimary"
                            onClick={() => {
                              resetForm();
                              setState(initialValues);
                              setPicture(initialImage);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="buttonprimary"
                            type="submit"
                            disabled={!values.groupname}
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
export default Group;
