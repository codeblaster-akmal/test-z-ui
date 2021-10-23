import { getData, putData } from "utils/fetchData";
import { reqSchemaQry, reqAttrQry } from "../../utils/utilsFunc";

const PRODUCTS = "products";
const CATEGORIES = "categories";
const GROUPS = "groups";
const SUB_GROUPS = "sub-groups";
const BRANDS = "brands";
const WAREHOUSES = "warehouses";

export const fetchProducts = () => {

  const schemas = reqSchemaQry(["sub_groups", "sub_groups_groups", "sub_groups_groups_categories", "brands", "product_images", "is_default_img_only", "product_variant_details", "product_variants", "product_variants_attributes"]);

  const attributes = reqAttrQry("attributes", ["id", "name", "status"]);
  const subGroupsAttr = reqAttrQry("sub_groups_attr", ["name"]);
  const subGroupsGroupsAttr = reqAttrQry("sub_groups_groups_attr", ["name"]);
  const subGroupsGroupsCategoriesAttr = reqAttrQry("sub_groups_groups_categories_attr", ["name"]);
  const brandsAttr = reqAttrQry("brands_attr", ["name"]);
  const productImagesAttr = reqAttrQry("product_images_attr", ["image"]);
  const productVariantDetailsAttr = reqAttrQry("product_variant_details_attr", ["id", "combinationName", "sellPrice", "status", "productId"]);
  const productVariantsAttr = reqAttrQry("product_variants_attr", ["id"]);
  const productVariantsAttributesAttr = reqAttrQry("product_variants_attributes_attr", ["id", "name"]);

  return getData(`${PRODUCTS}?${schemas}&${attributes}&${subGroupsAttr}&${subGroupsGroupsAttr}&${subGroupsGroupsCategoriesAttr}&${brandsAttr}&${productImagesAttr}&${productVariantDetailsAttr}&${productVariantsAttr}&${productVariantsAttributesAttr}`);
};

const getAllCategories = () => {

  const attributes = reqAttrQry("attributes", ["id", "name"]);

  return getData(`${CATEGORIES}?${attributes}`);
};

const getAllGroups = () => {

  const attributes = reqAttrQry("attributes", ["id", "name"]);

  return getData(`${GROUPS}?${attributes}`);
};

const getAllSubGroups = () => {

  const attributes = reqAttrQry("attributes", ["id", "name"]);

  return getData(`${SUB_GROUPS}?${attributes}`);
};

const getAllBrands = () => {

  const attributes = reqAttrQry("attributes", ["id", "name"]);

  return getData(`${BRANDS}?${attributes}`);
};

export const getAllWarehouses = () => {

  const attributes = reqAttrQry("attributes", ["id", "name"]);

  return getData(`${WAREHOUSES}?${attributes}`);
};

const updateProduct = (id, data) => {
  return putData(`${PRODUCTS}-data/${id}?on_status=true`, data);
};

export const updateProductVariantDetail = (id, data) => {
  return putData(`product-variant-details/${id}?on_status=true`, data);
};

export {
  getAllCategories,
  getAllGroups,
  getAllSubGroups,
  getAllBrands,
  updateProduct,
};
