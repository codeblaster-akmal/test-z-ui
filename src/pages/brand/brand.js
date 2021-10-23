import React, { useState, useEffect } from "react";
import LayoutStyleWrapper from "./brandStyle";
import SearchIcon from "@material-ui/icons/Search";
import TablePagination from "@material-ui/core/TablePagination";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from "@material-ui/core/Avatar";
import { Formik } from "formik";
import * as Yup from "yup";
import { createBrand, getAllBrand, updateBrand } from "./brands.service.js";
import { MSG_TYPE, useToaster, useDialog } from "components/toastBar";
import {
  ActionButtons,
  PageHeader,
  Badge,
  AutocompleteInputs,
  CustomSwitch,
  Column,
  Container,
  TableRow,
  Button,
  CustomFileUpload,
  FilterRow,
  HeroSection,
  TableHeader,
  TextFieldInputs,
  TableContainer,
  ResponsiveTable,
} from "components";
import { nameTrimHandler, stringSliceHandler } from "utils/utilsFunc";
import { IconButton } from "@material-ui/core";

const brandhead = [
  {
    id: "image",
    label: "Image",
    align: "left",
    width: "10%",
  },
  {
    id: "product",
    label: "Brand",
    align: "left",
    width: "30%",
  },
  {
    id: "products",
    label: "No. of products",
    width: "30%",
  },
  {
    id: "status",
    label: "Status",
    width: "8%",
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
  brandname: "",
  status: true,
  btnText: "Add",
};

const validationSchema = Yup.object().shape({
  brandname: Yup.string()
    .min(1, "Must be exactly 1 character")
    .required("Required!"),
});

const initialImage = {
  url: "",
  image: "",
  btnTxt: "",
  preview: "",
};

export default function Brand() {
  const toaster = useToaster();
  const { handleOpenDialog, handleCloseDialog } = useDialog();

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [picture, setPicture] = useState(initialImage);
  const [brands, setBrands] = useState([]);
  const [state, setState] = useState(initialValues);
  const [previewImage, setPreviewImage] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    status: "",
  });

  useEffect(() => {
    fetchFunc();
  }, []);

  const brandPaginate = (brandArr) => {
    return brandArr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const fetchFunc = async () => {
    const { data } = await getAllBrand();
    setBrands(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onChangePicture = (e) => {
    setPreviewImage(false);
    setPicture({
      ...picture,
      btnTxt: `${e.target.files[0].name ? e.target.files[0].name : ""}`,
      url: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0],
    });
  };

  const onEditBrand = (item) => {
    setPreviewImage(true);
    setState({
      ...state,
      id: item.id,
      brandname: item.name,
      status: item.status,
      btnText: "Update",
    });
    setPicture({
      ...picture,
      btnTxt: stringSliceHandler(item.image),
      preview: `${baseUrl}/${item.image}`,
    });
  };

  const handleClickOpen = (callbackFunc, callbackValue) => () => {
    const dialogContent = {
      alertTitle: `${callbackValue.status ? "Inactivate" : "Activate"} brand`,
      alertAction: `${callbackValue.status ? "inactive" : "active"}`,
      ContentText: `Are you sure you want to ${
        callbackValue.status ? "inactivate" : "activate"
      } this brand`,
    };
    handleOpenDialog(dialogContent, callbackFunc, callbackValue);
  };

  const onActiveInactive = async (item) => {
    try {
      await updateBrand(item.id, { status: !item.status }, true);
      fetchFunc();
      handleCloseDialog();
      toaster(MSG_TYPE.SUCCESS, "Brand status updated successfully");
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  const onsubmit = async (values, submitProps) => {
    const formData = new FormData();
    formData.append("name", values.brandname.trim().replace(/ +(?= )/g, ""));
    formData.append("status", values.status);
    formData.append("brandImage", picture.image);

    if (values && values.id) {
      try {
        await updateBrand(values.id, formData, false);

        submitProps.resetForm();
        setPicture(initialImage);
        fetchFunc();
        setState(initialValues);
        toaster(MSG_TYPE.SUCCESS, "Brand updated successfully");
      } catch (err) {
        toaster(MSG_TYPE.WARNING, err);
      }
    } else {
      try {
        await createBrand(formData);

        submitProps.resetForm();
        setPicture(initialImage);
        fetchFunc();
        setState(initialValues);
        toaster(MSG_TYPE.SUCCESS, "Brand created successfully");
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

  const filterBrand = (filter, item) => {
    return item.name.toLowerCase().includes(filter.name.toLowerCase());
  };

  const filterItems = (filter, item) => {
    return filterBrand(filter, item) && filterStatus(filter, item);
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

  const currentListCount = () => brands.filter(filterFunction).length;

  return (
    <>
      <HeroSection listType="Brands" IconVisible totalLists={brands.length} isListing />
      <LayoutStyleWrapper>
        <Container>
          <div className="container-one">
            <PageHeader Title="Brand"></PageHeader>
            <FilterRow>
              <TextFieldInputs
                className="filter-column"
                placeholder="Search Brand Name"
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
                {brandhead.map((column) => (
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
                {brandPaginate(brands.filter(filterFunction)).map(
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
                        <Column size="30%">{row.productCount}</Column>
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
                              onClick={() => onEditBrand(row)}
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
                resetForm,
              } = props;

              return (
                <form onSubmit={handleSubmit}>
                  <div className="container-two">
                    <div className="scrollcontainer">
                      <div className="add">
                        <div className="input-height mt-2 mb-2">
                          <TextFieldInputs
                            className="inputField"
                            autoComplete="off"
                            id="brandname"
                            label="Name *"
                            name="brandname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.brandname}
                            helperText={
                              errors.brandname &&
                              touched.brandname &&
                              errors.brandname
                            }
                            error={errors.brandname && touched.brandname}
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
                              setPicture(initialImage);
                              setState(initialValues);
                              resetForm();
                            }}
                          >
                            Cancel
                          </Button>
                          <Button variant="buttonprimary" type="submit" disabled={!values.brandname}>
                            {values.btnText}
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
