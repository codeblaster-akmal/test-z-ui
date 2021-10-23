import { getData, putDataForm, postDataForm } from "utils/fetchData";
import { reqAttrQry, reqSchemaQry } from "../../utils/utilsFunc";

const URL = "sub-groups";

const createSubGroup = (data) => {
  return postDataForm(`${URL}?sub_groups_image=true`, data);
};

const getAllGroup = () => {
  return getData(`groups?categories=true`);
};

const getAllSubGroup = () => {
  const schemas = reqSchemaQry(["with_prod_count", "groups"]);
  const attributes = reqAttrQry("attributes", [
    "id",
    "name",
    "isReturn",
    "status",
    "groupId",
  ]);
  const groupsAttr = reqAttrQry("groups_attr", ["name"]);
  return getData(`${URL}?${schemas}&${attributes}&${groupsAttr}`);
};

const updateSubGroup = (id, data) => {
  return putDataForm(`${URL}/${id}?sub_groups_image=true`, data);
};

export { createSubGroup, getAllGroup, getAllSubGroup, updateSubGroup };
