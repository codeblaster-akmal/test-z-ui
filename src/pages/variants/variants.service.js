import { postData, getData, putData } from "utils/fetchData";
import { reqAttrQry, reqSchemaQry } from "utils/utilsFunc";

const URL = "variants";
const SUB_GROUP_URL = "sub-groups";

const createVariant = (data) => {
  return postData(`${URL}`, data);
};

const getAllSubGroup = () => {
  const schemas = reqSchemaQry(["groups"]);
  const attributes = reqAttrQry("attributes", [
    "id",
    "name",
    "isReturn",
    "status",
    "groupId",
  ]);
  const groupsAttr = reqAttrQry("groups_attr", ["name"]);
  return getData(`${SUB_GROUP_URL}?${schemas}&${attributes}&${groupsAttr}`);
};

const getAllVariant = () => {
  const schemas = reqSchemaQry(["sub_groups", "groups", "product_variants"]);
  const attributes = reqAttrQry("attributes", [
    "id",
    "name",
    "status",
    "subGroupId",
    "isImage",
  ]);
  const subGroupsAttr = reqAttrQry("sub_groups_attr", ["id", "name"]);
  const groupsAttr = reqAttrQry("groups_attr", ["id", "name"]);
  const productVariantsAttr = reqAttrQry("product_variants_attr", ["id"]);
  return getData(
    `${URL}?${schemas}&${attributes}&${subGroupsAttr}&${groupsAttr}&${productVariantsAttr}`
  );
};

const updateVariant = (id, data, query = "") => {
  return putData(`${URL}/${id}?${query}`, data);
};

export { createVariant, getAllSubGroup, getAllVariant, updateVariant };
