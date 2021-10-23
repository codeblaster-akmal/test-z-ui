import * as Yup from "yup";

export const banner_validationSchema = Yup.object({
  type: Yup.string().required("Required"),
  discount: Yup.string().required("Required"),
  offerType: Yup.object().required("Required"),
  title: Yup.string().required("Required"),
  bannerType: Yup.object().required("Required"),
  discountType: Yup.object().required("Required"),
  newuser: Yup.object().required("Required"),
  subgroup: Yup.string().when("group", {
    is: (value) => value,
    then: Yup.string().required("Required!"),
  }),
});
