import { productImageUrl } from "./image";

//* request schema query
export const reqSchemaQry = (schemaArr) => {
  let str = "";
  schemaArr.forEach((schema) => (str += `${schema}=true&`));
  return `${str.substring(0, str.length - 1)}`;
};

export function formatDateToNiceString(myDate) {
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    month[myDate.getMonth()] +
    " " +
    myDate.getDate() +
    " " +
    myDate.getFullYear()
  );
}

//*Convert DateTime format to only date format
export function dateToNiceString(myDate) {
  return formatDateToNiceString(new Date(myDate));
}

//* filter array of objects based on name
export const arrayFilterName = (data) => {
  var resArr = [];
  data.filter(function(item) {
    var i = resArr.findIndex((x) => x.name === item.name);
    if (i <= -1) {
      resArr.push(item);
    }
    return null;
  });
  return resArr;
};

//* convert first letter to upper case
export const upperCaseFunc = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//* Removing duplicates
export const rmvDuplicate = (data, key = "id") => {
  return data.filter(
    (ele, ind) =>
      ind ===
      data.findIndex((elem) => elem[key] === ele[key] && elem[key] === ele[key])
  );
};

//* find config value
export const findConfig = (arr, key) => {
  const data = arr.find((obj) => obj.key === key);
  return data ? data.value : null;
};

//* create payload object to send data to server
export const createPayloadObj = (obj, except = [], setNull = []) => {
  const resObj = {};
  for (const property in obj) {
    if (obj[property] && typeof obj[property] === "object") {
      if (Array.isArray(obj[property])) resObj[property] = obj[property];
      else if ("id" in obj[property]) resObj[property] = obj[property]["id"];
      else if ("value" in obj[property])
        resObj[property] = obj[property]["value"];
    } else {
      if (obj[property] || except.includes(property))
        resObj[property] = obj[property];
      else if (setNull.includes(property)) resObj[property] = null;
    }
  }
  return resObj;
};

//* create formData
export const appendFormData = (values) => {
  const formData = new FormData();
  for (const property in values) {
    formData.append(property, values[property]);
  }
  return formData;
};

//* string convert into camel-case
export const toTitleCase = (string) => {
  return string.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/* append image with product array */
export const appendImage = (arr) => {
  return arr.map((itm) => {
    return { ...itm, image: productImageUrl(itm.product_images) };
  });
};

//* name length trim
export const nameTrimHandler = (fileName) => {
  return fileName.length > 20 ? `${fileName.substring(0, 20)}...` : fileName;
};

//* taking file Name from file path
export const stringSliceHandler = (fileName = "") => {
  const file = fileName.split("/");
  return file[file.length - 1];
};

/* request attributes query */
export const reqAttrQry = (label, attrArr) => {
  let str = "";
  attrArr.forEach((attr, index) => (str += `${label}[${index}]=${attr}&`));
  return `${str.substring(0, str.length - 1)}`;
};

/*  makes attribute combination */
export const combinationFunction = (attributes, productId) => {
  let attrs = [];
  for (const [attr, values] of Object.entries(attributes))
    attrs.push(values.map((v) => ({ [attr]: v })));
  attrs = attrs.reduce((a, b) =>
    a.flatMap((d) => b.map((e) => ({ ...d, ...e })))
  );

  let res = [];

  attrs.forEach((attr) => {
    let str = "";
    for (const values of Object.entries(attr)) {
      str += `${values[1]}-`;
    }
    str = str.substring(0, str.length - 1);
    res.push({
      combinationName: str,
      sku: null,
      markup: null,
      costPrice: null,
      sellPrice: null,
      openingStock: null,
      retailPrice: null,
      productId,
    });
  });

  return res;
};
