import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { VariantDetailsWrapper } from "../productStyleWrapper";
import ProductImage from "../../../assets/images/default/product.png";
import {
  TableStyle,
  TextFieldInputs,
  AutocompleteInputs,
  ActionButtons,
  Button,
} from "../../../components";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { Form, Formik } from "formik";

const subtablehead = [
  {
    id: "image",
    label: "Image",
    minWidth: 30,
  },
  {
    id: "attributes",
    label: "Attributes",
    minWidth: 350,
  },
  {
    id: "retailprice",
    label: "Retail Price",
    minWidth: 120,
  },
  {
    id: "costprice",
    label: "Cost Price",
    minWidth: 90,
  },
  {
    id: "sellingprice",
    label: "Selling Price",
    minWidth: 110,
  },
  {
    id: "markup",
    label: "Mark Up%",
    minWidth: 90,
  },
  {
    id: "openingstock",
    label: "Opening Stock",
    minWidth: 135,
  },
  {
    id: "sku",
    label: "SKU",
    minWidth: 40,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 30,
  },
];

const attribute1 = [
  { title: "Amla" },
  { title: "Neem" },
  { title: "Aloevera" },
];

const attribute2 = [{ title: "250ml" }, { title: "500ml" }, { title: "750ml" }];

const attribute3 = [
  { title: "Normal Hair" },
  { title: "Silky Hair" },
  { title: "Curley Hair" },
];

const VariantDetails = (props) => {
  const {
    VariantDetail_InitalValues,
    onRowSubmit,
    vat,
    onVariantSubmitHandler,
    ProductInfo_InitialValues,
    warehouse,
  } = props;

  const handleVariantSellingPrice = (
    values,
    setFieldValue,
    name,
    check,
    obj
  ) => {
    if (check === "costPrice") {
      const result =
        parseInt(obj.sellPrice) -
        (parseInt(obj.sellPrice) * parseFloat(vat)) / 100;
      const finalResult =
        ((parseInt(result) - parseInt(values)) * 100) / parseInt(values);

      setFieldValue(name, parseFloat(finalResult).toFixed(2));
    } else {
      const result =
        parseInt(values) - (parseInt(values) * parseFloat(vat)) / 100;
      const finalResult =
        ((parseInt(result) - parseInt(obj.costPrice)) * 100) /
        parseInt(obj.costPrice);

      setFieldValue(name, parseFloat(finalResult).toFixed(2));
    }
  };

  return (
    <Formik
      initialValues={VariantDetail_InitalValues}
      onSubmit={onVariantSubmitHandler}
      enableReinitialize
    >
      {(props) => {
        const { values, handleChange, setFieldValue } = props;
        return (
          <Form>
            <VariantDetailsWrapper>
              <div className="product-brand">
                <div className="product">
                  Product Name&nbsp;:{" "}
                  <span>
                    {ProductInfo_InitialValues.name
                      ? ProductInfo_InitialValues.name
                      : ""}
                  </span>
                </div>
                <div className="product">
                  Brand Name&nbsp;:{" "}
                  <span>
                    {ProductInfo_InitialValues.brandId
                      ? ProductInfo_InitialValues.brandId.name
                      : ""}
                  </span>
                </div>
                <div className="product">
                  Warehouse&nbsp;:
                  <span>{warehouse ? warehouse.name : ""}</span>
                </div>
              </div>
              <div className="attributes">
                <Collapse in={values.manual} timeout="auto" unmountOnExit>
                  <div className="subtable-header mt-2">
                    {/* <div className="select-attribute">Select Attribute</div> */}
                    <AutocompleteInputs
                      options={attribute1}
                      placeholder="Attribute 1"
                      variant="outlined"
                      optionLabel="title"
                    />
                    <AutocompleteInputs
                      options={attribute2}
                      placeholder="Attribute 2"
                      variant="outlined"
                      optionLabel="title"
                    />
                    <AutocompleteInputs
                      options={attribute3}
                      placeholder="Attribute 3"
                      variant="outlined"
                      optionLabel="title"
                    />
                    <div className="save-btn">
                      <ActionButtons>
                        <IconButton
                          size="small"
                          color="primary"
                          component="span"
                        >
                          <AddBoxIcon />
                        </IconButton>
                      </ActionButtons>
                    </div>
                  </div>
                </Collapse>
              </div>
              {/* <div className="checkbox">
                  <CustomCheckbox
                    name="manual"
                    label="Manual"
                    value={values.manual}
                    labelPlacement="start"
                    onChange={handleChange}
                  />
                </div> */}
              <Collapse in={values.manual} timeout="auto" unmountOnExit>
                <div className="manual-table">
                  <TableStyle>
                    <TableContainer className="subtable-container mt-2">
                      <Table stickyHeader aria-label="sticky table  mt-2">
                        <TableHead>
                          <TableRow>
                            {subtablehead.map((col) => (
                              <TableCell
                                key={col.id}
                                style={{ minWidth: col.minWidth }}
                                size="medium"
                                align="center"
                              >
                                {col.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">
                              <div className="avatar-center">
                                <Avatar align="center" src={ProductImage} />
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              orange flavour | Silky hair | 250ml | Anti
                              Dandruff
                            </TableCell>
                            <TableCell align="center">
                              <TextFieldInputs
                                // className="variant"
                                variant="outlined"
                                placeholder="Cost Price"
                                // value={row.costprice}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextFieldInputs
                                // className="variant"
                                variant="outlined"
                                placeholder="Sell Price"
                                // value={row.sellprice}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextFieldInputs
                                // className="variant"
                                placeholder="Mark Up%"
                                variant="outlined"
                                // value={row.markup}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextFieldInputs
                                // className="variant"
                                placeholder="Retail Price"
                                variant="outlined"
                                // value={row.retailprice}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextFieldInputs
                                // className="variant"
                                placeholder="Opening Stock"
                                variant="outlined"
                                // value={row.openingstock}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextFieldInputs
                                // className="variant"
                                placeholder="SKU"
                                variant="outlined"
                                // value={row.sku}
                              />
                            </TableCell>
                            {/* <TableCell align="center">
                              <div className="action-icon">
                                <CreateIcon />
                                <SaveIcon />
                              </div>
                            </TableCell> */}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TableStyle>
                </div>
              </Collapse>
              <Collapse in={!values.manual}>
                <TableStyle>
                  <TableContainer className="subtable-container mt-2">
                    <Table stickyHeader aria-label="sticky table  mt-2">
                      <TableHead>
                        <TableRow>
                          {subtablehead.map((col) => (
                            <TableCell
                              key={col.id}
                              style={{ minWidth: col.minWidth }}
                              size="medium"
                              align="center"
                            >
                              {col.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody className="subtable-body">
                        {values.productCombination.map((row, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align="center">
                                <div className="avatar-center">
                                  <Avatar align="center" src={ProductImage} />
                                </div>
                              </TableCell>
                              <TableCell align="center">{row.name}</TableCell>
                              <TableCell align="center">
                                <TextFieldInputs
                                  className="variant"
                                  // placeholder="Retail Price"
                                  variant="outlined"
                                  value={row.retailPrice}
                                  onChange={handleChange}
                                  name={`${[
                                    `productCombination[${index}].retailPrice`,
                                  ]}`}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextFieldInputs
                                  className="variant"
                                  variant="outlined"
                                  // placeholder="Cost Price"
                                  value={row.costPrice}
                                  onChange={(e, val) => {
                                    handleChange(e, val);
                                    handleVariantSellingPrice(
                                      e.target.value,
                                      setFieldValue,
                                      `${[
                                        `productCombination[${index}].markup`,
                                      ]}`,
                                      "costPrice",
                                      values.productCombination[index]
                                    );
                                  }}
                                  name={`${[
                                    `productCombination[${index}].costPrice`,
                                  ]}`}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextFieldInputs
                                  className="variant"
                                  variant="outlined"
                                  // placeholder="Sell Price"
                                  value={row.sellPrice}
                                  onChange={(e, val) => {
                                    handleChange(e, val);
                                    handleVariantSellingPrice(
                                      e.target.value,
                                      setFieldValue,
                                      `${[
                                        `productCombination[${index}].markup`,
                                      ]}`,
                                      "sellPrice",
                                      values.productCombination[index]
                                    );
                                  }}
                                  name={`${[
                                    `productCombination[${index}].sellPrice`,
                                  ]}`}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextFieldInputs
                                  className="variant"
                                  // placeholder="Mark Up%"
                                  variant="outlined"
                                  value={row.markup}
                                  name={`${[
                                    `productCombination[${index}].markup`,
                                  ]}`}
                                  readOnly={true}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextFieldInputs
                                  className="variant"
                                  // placeholder="Opening Stock"
                                  variant="outlined"
                                  value={row.openingStock}
                                  onChange={handleChange}
                                  name={`${[
                                    `productCombination[${index}].openingStock`,
                                  ]}`}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextFieldInputs
                                  className="variant"
                                  // placeholder="SKU"
                                  variant="outlined"
                                  value={row.sku}
                                  onChange={handleChange}
                                  name={`${[
                                    `productCombination[${index}].sku`,
                                  ]}`}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <div className="action-icon">
                                  <SaveIcon onClick={() => onRowSubmit(row)} />
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableStyle>
              </Collapse>
              <div className="bottom-section">
                <Button>Cancel</Button>
                <Button type="submit">Save & Proceed</Button>
              </div>
            </VariantDetailsWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default VariantDetails;
