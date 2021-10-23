import { getData } from "utils/fetchData";
import { reqSchemaQry } from "utils/utilsFunc";

const URL = "customers";

const getCustomers = () => {
  const schemas = reqSchemaQry(["customer_addresses", "cities", "counties"]);
  return getData(`${URL}?${schemas}`);
};
const viewCustomerDetail = (id) => {
  const schemas = reqSchemaQry(["customer_addresses", "cities", "counties"]);
  return getData(`${URL}/${id}?${schemas}`);
};

export { getCustomers, viewCustomerDetail };
