import { postData, getData, putData } from "utils/fetchData";
import { reqAttrQry, reqSchemaQry } from "utils/utilsFunc";

const URL = "warehouses";
const COUNTY_URL = "counties";

const createWarehouse = (data) => {
  return postData(`${URL}`, data);
};

const getCounty = () => {
  return getData(`${COUNTY_URL}?cities=true`);
};

const getWarehouse = () => {
  const schemas = reqSchemaQry(["cities", "cities_counties"]);
  const attributes = reqAttrQry("attributes", [
    "id",
    "name",
    "type",
    "phone",
    "email",
    "status",
    "zipcode",
    "addressLine1",
    "addressLine2",
    "contactPerson",
  ]);
  const citiesAttr = reqAttrQry("cities_attr", ["name", "id"]);
  const citiesCountiesAttr = reqAttrQry("cities_counties_attr", ["name", "id"]);

  return getData(
    `${URL}?${schemas}&${attributes}&${citiesAttr}&${citiesCountiesAttr}`
  );
};

const updateWarehouse = (id, data) => {
  return putData(`${URL}/${id}`, data);
};

export { createWarehouse, getCounty, getWarehouse, updateWarehouse };
