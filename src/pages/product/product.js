import {
  appendFormData,
  appendImage,
  combinationFunction,
  createPayloadObj,
  findConfig,
} from "utils/utilsFunc.js";
import React, { useCallback, useEffect, useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { TabStyleWrapper } from "./productStyleWrapper.js";
import { HeroSection, Container, PageHeader } from "components";
import { TabPanel, a11yProps, tabs } from "./tabMaterials";
import {
  SEO,
  ProductInfo,
  VariantDetails,
  RelatedProduct,
  ProductVariants,
} from "./components";
import {
  getBrands,
  getConfig,
  getStores,
  getAllSubgroups,
  createProduct,
  updateProduct,
  createProductVariant,
  updateVariantDetails,
  createRelatedProduct,
  updateSeo,
} from "./product.service.js";
import {
  genderOptions,
  typeSelection,
  returnAccepted,
  ProductInfo_InitialValues,
  ProductVariant_InitialValues,
  VariantDetail_InitalValues,
  ProductInfo_validationSchema,
  ProductVariants_validationSchema,
  RelatedProduct_InitialValues,
  Seo_InitialValues,
} from "./formDatas";
import { convertBase64Img, productImageUrl } from "utils/image.js";
import { useHistory } from "react-router";
import { MSG_TYPE, useToaster } from "components/toastBar";

function Product() {

  const history = useHistory();
  const toaster = useToaster();

  const [tabState, setTabState] = useState({
    currentTab: "Product Information",
    tabs,
  });

  const [dropDownOptions, setDropDownOptions] = useState({
    productInfo: {
      brandId: [],
      stores: [],
      subGroupId: [],
      variants: [],
      products: [],
      maxUpload: "",
      variantMaxUpload: "",
      attributes: [],
      btnCheck: true,
      variantCheck: false,
      ProductInfo_InitialValues,
    },
    productVariant: {
      ProductVariant_InitialValues,
      attributeValue: [],
      stores: [],
    },
    relatedProduct: { RelatedProduct_InitialValues },
    variantDetail: {
      VariantDetail_InitalValues,
      warehouse: "",
    },
    seo: { Seo_InitialValues },
  });

  const handleChange = (event, newValue) => {
    setTabState((tbVal) => ({ ...tbVal, currentTab: newValue }));
  };

  const productDataHandler = useCallback(async () => {
    try {
      const { data: subgroupData } = await getAllSubgroups();
      const { data: brandsData } = await getBrands();
      const configData = await getConfig();
      const { data: storesData } = await getStores();

      setDropDownOptions((prevState) => {
        return {
          ...prevState,
          productInfo: {
            ...prevState.productInfo,
            subGroupId: subgroupData,
            brandId: brandsData,
            stores: storesData,
            maxUpload: findConfig(configData, "MAXIMUM_PRODUCT_IMAGES"),
            variantMaxUpload: findConfig(
              configData,
              "MAXIMUM_PRODUCT_VARIANT_IMAGES"
            ),
          },
          productVariant: {
            ...prevState.productVariant,
            stores: storesData,
          },
        };
      });
    } catch (error) {
      toaster(MSG_TYPE.ERROR, error);
    }
  }, []);

  const tabEnableHandler = (nextTab) => {
    setTabState((tbVal) => ({
      ...tbVal,
      currentTab: nextTab,
      tabs: [
        ...tbVal.tabs.map((tabLabel) => {
          if (tabLabel.label === nextTab) {
            return { ...tabLabel, isDisable: false };
          } else return tabLabel;
        }),
      ],
    }));
  };

  const productVariantImagePayload = (variants) => {
    let attributes = [];
    variants.forEach((variant) => {
      variant.attributes.forEach((attribute) => {
        if (
          attribute.attributePic !== "" ||
          attribute.variantPics.length !== 0
        ) {
          attributes.push(attribute);
        }
      });
    });

    let attributeData = [];
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      let fileInfo = [],
        files = [];

      if (attribute.attributePic) {
        fileInfo.push(true);
        files.push(attribute.attributePic);
      }

      if (attribute.variantPics.length) {
        files = [...files, ...attribute.variantPics];
      }
      attributeData.push({
        attributeId: attribute.attributeId.id,
        productId: dropDownOptions.productInfo.ProductInfo_InitialValues.id,
        fileInfo,
        files,
      });
    }

    return {
      attributeData,
    };
  };

  const onProductVariantSubmit = async (values) => {
    try {
      let check = false;
      values.variants.forEach((variant) => {
        if (variant.variantId.isImage) {
          const arrCheck = variant.attributes.every(
            (elem) => elem.attributePic !== ""
          );
          if (!arrCheck) {
            check = true;
          }
        }
      });

      if (check) {
        return toaster(
          MSG_TYPE.WARNING,
          "Please upload image to the required attributes!"
        );
      }

      let attributeValue = [];
      values.variants.forEach((variant) => {
        variant.attributes.forEach((attribute) => {
          attributeValue.push(attribute.attributeId);
        });
      });

      let productVariants = [];
      values.variants.forEach((variant) => {
        variant.attributes.forEach((attribute) => {
          const obj = {
            productId: dropDownOptions.productInfo.ProductInfo_InitialValues.id,
            variantId: attribute.attributeId.variantId,
            attributeId: attribute.attributeId.id,
          };
          productVariants.push(obj);
        });
      });

      let combinationObj = {};
      values.variants.forEach((variant) => {
        let arr = [];
        let value = variant.variantId.name;
        variant.attributes.forEach((attr) => {
          arr.push(attr.attributeId.id);
        });
        combinationObj[value] = arr;
      });

      const getPayLoad = productVariantImagePayload(values.variants);

      const postObj = {
        productId: dropDownOptions.productInfo.ProductInfo_InitialValues.id,
        productVariants,
        productVariantDetails: combinationFunction(
          combinationObj,
          dropDownOptions.productInfo.ProductInfo_InitialValues.id
        ),
        product: {
          isMultipleListing: values.isMultipleListing,
        },
        productAttributeImages: getPayLoad.attributeData,
        warehouseStock: {
          productId: dropDownOptions.productInfo.ProductInfo_InitialValues.id,
          warehouseId: values.warehouseId.id,
        },
      };
      const formData = new FormData();
      formData.append("payload", JSON.stringify(postObj));
      for (let i = 0; i < getPayLoad.attributeData.length; i++) {
        const attribute = getPayLoad.attributeData[i];
        for (let j = 0; j < attribute.files.length; j++) {
          const file = attribute.files[j];
          formData.append(`attributeImage${[i]}`, file.image);
        }
      }

      const reqQuery = {
        folder_name:
          dropDownOptions.productInfo.ProductInfo_InitialValues.folderName,
        attribute_image_len: getPayLoad.attributeData.length,
      };
      const productVariantRes = await createProductVariant(reqQuery, formData);

      const productVariantDetails = productVariantRes.newProductVariantDetails.map(
        (item) => {
          const name = item.combinationName.split("-");
          let concateStr = "";
          name.forEach((num) => {
            const value = attributeValue.find(({ id }) => id === +num);
            concateStr += `${value.name} / `;
          });
          return { ...item, name: concateStr };
        }
      );

      setDropDownOptions((prevState) => {
        return {
          ...prevState,
          productVariant: {
            ...prevState.productVariant,
            ProductVariant_InitialValues: values,
            attributeValue: attributeValue,
          },
          variantDetail: {
            ...prevState.variantDetail,
            VariantDetail_InitalValues: {
              ...prevState.variantDetail.VariantDetail_InitalValues,
              productCombination: productVariantDetails,
            },
            warehouse: values.warehouseId,
          },
        };
      });

      tabEnableHandler("Variant Details");
    } catch (error) {
      toaster(MSG_TYPE.ERROR, error);
    }
  };

  const onProductInfoSubmit = async (values) => {
    if (
      values.isVariant === "SIMPLE" &&
      +values.sellPrice >= +values.retailPrice
    ) {
      return toaster(
        MSG_TYPE.WARNING,
        "selling price and cost price should be less than or equal to retail price"
      );
    }
    if (values && values.id) {
      try {
        const productData = values;
        const getPayLoadData = {
          ...productData,
          isVariant: productData.isVariant === "VARIANT" ? true : false,
          costPrice:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.costPrice
              : productData.costPrice,
          markup:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.markup
              : productData.markup,
          sellPrice:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.sellPrice
              : productData.sellPrice,
          openingStock:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.openingStock
              : productData.openingStock,
          sku:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.sku
              : productData.sku,
        };
        const getPayLoad = createPayloadObj(getPayLoadData, [
          "isReturn",
          "status",
          "isVariant",
        ]);

        const productPayload =
          productData.isVariant === "VARIANT"
            ? {
              ...getPayLoad,
              costPrice: 0,
              sellPrice: 0,
              openingStock: 0,
              sku: null,
            }
            : getPayLoad;

        const formData = appendFormData(productPayload);
        for (let i = 0; i < values.productImages.length; i++) {
          const file = values.productImages[i];
          if (file.isDefault) formData.append("isDefault", true);
          else formData.append("isDefault", false);
          formData.append("productImages", file);
        }
        const product = await updateProduct(formData, values.id, dropDownOptions.productInfo.ProductInfo_InitialValues.id
          &&
          dropDownOptions.variantDetail.VariantDetail_InitalValues.productCombination.length && dropDownOptions.productInfo.ProductInfo_InitialValues.vat !== values.vat);
        let convertImg;
        if (product.productImages) {
          convertImg = await convertBase64Img(product.productImages);
        }
        const fiteredPrd = values.subGroupId.products.filter(
          (itm) => itm.id !== values.id
        );

        let productVariantDetails;

        if (product.productVariantDetails) {

          let attributeValue = [];
          dropDownOptions.productVariant.ProductVariant_InitialValues.variants.forEach((variant) => {
            variant.attributes.forEach((attribute) => {
              attributeValue.push(attribute.attributeId);
            });
          });

          productVariantDetails = product.productVariantDetails.map(
            (item) => {
              const name = item.combinationName.split("-");
              let concateStr = "";
              name.forEach((num) => {
                const value = attributeValue.find(({ id }) => id === +num);
                concateStr += `${value.name} / `;
              });
              return { ...item, name: concateStr };
            }
          );
        }


        setDropDownOptions((prevState) => {
          return {
            ...prevState,
            productInfo: {
              ...prevState.productInfo,
              ProductInfo_InitialValues: {
                ...values,
                id: product.product.id,
                productImages: convertImg,
                btnTxt: "Update",
              },
              variants: values.subGroupId.variants,
            },
            relatedProduct: {
              ...prevState.relatedProduct,
              RelatedProduct_InitialValues: {
                ...RelatedProduct_InitialValues,
                dropDown: [...appendImage(fiteredPrd)],
              },
            },
            variantDetail: {
              ...prevState.variantDetail,
              VariantDetail_InitalValues: {
                ...prevState.variantDetail.VariantDetail_InitalValues,
                productCombination: productVariantDetails ? productVariantDetails : prevState.variantDetail.VariantDetail_InitalValues.productCombination
              }
            }
          };
        });
        if (values.isVariant === "SIMPLE") {
          tabEnableHandler("Related Products");
        } else {
          tabEnableHandler("Variants");
        }
      } catch (error) {
        toaster(MSG_TYPE.ERROR, error);
      }
    } else {
      try {
        const productData = values;
        const getPayLoadData = {
          ...productData,
          isVariant: productData.isVariant === "VARIANT" ? true : false,
          costPrice:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.costPrice
              : productData.costPrice,
          markup:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.markup
              : productData.markup,
          sellPrice:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.sellPrice
              : productData.sellPrice,
          sku:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.sku
              : productData.sku,
          warehouseId:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.warehouseId
              : "",
          openingStock:
            productData.isVariant === "VARIANT"
              ? ProductInfo_InitialValues.openingStock
              : "",
        };

        let getPayLoad = createPayloadObj(getPayLoadData, [
          "isReturn",
          "status",
          "isVariant",
        ]);

        if (productData.isVariant === "SIMPLE") {
          getPayLoad = {
            ...getPayLoad,
            warehouseStock: {
              warehouseId: productData.warehouseId
                ? productData.warehouseId.id
                : ProductInfo_InitialValues.warehouseId,
              qty: productData.openingStock
                ? productData.openingStock
                : ProductInfo_InitialValues.openingStock || null,
            },
          };
        }

        const formData = appendFormData(getPayLoad);
        if (productData.isVariant === "SIMPLE") {
          formData.set(
            "warehouseStock",
            JSON.stringify(getPayLoad.warehouseStock)
          );
        }

        for (let i = 0; i < values.productImages.length; i++) {
          const file = values.productImages[i];
          if (file.isDefault) formData.append("isDefault", true);
          else formData.append("isDefault", false);
          formData.append("productImages", file);
        }

        const product = await createProduct(formData);

        let convertImg;
        if (product.productImages) {
          convertImg = await convertBase64Img(product.productImages);
        }

        const fiteredPrd = values.subGroupId.products.filter(
          (itm) => itm.id !== product.product.id
        );

        setDropDownOptions((prevState) => {
          return {
            ...prevState,
            productInfo: {
              ...prevState.productInfo,
              ProductInfo_InitialValues: {
                ...values,
                id: product.product.id,
                productImages: convertImg ? convertImg : [],
                folderName: product.product.folderName,
                btnTxt: "Update",
              },
              variants: values.subGroupId.variants,
            },
            relatedProduct: {
              ...prevState.relatedProduct,
              RelatedProduct_InitialValues: {
                ...RelatedProduct_InitialValues,
                dropDown: [...appendImage(fiteredPrd)],
              },
            },
          };
        });

        if (values.isVariant === "SIMPLE") {
          tabEnableHandler("Related Products");
        } else {
          tabEnableHandler("Variants");
        }
      } catch (error) {
        toaster(MSG_TYPE.ERROR, error);
      }
    }
  };

  const onRelatedPrdSubmit = async (values) => {
    try {
      let productId = dropDownOptions.productInfo.ProductInfo_InitialValues.id;
      if (!values.checked) {
        let arr = [];
        values.relatedProducts.forEach((relatedPrd) => {
          arr.push({ actualProductId: productId, productId: relatedPrd.id });
        });
        let postObj = {
          productId: productId,
          product: { liveRelatedProduct: values.checked },
          relatedProducts: arr,
        };
        const { newRelatedProducts } = await createRelatedProduct(postObj);

        setDropDownOptions((prevState) => {
          return {
            ...prevState,
            relatedProduct: {
              ...prevState.relatedProduct,
              RelatedProduct_InitialValues: {
                ...values,
                relatedProducts: newRelatedProducts.map((da) => {
                  return {
                    relatedProductId: da.id,
                    ...da.product,
                    image: productImageUrl(da.product.product_images),
                  };
                })
              },
            },
          };
        });
      } else {
        let postObj = {
          productId: productId,
          product: { liveRelatedProduct: values.checked },
        };
        const { newRelatedProducts } = await createRelatedProduct(postObj);

        setDropDownOptions((prevState) => {
          return {
            ...prevState,
            relatedProduct: {
              ...prevState.relatedProduct,
              RelatedProduct_InitialValues: {
                ...values,
                relatedProducts: newRelatedProducts.map((da) => {
                  return {
                    relatedProductId: da.id,
                    ...da.product,
                    image: productImageUrl(da.product.product_images),
                  };
                })
              },
            },
          };
        });
      }

      tabEnableHandler("SEO");
    } catch (error) {
      toaster(MSG_TYPE.ERROR, error);
    }
  };

  const onSeoSubmit = async (values) => {
    let seoValues = values;
    let productId = dropDownOptions.productInfo.ProductInfo_InitialValues.id;
    try {
      await updateSeo(seoValues, productId);
      history.push("/productList");
    } catch (error) {
      toaster(MSG_TYPE.ERROR, error);
    }
  };

  const onRowSubmit = async (values) => {
    if (!values.retailPrice || !values.costPrice || !values.sellPrice) {
      return toaster(
        MSG_TYPE.WARNING,
        "cost price, sellPrice and retail price required!"
      );
    }
    if (
      +values.sellPrice >= +values.retailPrice ||
      +values.costPrice >= +values.retailPrice
    ) {
      return toaster(
        MSG_TYPE.WARNING,
        "selling price and cost price should be less than or equal to retail price"
      );
    }
    try {
      if (values.markup < 0) {
        toaster(MSG_TYPE.WARNING, "You are selling this product with a loss!");
      }

      let combinationProduct = values;

      if (combinationProduct.openingStock) {
        combinationProduct = {
          ...combinationProduct,
          warehouseStock: {
            qty: combinationProduct.openingStock || null,
            warehouseId: dropDownOptions.variantDetail.warehouse.id,
            productVariantDetailId: combinationProduct.id,
          },
        };
      }

      await updateVariantDetails(combinationProduct, combinationProduct.id);
    } catch (error) {
      toaster(MSG_TYPE.ERROR, error);
    }
  };

  const onVariantSubmitHandler = () => {
    tabEnableHandler("Related Products");
  };

  useEffect(() => {
    productDataHandler();
  }, [productDataHandler]);

  return (
    <TabStyleWrapper>
      <HeroSection />
      <Container>
        <PageHeader Title="Product" />
        <div className="px-3">
          <AppBar position="static">
            <Tabs
              value={tabState.currentTab}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabState.tabs.map((tab, tabIndex) => (
                <Tab
                  disabled={tab.isDisable}
                  key={tabIndex}
                  value={tab.label}
                  label={<div className="tabsLabel">{tab.label}</div>}
                  wrapped
                  {...a11yProps(tab.label)}
                />
              ))}
            </Tabs>
          </AppBar>
          <TabPanel value={tabState.currentTab} index="Product Information">
            <ProductInfo
              genderOptions={genderOptions}
              typeSelection={typeSelection}
              returnAccepted={returnAccepted}
              dropDownOptions={dropDownOptions}
              setDropDownOptions={setDropDownOptions}
              onProductInfoSubmit={onProductInfoSubmit}
              maxUpload={dropDownOptions.productInfo.maxUpload}
              ProductInfo_InitialValues={
                dropDownOptions.productInfo.ProductInfo_InitialValues
              }
              ProductInfo_validationSchema={ProductInfo_validationSchema}
            />
          </TabPanel>
          <TabPanel value={tabState.currentTab} index="Variants">
            <ProductVariants
              dropDownOptions={dropDownOptions.productInfo}
              ProductVariant_InitialValues={
                dropDownOptions.productVariant.ProductVariant_InitialValues
              }
              ProductInfo_InitialValues={
                dropDownOptions.productInfo.ProductInfo_InitialValues
              }
              onProductVariantSubmit={onProductVariantSubmit}
              ProductVariants_validationSchema={
                ProductVariants_validationSchema
              }
              setDropDownOptions={setDropDownOptions}
              stores={dropDownOptions.productVariant.stores}
            />
          </TabPanel>
          <TabPanel value={tabState.currentTab} index="Variant Details">
            <VariantDetails
              VariantDetail_InitalValues={
                dropDownOptions.variantDetail.VariantDetail_InitalValues
              }
              warehouse={dropDownOptions.variantDetail.warehouse}
              onRowSubmit={onRowSubmit}
              vat={dropDownOptions.productInfo.ProductInfo_InitialValues.vat}
              onVariantSubmitHandler={onVariantSubmitHandler}
              ProductInfo_InitialValues={
                dropDownOptions.productInfo.ProductInfo_InitialValues
              }
            />
          </TabPanel>
          <TabPanel value={tabState.currentTab} index="Related Products">
            <RelatedProduct
              RelatedProduct_InitialValues={
                dropDownOptions.relatedProduct.RelatedProduct_InitialValues
              }
              onRelatedPrdSubmit={onRelatedPrdSubmit}
              ProductInfo_InitialValues={
                dropDownOptions.productInfo.ProductInfo_InitialValues
              }
            />
          </TabPanel>
          <TabPanel value={tabState.currentTab} index="SEO">
            <SEO
              Seo_InitialValues={dropDownOptions.seo.Seo_InitialValues}
              onSeoSubmit={onSeoSubmit}
              ProductInfo_InitialValues={
                dropDownOptions.productInfo.ProductInfo_InitialValues
              }
            />
          </TabPanel>
        </div>
      </Container>
    </TabStyleWrapper>
  );
}
export default Product;
