import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import Button from "components/button";
import SearchIcon from "@material-ui/icons/Search";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import { useReactToPrint } from "react-to-print";
import {
  TablePagination,
  Avatar,
  Collapse,
  IconButton,
} from "@material-ui/core";
import {
  AutocompleteInputs,
  TextFieldInputs,
  PageHeader,
  FilterRow,
  Container,
  Badge,
  HeroSection,
  ResponsiveTable,
  TableHeader,
  Column,
  TableRow,
  TableContainer,
  ActionButtons,
  ActiveRowWrapper,
} from "components";
import {
  fetchProducts,
  getAllCategories,
  getAllGroups,
  getAllSubGroups,
  getAllBrands,
  updateProduct,
  getAllWarehouses,
  updateProductVariantDetail,
} from "../productList.service";
import { productImageUrl } from "utils/image";
import { MSG_TYPE, useToaster, useDialog } from "components/toastBar";

const columns = [
  {
    id: "image",
    label: "Image",
    maxWidth: "10%",
    align: "left",
  },
  {
    id: "product",
    label: "Product Name",
    maxWidth: "20%",
    align: "left",
  },
  {
    id: "brand",
    label: "Brand",
    maxWidth: "10%",
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
    label: "Sub Group",
    maxWidth: "10%",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    maxWidth: "8%",
  },
  // {
  //   id: "views",
  //   label: "Views",
  //   maxWidth: "5%",
  // },
  {
    id: "action",
    label: "Action",
    maxWidth: "10%",
  },
];

const statusOptions = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];

const Row = (props) => {

  const {
    row,
    index,
    setOpen,
    open,
    handleClickOpen,
    onActiveInactive,
    onActiveInactiveVariant,
    variantStatusDialog,
  } = props;

  const prodVariantName = (combinationName, variantAttributes) => {

    const attributes = variantAttributes.map(vtAttr => vtAttr.attribute);

    let concateStr = "";
    const name = combinationName.split("-");
    name.forEach((num) => {
      const value = attributes.find(({ id }) => id === +num);
      concateStr += `${value.name} / `;
    });
    return concateStr;
  }

  return (
    <ActiveRowWrapper active={index === open}>
      <TableRow onClick={() => row.product_variant_details.length && setOpen(index === open ? false : index)}>
        <Column size="10%">
          <Avatar
            variant="circle"
            alt="Product Image"
            src={productImageUrl(row.product_images)}
          />
        </Column>
        <Column alignTo="left" size="20%">
          {row.name}
        </Column>
        <Column alignTo="left" size="10%">
          {row.brand.name}
        </Column>
        <Column alignTo="left" size="10%">
          {row.sub_group.group.category.name}
        </Column>
        <Column alignTo="left" size="10%">
          {row.sub_group.group.name}
        </Column>
        <Column alignTo="left" size="10%">
          {row.sub_group.name}
        </Column>
        <Column size="8%">
          <Badge badgeType={row.status ? "Active" : "Inactive"}>
            {row.status ? "Active" : "Inactive"}
          </Badge>
        </Column>
        {/* <Column size="5%">{"10"}</Column> */}
        <Column size="10%">
          <ActionButtons>
            <IconButton size="small" color="primary" component="span">
              <VisibilityIcon />
            </IconButton>
            <IconButton size="small" color="primary" component="span">
              <CreateIcon />
            </IconButton>
            {!row.status ? (
              <IconButton
                size="small"
                color="primary"
                component="span"
                onClick={handleClickOpen(onActiveInactive, row)}
              >
                <AddCircleIcon />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                color="primary"
                component="span"
                onClick={handleClickOpen(onActiveInactive, row)}
              >
                <RemoveCircleIcon />
              </IconButton>
            )}
            {/* <IconButton
                size="small"
                color="primary"
                component="span"
              >
                <DeleteIcon />
              </IconButton> */}
          </ActionButtons>
        </Column>
      </TableRow>
      {row.product_variant_details.length ?
        <Collapse in={index === open} mountOnEnter unmountOnExit>
          <TableHeader className="subtable-header" subTableRow>
            <Column size="30%" className="subtable-cell">
              Variants
            </Column>
            <Column size="10%" className="subtable-cell">
              Selling Price
            </Column>
            <Column size="10%" className="subtable-cell">
              Available Qty
            </Column>
            <Column size="10%" className="subtable-cell">
              Status
            </Column>
            <Column size="10%" className="subtable-cell">
              Action
            </Column>
          </TableHeader>
          <TableContainer staticHeight="auto">
            {
              row.product_variant_details.map(prdDetail => (
                <TableRow key={0} subTableRow>
                  <Column size="30%">
                    {prodVariantName(prdDetail.combinationName, row.product_variants)}
                  </Column>
                  <Column size="10%">{prdDetail.sellPrice}</Column>
                  <Column size="10%">{"10"}</Column>
                  <Column size="10%">{prdDetail.status ? "Active" : "Inactive"}</Column>
                  <Column size="10%">
                    <ActionButtons>
                      {!prdDetail.status ? (
                        <IconButton
                          size="small"
                          color="primary"
                          component="span"
                          onClick={variantStatusDialog(onActiveInactiveVariant, prdDetail)}
                        >
                          <AddCircleIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          color="primary"
                          component="span"
                          onClick={variantStatusDialog(onActiveInactiveVariant, prdDetail)}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      )}
                    </ActionButtons>
                  </Column>
                </TableRow>
              ))
            }
          </TableContainer>
        </Collapse>
        : null
      }
    </ActiveRowWrapper>
  );
};

function ProductList() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState();
  const [products, setProducts] = useState([]);
  const [dropDownFilter, setDropDownFilter] = useState({
    categories: [],
    groups: [],
    subGroups: [],
    brands: [],
    warehouses: [],
  });
  const [filter, setFilter] = useState({
    name: "",
    category: "",
    group: "",
    subGroup: "",
    brand: "",
    status: "",
  });

  const history = useHistory();
  const ref = useRef();
  const toaster = useToaster();
  const { handleOpenDialog, handleCloseDialog } = useDialog();

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchFunc = useCallback(async () => {
    const { data } = await fetchProducts();
    const { data: categories } = await getAllCategories();
    const { data: groups } = await getAllGroups();
    const { data: subGroups } = await getAllSubGroups();
    const { data: brands } = await getAllBrands();
    const { data: warehouses } = await getAllWarehouses();


    setProducts(data);

    setDropDownFilter(prevState => {
      return {
        ...prevState,
        categories,
        groups,
        subGroups,
        brands,
        warehouses
      }
    });
  }, []);

  useEffect(() => {
    fetchFunc();
  }, [fetchFunc]);

  const filterStatus = (filter, item) => {
    if (filter.status) return item.status === filter.status.value;
    else return item;
  };

  const filterProduct = (filter, item) => {
    return item.name.toLowerCase().includes(filter.name.toLowerCase());
  };

  const filterSubGroup = (filter, item) => {
    if (filter.subGroup) return item.sub_group.name === filter.subGroup.name;
    else return item;
  };

  const filterCategory = (filter, item) => {
    if (filter.category)
      return item.sub_group.group.category.name === filter.category.name;
    else return item;
  };

  const filterGroup = (filter, item) => {
    if (filter.group) return item.sub_group.group.name === filter.group.name;
    else return item;
  };

  const filterBrand = (filter, item) => {
    if (filter.brand) return item.brand.name === filter.brand.name;
    else return item;
  };

  const filterItems = (filter, item) => {
    return (
      filterProduct(filter, item) &&
      filterCategory(filter, item) &&
      filterGroup(filter, item) &&
      filterSubGroup(filter, item) &&
      filterBrand(filter, item) &&
      filterStatus(filter, item)
    );
  };

  const filterFunction = (item) => {
    if (
      filter &&
      (filter.name ||
        filter.category ||
        filter.group ||
        filter.subGroup ||
        filter.brand ||
        filter.status)
    ) {
      if (filterItems(filter, item)) return item;
    } else {
      return item;
    }
  };

  const handleFilter = (labelName) => (e, val) => {
    setFilter({
      ...filter,
      [labelName]: labelName === "name" ? e.target.value : val || "",
    });
  };

  const productPaginate = (productArr) => {
    return productArr.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  const currentListCount = () => products.filter(filterFunction).length;

  const onActiveInactive = async (item) => {
    try {
      await updateProduct(item.id, { status: !item.status });
      fetchFunc();
      handleCloseDialog();
      toaster(
        MSG_TYPE.SUCCESS,
        `Product ${item.status ? "Inactivated" : "Activated"} successfully!`
      );
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  const handleClickOpen = (callbackFunc, callbackValue) => () => {
    const dialogContent = {
      alertTitle: `${callbackValue.status ? "Inactivate" : "Activate"} product`,
      alertAction: `${callbackValue.status ? "inactive" : "active"}`,
      ContentText: `Are you sure you want to ${callbackValue.status ? "inactivate" : "activate"
        } this product`,
    };
    handleOpenDialog(dialogContent, callbackFunc, callbackValue);
  };

  const onActiveInactiveVariant = async (item) => {
    try {
      await updateProductVariantDetail(item.id, { status: !item.status, productId: item.productId });
      fetchFunc();
      handleCloseDialog();
      toaster(
        MSG_TYPE.SUCCESS,
        `Product variant ${item.status ? "Inactivated" : "Activated"} successfully!`
      );
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  };

  const variantStatusDialog = (callbackFunc, callbackValue) => () => {
    const dialogContent = {
      alertTitle: `${callbackValue.status ? "Inactivate" : "Activate"} product`,
      alertAction: `${callbackValue.status ? "inactive" : "active"}`,
      ContentText: `Are you sure you want to ${callbackValue.status ? "inactivate" : "activate"
        } this product`,
    };
    handleOpenDialog(dialogContent, callbackFunc, callbackValue);
  };

  return (
    <>
      <HeroSection
        handlePrint={handlePrint}
        listType="Products"
        totalLists={products.length}
        isListing
        IconVisible
      />
      <Container>
        <PageHeader Title="Product List">
          <Button
            onClick={() => {
              history.push("/Product");
            }}
          >
            Add
          </Button>
        </PageHeader>
        <FilterRow>
          <AutocompleteInputs
            options={dropDownFilter?.warehouses}
            placeholder="Warehouse"
            variant="filled"
            optionLabel="name"
            name="category"
            onChange={handleFilter("category")}
          />
          <TextFieldInputs
            placeholder="Search Product"
            InputProps={<SearchIcon />}
            variant="filled"
            name="name"
            value={filter.name}
            onChange={handleFilter("name")}
          />
          <AutocompleteInputs
            options={dropDownFilter?.groups}
            placeholder="Group"
            variant="filled"
            optionLabel="name"
            name="group"
            onChange={handleFilter("group")}
          />
          <AutocompleteInputs
            options={dropDownFilter?.subGroups}
            placeholder="Subgroup"
            variant="filled"
            optionLabel="name"
            name="subGroup"
            onChange={handleFilter("subGroup")}
          />
          <AutocompleteInputs
            options={dropDownFilter?.brands}
            placeholder="Brand"
            variant="filled"
            optionLabel="name"
            name="brand"
            onChange={handleFilter("brand")}
          />
          <AutocompleteInputs
            options={statusOptions}
            placeholder="Status"
            variant="filled"
            optionLabel="label"
            onChange={handleFilter("status")}
          />
        </FilterRow>
        <ResponsiveTable ref={ref}>
          <TableHeader>
            {columns.map((column) => (
              <Column
                key={column.id}
                size={column.maxWidth}
                alignTo={column.align}
              >
                {column.label}
              </Column>
            ))}
          </TableHeader>
          <TableContainer>
            {productPaginate(products.filter(filterFunction)).map(
              (row, index) => {
                return (
                  <Row
                    key={index}
                    row={row}
                    setOpen={setOpen}
                    open={open}
                    index={index}
                    handleClickOpen={handleClickOpen}
                    onActiveInactive={onActiveInactive}
                    onActiveInactiveVariant={onActiveInactiveVariant}
                    variantStatusDialog={variantStatusDialog}
                  />
                );
              }
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            size="small"
            count={currentListCount()}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Rows"
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ResponsiveTable>
      </Container>
    </>
  );
}

export default ProductList;
