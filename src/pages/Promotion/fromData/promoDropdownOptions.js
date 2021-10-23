import PreviewImage from "../../../assets/images/Product Images/Artboard 13.png";
const offerList = [
  { name: "Banner", id: 1 },
  { name: "Promo code", id: 2 },
  { name: "Discount", id: 3 },
];
const statusOption = [
  { name: "Enabled", id: 1 },
  { name: "Disabled", id: 2 },
];
const discountTypeList = [
  { name: "Price", value: "PRICE" },
  { name: "Percentage", value: "PERCENTAGE" },
];
const bannerTypeList = [
  { name: "Main", value: "MAIN" },
  { name: "Sub", value: "SUB" },
  { name: "Sale", value: "SALE" },
];
const typeList = [
  { name: "All", value: "ALL" },
  { name: "Brand", value: "BRAND" },
  { name: "Category", value: "CATEGORY" },
  { name: "Specific Product", value: "SPECIFIC PRODUCT" },
];

const imageDropdown = [
  { name: "Image 1", value: "Image 1" },
  { name: "Image 2", value: "Image 2" },
  { name: "Image 3", value: "Image 3" },
  { name: "Image 4", value: "Image 4" },
];

const dummyOptions = [
  { title: "Option 1", pic: PreviewImage },
  { title: "Option 2", pic: PreviewImage },
  { title: "Option 3", pic: PreviewImage },
  { title: "Option 4", pic: PreviewImage },
  { title: "Option 5", pic: PreviewImage },
];
const usageLimit = [
  { title: "Yes", value: "Yes" },
  { title: "No" , value: "No"}
];
const levelList = [
  { name: "Bronze", value: "Bronze"},
  { name: "Silver", value: "Silver"},
  { name: "Glod", value: "Glod"},
  { name: "Diamond", value: "Diamond"},
]
const productList = [
  {
    image: PreviewImage,
    name: "SLEEK REMY COUTURE YAKI 100% HUMAN HAIR WEFT 113 G",
    mrp: "1200",
    sellingprice: "1100",
    discount: 10,
    price: 299,
  },
  {
    image: PreviewImage,
    name: "SLEEK REMY COUTURE SILKY WEAVE 113 G",
    mrp: "1200",
    sellingprice: "1100",
    discount: 10,
    price: 205,
  },
  {
    image: PreviewImage,
    name: "SENSATIONNEL REMI GODDESS YAKI WEAVE HUMAN HAIR ALL COLOURS",
    mrp: "1200",
    sellingprice: "1100",
    discount: 10,
    price: 499,
  },
  {
    image: PreviewImage,
    name: "SLEEK EUROPEAN LUXURY INDIAN 100% HUMAN HAIR WEAVE",
    mrp: "1200",
    sellingprice: "1100",
    discount: 10,
    price: 399,
  },
  {
    image: PreviewImage,
    name: "Peruvian Virgin Remi HH Bohemian Wvg",
    mrp: "1200",
    sellingprice: "1100",
    discount: 10,
    price: 599,
  },
  {
    image: PreviewImage,
    name: "Peruvian Virgin Remi HH Bohemian Wvg",
    mrp: "1200",
    sellingprice: "1100",
    discount: 10,
    price: 599,
  },
  {
    image: PreviewImage,
    name: "Peruvian Virgin Remi HH Bohemian Wvg",
    mrp: "1200",
    sellingprice: "1100",
    discount: 10,
    price: 599,
  },
  {
    image: PreviewImage,
    name: "Peruvian Virgin Remi HH Bohemian Wvg",
    mrp: "1200",
    sellingprice: "1100",
    discount: 10,
    price: 599,
  },
];

const promotionList = [
  {
    date: "8/23/2021",
    fromDate: "8/23/2021",
    expiryDate: "8/23/2021",
    title: "title of product",
    discount: 10,
    for: "Specific product",
    status: "Enabled",
    name: "SLEEK REMY COUTURE YAKI 100% HUMAN HAIR WEFT 113 G",
    type: "Promo code",
  },
  {
    date: "8/26/2021",
    fromDate: "8/26/2021",
    expiryDate: "8/26/2021",
    title: "title of product",
    discount: 10,
    for: "Specific product",
    status: "Disabled",
    name: "SLEEK REMY COUTURE SILKY WEAVE 113 G",
    type: "Banner",
  },
  {
    date: "11/24/2021",
    fromDate: "11/24/2021",
    expiryDate: "11/24/2021",
    discount: 10,
    for: "Specific product",
    status: "Disabled",
    title: "title of product",
    type: "Banner",
  },
  {
    date: "11/26/2021 ",
    fromDate: "11/26/2021 ",
    expiryDate: "11/26/2021 ",
    discount: 10,
    for: "Specific product",
    status: "Disabled",
    title: "title of product",
    type: "All",
  },
  {
    date: "12/4/2021",
    fromDate: "12/4/2021",
    expiryDate: "12/4/2021",
    discount: 10,
    for: "Specific product",
    status: "Disabled",
    title: "title of product",
    type: "Banner",
  },
  {
    date: "8/23/2021",
    fromDate: "8/23/2021",
    expiryDate: "8/23/2021",
    discount: 10,
    for: "Specific product",
    status: "Disabled",
    title: "title of product",
    type: "All",
  },
  {
    date: "8/23/2021",
    fromDate: "8/23/2021",
    expiryDate: "8/23/2021",
    discount: 10,
    for: "Specific product",
    status: "Enabled",
    title: "title of product",
    type: "Banner",
  },
  {
    date: "8/23/2021",
    fromDate: "8/23/2021",
    expiryDate: "8/23/2021",
    discount: 10,
    for: "Specific product",
    status: "Enabled",
    title: "title of product",
    type: "Promo code",
  },
];
export {
  productList,
  typeList,
  bannerTypeList,
  offerList,
  discountTypeList,
  dummyOptions,
  promotionList,
  statusOption,
  usageLimit,
  levelList,
  imageDropdown,
};
