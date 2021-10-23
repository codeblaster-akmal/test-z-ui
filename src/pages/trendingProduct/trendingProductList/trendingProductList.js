import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Grid, IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TrendingProductListWrapper from "./trendingProductListStyles";
import {
  Container,
  FilterRow,
  PageHeader,
  TextFieldInputs,
  AutocompleteInputs,
  ResponsiveTable,
  TableHeader,
  Column,
  TableRow,
  Button,
  HeroSection,
  ActionButtons,
  TableContainer,
} from "components";
import { TablePagination } from "@material-ui/core";
import { getSiteData } from "../trendingProduct.service";
import { dateToNiceString } from "utils/utilsFunc";

const TrendingProductList = () => {
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [siteData, setSiteData] = useState([]);
  const [filter, setFilter] = useState({
    type: "",
  });

  const siteDataHandler = async () => {
    const { data } = await getSiteData();
    setSiteData(data);
  };

  const filterStatus = (filter, item) => {
    if (filter.type) return item.name === filter.type.name;
    else return item;
  };

  const filterFunction = (item) => {
    if (filter && filter.type) {
      if (filterStatus(filter, item)) return item;
    } else {
      return item;
    }
  };

  const handleFilter = (labelName) => (e, val) => {
    setFilter({
      ...filter,
      [labelName]: val || "",
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    siteDataHandler();
  }, []);
  console.log(3241243412, siteData);
  const currentListCount = siteData.filter(filterFunction).length;

  return (
    <TrendingProductListWrapper>
      <HeroSection IconVisible isListing listType="Product" />
      <Container>
        <PageHeader Title="Promotion List">
          <Button onClick={() => history.push("/trendingProduct")}>Add</Button>
        </PageHeader>
        <Grid container>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <FilterRow>
              <AutocompleteInputs
                variant="filled"
                optionLabel="name"
                placeholder="Type"
                options={siteData}
                value={filter.type}
                onChange={handleFilter("type")}
              />
            </FilterRow>
          </Grid>
        </Grid>
        <ResponsiveTable>
          <TableHeader>
            <Column alignTo="left" size="15%">
              Date
            </Column>
            <Column size="15%">Offer type</Column>
            <Column size="15%">No. of products</Column>
            <Column size="10%">Action</Column>
          </TableHeader>
          <TableContainer>
            {siteData.filter(filterFunction).map((product, index) => (
              <TableRow key={index}>
                <Column alignTo="left" size="15%" data-label="Date">
                  {dateToNiceString(product.updatedAt)}
                </Column>
                <Column size="15%" data-label="Offer type">
                  {product.name}
                </Column>
                <Column size="15%" data-label="No. of products">
                  {product.productCount}
                </Column>
                <Column size="10%" data-label="Action">
                  <ActionButtons>
                    <IconButton
                      size="small"
                      color="primary"
                      component="span"
                      onClick={() =>
                        history.push(`/trendingProduct/edit/${product.id}`)
                      }
                    >
                      <CreateIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      component="span"
                      onClick={() =>
                        history.push(`/trendingProduct/view/${product.id}`)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </ActionButtons>
                </Column>
              </TableRow>
            ))}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            size="small"
            count={currentListCount}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Rows"
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ResponsiveTable>
      </Container>
    </TrendingProductListWrapper>
  );
};

export default TrendingProductList;
