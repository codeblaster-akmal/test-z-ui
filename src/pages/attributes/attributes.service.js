import { getData, postData, putData } from "utils/fetchData";
import { reqAttrQry, reqSchemaQry } from "../../utils/utilsFunc";

const VAR_URL = "variants";
const ATTR_URL = "attributes";
const SUB_GROUP_URL = "sub-groups";
const UOM_URL = "uoms";

const getAllVariant = () => {
  const attributes = reqAttrQry("attributes", ["id", "name"]);
  return getData(`${VAR_URL}?${attributes}`);
};

const getAllSubGroup = () => {
  const schemas = reqSchemaQry(["variants", "groups"]);
  const attributes = reqAttrQry("attributes", ["id", "name"]);
  const groupsAttr = reqAttrQry("groups_attr", ["id", "name"]);
  const variantsAttr = reqAttrQry("variants_attr", ["id", "name"]);
  return getData(
    `${SUB_GROUP_URL}?${schemas}&${attributes}&${groupsAttr}&${variantsAttr}`
  );
};

const getAllUom = () => {
  const attributes = reqAttrQry("attributes", ["id", "name"]);
  return getData(`${UOM_URL}?${attributes}`);
};

const getAllAttribute = () => {
  const schemas = reqSchemaQry([
    "variants",
    "sub_groups",
    "groups",
    "categories",
    "uoms",
  ]);
  const variantsAttr = reqAttrQry("variants_attr", ["id", "name"]);
  const subGroupsAttr = reqAttrQry("sub_groups_attr", ["id", "name"]);
  const groupsAttr = reqAttrQry("groups_attr", ["id", "name"]);
  const categoriesAttr = reqAttrQry("categories_attr", ["id", "name"]);
  const uomsAttr = reqAttrQry("uoms_attr", ["id", "name"]);
  return getData(
    `${ATTR_URL}?${schemas}&${variantsAttr}&${subGroupsAttr}&${groupsAttr}&${categoriesAttr}&${uomsAttr}`
  );
};

const createAttribute = (data) => {
  return postData(`${ATTR_URL}`, data);
};

const updateAttribute = (id, data, query = "") => {
  return putData(`${ATTR_URL}/${id}?${query}`, data);
};

export {
  getAllVariant,
  createAttribute,
  getAllAttribute,
  updateAttribute,
  getAllSubGroup,
  getAllUom,
};
