import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { AiOutlineUpload } from "react-icons/ai";
import { VariantsTabWrappper } from "../productStyleWrapper";
import { PopoverStyleWrapper } from "../productStyleWrapper";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { IconButton, Divider, Avatar, Popper } from "@material-ui/core";
import {
  ActionButtons,
  AutocompleteInputs,
  Button,
  CustomCheckbox,
  SubHeaderLabel,
} from "components";
import { Form, Formik, FieldArray } from "formik";
import { initialVariant } from "../formDatas/formInitialValues";
import { MSG_TYPE, useToaster } from "components/toastBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  popover: {
    pointerEvents: "none",
  },
}));

const ProductVariants = (props) => {
  const [popperState, setPopperState] = useState({
    anchorEl: null,
    placement: null,
    image: "",
  });

  const classes = useStyles();

  const handlePopoverOpen = (newPlacement, img) => (event) => {
    setPopperState({
      ...popperState,
      anchorEl: event.currentTarget,
      placement: newPlacement,
      image: img,
    });
  };

  const handlePopoverClose = (newPlacement) => {
    setPopperState({
      ...popperState,
      anchorEl: null,
      placement: newPlacement,
      image: "",
    });
  };

  const open = Boolean(popperState.anchorEl);

  const {
    ProductVariant_InitialValues,
    dropDownOptions,
    onProductVariantSubmit,
    ProductVariants_validationSchema,
    ProductInfo_InitialValues,
    setDropDownOptions,
    stores,
  } = props;
  const toaster = useToaster();

  const handleAutoComplete = (name, setFieldValue) => (e, value) => {
    setFieldValue(name, value !== null ? value : "");
  };

  const setStateFunc = () => {
    setDropDownOptions((prevState) => {
      return {
        ...prevState,
        productInfo: {
          ...prevState.productInfo,
          btnCheck: false,
          variantCheck: true,
        },
      };
    });
  };

  const handleAttrImg = (name, setFieldValue, check, filesData) => (e) => {
    if (check === "single") {
      let value = {
        url: URL.createObjectURL(e.target.files[0]),
        image: e.target.files[0],
      };
      setFieldValue(name, value !== null ? value : "");
    } else if (check === "multiple") {
      let totalImage = filesData.length + e.target.files.length;
      if (totalImage > dropDownOptions.variantMaxUpload) {
        toaster(
          MSG_TYPE.WARNING,
          `Maximum file upload is ${dropDownOptions.variantMaxUpload}`
        );
      } else {
        let value = Array.from(e.target.files).map((file) => {
          return {
            url: URL.createObjectURL(file),
            image: file,
          };
        });
        setFieldValue(name, value !== null ? [...filesData, ...value] : []);
      }
    }
  };

  const onDeleteImage = async (file, productImages, setFieldValue, name) => {
    try {
      setPopperState({
        ...popperState,
        anchorEl: null,
      });
      if (file.id) {
        rmvFiles(file, productImages, setFieldValue);
      } else {
        rmvFiles(file, productImages, setFieldValue, name);
      }
    } catch (err) {
      toaster(MSG_TYPE.ERROR, err);
    }
  };

  const rmvFiles = (delFile, productImages, setFieldValue, name) => {
    let newFiles = [...productImages];
    newFiles.splice(newFiles.indexOf(delFile), 1);
    setFieldValue(name, [...newFiles]);
  };

  const dropdownFilterFunc = (variants, formVariants, check) => {
    if (check === "variants") {
      if (formVariants.length > 1) {
        let arr = [];
        formVariants.forEach((foo) => {
          if (foo.variantId !== "") {
            arr.push(foo.variantId.id);
          }
        });
        const variantArray = variants.filter((foo) => !arr.includes(foo.id));
        return variantArray;
      } else {
        return variants;
      }
    } else if (check === "attributes") {
      if (formVariants.length > 1) {
        let arr = [];
        formVariants.forEach((foo) => {
          if (foo.attributeId !== "") {
            arr.push(foo.attributeId.id);
          }
        });
        const variantArray = variants.filter((foo) => !arr.includes(foo.id));
        return variantArray;
      } else {
        return variants;
      }
    }
  };

  const checkAttr = (variants) => {
    let arr = [];
    variants.forEach((foo) => {
      foo.attributes.forEach((foo) => {
        arr.push(foo);
      });
    });

    return arr.every((foo) => foo.attributeId !== "");
  };

  return (
    <Formik
      initialValues={ProductVariant_InitialValues}
      validationSchema={ProductVariants_validationSchema}
      onSubmit={onProductVariantSubmit}
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
            <VariantsTabWrappper>
              <FieldArray name="variants">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { variants } = values;

                  return (
                    <>
                      <div className="outer-container">
                        <div className="variantHero-section">
                          <div className="product-brand">
                            <div className="product">
                              Product Name&nbsp;:{" "}
                              <span>
                                {ProductInfo_InitialValues.name
                                  ? ProductInfo_InitialValues.name
                                  : ""}
                              </span>
                            </div>
                            <div className="product">
                              Brand Name&nbsp;:{" "}
                              <span>
                                {ProductInfo_InitialValues.brandId
                                  ? ProductInfo_InitialValues.brandId.name
                                  : ""}
                              </span>
                            </div>
                            <div className="product">
                              <AutocompleteInputs
                                label="Warehouse*"
                                optionLabel="name"
                                value={values.warehouseId}
                                onChange={handleAutoComplete(
                                  "warehouseId",
                                  setFieldValue
                                )}
                                id="warehouseId"
                                name="warehouseId"
                                error={
                                  errors.warehouseId && touched.warehouseId
                                }
                                helperText={
                                  errors.warehouseId &&
                                  touched.warehouseId &&
                                  errors.warehouseId
                                }
                                options={stores}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>
                        </div>
                        {variants.map((variant, variantIndex) => {
                          return (
                            <ul key={variantIndex} className="responsive-table">
                              {dropDownOptions.variantCheck && (
                                <>
                                  <div className="variant-selection px-4 py-2">
                                    <div className="selection-field">
                                      <div>Variant</div>
                                      <div>
                                        <AutocompleteInputs
                                          error={
                                            errors?.variants?.[variantIndex]
                                              ?.variantId &&
                                            touched?.variants?.[variantIndex]
                                              ?.variantId
                                          }
                                          helperText={
                                            errors?.variants?.[variantIndex]
                                              ?.variantId &&
                                            touched?.variants?.[variantIndex]
                                              ?.variantId &&
                                            errors?.variants?.[variantIndex]
                                              ?.variantId
                                          }
                                          onBlur={handleBlur}
                                          shape="rounded"
                                          variant="filled"
                                          placeholder="Variant"
                                          optionLabel="name"
                                          className="variant-dropdown"
                                          name={`variants[${variantIndex}].variantId`}
                                          value={
                                            values.variants[variantIndex]
                                              .variantId
                                          }
                                          onChange={handleAutoComplete(
                                            `${[
                                              `variants[${variantIndex}].variantId`,
                                            ]}`,
                                            setFieldValue
                                          )}
                                          options={dropdownFilterFunc(
                                            dropDownOptions.variants,
                                            variants,
                                            "variants"
                                          )}
                                        />
                                      </div>
                                    </div>
                                    <div className="remove-variant">
                                      {variants.length > 1 && (
                                        <Button
                                          size="small"
                                          variant="outlined"
                                          textButton
                                          onClick={() => remove(variantIndex)}
                                        >
                                          Delete
                                        </Button>
                                      )}
                                    </div>
                                    {variantIndex === 0 ? (
                                      <CustomCheckbox
                                        name="isMultipleListing"
                                        value={values.isMultipleListing}
                                        onChange={handleChange}
                                        label="Mulitple Listings"
                                        labelPlacement="end"
                                      />
                                    ) : null}
                                  </div>
                                  <li className="table-header">
                                    <SubHeaderLabel
                                      textappear="normal"
                                      className="col col-1"
                                    >
                                      Image
                                    </SubHeaderLabel>
                                    <SubHeaderLabel
                                      textappear="normal"
                                      className="col col-2"
                                    >
                                      Attributes
                                    </SubHeaderLabel>
                                    <SubHeaderLabel
                                      textappear="normal"
                                      className="col col-3"
                                    >
                                      Image(s)
                                    </SubHeaderLabel>
                                    <SubHeaderLabel
                                      textappear="normal"
                                      className="col col-4"
                                    ></SubHeaderLabel>
                                    <SubHeaderLabel
                                      textappear="normal"
                                      className="col col-5"
                                    >
                                      Action
                                    </SubHeaderLabel>
                                  </li>
                                </>
                              )}
                              <FieldArray
                                name={`${[
                                  `variants[${variantIndex}].attributes`,
                                ]}`}
                              >
                                {(fieldArrayProps) => {
                                  const {
                                    push: attributePush,
                                    remove: attributeRemove,
                                  } = fieldArrayProps;
                                  return (
                                    <>
                                      {variant.attributes.map(
                                        (attribute, attributeIndex) => {
                                          return (
                                            <>
                                              {variant.variantId && (
                                                <li className="table-row">
                                                  <div className="col col-1">
                                                    <input
                                                      accept="image/jpg,image/jpeg,image/png,image/webp"
                                                      id={`${[
                                                        `variants[${variantIndex}].attributes[${attributeIndex}].attributePic`,
                                                      ]}`}
                                                      type="file"
                                                      hidden
                                                      onChange={handleAttrImg(
                                                        `${[
                                                          `variants[${variantIndex}].attributes[${attributeIndex}].attributePic`,
                                                        ]}`,
                                                        setFieldValue,
                                                        "single"
                                                      )}
                                                    />
                                                    <label
                                                      htmlFor={`${[
                                                        `variants[${variantIndex}].attributes[${attributeIndex}].attributePic`,
                                                      ]}`}
                                                    >
                                                      <Avatar
                                                        variant="circle"
                                                        alt="Product Image"
                                                        src={
                                                          values.variants[
                                                            variantIndex
                                                          ].attributes[
                                                            attributeIndex
                                                          ].attributePic.url
                                                        }
                                                      >
                                                        <AiOutlineUpload />
                                                      </Avatar>
                                                    </label>
                                                  </div>
                                                  <div className="col col-2">
                                                    <AutocompleteInputs
                                                      shape="rounded"
                                                      variant="filled"
                                                      placeholder="Attribute"
                                                      className="variant-dropdown"
                                                      optionLabel="name"
                                                      error={
                                                        errors?.variants?.[
                                                          variantIndex
                                                        ]?.attributes?.[
                                                          attributeIndex
                                                        ]?.attributeId &&
                                                        touched?.variants?.[
                                                          variantIndex
                                                        ]?.attributes?.[
                                                          attributeIndex
                                                        ]?.attributeId
                                                      }
                                                      helperText={
                                                        errors?.variants?.[
                                                          variantIndex
                                                        ]?.attributes?.[
                                                          attributeIndex
                                                        ]?.attributeId &&
                                                        touched?.variants?.[
                                                          variantIndex
                                                        ]?.attributes?.[
                                                          attributeIndex
                                                        ]?.attributeId &&
                                                        errors?.variants?.[
                                                          variantIndex
                                                        ]?.attributes?.[
                                                          attributeIndex
                                                        ]?.attributeId
                                                      }
                                                      onBlur={handleBlur}
                                                      value={
                                                        values.variants[
                                                          variantIndex
                                                        ].attributes[
                                                          attributeIndex
                                                        ].attributeId
                                                      }
                                                      options={dropdownFilterFunc(
                                                        variants[variantIndex]
                                                          .variantId.attributes,
                                                        variant.attributes,
                                                        "attributes"
                                                      )}
                                                      onChange={handleAutoComplete(
                                                        `${[
                                                          `variants[${variantIndex}].attributes[${attributeIndex}].attributeId`,
                                                        ]}`,
                                                        setFieldValue
                                                      )}
                                                    />
                                                  </div>
                                                  <div className="col col-3">
                                                    <input
                                                      multiple
                                                      type="file"
                                                      accept="image/jpg,image/jpeg,image/png,image/webp"
                                                      className="fileUpload-btn"
                                                      id={`${[
                                                        `variants[${variantIndex}].attributes[${attributeIndex}].variantPics`,
                                                      ]}`}
                                                      onChange={handleAttrImg(
                                                        `${[
                                                          `variants[${variantIndex}].attributes[${attributeIndex}].variantPics`,
                                                        ]}`,
                                                        setFieldValue,
                                                        "multiple",
                                                        values.variants[
                                                          variantIndex
                                                        ].attributes[
                                                          attributeIndex
                                                        ].variantPics
                                                      )}
                                                    />
                                                    <label
                                                      htmlFor={`${[
                                                        `variants[${variantIndex}].attributes[${attributeIndex}].variantPics`,
                                                      ]}`}
                                                    >
                                                      <Button
                                                        size="small"
                                                        component="span"
                                                        startIcon={
                                                          <AiOutlineUpload />
                                                        }
                                                      >
                                                        Upload
                                                      </Button>
                                                    </label>
                                                  </div>
                                                  <div className="col col-4">
                                                    {variants[
                                                      variantIndex
                                                    ].attributes[
                                                      attributeIndex
                                                    ].variantPics.map((img) => {
                                                      return (
                                                        <div
                                                          className="imageUploadHover"
                                                          aria-owns={
                                                            open
                                                              ? "mouse-over-popover"
                                                              : undefined
                                                          }
                                                          aria-haspopup="true"
                                                          onMouseEnter={handlePopoverOpen(
                                                            "top-start",
                                                            img.url
                                                          )}
                                                          onMouseLeave={
                                                            handlePopoverClose
                                                          }
                                                        >
                                                          <IconButton
                                                            aria-label="delete"
                                                            className="uploadImageClose"
                                                            onClick={() => {
                                                              onDeleteImage(
                                                                img,
                                                                variants[
                                                                  variantIndex
                                                                ].attributes[
                                                                  attributeIndex
                                                                ].variantPics,
                                                                setFieldValue,
                                                                `${[
                                                                  `variants[${variantIndex}].attributes[${attributeIndex}].variantPics`,
                                                                ]}`
                                                              );
                                                            }}
                                                          >
                                                            <CloseRoundedIcon className="matDeleteIconSize" />
                                                          </IconButton>
                                                          <Avatar
                                                            variant="rounded"
                                                            alt="Product Image"
                                                            src={img.url}
                                                          />
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                  <div className="col col-5">
                                                    <ActionButtons>
                                                      <IconButton
                                                        size="small"
                                                        color="primary"
                                                        component="span"
                                                        aria-label="remove-button"
                                                      >
                                                        {variants[variantIndex]
                                                          .attributes.length >
                                                          1 && (
                                                            <RemoveCircleIcon
                                                              onClick={() =>
                                                                attributeRemove(
                                                                  attributeIndex
                                                                )
                                                              }
                                                            />
                                                          )}
                                                      </IconButton>
                                                      {variant.attributes
                                                        .length <
                                                        variants[variantIndex]
                                                          .variantId.attributes
                                                          ?.length &&
                                                        attribute.attributeId !==
                                                        "" ? (
                                                        <IconButton
                                                          color="primary"
                                                          component="span"
                                                          aria-label="add-button"
                                                          className="add-button"
                                                        >
                                                          <AddIcon
                                                            onClick={() =>
                                                              attributePush(
                                                                initialVariant
                                                                  .attributes[0]
                                                              )
                                                            }
                                                          />
                                                        </IconButton>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </ActionButtons>
                                                  </div>
                                                </li>
                                              )}

                                              <Divider variant="middle" />
                                            </>
                                          );
                                        }
                                      )}
                                    </>
                                  );
                                }}
                              </FieldArray>
                            </ul>
                          );
                        })}
                        <div className="add-variants">
                          {dropDownOptions.btnCheck ||
                            (variants.length < dropDownOptions.variants.length &&
                              variants.every((foo) => foo.variantId !== "") &&
                              checkAttr(variants)) ? (
                            <Button
                              size="small"
                              onClick={() => {
                                if (dropDownOptions.btnCheck) {
                                  setStateFunc();
                                } else {
                                  push(initialVariant);
                                }
                              }}
                              variant="outlined"
                              startIcon={<AddIcon />}
                            >
                              Add Variants
                            </Button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </>
                  );
                }}
              </FieldArray>
              <Popper
                className={classes.popover}
                id="mouse-over-popover"
                open={open}
                anchorEl={popperState.anchorEl}
                placement={popperState.placement}
              >
                <PopoverStyleWrapper>
                  <div className="popper">
                    <img
                      src={popperState.image}
                      alt="product-variant"
                      className="popper-image"
                    />
                  </div>
                </PopoverStyleWrapper>
              </Popper>
              <div className="bottom-section">
                <Button>Cancel</Button>
                <Button
                  type="submit"
                  disabled={!values.warehouseId}
                >{`Save & Proceed`}</Button>
              </div>
            </VariantsTabWrappper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductVariants;
