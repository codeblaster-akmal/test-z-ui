import * as Yup from "yup";

export const ProductInfo_validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(1, "Name should be atleast 1 letter"),
  vat: Yup.string().required("Required"),
  brandId: Yup.object().required("Required"),
  subGroupId: Yup.object().required("Required"),
  warehouseId: Yup.object().when("isVariant", {
    is: "SIMPLE",
    then: Yup.object().required("Required!"),
  }),
  costPrice: Yup.string().when("isVariant", {
    is: "SIMPLE",
    then: Yup.string().required("Required!"),
  }),
  retailPrice: Yup.string().when("isVariant", {
    is: "SIMPLE",
    then: Yup.string().required("Required!"),
  }),
  sellPrice: Yup.string().when("isVariant", {
    is: "SIMPLE",
    then: Yup.string().required("Required!"),
  }),
});

export const ProductVariants_validationSchema = Yup.object().shape({
  warehouseId: Yup.object().required("Required"),
  variants: Yup.array().of(
    Yup.object().shape({
      variantId: Yup.object().required("Required"),
      attributes: Yup.array().of(
        Yup.object().shape({
          attributeId: Yup.object().required("Required"),
        })
      ),
    })
  ),
});
