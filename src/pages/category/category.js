import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import LayoutStyleWrapper from "pages/brand/brandStyle.js";
import { MSG_TYPE, useToaster, useDialog } from "components/toastBar";
import {
  Button,
  TextFieldInputs,
  AutocompleteInputs,
  TableRow,
  PageHeader,
  Container,
  FilterRow,
  HeroSection,
  CustomSwitch,
  CustomFileUpload,
  ResponsiveTable,
  TableHeader,
  TableContainer,
  Column,
  ActionButtons,
  Badge,
} from "components";
import { TablePagination, IconButton } from "@material-ui/core";
import {
  createCategory,
  getAllCategory,
  updateCategory,
} from "./categories.service.js";
import { nameTrimHandler, stringSliceHandler } from "utils/utilsFunc.js";

const categoryhead = [
  {
    id: "category",
    align: "left",
    label: "Category",
    width: "20%",
  },
  {
    id: "menupriority",
    label: "Menu Priority",
    width: "20%",
  },
  {
    id: "products",
    label: "No. of products",
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
  categoryname: "",
  menupriority: "",
  status: true,
  image: "",
  fileName: "",
  bannerName: "",
  imageUrl: "",
  imagePreview: "",
  btnTxt: "ADD",
  banner: "",
  bannerPreview: "",
  url: "",
};

const validationSchema = Yup.object().shape({
  image: Yup.string().required("Required"),
  banner: Yup.string().required("Required"),
  categoryname: Yup.string()
    .min(1, "Must be exactly 1 character")
    .required("Required!")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  menupriority: Yup.string().required("Required!"),
});

export default function Category() {
  const toaster = useToaster();
  const { handleOpenDialog, handleCloseDialog } = useDialog();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState(initialValues);
  const [previewImage, setPreviewImage] = useState(false);
  const [bannerPreviewImage, setBannerPreviewImage] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    status: "",
  });
  const handleUploadChange = (e, setFieldValue, name) => {
    if (name === "image") {
      setPreviewImage(false);
      setFieldValue("image", e.target.files[0]);
      setFieldValue("fileName", `${e.target.files[0].name}`);
      setFieldValue("imageUrl", URL.createObjectURL(e.target.files[0]));
    } else {
      setBannerPreviewImage(false);
      setFieldValue("banner", e.target.files[0]);
      setFieldValue("bannerName", `${e.target.files[0].name}`);
      setFieldValue("url", URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = (setFieldValue, name) => {
    if (name === "image") {
      setPreviewImage(false);
      setFieldValue("image", "");
      setFieldValue("fileName", "");
      setFieldValue("imageUrl", "");
      if (state.id) {
        setState({
          ...state,
          image: "",
          fileName: "",
          imageUrl: "",
          imagePreview: "",
        });
      }
      setPreviewImage(true);
    } else {
      setBannerPreviewImage(false);
      setFieldValue("banner", "");
      setFieldValue("bannerName", "");
      setFieldValue("url", "");
      if (state.id) {
        setState({
          ...state,
          url: "",
          banner: "",
          bannerName: "",
          bannerPreview: "",
        });
      }
      setBannerPreviewImage(true);
    }
  };

  const handleClickOpen = (callbackFunc, callbackValue) => () => {
    const dialogContent = {
      alertTitle: `${callbackValue.status ? "Inactivate" : "Activate"} group`,
      alertAction: `${callbackValue.status ? "inactive" : "active"}`,
      ContentText: `Are you sure you want to ${
        callbackValue.status ? "inactivate" : "activate"
      } this category`,
    };
    handleOpenDialog(dialogContent, callbackFunc, callbackValue);
  };

  useEffect(() => {
    fetchFunc();
  }, []);

  const fetchFunc = async () => {
    const { data } = await getAllCategory();
    setCategories(data);
  };

  const onActiveInactive = async (item) => {
    try {
      await updateCategory(item.id, { status: !item.status }, true);
      fetchFunc();
      handleCloseDialog();
      toaster(MSG_TYPE.SUCCESS, "Status updated successfully");
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  const onEditCategory = (item) => {
    setPreviewImage(true);
    setBannerPreviewImage(true);
    setState({
      ...state,
      categoryname: item.name,
      status: item.status,
      menupriority: item.menuPriority,
      id: item.id,
      imagePreview: `${baseUrl}/${item.image}`,
      image: `${baseUrl}/${item.image}`,
      fileName: stringSliceHandler(item.image),
      banner: `${baseUrl}/${item.banner}`,
      bannerName: stringSliceHandler(item.banner),
      bannerPreview: `${baseUrl}/${item.banner}`,
      btnTxt: "UPDATE",
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
    formData.append("name", values.categoryname.trim().replace(/ +(?= )/g, ""));
    formData.append("status", values.status);
    formData.append("menuPriority", values.menupriority);
    formData.append("isBanner", values.url);
    const files = [values.image, values.banner];

    files.forEach((file) => {
      formData.append("categoryImage", file);
    });

    if (values && values.id) {
      try {
        await updateCategory(values.id, formData, false, values.menupriority);

        submitProps.resetForm();
        toaster(MSG_TYPE.SUCCESS, "Category updated successfully");
        fetchFunc();
        setState(initialValues);
      } catch (err) {
        toaster(MSG_TYPE.WARNING, err);
      }
    } else {
      try {
        await createCategory(formData, values.menupriority);

        submitProps.resetForm();
        toaster(MSG_TYPE.SUCCESS, "Category created successfully");
        fetchFunc();
        setState(initialValues);
      } catch (err) {
        toaster(MSG_TYPE.WARNING, err);
      }
    }
  };

  const handleFilter = (labelName) => (e, val) => {
    setFilter({
      ...filter,
      [labelName]: labelName === "name" ? e.target.value : val || "",
    });
  };

  const filterStatus = (filter, item) => {
    if (filter.status) return item.status === filter.status.value;
    else return item;
  };

  const filterCategory = (filter, item) => {
    return item.name.toLowerCase().includes(filter.name.toLowerCase());
  };

  const filterItems = (filter, item) => {
    return filterCategory(filter, item) && filterStatus(filter, item);
  };

  const filterFunction = (item) => {
    if (filter && (filter.name || filter.status)) {
      if (filterItems(filter, item)) {
        return item;
      }
    } else {
      return item;
    }
  };

  const currentListCount = () => categories.filter(filterFunction).length;

  const categoryPaginate = (categoryArr) => {
    return categoryArr.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  const totalPrdFunc = (value) => {
    let num = 0;
    value.forEach((val) => {
      val.sub_groups.forEach((foo) => {
        num += foo.products.length;
      });
    });
    return num;
  };

  return (
    <>
      <HeroSection
        listType="Categories"
        totalLists={categories.length}
        isListing
        IconVisible
      />
      <LayoutStyleWrapper>
        <Container>
          <div className="container-one">
            <PageHeader Title="Category" />
            <FilterRow>
              <TextFieldInputs
                className="filter-column"
                placeholder="Search Category Name"
                InputProps={<SearchIcon />}
                variant="filled"
                name="name"
                value={filter.name}
                onChange={handleFilter("name")}
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
                {categoryhead.map((column) => (
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
                {categoryPaginate(categories.filter(filterFunction)).map(
                  (row, index) => {
                    return (
                      <TableRow key={index}>
                        <Column size="20%" alignTo="left">
                          {row.name}
                        </Column>
                        <Column size="20%">{row.menuPriority}</Column>
                        <Column size="20%">{totalPrdFunc(row.groups)}</Column>
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
                              onClick={() => onEditCategory(row)}
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
              console.log(567675, values, state);
              return (
                <form onSubmit={handleSubmit}>
                  <div className="container-two">
                    <div className="scrollcontainer">
                      <div className="add">
                        <div className="input-height mt-2 mb-2">
                          <TextFieldInputs
                            className="inputField"
                            autoComplete="off"
                            id="categoryname"
                            label="Name *"
                            name="categoryname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.categoryname}
                            helperText={
                              errors.categoryname &&
                              touched.categoryname &&
                              errors.categoryname
                            }
                            error={errors.categoryname && touched.categoryname}
                          />
                        </div>
                        <div className="input-height mt-2 mb-2">
                          <TextFieldInputs
                            type="number"
                            className="inputField"
                            autoComplete="off"
                            id="menupriority"
                            label="Menu Priority *"
                            name="menupriority"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.menupriority}
                            helperText={
                              errors.menupriority &&
                              touched.menupriority &&
                              errors.menupriority
                            }
                            error={errors.menupriority && touched.menupriority}
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
                        <div className="upload-banner">
                          <CustomFileUpload
                            uploadType="Banner"
                            fileIndex="banner"
                            errorText={errors.banner}
                            isImage={values.banner}
                            fileName={
                              values.bannerName
                                ? nameTrimHandler(values.bannerName)
                                : ""
                            }
                            onChange={(e) =>
                              handleUploadChange(e, setFieldValue, "banner")
                            }
                            onRemove={() => {
                              handleRemoveImage(setFieldValue, "banner");
                            }}
                            previewUrl={
                              bannerPreviewImage
                                ? values.bannerPreview
                                : values.url
                            }
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
                            onClick={() => {
                              resetForm();
                              setState(initialValues);
                              // setPicture(initialImage);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={!values.categoryname}>
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
