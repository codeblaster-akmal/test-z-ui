import TextFieldInputs from "components/textFieldInput";
import React from "react";
import Button from "components/button";
import { RelatedProductWrapper, SeoStyleWrapper } from "../productStyleWrapper";
import { Formik } from "formik";

const SEO = (props) => {
  const { Seo_InitialValues, onSeoSubmit, ProductInfo_InitialValues } = props;

  return (
    <Formik
      initialValues={Seo_InitialValues}
      onSubmit={onSeoSubmit}
      enableReinitialize
    >
      {(props) => {
        const { values, handleChange, handleBlur, handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit}>
            <>
              <SeoStyleWrapper>
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
                </div>
                <div className="seo-grid">
                  <div className="left-section">
                    <div className="subheader-label">Page Title</div>
                    <div className="text-box">
                      <TextFieldInputs
                        placeholder="Page title..."
                        variant="outlined"
                        id="seoPageTitle"
                        name="seoPageTitle"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.seoPageTitle}
                      />
                    </div>
                    <div className="subheader-label">Keyword</div>
                    <div className="text-box">
                      <TextFieldInputs
                        placeholder="Keyword..."
                        variant="outlined"
                        id="seoKeyword"
                        name="seoKeyword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.seoKeyword}
                      />
                    </div>
                    <div className="subheader-label">Conicals</div>
                    <div className="text-box">
                      <TextFieldInputs
                        placeholder="Keyword..."
                        variant="outlined"
                        id="seoConicals"
                        name="seoConicals"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.seoConicals}
                      />
                    </div>
                  </div>
                  <div className="right-section">
                    <div className="subheader-label">Meta Description</div>
                    <div className="text-box">
                      <TextFieldInputs
                        placeholder="Meta Description..."
                        variant="outlined"
                        multiline
                        rowsMax={7}
                        id="seoMetaDescription"
                        name="seoMetaDescription"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.seoMetaDescription}
                      />
                    </div>
                  </div>
                </div>
              </SeoStyleWrapper>
              <RelatedProductWrapper>
                <div className="bottom-section">
                  <Button>Cancel</Button>
                  <Button type="submit">Save & Close</Button>
                </div>
              </RelatedProductWrapper>
            </>
          </form>
        );
      }}
    </Formik>
  );
};

export default SEO;
