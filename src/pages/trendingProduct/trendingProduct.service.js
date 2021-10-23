import { deleteData, getData, postData, putData } from "utils/fetchData";
import { reqAttrQry, reqSchemaQry } from "utils/utilsFunc";

const URL = "site-section-items";
const section = "site-sections";
const PRODUCTS = "products";

const getSiteOptions = () => {
  return getData(`${section}?with_prod_count=true`);
};

const getSiteData = () => {
  return getData(`${section}?with_prod_count=true`);
};

const viewSiteData = (id) => {
  const schemas = reqSchemaQry([
    "site_section_items",
    "products",
    "product_images",
    "is_default_img_only",
  ]);
  const attributes = reqAttrQry("attributes", ["id", "name"]);
  const siteSectionItemsAttr = reqAttrQry("site_section_items_attr", ["id"]);
  const productsAttr = reqAttrQry("products_attr", ["id", "name"]);
  const productImagesAttr = reqAttrQry("product_images_attr", ["id", "image"]);
  return getData(
    `${section}/${id}?${schemas}&${attributes}&${siteSectionItemsAttr}&${productsAttr}&${productImagesAttr}`
  );
};

const getProducts = () => {
  const schemas = reqSchemaQry(["product_images", "is_default_img_only"]);
  return getData(`${PRODUCTS}?${schemas}`);
};

const createTrendingProduct = (data) => {
  return postData(`${URL}`, data);
};

const updateTrendingProduct = (id, data) => {
  return putData(`${section}/${id}`, data);
};

const deleteSiteSectionItem = (id) => deleteData(`${URL}/${id}`);

export {
  createTrendingProduct,
  getSiteOptions,
  getProducts,
  getSiteData,
  viewSiteData,
  deleteSiteSectionItem,
  updateTrendingProduct,
};
