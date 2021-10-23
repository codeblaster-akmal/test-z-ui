import {
  deleteData,
  getData,
  postDataForm,
  putDataForm,
  postData,
  putData,
} from "utils/fetchData";
import { reqAttrQry, reqSchemaQry } from "../../utils/utilsFunc";

const STORE_URL = "warehouses";
const PRODUCTS = "products";
const PRODUCT_VARIANTS = "product-variants";
const BRAND_URL = "brands";
const SUB_URL = "sub-groups";
const CONFIG_URL = "configurations";
const PRODUCT_IMAGES = "product-image";
const PRODUCT_VARIANT_DETAILS = "product-variant-details";
const RELATED_PRODUCTS = "related-products";
const SEO = "products-data";

const getAllSubgroups = () => {
  const schemas = reqSchemaQry([
    "groups",
    "groups_categories",
    "variants",
    "variants_attributes",
    "products",
    "products_product_images",
    "is_default_img_only",
  ]);
  const groupsCategoriesAttr = reqAttrQry("groups_categories_attr", [
    "id",
    "name",
  ]);
  const variantsAttributesAttr = reqAttrQry("variants_attributes_attr", [
    "id",
    "name",
    "variantId",
  ]);
  const productsAttributes = reqAttrQry("products_attr", ["id", "name"]);
  const productImagesAttributes = reqAttrQry(
    "products_product_images_attr",
    ["id", "image"]
  );
  return getData(
    `${SUB_URL}?${schemas}&${groupsCategoriesAttr}&${variantsAttributesAttr}&${productsAttributes}&${productImagesAttributes}`
  );
};
const getBrands = () => {
  const attributes = reqAttrQry("attributes", ["id", "name"]);
  return getData(`${BRAND_URL}?${attributes}`);
};
const getStores = () => {
  return getData(`${STORE_URL}`);
};
const getConfig = () => {
  return getData(`${CONFIG_URL}`);
};
const createProduct = (data) => postDataForm(PRODUCTS, data);
const createProductVariant = (reqQuery, data) => {
  const { folder_name, attribute_image_len } = reqQuery;
  return postDataForm(
    `${PRODUCT_VARIANTS}?attribute_image_len=${attribute_image_len}&folder_name=${folder_name}`,
    data
  );
};
const createRelatedProduct = (data) => postData(RELATED_PRODUCTS, data);
const updateProduct = (data, id, flag) => {
  return putDataForm(`${PRODUCTS}/${id}${flag ? "?update_prd_vat_det_vat=true" : ""}`, data);
}
const updateVariantDetails = (data, id) =>
  putData(`${PRODUCT_VARIANT_DETAILS}/${id}`, data);
const updateSeo = (data, id) => putData(`${SEO}/${id}`, data);
const deleteProductImage = (id) => deleteData(`${PRODUCT_IMAGES}/${id}`);

export const deleteRelatedProduct = id => deleteData(`related-products/${id}`);

export const deleteProductRelatedPrd = id => deleteData(`related-products/${id}?is_product_id=true`);

export const deleteProductVariants = id => deleteData(`product-variants/${id}?del_product_variant_details=true&is_product_id=true`);

export {
  getBrands,
  getConfig,
  getStores,
  createProduct,
  getAllSubgroups,
  deleteProductImage,
  updateProduct,
  createProductVariant,
  updateVariantDetails,
  createRelatedProduct,
  updateSeo,
};
