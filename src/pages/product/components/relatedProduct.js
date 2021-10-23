import React from "react";
import {
  Button,
  Column,
  TableRow,
  TableHeader,
  ActionButtons,
  ResponsiveTable,
  AutocompleteInputs,
  TableContainer,
  CustomSwitch,
} from "components";
import { RelatedProductWrapper } from "../productStyleWrapper";
import { Avatar, IconButton } from "@material-ui/core";
import { Formik, Form } from "formik";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteRelatedProduct } from "../product.service";
import { MSG_TYPE, useToaster } from "components/toastBar";

const RelatedProduct = (props) => {

  const {
    RelatedProduct_InitialValues,
    onRelatedPrdSubmit,
    ProductInfo_InitialValues,
  } = props;

  const toaster = useToaster();

  const handleAutoComplete = (name, setFieldValue) => (e, value) => {
    setFieldValue(name, value !== null ? value : []);
  };

  const handleBtnClick = (values, setFieldValue) => {
    setFieldValue("relatedProducts", [
      ...values.relatedProducts,
      ...values.products,
    ]);
    setFieldValue("products", []);
  };

  const dropdownFilterFunc = (dropDown, relatedPrd) => {
    if (relatedPrd.length > 0) {
      let arr = [];
      relatedPrd.forEach((foo) => {
        arr.push(foo.id);
      });
      const dropDownArray = dropDown.filter((foo) => !arr.includes(foo.id));
      return dropDownArray;
    } else {
      return dropDown;
    }
  };

  const handleDeleteList = async (val, relatedPrd, setFieldValue) => {
    try {
      if (val.relatedProductId) {
        await deleteRelatedProduct(val.relatedProductId);
      }
      setFieldValue(
        "relatedProducts",
        relatedPrd.filter((foo) => foo.id !== val.id)
      );
      toaster(MSG_TYPE.SUCCESS, "Related product deleted successfully");
    } catch (err) {
      toaster(MSG_TYPE.ERROR, err);
    }
  };

  return (
    <Formik
      initialValues={RelatedProduct_InitialValues}
      onSubmit={onRelatedPrdSubmit}
      enableReinitialize
    >
      {(props) => {
        const { values, handleChange, setFieldValue } = props;
        return (
          <Form>
            <RelatedProductWrapper>
              <div className="product-brand">
                <div className="product">
                  Product Name &nbsp;:{" "}
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
              </div>
              <div className="related">
                <AutocompleteInputs
                  disabled={values.checked}
                  id="products"
                  name="products"
                  multiple
                  optionCheck={true}
                  disableCloseOnSelect
                  optionImage
                  className="productOption-menu"
                  value={values.products}
                  options={dropdownFilterFunc(
                    values.dropDown,
                    values.relatedProducts
                  )}
                  optionLabel="name"
                  optionPic={"image"}
                  label="Related Product"
                  onChange={handleAutoComplete("products", setFieldValue)}
                />
                <Button
                  className="add-btn"
                  size="small"
                  component="span"
                  onClick={() => handleBtnClick(values, setFieldValue)}
                >
                  Add
                </Button>
                <div className="status">
                  System Logic
                  <CustomSwitch
                    checked={values.checked}
                    onChange={handleChange}
                    name="checked"
                  />
                </div>
              </div>
              <div className="outer-container">
                {/* {!values.checked && ( */}
                <>
                  <div className="subheader-label">Products</div>
                  <ResponsiveTable>
                    <TableHeader>
                      <Column size="10%" alignTo="left">
                        Image
                      </Column>
                      <Column alignTo="left" size="50%">
                        Product
                      </Column>

                      <Column size="15%">Price</Column>
                      <Column size="15%">Action</Column>
                    </TableHeader>
                    <TableContainer staticHeight="calc(100vh - 50vh)">
                      {values.relatedProducts.map((pro, index) => (
                        <TableRow key={index}>
                          <Column size="10%" data-label="Image">
                            <Avatar
                              variant="circle"
                              alt="Product Image"
                              src={pro.image}
                            />
                          </Column>
                          <Column
                            alignTo="left"
                            size="50%"
                            data-label="Product"
                          >
                            {pro.name}
                          </Column>

                          <Column size="15%" data-label="Price">
                            {"-"}
                          </Column>
                          <Column size="15%" data-label="Action">
                            <ActionButtons>
                              <IconButton
                                className="delete-icon"
                                size="small"
                                color="primary"
                                component="span"
                                disabled={values.checked}
                              >
                                <DeleteIcon
                                  onClick={() =>
                                    handleDeleteList(
                                      pro,
                                      values.relatedProducts,
                                      setFieldValue
                                    )
                                  }
                                />
                              </IconButton>
                            </ActionButtons>
                          </Column>
                        </TableRow>
                      ))}
                    </TableContainer>
                  </ResponsiveTable>
                </>
                {/* )} */}
                <div className="bottom-section">
                  <Button>Cancel</Button>
                  <Button
                    type="submit"
                  >
                    Save & Proceed
                  </Button>
                </div>
              </div>
            </RelatedProductWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RelatedProduct;
