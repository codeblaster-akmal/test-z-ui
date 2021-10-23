import { postDataForm, getData, putData, putDataForm } from "utils/fetchData";
import { reqAttrQry } from "utils/utilsFunc";
import { reqSchemaQry } from "../../utils/utilsFunc";

const URL = "groups";

const createGroup = (data) => {
  return postDataForm(`${URL}`, data);
};

const getAllCategory = () => {
  return getData(`categories`);
};

const getAllGroup = () => {
  const attributes = reqAttrQry("attributes", [
    "id",
    "name",
    "image",
    "status",
  ]);
  const categoriesAttr = reqAttrQry("categories_attr", ["id", "name"]);
  const subGroupsAttr = reqAttrQry("sub_groups_attr", ["id", "name"]);
  const subGroupsProductsAttributes = reqAttrQry(
    "sub_groups_products_attributes",
    ["id", "name"]
  );
  const schemas = reqSchemaQry([
    "categories",
    "sub_groups_products",
    "sub_groups",
  ]);
  return getData(
    `${URL}?${attributes}&${schemas}&${categoriesAttr}&${subGroupsAttr}&${subGroupsProductsAttributes}`
  );
};

const updateGroup = (id, data, check) => {
  if (check) {
    return putData(`${URL}/${id}`, data);
  } else {
    return putDataForm(`${URL}/${id}`, data);
  }
};

export { createGroup, getAllCategory, getAllGroup, updateGroup };
