import { Form, Formik } from "formik";
import AddIcon from "@material-ui/icons/Add";
import { toTitleCase } from "utils/utilsFunc.js";
import DeleteIcon from "@material-ui/icons/Delete";
import AddPromotionStyles from "./AddPromotionStyles.js";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import React, { useEffect, useCallback, useState } from "react";
import {
  Grid,
  Avatar,
  Collapse,
  IconButton,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import {
  typeList,
  offerList,
  productList,
  dummyOptions,
  bannerTypeList,
  imageDropdown,
  discountTypeList,
  usageLimit,
  levelList,
  banner_validationSchema,
  bannerForm_initialValues,
} from "../fromData";
import {
  Button,
  Column,
  TableRow,
  Container,
  PageHeader,
  HeroSection,
  TableHeader,
  CustomSwitch,
  ActionButtons,
  CustomCheckbox,
  TextFieldInputs,
  ResponsiveTable,
  AutocompleteInputs,
  DateTimePickerWrapper,
  CustomFileUpload,
  TableContainer,
  SubHeaderLabel,
  Radiobutton,
} from "components";
import Image1 from "../../../assets/images/Product Images/Artboard 1.png";
import Image2 from "../../../assets/images/Product Images/Artboard 2.png";
import Image3 from "../../../assets/images/Product Images/Artboard 3.png";
import Image4 from "../../../assets/images/Product Images/Artboard 4.png";

function AddPromotions() {
  const [promoAddData, setPromoAddData] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleAutoComplete = (name, setFieldValue) => (e, value) => {
    setFieldValue(
      name,
      value !== null ? value : bannerForm_initialValues[name]
    );
  };
  const handleFile = (setFieldValue) => (e) => {
    if (
      e &&
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      setFieldValue("productImage", e.currentTarget.files[0]);
      setFieldValue("imageUrl", URL.createObjectURL(e.currentTarget.files[0]));
      setFieldValue(
        "imageName",
        `${
          e.target.files[0].name.length > 20
            ? `${e.target.files[0].name.substring(0, 20)}...`
            : e.target.files[0].name
        }`
      );
    }
  };
  const onReceivePromoAddData = useCallback(async () => {
    try {
      await setPromoAddData(productList);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const onSubmit = async (values, submitProps) => {
    //console.log(values)
    // try {
    //     const response = await OptionServices.create(values);
    //     let message = 'Options added successfully!';
    //     toastMessages.toastSuccess(message);
    //     submitProps.setSubmitting(false);
    //     submitProps.resetForm();
    // } catch (error) {
    //     console.log(error);
    //     submitProps.setSubmitting(true)
    //     let errorMessage = error.response.data.error;
    //     toastMessages.toastError(errorMessage);
    // }
  };

  const onUpdateOptions = useCallback(async () => {}, []);

  const handleDeleteList = useCallback(
    (listToDelete, setFieldValue) => () => {
      promoAddData.splice(promoAddData.indexOf(listToDelete), 1);
      setFieldValue("promoAddData", [...promoAddData]);
    },
    [promoAddData]
  );

  useEffect(() => {
    onReceivePromoAddData();
  }, [onReceivePromoAddData, onUpdateOptions, handleDeleteList]);

  return (
    <Formik
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={bannerForm_initialValues}
      validationSchema={banner_validationSchema}
    >
      {(props) => {
        const {
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
        } = props;
        console.log(6556456365, values);
        return (
          <Form>
            <HeroSection />
            <AddPromotionStyles>
              <Container>
                <PageHeader Title="Offers" />
                <Grid container spacing={3} lg={12}>
                  <Grid item lg={9}>
                    <Grid container lg={12} spacing={3} className="main-offer">
                      <Grid item xs={3}>
                        <div className="field">
                          <AutocompleteInputs
                            id="offerType"
                            name="offerType"
                            label="Offer Type"
                            optionLabel="name"
                            onBlur={handleBlur}
                            value={values.offerType}
                            options={offerList}
                            onChange={handleAutoComplete(
                              "offerType",
                              setFieldValue
                            )}
                            error={errors.offerType && touched.offerType}
                            helperText={
                              errors.offerType &&
                              touched.offerType &&
                              errors.offerType
                            }
                          />
                        </div>
                      </Grid>
                      {values.offerType.name === "Discount" && (
                        <Grid item xs={3}>
                          <div className="field field-2">
                            <AutocompleteInputs
                              id="bannerType"
                              name="bannerType"
                              optionLabel="name"
                              label="Banner Type"
                              onBlur={handleBlur}
                              options={bannerTypeList}
                              value={values.bannerType}
                              onChange={handleAutoComplete(
                                "bannerType",
                                setFieldValue
                              )}
                              error={errors.bannerType && touched.bannerType}
                              helperText={
                                errors.bannerType &&
                                touched.bannerType &&
                                errors.bannerType
                              }
                            />
                          </div>
                        </Grid>
                      )}
                      {values.offerType.name === "Discount" && (
                        <Grid item xs={3}>
                          <div className="field field-2">
                            <AutocompleteInputs
                              id="image"
                              name="image"
                              optionLabel="name"
                              label="Images"
                              onBlur={handleBlur}
                              options={imageDropdown}
                              value={values.image}
                              onChange={handleAutoComplete(
                                "image",
                                setFieldValue
                              )}
                              error={errors.image && touched.image}
                              helperText={
                                errors.image &&
                                touched.image &&
                                errors.image
                              }
                            />
                          </div>
                        </Grid>
                      )}
                      {(values.offerType.name === "Discount" ||
                        values.offerType.name === "Promo code" ||
                        values.offerType.name === "Banner") && (
                        <Grid item xs={3}>
                          <div className="status">
                            <CustomSwitch
                              name="isDisabled"
                              label="Status"
                              labelPlacement="top"
                              onChange={handleChange}
                              checked={values.isDisabled}
                            />
                          </div>
                        </Grid>
                      )}
                    </Grid>

                    {values.offerType.name === "Banner" && (
                      <>
                        <Grid
                          container
                          lg={12}
                          spacing={3}
                          className="promogrid"
                        >
                          <Grid item xs={3}>
                            <div className="field field-2">
                              <AutocompleteInputs
                                id="bannerType"
                                name="bannerType"
                                optionLabel="name"
                                label="Banner Type"
                                onBlur={handleBlur}
                                options={bannerTypeList}
                                value={values.bannerType}
                                onChange={handleAutoComplete(
                                  "bannerType",
                                  setFieldValue
                                )}
                                error={errors.bannerType && touched.bannerType}
                                helperText={
                                  errors.bannerType &&
                                  touched.bannerType &&
                                  errors.bannerType
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-3">
                              <TextFieldInputs
                                name="title"
                                label="Title"
                                onBlur={handleBlur}
                                value={values.title}
                                onChange={handleChange}
                                error={errors.title && touched.title}
                                helperText={
                                  errors.title && touched.title && errors.title
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-5">
                              <AutocompleteInputs
                                id="discountType"
                                name="discountType"
                                optionLabel="name"
                                label="Discount Type"
                                onBlur={handleBlur}
                                options={discountTypeList}
                                value={values.discountType}
                                onChange={handleAutoComplete(
                                  "discountType",
                                  setFieldValue
                                )}
                                error={
                                  errors.discountType && touched.discountType
                                }
                                helperText={
                                  errors.discountType &&
                                  touched.discountType &&
                                  errors.discountType
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-4">
                              <TextFieldInputs
                                name="discount"
                                label="Discount"
                                onBlur={handleBlur}
                                value={values.discount}
                                onChange={handleChange}
                                error={errors.discount && touched.discount}
                                helperText={
                                  errors.discount &&
                                  touched.discount &&
                                  errors.discount
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-7">
                              <DateTimePickerWrapper>
                                <KeyboardDateTimePicker
                                  variant="inline"
                                  fullWidth
                                  ampm={false}
                                  hideTabs
                                  autoOk
                                  label="From Date"
                                  value={values.fromDate}
                                  onChange={handleAutoComplete(
                                    "fromDate",
                                    setFieldValue
                                  )}
                                  onError={console.log}
                                  format="yyyy/MM/dd HH:mm"
                                />
                              </DateTimePickerWrapper>
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-8">
                              <DateTimePickerWrapper>
                                <KeyboardDateTimePicker
                                  variant="inline"
                                  fullWidth
                                  autoOk
                                  hideTabs
                                  ampm={false}
                                  label="To Date"
                                  value={values.toDate}
                                  onChange={handleAutoComplete(
                                    "toDate",
                                    setFieldValue
                                  )}
                                  onError={console.log}
                                  format="yyyy/MM/dd HH:mm"
                                />
                              </DateTimePickerWrapper>
                            </div>
                          </Grid>
                          <Grid item xs={3} className="end-align">
                            <div className="field field-6 add-check">
                              <div className="align-left">
                                <CustomCheckbox
                                  name="expire"
                                  label="Banner"
                                  value={values.expire}
                                  labelPlacement="start"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={3}>
                            <div className="field typeBased">
                              <AutocompleteInputs
                                id="type"
                                name="type"
                                label="Type"
                                optionLabel="name"
                                options={typeList}
                                value={values.type}
                                onBlur={handleBlur}
                                error={errors.type && touched.type}
                                onChange={handleAutoComplete(
                                  "type",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.type && touched.type && errors.type
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field select-group">
                              <AutocompleteInputs
                                id="category"
                                name="category"
                                label="Category"
                                optionLabel="name"
                                options={typeList}
                                value={values.category}
                                onBlur={handleBlur}
                                error={errors.category && touched.category}
                                onChange={handleAutoComplete(
                                  "category",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.category &&
                                  touched.category &&
                                  errors.category
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field select-group">
                              <AutocompleteInputs
                                id="group"
                                name="group"
                                label="Group"
                                optionLabel="name"
                                options={typeList}
                                value={values.group}
                                onBlur={handleBlur}
                                error={errors.group && touched.group}
                                onChange={handleAutoComplete(
                                  "group",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.group && touched.group && errors.group
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field select-group">
                              <AutocompleteInputs
                                id="subgroup"
                                name="subgroup"
                                label="Sub group"
                                optionLabel="name"
                                options={typeList}
                                value={values.subgroup}
                                onBlur={handleBlur}
                                error={errors.subgroup && touched.subgroup}
                                onChange={handleAutoComplete(
                                  "subgroup",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.subgroup &&
                                  touched.subgroup &&
                                  errors.subgroup
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field selectField">
                              <AutocompleteInputs
                                multiple
                                optionImage
                                disableCloseOnSelect
                                id="select"
                                name="select"
                                optionCheck={true}
                                optionLabel="title"
                                optionPic={"pic"}
                                onBlur={handleBlur}
                                value={values.select}
                                label="Select Product"
                                options={dummyOptions}
                                onChange={handleAutoComplete(
                                  "select",
                                  setFieldValue
                                )}
                                error={errors.select && touched.select}
                                helperText={
                                  errors.select &&
                                  touched.select &&
                                  errors.select
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3} className="add-button">
                            <div className="field add">
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<AddIcon />}
                              >
                                Add
                              </Button>
                            </div>
                          </Grid>
                        </Grid>
                        <ResponsiveTable>
                          <div className="table">
                            <TableHeader>
                              <Column size="10%" alignTo="left">
                                Image
                              </Column>
                              <Column alignTo="left" size="40%">
                                Product
                              </Column>
                              <Column alignTo="left" size="10%">
                                MRP
                              </Column>
                              <Column alignTo="left" size="15%">
                                Selling Price
                              </Column>
                              <Column size="10%">Discount</Column>
                              <Column size="10%">Price</Column>
                              <Column size="10%">Action</Column>
                            </TableHeader>
                            <TableContainer staticHeight="59vh">
                              {promoAddData.map((product, index) => (
                                <TableRow key={index}>
                                  <Column size="10%" data-label="Image">
                                    <Avatar
                                      variant="circle"
                                      alt="Product Image"
                                      src={product.productPic}
                                    />
                                  </Column>
                                  <Column
                                    alignTo="left"
                                    size="40%"
                                    data-label="Product"
                                  >
                                    {toTitleCase(product.name)}
                                  </Column>
                                  <Column
                                    size="10%"
                                    alignTo="left"
                                    data-label="MRP"
                                  >
                                    &#163; {product.mrp}
                                  </Column>
                                  <Column
                                    size="15%"
                                    alignTo="left"
                                    data-label="Selling Price"
                                  >
                                    &#163; {product.sellingprice}
                                  </Column>
                                  <Column size="10%" data-label="Discount">
                                    {product.discount}%
                                  </Column>
                                  <Column size="10%" data-label="Price">
                                    &#163; {product.price}
                                  </Column>
                                  <Column size="10%" data-label="Action">
                                    <ActionButtons>
                                      <IconButton
                                        size="small"
                                        color="primary"
                                        component="span"
                                        onClick={handleDeleteList(
                                          product,
                                          setFieldValue
                                        )}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </ActionButtons>
                                  </Column>
                                </TableRow>
                              ))}
                            </TableContainer>
                          </div>
                        </ResponsiveTable>
                      </>
                    )}

                    {values.offerType.name === "Discount" && (
                      <>
                        <Grid
                          container
                          lg={12}
                          spacing={3}
                          className="promogrid"
                        >
                          <Grid item xs={3}>
                            <div className="field field-3">
                              <TextFieldInputs
                                name="title"
                                label="Title"
                                onBlur={handleBlur}
                                value={values.title}
                                onChange={handleChange}
                                error={errors.title && touched.title}
                                helperText={
                                  errors.title && touched.title && errors.title
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-5">
                              <AutocompleteInputs
                                id="discountType"
                                name="discountType"
                                optionLabel="name"
                                label="Discount Type"
                                onBlur={handleBlur}
                                options={discountTypeList}
                                value={values.discountType}
                                onChange={handleAutoComplete(
                                  "discountType",
                                  setFieldValue
                                )}
                                error={
                                  errors.discountType && touched.discountType
                                }
                                helperText={
                                  errors.discountType &&
                                  touched.discountType &&
                                  errors.discountType
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-4">
                              <TextFieldInputs
                                name="discount"
                                label="Discount"
                                onBlur={handleBlur}
                                value={values.discount}
                                onChange={handleChange}
                                error={errors.discount && touched.discount}
                                helperText={
                                  errors.discount &&
                                  touched.discount &&
                                  errors.discount
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-7">
                              <DateTimePickerWrapper>
                                <KeyboardDateTimePicker
                                  variant="inline"
                                  fullWidth
                                  ampm={false}
                                  hideTabs
                                  autoOk
                                  label="From Date"
                                  value={values.fromDate}
                                  onChange={handleAutoComplete(
                                    "fromDate",
                                    setFieldValue
                                  )}
                                  onError={console.log}
                                  format="yyyy/MM/dd HH:mm"
                                />
                              </DateTimePickerWrapper>
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-8">
                              <DateTimePickerWrapper>
                                <KeyboardDateTimePicker
                                  variant="inline"
                                  fullWidth
                                  autoOk
                                  hideTabs
                                  ampm={false}
                                  label="To Date"
                                  value={values.toDate}
                                  onChange={handleAutoComplete(
                                    "toDate",
                                    setFieldValue
                                  )}
                                  onError={console.log}
                                  format="yyyy/MM/dd HH:mm"
                                />
                              </DateTimePickerWrapper>
                            </div>
                          </Grid>
                          <Grid item xs={3} className="end-align">
                            <div className="field field-6 add-check">
                              <div className="align-left">
                                <CustomCheckbox
                                  name="expire"
                                  label="Banner"
                                  value={values.expire}
                                  labelPlacement="start"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field typeBased">
                              <AutocompleteInputs
                                id="type"
                                name="type"
                                label="Type"
                                optionLabel="name"
                                options={typeList}
                                value={values.type}
                                onBlur={handleBlur}
                                error={errors.type && touched.type}
                                onChange={handleAutoComplete(
                                  "type",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.type && touched.type && errors.type
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field select-group">
                              <AutocompleteInputs
                                id="category"
                                name="category"
                                label="Category"
                                optionLabel="name"
                                options={typeList}
                                value={values.category}
                                onBlur={handleBlur}
                                error={errors.category && touched.category}
                                onChange={handleAutoComplete(
                                  "category",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.category &&
                                  touched.category &&
                                  errors.category
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field select-group">
                              <AutocompleteInputs
                                id="group"
                                name="group"
                                label="Group"
                                optionLabel="name"
                                options={typeList}
                                value={values.group}
                                onBlur={handleBlur}
                                error={errors.group && touched.group}
                                onChange={handleAutoComplete(
                                  "group",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.group && touched.group && errors.group
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field select-group">
                              <AutocompleteInputs
                                id="subgroup"
                                name="subgroup"
                                label="Sub group"
                                optionLabel="name"
                                options={typeList}
                                value={values.subgroup}
                                onBlur={handleBlur}
                                error={errors.subgroup && touched.subgroup}
                                onChange={handleAutoComplete(
                                  "subgroup",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.subgroup &&
                                  touched.subgroup &&
                                  errors.subgroup
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field selectField">
                              <AutocompleteInputs
                                multiple
                                optionImage
                                disableCloseOnSelect
                                id="select"
                                name="select"
                                optionCheck={true}
                                optionLabel="title"
                                optionPic={"pic"}
                                onBlur={handleBlur}
                                value={values.select}
                                label="Select Product"
                                options={dummyOptions}
                                onChange={handleAutoComplete(
                                  "select",
                                  setFieldValue
                                )}
                                error={errors.select && touched.select}
                                helperText={
                                  errors.select &&
                                  touched.select &&
                                  errors.select
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3} className="add-button">
                            <div className="field add">
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<AddIcon />}
                              >
                                Add
                              </Button>
                            </div>
                          </Grid>
                        </Grid>
                        <ResponsiveTable>
                          <div className="table">
                            <TableHeader>
                              <Column size="10%" alignTo="left">
                                Image
                              </Column>
                              <Column alignTo="left" size="40%">
                                Product
                              </Column>
                              <Column alignTo="left" size="10%">
                                MRP
                              </Column>
                              <Column alignTo="left" size="15%">
                                Selling Price
                              </Column>
                              <Column size="10%">Discount</Column>
                              <Column size="10%">Price</Column>
                              <Column size="10%">Action</Column>
                            </TableHeader>
                            <TableContainer staticHeight="59vh">
                              {promoAddData.map((product, index) => (
                                <TableRow key={index}>
                                  <Column size="10%" data-label="Image">
                                    <Avatar
                                      variant="circle"
                                      alt="Product Image"
                                      src={product.productPic}
                                    />
                                  </Column>
                                  <Column
                                    alignTo="left"
                                    size="40%"
                                    data-label="Product"
                                  >
                                    {toTitleCase(product.name)}
                                  </Column>
                                  <Column
                                    size="10%"
                                    alignTo="left"
                                    data-label="MRP"
                                  >
                                    &#163; {product.mrp}
                                  </Column>
                                  <Column
                                    size="15%"
                                    alignTo="left"
                                    data-label="Selling Price"
                                  >
                                    &#163; {product.sellingprice}
                                  </Column>
                                  <Column size="10%" data-label="Discount">
                                    {product.discount}%
                                  </Column>
                                  <Column size="10%" data-label="Price">
                                    &#163; {product.price}
                                  </Column>
                                  <Column size="10%" data-label="Action">
                                    <ActionButtons>
                                      <IconButton
                                        size="small"
                                        color="primary"
                                        component="span"
                                        onClick={handleDeleteList(
                                          product,
                                          setFieldValue
                                        )}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </ActionButtons>
                                  </Column>
                                </TableRow>
                              ))}
                            </TableContainer>
                          </div>
                        </ResponsiveTable>
                      </>
                    )}

                    {values.offerType.name === "Promo code" && (
                      <>
                        <Grid
                          container
                          lg={12}
                          spacing={3}
                          className="promo-grid"
                        >
                          <Grid item xs={12}>
                            <div className="radio-grid">
                              <div className="subtitle">User Type</div>
                              <Radiobutton gridColumn>
                                <RadioGroup name="newUser" aria-label="newUser">
                                  <FormControlLabel
                                    value="Radio One"
                                    control={<Radio size="small" />}
                                    label="New User"
                                  />
                                  <FormControlLabel
                                    value="Radio Two"
                                    control={<Radio size="small" />}
                                    label="All User"
                                  />
                                  <FormControlLabel
                                    value="Radio Three"
                                    control={<Radio size="small" />}
                                    label="Membership"
                                    checked={checked}
                                    onChange={handleCheck}
                                  />
                                </RadioGroup>
                              </Radiobutton>
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <TextFieldInputs
                                className="inputField"
                                id="typecode"
                                label="Type Code *"
                                name="typecode"
                                InputProps={
                                  <button
                                    className="generateButton"
                                    type="button"
                                  >
                                    Generate
                                  </button>
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field field-3">
                              <TextFieldInputs
                                name="title"
                                label="Title"
                                onBlur={handleBlur}
                                value={values.title}
                                onChange={handleChange}
                                error={errors.title && touched.title}
                                helperText={
                                  errors.title && touched.title && errors.title
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <AutocompleteInputs
                                id="level"
                                name="level"
                                disabled={!checked}
                                optionLabel="name"
                                label="Level"
                                onBlur={handleBlur}
                                options={levelList}
                                value={values.level}
                                onChange={handleAutoComplete(
                                  "discountType",
                                  setFieldValue
                                )}
                                error={errors.level && touched.level}
                                helperText={
                                  errors.level && touched.level && errors.level
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <AutocompleteInputs
                                id="discountType"
                                name="discountType"
                                optionLabel="name"
                                label="Discount Type"
                                onBlur={handleBlur}
                                options={discountTypeList}
                                value={values.discountType}
                                onChange={handleAutoComplete(
                                  "discountType",
                                  setFieldValue
                                )}
                                error={
                                  errors.discountType && touched.discountType
                                }
                                helperText={
                                  errors.discountType &&
                                  touched.discountType &&
                                  errors.discountType
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <TextFieldInputs
                                name="discount"
                                label="Discount"
                                onBlur={handleBlur}
                                value={values.discount}
                                onChange={handleChange}
                                error={errors.discount && touched.discount}
                                helperText={
                                  errors.discount &&
                                  touched.discount &&
                                  errors.discount
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <TextFieldInputs
                                name="minamount"
                                label="Minimum Amount"
                                onBlur={handleBlur}
                                // value={values.discount}
                                onChange={handleChange}
                                error={errors.minamount && touched.minamount}
                                helperText={
                                  errors.minamount &&
                                  touched.minamount &&
                                  errors.minamount
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <TextFieldInputs
                                name="redeem"
                                label="No of Redeems Allowed"
                                onBlur={handleBlur}
                                // value={values.discount}
                                onChange={handleChange}
                                error={errors.redeem && touched.redeem}
                                helperText={
                                  errors.redeem &&
                                  touched.redeem &&
                                  errors.redeem
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <AutocompleteInputs
                                id="usageLimit"
                                name="usagelimit"
                                optionLabel="title"
                                label="Usage Limit"
                                onBlur={handleBlur}
                                options={usageLimit}
                                value={values.usageLimit}
                                onChange={handleAutoComplete(
                                  "discountType",
                                  setFieldValue
                                )}
                                error={errors.usagelimit && touched.usagelimit}
                                helperText={
                                  errors.usagelimit &&
                                  touched.usagelimit &&
                                  errors.usagelimit
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <TextFieldInputs
                                name="vouchers"
                                label="Total No of Vouchers"
                                disabled={usageLimit === "No"}
                                onBlur={handleBlur}
                                // value={values.discount}
                                onChange={handleChange}
                                error={errors.vouchers && touched.vouchers}
                                helperText={
                                  errors.vouchers &&
                                  touched.vouchers &&
                                  errors.vouchers
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <DateTimePickerWrapper>
                                <KeyboardDateTimePicker
                                  variant="inline"
                                  fullWidth
                                  ampm={false}
                                  hideTabs
                                  autoOk
                                  label="From Date"
                                  value={values.fromDate}
                                  onChange={handleAutoComplete(
                                    "fromDate",
                                    setFieldValue
                                  )}
                                  onError={console.log}
                                  format="yyyy/MM/dd HH:mm"
                                />
                              </DateTimePickerWrapper>
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field">
                              <DateTimePickerWrapper>
                                <KeyboardDateTimePicker
                                  variant="inline"
                                  fullWidth
                                  ampm={false}
                                  hideTabs
                                  autoOk
                                  label="To Date"
                                  value={values.fromDate}
                                  onChange={handleAutoComplete(
                                    "fromDate",
                                    setFieldValue
                                  )}
                                  onError={console.log}
                                  format="yyyy/MM/dd HH:mm"
                                />
                              </DateTimePickerWrapper>
                            </div>
                          </Grid>
                          <Grid item xs={3} className="end-align">
                            <div className="field field-6">
                              <div className="align-left add">
                                <CustomCheckbox
                                  name="expire"
                                  label="Never Expire"
                                  value={values.expire}
                                  labelPlacement="start"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field typeBased">
                              <AutocompleteInputs
                                id="type"
                                name="type"
                                label="Type"
                                optionLabel="name"
                                options={typeList}
                                value={values.type}
                                onBlur={handleBlur}
                                error={errors.type && touched.type}
                                onChange={handleAutoComplete(
                                  "type",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.type && touched.type && errors.type
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field select-group">
                              <AutocompleteInputs
                                id="category"
                                name="category"
                                label="Category"
                                optionLabel="name"
                                options={typeList}
                                value={values.category}
                                onBlur={handleBlur}
                                error={errors.category && touched.category}
                                onChange={handleAutoComplete(
                                  "category",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.category &&
                                  touched.category &&
                                  errors.category
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field select-group">
                              <AutocompleteInputs
                                id="group"
                                name="group"
                                label="Group"
                                optionLabel="name"
                                options={typeList}
                                value={values.group}
                                onBlur={handleBlur}
                                error={errors.group && touched.group}
                                onChange={handleAutoComplete(
                                  "group",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.group && touched.group && errors.group
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field select-group">
                              <AutocompleteInputs
                                id="subgroup"
                                name="subgroup"
                                label="Sub group"
                                optionLabel="name"
                                options={typeList}
                                value={values.subgroup}
                                onBlur={handleBlur}
                                error={errors.subgroup && touched.subgroup}
                                onChange={handleAutoComplete(
                                  "subgroup",
                                  setFieldValue
                                )}
                                helperText={
                                  errors.subgroup &&
                                  touched.subgroup &&
                                  errors.subgroup
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="field selectField">
                              <AutocompleteInputs
                                multiple
                                optionImage
                                disableCloseOnSelect
                                id="select"
                                name="select"
                                optionCheck={true}
                                optionLabel="title"
                                optionPic={"pic"}
                                onBlur={handleBlur}
                                value={values.select}
                                label="Select Product"
                                options={dummyOptions}
                                onChange={handleAutoComplete(
                                  "select",
                                  setFieldValue
                                )}
                                error={errors.select && touched.select}
                                helperText={
                                  errors.select &&
                                  touched.select &&
                                  errors.select
                                }
                              />
                            </div>
                          </Grid>
                          <Grid item xs={3} className="add-button">
                            <div className="field add">
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<AddIcon />}
                              >
                                Add
                              </Button>
                            </div>
                          </Grid>
                        </Grid>
                        <ResponsiveTable>
                          <div className="table">
                            <TableHeader>
                              <Column size="10%" alignTo="left">
                                Image
                              </Column>
                              <Column alignTo="left" size="40%">
                                Product
                              </Column>
                              <Column alignTo="left" size="10%">
                                MRP
                              </Column>
                              <Column alignTo="left" size="15%">
                                Selling Price
                              </Column>
                              <Column size="10%">Discount</Column>
                              <Column size="10%">Price</Column>
                              <Column size="10%">Action</Column>
                            </TableHeader>
                            <TableContainer staticHeight="70vh">
                              {promoAddData.map((product, index) => (
                                <TableRow key={index}>
                                  <Column size="10%" data-label="Image">
                                    <Avatar
                                      variant="circle"
                                      alt="Product Image"
                                      src={product.productPic}
                                    />
                                  </Column>
                                  <Column
                                    alignTo="left"
                                    size="40%"
                                    data-label="Product"
                                  >
                                    {toTitleCase(product.name)}
                                  </Column>
                                  <Column
                                    size="10%"
                                    alignTo="left"
                                    data-label="MRP"
                                  >
                                    &#163; {product.mrp}
                                  </Column>
                                  <Column
                                    size="15%"
                                    alignTo="left"
                                    data-label="Selling Price"
                                  >
                                    &#163; {product.sellingprice}
                                  </Column>
                                  <Column size="10%" data-label="Discount">
                                    {product.discount}%
                                  </Column>
                                  <Column size="10%" data-label="Price">
                                    &#163; {product.price}
                                  </Column>
                                  <Column size="10%" data-label="Action">
                                    <ActionButtons>
                                      <IconButton
                                        size="small"
                                        color="primary"
                                        component="span"
                                        onClick={handleDeleteList(
                                          product,
                                          setFieldValue
                                        )}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </ActionButtons>
                                  </Column>
                                </TableRow>
                              ))}
                            </TableContainer>
                          </div>
                        </ResponsiveTable>
                      </>
                    )}
                  </Grid>
                  <Divider />
                  {(values.offerType.name === "Discount" ||
                    values.offerType.name === "Promo code" ||
                    values.offerType.name === "Banner") && (
                    <Grid item lg={3}>
                      <div className="field-10">
                        <SubHeaderLabel margin>Upload Image</SubHeaderLabel>
                        <Collapse in={!values.expire}>
                          <CustomFileUpload
                            isImage={values.imageUrl}
                            fileName={values.imageName}
                            previewUrl={values.imageUrl}
                            onChange={handleFile(setFieldValue)}
                          />
                        </Collapse>
                      </div>
                      {values.bannerType.name === "Sale" && (
                        <>
                          {/* <div className="offer-field">
                            <CustomFileUpload
                              isImage={values.imageUrl}
                              fileName={values.imageName}
                              previewUrl={values.imageUrl}
                              onChange={handleFile(setFieldValue)}
                            />
                          </div> */}
                          <div className="image-holder">
                            <div className="image">
                              <img src={Image1} alt="Image1" />
                            </div>
                            <div className="image">
                              <img src={Image2} alt="Image2" />
                            </div>
                            <div className="image">
                              <img src={Image3} alt="Image3" />
                            </div>
                            <div className="image">
                              <img src={Image4} alt="Image4" />
                            </div>
                          </div>
                        </>
                      )}
                    </Grid>
                  )}
                </Grid>
                {(values.offerType.name === "Discount" ||
                  values.offerType.name === "Promo code" ||
                  values.offerType.name === "Banner") && (
                  <div className="bottom-section">
                    <Button>Cancel</Button>
                    <Button
                      type="submit"
                      disabled={!values.bannerType}
                    >{`Save & Proceed`}</Button>
                  </div>
                )}
              </Container>
            </AddPromotionStyles>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddPromotions;
