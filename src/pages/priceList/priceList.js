import {
  AutocompleteInputs,
  Badge,
  Container,
  FilterRow,
  HeroSection,
  PageHeader,
  TextFieldInputs,
  CustomCheckbox,
  ResponsiveTable,
  TableContainer,
  TableHeader,
  ActionButtons,
  Column,
  TableRow,
  ActiveRowWrapper,
} from "components";
import styled from "styled-components";
import React, { useState, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import { Avatar, Collapse, IconButton } from "@material-ui/core";
import { TableStyle } from "components";
import ProductImage from "../../assets/images/default/brand.png";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const PricelistWrapper = styled.div`
.dropdown{
    display: flex;
    justify-content: space-between;
    padding: 5px;
    .MuiInputBase-input{
        padding: 5px !important;
    }
    .MuiFormControl-root{
      width: 100% !important;
    }
    .MuiOutlinedInput-notchedOutline{
      border-color: rgba(0, 0, 0, 0.23);
    }
    .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]{
        padding-right: 20px;
    }
    .MuiAutocomplete-inputRoot .MuiAutocomplete-input{
        min-width: 85px;
    }
    .multi-dropdown{
      .MuiAutocomplete-groupLabel{
        top: 0;
      }
      .MuiListSubheader-root{
        line-height: 20px;
        font: ${({theme}) => theme.fontAppearance.defaultBold};
      }
  }
}
.table-container {
  .sub-table {
    border-spacing: 0 0.5rem;
    .subtable-header,
    .subtable-body {
      /* background-color: ${({ theme }) => theme.themeColor.secondary}; */
      .subtable-cell {
        padding: 0.2rem 1rem;
        border-top: 0;
        border-bottom: 0.3rem solid #fff;
        border-left: 0;
        border-right: 0;
      }
    }
  }
  .table-container .sub-table .subtable-header .subtable-cell{
      padding: 0.2rem 0.5rem;
  }
}
.MuiOutlinedInput-notchedOutline{
    border-color: transparent;
}
.MuiInputBase-input{
    padding: 5px !important;
}
.MuiTableCell-root{
    padding: 2px;
    border-bottom: none;
}
.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]{
    padding: 0;
}
.MuiInputBase-input{
    padding: 9px 5px;
}
.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]{
    padding-right: 30px;
}
.MuiTableRow-root {
    &:hover{
        background-color: rgba(0, 0, 0, 0.04);
    }
}
.MuiTableRow-root {
    &:hover{
        background-color: rgba(0, 0, 0, 0.04);
    }
    &:hover .MuiOutlinedInput-notchedOutline{
      border-color: rgba(0, 0, 0, 0.23);
    }
}
.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-endAdornment{
  right: 0;
}

/* .MuiTableContainer-root{
    height: auto;
} */
.filter-row{
    .MuiFormControl-root{
        width: 100% !important;
    } 
    .MuiInputBase-input{
        padding: 9px 5px;
    }
}
.tablerow-flex{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 0.5rem;
    padding: 0.5rem;
}
.status{
    align-self: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: .5rem;
}
.edit-icons{
    justify-content: center;
    display: flex;
    align-self: center;
    svg{
        font-size: 1rem;
        margin-left: 0.5rem;
        color: #B5C4CF;
        cursor: pointer;
        &:hover{
            color: #3d6382;
        }
    }
}
.status-badge{
    padding: 0.4rem !important;
}
.tablerow-flex{
    text-align: -webkit-center;
}
.checkbox{
    text-align: right;
}
.details{
    display: flex;
    flex-direction: row;
    column-gap: 2px;
    padding: 0.5rem;
    margin-top: 10px;
}
.details-auto{
    display: grid;
    grid-template-columns: 5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    padding: 0.3rem;
    column-gap: 5px;
    margin-top: 10px;
    align-items: center;
}
`;

const tabletitle = [
  {
    id: "image",
    label: "Image",
    maxWidth: "10%",
    align: "left",
  },
  {
    id: "product",
    label: "Product Name",
    maxWidth: "40%",
    align: "left",
  },
  {
    id: "brand",
    label: "Brand",
    maxWidth: "7%",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    maxWidth: "10%",
    align: "left",
  },
  {
    id: "group",
    label: "Group",
    maxWidth: "10%",
    align: "left",
  },
  {
    id: "subgroup",
    label: "SubGroup",
    maxWidth: "10%",
    align: "left",
  },
  {
    id: "upc",
    label: "UPC",
    maxWidth: "10%",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    maxWidth: "10%",
    align: "left",
  },
];

const subtabletitle = [
  {
    id: "image",
    label: "Image",
    minWidth: 30,
  },
  {
    id: "attributes",
    label: "Attributes",
    minWidth: 375,
  },
  {
    id: "retailprice",
    label: "Retail Price",
    minWidth: 30,
  },
  {
    id: "costprice",
    label: "Cost Price",
    minWidth: 30,
  },
  {
    id: "sellingprice",
    label: "Selling Price",
    minWidth: 30,
  },
  {
    id: "markup",
    label: "Mark Up%",
    minWidth: 30,
  },
  {
    id: "quantityavailable",
    label: "Qty Avail",
    minWidth: 30,
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 30,
  },
  {
    id: "totalquantity",
    label: "Total Qty",
    minWidth: 30,
  },
  {
    id: "sku",
    label: "SKU",
    minWidth: 30,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 30,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 30,
  },
];

function priceData(
  image,
  product,
  brand,
  category,
  group,
  subgroup,
  upc,
  action
) {
  return {
    image,
    product,
    brand,
    category,
    group,
    subgroup,
    upc,
    action,
  };
}

const price = [
  priceData(
    "No Image",
    "Sleek Remi Curture Yaki 100% Human Hair Weft 113g",
    "Dove",
    "Hair Extension",
    "Shampoo",
    "Shampoo",
    "123465"
  ),
  priceData(
    "No Image",
    "Sleek Remi Curture Yaki 100% Human Hair Weft 113g",
    "Dove",
    "Hair Extension",
    "Shampoo",
    "Shampoo",
    "123465"
  ),
  priceData(
    "No Image",
    "Sleek Remi Curture Yaki 100% Human Hair Weft 113g",
    "Dove",
    "Hair Extension",
    "Shampoo",
    "Shampoo",
    "123465"
  ),
  priceData(
    "No Image",
    "Sleek Remi Curture Yaki 100% Human Hair Weft 113g",
    "Dove",
    "Hair Extension",
    "Shampoo",
    "Shampoo",
    "123465"
  ),
  priceData(
    "No Image",
    "Sleek Remi Curture Yaki 100% Human Hair Weft 113g",
    "Dove",
    "Hair Extension",
    "Shampoo",
    "Shampoo",
    "123465"
  ),
  priceData(
    "No Image",
    "Sleek Remi Curture Yaki 100% Human Hair Weft 113g",
    "Dove",
    "Hair Extension",
    "Shampoo",
    "Shampoo",
    "123465"
  ),
  priceData(
    "No Image",
    "Sleek Remi Curture Yaki 100% Human Hair Weft 113g",
    "Dove",
    "Hair Extension",
    "Shampoo",
    "Shampoo",
    "123465"
  ),
  priceData(
    "No Image",
    "Sleek Remi Curture Yaki 100% Human Hair Weft 113g",
    "Dove",
    "Hair Extension",
    "Shampoo",
    "Shampoo",
    "123465"
  ),
  priceData(
    "No Image",
    "Sleek Remi Curture Yaki 100% Human Hair Weft 113g",
    "Dove",
    "Hair Extension",
    "Shampoo",
    "Shampoo",
    "123465"
  ),
];

function subData(
  image,
  attributes,
  retailprice,
  costprice,
  sellingprice,
  markup,
  quantityavailable,
  quantity,
  totalquantity,
  sku,
  status,
  action
) {
  return {
    image,
    attributes,
    retailprice,
    costprice,
    sellingprice,
    markup,
    quantityavailable,
    quantity,
    totalquantity,
    sku,
    status,
    action,
  };
}
const subdata = [
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Inactive</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Inactive</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Inactive</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Inactive</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Inactive</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Inactive</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Inactive</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Inactive</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Inactive</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
  subData(
    "No Image",
    "orange flavour, Silky hair, 250ml, Anti Dandruff",
    "2000",
    "1800",
    "1500",
    "10%",
    "100",
    "50",
    "150",
    "sku",
    <Badge>Active</Badge>,
    [
      // { icon: <CreateIcon /> },
      { icon: <AddCircleIcon /> },
      { icon: <RemoveCircleIcon /> },
    ]
  ),
];
const stockoption = [
  { title: "Low Stock" },
  { title: "In Stock" },
  { title: "Out Of Stock" },
];

const Warehouse = [
  { group: "Warehouse", title: "warehouse 1" },
  { group: "Store", title: "store 1" },
  { group: "Stall", title: "stall 1" },
];

const Pricerow = (props) => {
  const { row, open, setOpen, index, checked, handleChange } = props;
  // const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <ActiveRowWrapper active={index === open}>
      <TableRow onClick={() => setOpen(index === open ? false : index)}>
        <Column alignTo="left" size="10%" key={index}>
          <Avatar align="left" src={ProductImage} />
        </Column>
        <Column alignTo="left" size="40%" key={index}>
          {row.product}
        </Column>
        <Column alignTo="left" size="7%" key={index}>
          {row.brand}
        </Column>
        <Column alignTo="left" size="10%" key={index}>
          {row.category}
        </Column>
        <Column alignTo="left" size="10%" key={index}>
          {row.group}
        </Column>
        <Column alignTo="left" size="10%" key={index}>
          {row.subgroup}
        </Column>
        <Column alignTo="left" size="10%" key={index}>
          {row.upc}
        </Column>
        <Column alignTo="left" size="10%" key={index}>
          <ActionButtons>
            {index ? (
              <IconButton size="small" color="primary" component="span">
                <AddCircleIcon />
              </IconButton>
            ) : (
              <IconButton size="small" color="primary" component="span">
                <RemoveCircleIcon />
              </IconButton>
            )}
          </ActionButtons>
        </Column>
      </TableRow>
      <Collapse in={checked} timeout="auto" unmountOnExit>
        <div className="tablerow-flex">
          <AutocompleteInputs
            placeholder="Attribute 1"
            variant="outlined"
            optionLabel="title"
          />
          <AutocompleteInputs
            placeholder="Attribute 2"
            variant="outlined"
            optionLabel="title"
          />
          <AutocompleteInputs
            placeholder="Attribute 3"
            variant="outlined"
            optionLabel="title"
          />
          <TextFieldInputs placeholder="Retail Price" variant="outlined" />
          <TextFieldInputs placeholder="Cost Price" variant="outlined" />
          <TextFieldInputs placeholder="Selling Price" variant="outlined" />
          <TextFieldInputs placeholder="Mark Up %" variant="outlined" />
          <TextFieldInputs placeholder="Qty Available" variant="outlined" />
          <TextFieldInputs placeholder="Quantity" variant="outlined" />
          <TextFieldInputs placeholder="Total Qty" variant="outlined" />
          <TextFieldInputs placeholder="SKU" variant="outlined" />

          <div className="edit-icons">
            <SaveIcon onClick={() => setShow(!show)} />
          </div>
        </div>
      </Collapse>
      <Collapse in={index === open} mountOnEnter unmountOnExit>
        <div className="subtable-container">
          <ResponsiveTable>
            <TableHeader className="subtable-header" subTableRow>
              <Column size="5%" alignTo="center">
                Image
              </Column>
              <Column size="30%" alignTo="center">
                Attributes
              </Column>
              <Column size="8%" alignTo="left">
                Retail Price
              </Column>
              <Column size="8%" alignTo="left">
                Cost Price
              </Column>
              <Column size="9%" alignTo="left">
                Selling Price
              </Column>
              <Column size="6%" alignTo="left">
                Mark Up
              </Column>
              <Column size="9%" alignTo="left">
                Qty Available
              </Column>
              <Column size="5%" alignTo="left">
                Qty
              </Column>
              <Column size="6%" alignTo="left">
                Total Qty
              </Column>
              <Column size="10%" alignTo="left">
                SKU
              </Column>
              <Column size="10%" alignTo="center">
                Status
              </Column>
              <Column size="5%" alignTio="center">
                Action
              </Column>
            </TableHeader>
            <TableContainer className="subtable-body" staticHeight="auto">
              {subdata.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <Column alignTo="center" size="5%">
                      <Avatar align="center" src={ProductImage} />
                    </Column>
                    <Column alignTo="center" size="30%">
                      {row.attributes}
                    </Column>
                    <Column alignTo="left" size="8%">
                      <TextFieldInputs
                        placeholder="&#163;Retail Price"
                        variant="outlined"
                        value={row.retailprice}
                      />
                    </Column>
                    <Column alignTo="left" size="8%">
                      <TextFieldInputs
                        placeholder="&#163;Cost Price"
                        variant="outlined"
                        value={row.costprice}
                      />
                    </Column>
                    <Column alignTo="left" size="9%">
                      <TextFieldInputs
                        placeholder="&#163;Selling Price"
                        variant="outlined"
                        value={row.sellingprice}
                      />
                    </Column>
                    <Column alignTo="left" size="6%">
                      <TextFieldInputs
                        placeholder="Mark Up%"
                        variant="outlined"
                        value={row.markup}
                      />
                    </Column>
                    <Column alignTo="left" size="9%">
                      <TextFieldInputs
                        placeholder="Qty Avail"
                        variant="outlined"
                        value={row.quantityavailable}
                      />
                    </Column>
                    <Column alignTo="left" size="5%">
                      <TextFieldInputs
                        placeholder="Quantity"
                        variant="outlined"
                        value={row.quantity}
                      />
                    </Column>
                    <Column alignTo="left" size="6%">
                      <TextFieldInputs
                        placeholder="Total Qty"
                        variant="outlined"
                        value={row.totalquantity}
                      />
                    </Column>
                    <Column alignTo="left" size="10%">
                      <TextFieldInputs
                        placeholder="SKU"
                        variant="outlined"
                        value={row.sku}
                      />
                    </Column>
                    <Column alignTo="center" size="10%">
                      {row.status}
                    </Column>
                    <Column alignTo="center" size="5%">
                      <ActionButtons>
                        <IconButton
                          size="small"
                          color="primary"
                          component="span"
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      </ActionButtons>
                    </Column>
                  </TableRow>
                );
              })}
            </TableContainer>
          </ResponsiveTable>
        </div>
      </Collapse>
    </ActiveRowWrapper>
  );
};

export default function PriceList() {
  const ref = useRef();
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <PricelistWrapper>
        <HeroSection />
        <Container>
          <PageHeader Title="Price & Stock" />
          <FilterRow>
            <TextFieldInputs
              placeholder="Product"
              InputProps={<SearchIcon />}
              variant="filled"
            />
            <TextFieldInputs
              placeholder="Sub Group"
              InputProps={<SearchIcon />}
              variant="filled"
            />
            <TextFieldInputs
              placeholder="Brand"
              InputProps={<SearchIcon />}
              variant="filled"
            />
            <TextFieldInputs
              placeholder="variants"
              InputProps={<SearchIcon />}
              variant="filled"
            />
            <AutocompleteInputs
              options={stockoption}
              getOptionLabel={(option) => option.title}
              placeholder="Stock"
              variant="filled"
              optionLabel="title"
            />
          </FilterRow>
          <div className="dropdown">
            <div className="multi-dropdown">
              <AutocompleteInputs
                name="stores"
                options={Warehouse}
                // value={values.stores}
                placeholder="Warehouse"
                variant="outlined"
                optionLabel="title"
                groupBy={(option) => option.group}
              />
            </div>
            <div className="checkbox">
              <CustomCheckbox
                checked={checked}
                onChange={handleChange}
                color="primary"
                label="Manual"
                labelPlacement="start"
              />
            </div>
          </div>
          <div className="table-container mt-2 mb-2">
            <ResponsiveTable ref={ref}>
              <TableHeader>
                {tabletitle.map((col) => (
                  <Column key={col.id} size={col.maxWidth} alignTo={col.align}>
                    {col.label}
                  </Column>
                ))}
              </TableHeader>
              <TableContainer>
                {price.map((row, index) => {
                  return (
                    <Pricerow
                      key={index}
                      row={row}
                      open={open}
                      setOpen={setOpen}
                      index={index}
                      checked={checked}
                    />
                  );
                })}
              </TableContainer>
            </ResponsiveTable>
          </div>
        </Container>
      </PricelistWrapper>
    </>
  );
}
