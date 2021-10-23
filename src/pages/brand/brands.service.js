import { postDataForm, getData, putDataForm, putData } from "utils/fetchData";
import { reqSchemaQry } from "../../utils/utilsFunc";

const URL = "brands";

const createBrand = (data) => {
  return postDataForm(`${URL}`, data);
};

const updateBrand = (id, data, check) => {
  if (check) {
    return putData(`${URL}/${id}`, data);
  } else {
    return putDataForm(`${URL}/${id}`, data);
  }
};

const getAllBrand = () => {
  const schemas = reqSchemaQry(["with_prod_count"]);
  return getData(`${URL}?${schemas}`);
};

export { createBrand, getAllBrand, updateBrand };
