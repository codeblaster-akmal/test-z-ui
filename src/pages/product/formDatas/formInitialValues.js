export const initialVariant = {
  variantId: "",
  attributes: [{ attributeId: "", attributePic: "", variantPics: [] }],
};

export const ProductInfo_InitialValues = {
  name: "",
  brandId: "",
  subGroupId: "",
  markup: "",
  vat: "",
  lowStock: "",
  gender: "",
  status: true,
  isVariant: "SIMPLE",
  isReturn: 0,
  description: "",
  returnPolicy: "",
  warehouseId: "",
  openingStock: "",
  costPrice: "",
  sellPrice: "",
  retailPrice: "",
  productImages: [],
  sku: "",
  btnTxt: "Save",
};

export const VariantDetail_InitalValues = {
  stores: "",
  manual: false,
  productCombination: [],
};

export const ProductVariant_InitialValues = {
  variants: [{ ...initialVariant }],
  isMultipleListing: false,
  warehouseId: "",
};

export const RelatedProduct_InitialValues = {
  dropDown: [],
  products: [],
  relatedProducts: [],
  checked: false,
};

export const Seo_InitialValues = {
  seoPageTitle: "",
  seoKeyword: "",
  seoConicals: "",
  seoMetaDescription: "",
};
