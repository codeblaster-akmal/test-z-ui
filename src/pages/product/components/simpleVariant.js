import React from "react";
import { SimpleVariantWrapper } from "../productStyleWrapper";
import {
  TextFieldInputs,
  AutocompleteInputs,
  SubHeaderLabel,
} from "components";

const SimpleVariant = (props) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    dropDownOptions,
    handleAutoComplete,
    handleMarkup,
  } = props;

  return (
    <SimpleVariantWrapper>
      <SubHeaderLabel margin>Simple</SubHeaderLabel>
      <div className="dropdown">
        <AutocompleteInputs
          label="Warehouse"
          optionLabel="name"
          value={values.warehouseId}
          onChange={handleAutoComplete("warehouseId", setFieldValue)}
          error={errors.warehouseId && touched.warehouseId}
          helperText={
            errors.warehouseId && touched.warehouseId && errors.warehouseId
          }
          options={dropDownOptions.stores}
          onBlur={handleBlur}
        />
        <TextFieldInputs
          name="openingStock"
          onBlur={handleBlur}
          label="Opening Stock"
          onChange={handleChange}
          value={values.openingStock}
          error={errors.openingStock && touched.openingStock}
          helperText={
            errors.openingStock && touched.openingStock && errors.openingStock
          }
        />
        <div className="markup">Mark Up (%)&nbsp;:&nbsp;{values.markup}</div>
      </div>
      <div className="field-row">
        <TextFieldInputs
          name="retailPrice"
          onBlur={handleBlur}
          value={values.retailPrice}
          label="Retail Price* (£)"
          onChange={handleChange}
          error={errors.retailPrice && touched.retailPrice}
          helperText={
            errors.retailPrice && touched.retailPrice && errors.retailPrice
          }
        />
        <TextFieldInputs
          name="costPrice"
          onBlur={handleBlur}
          value={values.costPrice}
          label="Cost Price* (£)"
          onChange={(e, val) => {
            handleChange(e, val);
            handleMarkup(
              { ...values, costPrice: e.target.value },
              setFieldValue
            );
          }}
          error={errors.costPrice && touched.costPrice}
          helperText={errors.costPrice && touched.costPrice && errors.costPrice}
        />

        <TextFieldInputs
          name="sellPrice"
          onBlur={handleBlur}
          value={values.sellPrice}
          label="Selling Price* (£)"
          onChange={(e, val) => {
            handleChange(e, val);
            handleMarkup(
              { ...values, sellPrice: e.target.value },
              setFieldValue
            );
          }}
          error={errors.sellPrice && touched.sellPrice}
          helperText={errors.sellPrice && touched.sellPrice && errors.sellPrice}
        />
      </div>
    </SimpleVariantWrapper>
  );
};

export default SimpleVariant;
