import { Form, Formik } from "formik";
import AddIcon from "@material-ui/icons/Add";
import { appendImage, toTitleCase } from "utils/utilsFunc";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import TrendingProductStyleWrapper from "./trendingProductStyles";
import { MSG_TYPE, useToaster } from "components/toastBar";
import { Grid, Avatar, IconButton, Collapse, Divider } from "@material-ui/core";
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
  ResponsiveTable,
  AutocompleteInputs,
  TableContainer,
} from "components";
import {
  trendingProduct_initialValues,
  trendingProduct_validationSchema,
} from "../trendingFormData";
import {
  createTrendingProduct,
  deleteSiteSectionItem,
  getProducts,
  getSiteOptions,
  updateTrendingProduct,
  viewSiteData,
} from "../trendingProduct.service";
import { useHistory } from "react-router";

const TrendingProduct = (props) => {
  const { id } = props.match.params;
  const checkUrl = props.match.url.split("/");
  const isView = checkUrl[2] === "view" ? true : false;
  const history = useHistory();
  const toaster = useToaster();
  const [trendingProductData, setTrendingProductData] = useState({
    offerType: [],
    product: [],
    trendingProduct_initialValues,
  });

  const fetchSiteSections = async () => {
    try {
      const { data } = await getSiteOptions();
      setTrendingProductData((prevState) => ({
        ...prevState,
        offerType: data.filter((da) => !da.productCount),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data: productItem } = await getProducts();
      setTrendingProductData((prevState) => ({
        ...prevState,
        product: [...appendImage(productItem)],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const onEditProduct = async (id) => {
    const { data } = await viewSiteData(id);
    setTrendingProductData((prevState) => {
      return {
        ...prevState,
        trendingProduct_initialValues: {
          ...prevState.trendingProduct_initialValues,
          offerType: data,
          filterProduct: data.site_section_items.map((item) => {
            return {
              ...item.product,
              siteSectionItemId: item.id,
            };
          }),
          btnText: "Update",
        },
      };
    });
  };

  const onSubmit = async (values) => {
    try {
      console.log(8776546543, values);
      const payload = {
        siteSectionItems: values.filterProduct.map((product) => {
          return {
            siteSectionId: values.offerType.id,
            productId: product.id,
          };
        }),
      };
      if (id) {
        await updateTrendingProduct(id, payload);
      } else {
        await createTrendingProduct(payload);
      }
      toaster(
        MSG_TYPE.SUCCESS,
        `Product ${id ? "updated" : "added"} successfully`
      );
      history.goBack();
    } catch (error) {
      toaster(MSG_TYPE.WARNING, error);
      console.log(error);
    }
  };

  const dropdownFilterFunc = (filterProduct) => {
    const products = trendingProductData.product;
    if (filterProduct.length) {
      const existingProducts = filterProduct.map((prd) => prd.id);
      const filteredProducts = products.filter(
        (prd) => !existingProducts.includes(prd.id)
      );
      return filteredProducts;
    } else {
      return products;
    }
  };

  const handleBtnClick = (values, setFieldValue) => {
    setFieldValue("filterProduct", [
      ...values.filterProduct,
      ...values.selectProduct,
    ]);
    setFieldValue("selectProduct", []);
  };
  const handleAutoComplete = (name, setFieldValue) => (e, value) => {
    setFieldValue(
      name,
      value !== null ? value : trendingProduct_initialValues[name]
    );
  };

  const rmvItems = (listToDelete, filterProduct, setFieldValue) => {
    setFieldValue(
      "filterProduct",
      filterProduct.filter((foo) => foo.id !== listToDelete.id)
    );
  };

  const handleDeleteList = (
    listToDelete,
    filterProduct,
    setFieldValue
  ) => async () => {
    try {
      if (listToDelete.siteSectionItemId) {
        await deleteSiteSectionItem(listToDelete.siteSectionItemId);
        rmvItems(listToDelete, filterProduct, setFieldValue);
        toaster(MSG_TYPE.SUCCESS, `Product deleted successfully.`);
      } else {
        rmvItems(listToDelete, filterProduct, setFieldValue);
      }
    } catch (err) {
      toaster(MSG_TYPE.ERROR, err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (id) onEditProduct(id);
    else fetchSiteSections();
  }, [id]);

  return (
    <Formik
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={trendingProductData.trendingProduct_initialValues}
      validationSchema={trendingProduct_validationSchema}
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
        return (
          <Form>
            <HeroSection />
            <Container>
              <PageHeader Title="Promotion" />
              <TrendingProductStyleWrapper>
                <Grid container spacing={3}>
                  <Grid item lg={7} sm={12} md={10} xl={7}>
                    <div className="fieldLayout-container">
                      <div className="field-1">
                        <AutocompleteInputs
                          disabled={id ? true : false}
                          id="offerType"
                          name="offerType"
                          label="Offer Type"
                          optionLabel="name"
                          onBlur={handleBlur}
                          value={values.offerType}
                          options={trendingProductData.offerType}
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
                      <div className="field-2">
                        <Collapse
                          in={values.offerType.name === "Trending Product"}
                        >
                          <CustomSwitch
                            name="logic"
                            label="Logic"
                            disabled={isView}
                            onChange={handleChange}
                            checked={values.logic}
                            labelPlacement="start"
                          />
                        </Collapse>
                      </div>
                      <div className="field-6">
                        <Collapse in={!values.logic}>
                          <AutocompleteInputs
                            disabled={isView}
                            optionImage
                            optionPic={"image"}
                            multiple
                            id="selectProduct"
                            onBlur={handleBlur}
                            name="selectProduct"
                            label="Select Product"
                            options={dropdownFilterFunc(values.filterProduct)}
                            optionCheck={true}
                            optionLabel="name"
                            disableCloseOnSelect
                            value={values.selectProduct}
                            error={
                              errors.selectProduct && touched.selectProduct
                            }
                            onChange={handleAutoComplete(
                              "selectProduct",
                              setFieldValue
                            )}
                            helperText={
                              errors.selectProduct &&
                              touched.selectProduct &&
                              errors.selectProduct
                            }
                          />
                        </Collapse>
                      </div>
                      <div className="field-7">
                        <Collapse in={!values.logic}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            disabled={isView}
                            onClick={() =>
                              handleBtnClick(values, setFieldValue)
                            }
                          >
                            Add
                          </Button>
                        </Collapse>
                      </div>
                    </div>
                    <Collapse in={!values.logic}>
                      <ResponsiveTable>
                        <TableHeader>
                          <Column size="10%" alignTo="left">
                            Image
                          </Column>
                          <Column alignTo="left" size="55%">
                            Product
                          </Column>
                          <Column size="15%">Price</Column>
                          <Column size="10%">Action</Column>
                        </TableHeader>
                        <TableContainer staticHeight="50vh">
                          {values.filterProduct.map((product, index) => (
                            <TableRow key={index}>
                              <Column size="10%" data-label="Image">
                                <Avatar
                                  variant="circle"
                                  alt="Product Image"
                                  src={product.image}
                                />
                              </Column>
                              <Column
                                alignTo="left"
                                size="55%"
                                data-label="Product"
                              >
                                {toTitleCase(product.name)}
                              </Column>
                              <Column size="15%" data-label="Price">
                                {"-"}
                              </Column>
                              <Column size="10%" data-label="Action">
                                <ActionButtons>
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    component="span"
                                    disabled={isView}
                                    onClick={handleDeleteList(
                                      product,
                                      values.filterProduct,
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
                      </ResponsiveTable>
                    </Collapse>
                    <Divider />
                    <div className="bottom-section">
                      <Button
                        onClick={() => {
                          history.goBack();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={!values.offerType || isView ? true : false}
                      >
                        {values.btnText}
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </TrendingProductStyleWrapper>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
};
export default TrendingProduct;
