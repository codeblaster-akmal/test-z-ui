import { getData } from "utils/fetchData";
import { reqAttrQry } from "utils/utilsFunc";

export const fetchPromotionTypes = () => {
  const attributes = reqAttrQry("attributes", ["id", "name"]);

  return getData(`promotion-types?${attributes}`);
};