import * as Yup from "yup";

const trendingProduct_initialValues = {
  logic: false,
  offerType: "",
  selectProduct: [],
  filterProduct: [],
  btnText: "Save",
};

const trendingProduct_validationSchema = Yup.object({
  offerType: Yup.object().required("Required"),
});

export { trendingProduct_initialValues, trendingProduct_validationSchema };
