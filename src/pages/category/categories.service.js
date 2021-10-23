import { putDataForm, getData, putData, postDataForm } from "utils/fetchData";
import { reqSchemaQry } from "../../utils/utilsFunc";
import { reqAttrQry } from "utils/utilsFunc";

const URL = "categories";

const createCategory = (data, menu) => {
  return postDataForm(`${URL}?menu_priority=${menu}`, data);
};

const getAllCategory = () => {
  const attributes = reqAttrQry("attributes", [
    "id",
    "name",
    "status",
    "menuPriority",
    "image",
    "banner",
  ]);
  const groupsAttr = reqAttrQry("groups_attr", ["id"]);
  const groupsSubGroupsAttr = reqAttrQry("groups_sub_groups_attr", ["id"]);
  const groupsSubGroupsProductsAttr = reqAttrQry(
    "groups_sub_groups_products_attr",
    ["id"]
  );
  const schemas = reqSchemaQry([
    "groups",
    "groups_sub_groups",
    "groups_sub_groups_products",
  ]);
  return getData(
    `${URL}?${schemas}&${attributes}&${groupsAttr}&${groupsSubGroupsAttr}&${groupsSubGroupsProductsAttr}`
  );
};

const updateCategory = (id, data, check, menu) => {
  if (check) {
    return putData(`${URL}/${id}`, data);
  } else {
    return putDataForm(`${URL}/${id}?menu_priority=${menu}`, data);
  }
};

export { createCategory, getAllCategory, updateCategory };
