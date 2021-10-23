import React from "react";
import { Formik, Form } from "formik";
import SimpleVariant from "./simpleVariant";
import { deleteProductImage, deleteProductVariants } from "../product.service";
import { MSG_TYPE, useDialog, useToaster } from "components/toastBar";
import { ProductInfoWrapper } from "../productStyleWrapper";
import { toTitleCase } from "utils/utilsFunc";
import {
  Radio,
  Collapse,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import {
  Button,
  DropZone,
  Radiobutton,
  CustomSwitch,
  SubHeaderLabel,
  TextFieldInputs,
  AutocompleteInputs,
} from "components";
import { deleteProductRelatedPrd } from "../product.service";
import { ProductVariant_InitialValues, VariantDetail_InitalValues } from "../formDatas";

const ProductInfo = (props) => {

  const {
    maxUpload,
    genderOptions,
    typeSelection,
    returnAccepted,
    dropDownOptions,
    onProductInfoSubmit,
    ProductInfo_InitialValues,
    ProductInfo_validationSchema,
    setDropDownOptions
  } = props;

  const toaster = useToaster();
  const { handleOpenDialog, handleCloseDialog } = useDialog();

  const deleteRelatedProducts = async (...params) => {
    try {
      await deleteProductRelatedPrd(dropDownOptions.productInfo.ProductInfo_InitialValues.id);
      handleCloseDialog();
      const [value, setFieldValue] = params;
      setFieldValue("subGroupId", value);
      setDropDownOptions(prevState => {
        return {
          ...prevState,
          relatedProduct: {
            RelatedProduct_InitialValues: {
              ...prevState.RelatedProduct_InitialValues,
              relatedProducts: []
            }
          }
        }
      });
    } catch (err) {
      toaster(MSG_TYPE.ERROR, err);
    }
  }

  const deleteVariant = async (...params) => {
    try {
      const [value, setFieldValue, isPrdType] = params;
      await deleteProductVariants(dropDownOptions.productInfo.ProductInfo_InitialValues.id);
      if (!isPrdType) {
        await deleteProductRelatedPrd(dropDownOptions.productInfo.ProductInfo_InitialValues.id);
      }
      handleCloseDialog();
      setFieldValue(isPrdType ? "isVariant" : "subGroupId", value);
      setDropDownOptions(prevState => {
        return {
          ...prevState,
          relatedProduct: {
            ...prevState.relatedProduct,
            RelatedProduct_InitialValues: {
              ...prevState.RelatedProduct_InitialValues,
              relatedProducts: isPrdType ? prevState.relatedProduct.RelatedProduct_InitialValues.relatedProducts : []
            }
          },
          productVariant: {
            ...prevState.productVariant,
            ProductVariant_InitialValues,
            attributeValue: [],
            stores: [],
          },
          variantDetail: {
            ...prevState.variantDetail,
            VariantDetail_InitalValues,
            warehouse: "",
          },
        }
      });
    } catch (err) {
      toaster(MSG_TYPE.ERROR, err);
    }
  }

  const alertDialogSimplePrdRelPrd = (callback, value, setFieldValue, isPrdType) => {
    const dialogContent = {
      alertTitle: "Are you sure ?",
      alertAction: "No",
      ContentText: "Confirm to Activate",
      cancelAction: "Yes",
    };

    handleOpenDialog(dialogContent, callback, value, setFieldValue, isPrdType);
  }

  const checkRelatedProduct = (value, setFieldValue) => {
    if (dropDownOptions.relatedProduct.RelatedProduct_InitialValues.relatedProducts.length) {
      alertDialogSimplePrdRelPrd(deleteRelatedProducts, value, setFieldValue);
      return true;
    }
    return false;
  }

  const checkIsVariant = (value, setFieldValue, isPrdType) => {
    if (dropDownOptions.productVariant.ProductVariant_InitialValues.variants[0].variantId) {
      alertDialogSimplePrdRelPrd(deleteVariant, value, setFieldValue, isPrdType);
      return true;
    }
    return false;
  }

  const handleSubgroup = (value, setFieldValue, values) => {
    if (value) {
      setFieldValue("isReturn", value.isReturn ? 1 : 0);
      if (values.isVariant !== "SIMPLE") {
        return checkIsVariant(value, setFieldValue);
      }
      return checkRelatedProduct(value, setFieldValue);
    } else {
      setFieldValue("isReturn", ProductInfo_InitialValues.isReturn);
    }
  }

  const handleAutoComplete = (name, setFieldValue, values) => (e, value) => {
    let condition = false;
    if (name === "subGroupId") {
      condition = handleSubgroup(value, setFieldValue, values);
    }
    if (name === "isVariant") {
      condition = checkIsVariant(value, setFieldValue, true);
      handleTypeFunc(setFieldValue);
    }
    if (!condition) {
      setFieldValue(
        name,
        value !== null ? value : ProductInfo_InitialValues[name]
      );
    }
  }

  const onDrop = (acceptedFiles, setFieldValue, values) => {
    let totalImage =
      acceptedFiles.length +
      (values && values.productImages ? values.productImages.length : null);
    if (totalImage > maxUpload) {
      toaster(MSG_TYPE.WARNING, `Maximum file upload is ${maxUpload}`);
    } else {
      setFieldValue("productImages", [
        ...values.productImages,
        ...acceptedFiles.map((file, index) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            isDefault: false,
            index,
          })
        ),
      ]);
    }
  }

  const handleDefaultCheck = (
    checkedFile,
    productImages,
    setFieldValue
  ) => () => {
    let newFiles = [...productImages];
    newFiles.map((file) => {
      return checkedFile.preview === file.preview
        ? (file.isDefault = true)
        : (file.isDefault = false);
    });
    setFieldValue("productImages", [...newFiles]);
  }

  const rmvFiles = (delFile, productImages, setFieldValue) => {
    let newFiles = [...productImages];
    newFiles.splice(newFiles.indexOf(delFile), 1);
    if (delFile.isDefault) {
      newFiles.map((file, index) => {
        return index === 0 ? (file.isDefault = true) : (file.isDefault = false);
      });
    }
    setFieldValue("productImages", [...newFiles]);
  }

  const onDeleteImage = (file, productImages, setFieldValue) => async () => {
    try {
      if (file.id) {
        await deleteProductImage(file.id);
        rmvFiles(file, productImages, setFieldValue);
        toaster(MSG_TYPE.SUCCESS, `Product image deleted successfully.`);
      } else {
        rmvFiles(file, productImages, setFieldValue);
      }
    } catch (err) {
      toaster(MSG_TYPE.ERROR, err);
    }
  }

  const handleTypeFunc = (setFieldValue) => {
    setFieldValue("costPrice", ProductInfo_InitialValues.costPrice);
    setFieldValue("sellPrice", ProductInfo_InitialValues.sellPrice);
    setFieldValue("warehouseId", ProductInfo_InitialValues.warehouseId);
    setFieldValue("markup", ProductInfo_InitialValues.markup);
    setFieldValue("openingStock", ProductInfo_InitialValues.openingStock);
    setFieldValue("sku", ProductInfo_InitialValues.sku);
    setFieldValue("retailPrice", ProductInfo_InitialValues.retailPrice);
  }

  const handleMarkup = (values, setFieldValue) => {
    const result =
      parseInt(values.sellPrice) -
      (parseInt(values.sellPrice) * parseFloat(values.vat)) / 100;
    const finalResult =
      ((parseInt(result) - parseInt(values.costPrice)) * 100) /
      parseInt(values.costPrice);

    if (parseFloat(finalResult).toFixed(2) < 0) {
      toaster(MSG_TYPE.WARNING, "You are selling this product with a loss!");
    }
    setFieldValue("markup", parseFloat(finalResult).toFixed(2));
  }

  return (
    <Formik
      initialValues={ProductInfo_InitialValues}
      validationSchema={ProductInfo_validationSchema}
      onSubmit={onProductInfoSubmit}
      enableReinitialize
    >
      {(props) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        } = props;
        return (
          <Form>
            <ProductInfoWrapper>
              <div className="productinfo-grid">
                <div className="left-section">
                  <div className="input-area">
                    <div className="field-1">
                      <TextFieldInputs
                        name="name"
                        label="Name*"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.name && touched.name}
                        helperText={errors.name && touched.name && errors.name}
                        value={values.name}
                      />
                    </div>
                    <div className="field-2">
                      <AutocompleteInputs
                        id="brandId"
                        name="brandId"
                        label="Brand*"
                        optionLabel="name"
                        onBlur={handleBlur}
                        value={values.brandId}
                        options={dropDownOptions.productInfo.brandId}
                        error={errors.brandId && touched.brandId}
                        onChange={handleAutoComplete("brandId", setFieldValue)}
                        helperText={
                          errors.brandId && touched.brandId && errors.brandId
                        }
                      />
                    </div>
                    <div className="field-3">
                      <AutocompleteInputs
                        id="subGroupId"
                        name="subGroupId"
                        label="Sub group*"
                        optionLabel="name"
                        onBlur={handleBlur}
                        value={values.subGroupId}
                        options={dropDownOptions.productInfo.subGroupId}
                        onChange={handleAutoComplete(
                          "subGroupId",
                          setFieldValue,
                          values
                        )}
                        error={errors.subGroupId && touched.subGroupId}
                        helperText={
                          errors.subGroupId &&
                          touched.subGroupId &&
                          errors.subGroupId
                        }
                      />
                    </div>
                    <div className="field-4">
                      <div className="my-0">Group</div>
                      <span>:</span>
                      {values.subGroupId && (
                        <SubHeaderLabel textappear="normal">
                          {toTitleCase(
                            values.subGroupId
                              ? values.subGroupId.group.name
                              : ""
                          )}
                        </SubHeaderLabel>
                      )}
                    </div>
                    <div className="field-5">
                      <div className="my-0">Category</div>
                      <span>:</span>
                      {values.subGroupId && (
                        <SubHeaderLabel textappear="normal">
                          {toTitleCase(
                            values.subGroupId
                              ? values.subGroupId.group.category.name
                              : ""
                          )}
                        </SubHeaderLabel>
                      )}
                    </div>
                    <div className="field-10">
                      <AutocompleteInputs
                        label="For Gender"
                        optionLabel="option"
                        name="gender"
                        onBlur={handleBlur}
                        value={values.gender}
                        options={genderOptions}
                        onChange={handleAutoComplete("gender", setFieldValue)}
                      />
                    </div>
                    <div className="field-9">
                      <TextFieldInputs
                        name="lowStock"
                        label="Low stock"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lowStock}
                      />
                    </div>
                    <div className="field-8">
                      <TextFieldInputs
                        name="vat"
                        label="VAT* (%)"
                        onBlur={handleBlur}
                        onChange={(e, val) => {
                          handleChange(e, val);
                          handleMarkup(
                            {
                              ...values,
                              vat: e.target.value,
                            },
                            setFieldValue
                          );
                        }}
                        error={errors.vat && touched.vat}
                        helperText={errors.vat && touched.vat && errors.vat}
                        value={values.vat}
                      />
                    </div>
                    <TextFieldInputs
                      label="SKU"
                      name="sku"
                      value={values.sku}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <div className="field-13">
                      <Radiobutton Title="Returns Accepted" gridColumn>
                        <RadioGroup
                          name="isReturn"
                          aria-label="isReturn"
                          value={values.isReturn}
                          onChange={(e, val) => setFieldValue("isReturn", +val)}
                        >
                          {returnAccepted.map((select, index) => (
                            <FormControlLabel
                              key={index}
                              label={select.label}
                              value={select.value}
                              checked={values.isReturn === select.value}
                              control={<Radio size="small" />}
                            />
                          ))}
                        </RadioGroup>
                      </Radiobutton>
                    </div>
                    <div className="field-12">
                      <Radiobutton Title="Type" gridColumn>
                        <RadioGroup
                          name="isVariant"
                          aria-label="isVariant"
                          value={values.isVariant}
                          onChange={
                            // handleChange(e, val);
                            handleAutoComplete(
                              "isVariant",
                              setFieldValue,
                              values
                            )
                            // checkIsVariant(val, setFieldValue, true)
                          }
                        >
                          {typeSelection.map((select, index) => (
                            <FormControlLabel
                              key={index}
                              value={select.value}
                              label={select.label}
                              control={<Radio size="small" />}
                            />
                          ))}
                        </RadioGroup>
                      </Radiobutton>
                    </div>
                    <div className="field-11">
                      <CustomSwitch
                        name="status"
                        label="Status"
                        labelPlacement="start"
                        checked={values.status}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <Collapse in={values.isVariant === "SIMPLE"}>
                    <SimpleVariant
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      handleAutoComplete={handleAutoComplete}
                      dropDownOptions={dropDownOptions.productInfo}
                      handleMarkup={handleMarkup}
                    />
                  </Collapse>
                  <SubHeaderLabel margin>Upload Images</SubHeaderLabel>
                  <DropZone
                    deleteIcon={true}
                    checkedIcon={true}
                    maxUpload={maxUpload}
                    files={values.productImages}
                    onDeleteImage={onDeleteImage}
                    setFieldValue={setFieldValue}
                    productImages={values.productImages}
                    handleDefaultCheck={handleDefaultCheck}
                    onDrop={(e) => onDrop(e, setFieldValue, values)}
                  />
                </div>
                <div className="right-section">
                  <div>
                    <SubHeaderLabel margin>Description</SubHeaderLabel>
                    <TextFieldInputs
                      multiline
                      rowsMax={10}
                      variant="outlined"
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Description..."
                      value={values.description}
                    />
                  </div>
                  <div>
                    <SubHeaderLabel margin>Retrun Policy</SubHeaderLabel>
                    <TextFieldInputs
                      multiline
                      className="returnPoicy-field"
                      variant="outlined"
                      name="returnPolicy"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Return Policies..."
                      value={values.returnPolicy}
                    />
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <Button>Cancel</Button>
                <Button type="submit" disabled={!values.name}>
                  {ProductInfo_InitialValues.btnTxt}
                </Button>
              </div>
            </ProductInfoWrapper>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ProductInfo;
