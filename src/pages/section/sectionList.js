import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useHistory } from "react-router";
import SectionStyles from "./sectionStyles";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import {
  Container,
  FilterRow,
  HeroSection,
  PageHeader,
  Button,
  TextFieldInputs,
  AutocompleteInputs,
  Badge,
  CustomSwitch,
  Radiobutton,
  TableHeader,
  Column,
  TableRow,
  TableContainer,
  CustomCheckbox,
  ResponsiveTable,
  ActionButtons,
  DateTimePickerWrapper,
  SubHeaderLabel,
} from "components";
import {
  TablePagination,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";

const statusoptions = [{ title: "Running" }, { title: "Expired" }];

const Columns = [
  {
    id: "type",
    label: "Type",
    align: "left",
    width: "20%",
  },
  {
    id: "display",
    label: "Display",
    width: "10%",
  },
  {
    id: "valid",
    label: "Valid",
    width: "30%",
  },
  {
    id: "status",
    label: "Status",
    width: "10%",
  },
  {
    id: "action",
    label: "Action",
    width: "10%",
  },
];

function CreateData(type, display, validFrom, validTill, status, action) {
  return {
    type,
    display,
    validFrom,
    validTill,
    status,
    action,
  };
}

const Rows = [
  CreateData("Feature Product", 2, "08/08/2021", "08/08/2022", "Running"),
  CreateData("Brand", 5, "06/08/2021", "Never expires", "Running"),
  CreateData("Search by Category", 3, "Instant", "", "Expired"),
];

const initialValues = {
  type: "",
  display: "",
  instant: "instant",
  schedule: "schedule",
  status: false,
  description: "",
  fromDate: new Date(),
  toDate: new Date(),
};

const validationSchema = Yup.object({
  type: Yup.object().required("Required"),
  display: Yup.object().required("Required"),
});

const dropdownOptions = [
  { title: "Option 1" },
  { title: "Option 2" },
  { title: "Option 3" },
];

const SectionList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };
  const handleAutoComplete = (name, setFieldValue) => (e, value) => {
    setFieldValue(name, value !== null ? value : initialValues[name]);
  };

  return (
    <>
      <HeroSection IconVisible />
      <SectionStyles>
        <Container>
          <PageHeader Title="Section Builder">
            <Button onClick={() => history.push("/createSection")}>
              Create Section
            </Button>
          </PageHeader>
          <FilterRow>
            <TextFieldInputs
              className="filter-column"
              placeholder="Search Name"
              InputProps={<SearchIcon />}
              variant="filled"
            />
            <AutocompleteInputs
              variant="filled"
              optionLabel="title"
              placeholder="Status"
              options={statusoptions}
            />
          </FilterRow>
          <ResponsiveTable>
            <TableHeader>
              {Columns.map((column) => (
                <Column
                  key={column.id}
                  size={column.width}
                  alignTo={column.align}
                >
                  {column.label}
                </Column>
              ))}
            </TableHeader>
            <TableContainer >
              {Rows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row, index) => {
                const { type, display, validFrom, validTill, status } = row;
                return (
                  <TableRow key={index}>
                    <Column size="20%" alignTo="left">
                      {type}
                    </Column>
                    <Column size="10%">{display}</Column>
                    <Column size="30%">{`${
                      validFrom && validTill
                        ? `${validFrom} - ${validTill}`
                        : validFrom
                    }`}</Column>
                    <Column size="10%">
                      <Badge badgeType={status}>{status}</Badge>
                    </Column>
                    <Column size="10%">
                      <ActionButtons>
                        <IconButton
                          size="small"
                          color="primary"
                          component="span"
                        >
                          <CreateIcon />
                        </IconButton>
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
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={Columns.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </ResponsiveTable>
        </Container>
        <Container>
          <Formik
            initialValues={initialValues}
            onSubmit={onsubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                setFieldValue,
                resetForm,
              } = props;
              return (
                <Form>
                  <div className="input-height my-2">
                    <AutocompleteInputs
                      label="Select Type"
                      id="type"
                      name="type"
                      optionLabel="name"
                      onBlur={handleBlur}
                      value={values.type}
                      options={dropdownOptions}
                      error={errors.type && touched.type}
                      onChange={handleAutoComplete("type", setFieldValue)}
                      helperText={errors.type && touched.type && errors.type}
                    />
                  </div>
                  <div className="input-height my-2">
                    <AutocompleteInputs
                      label="Select Display"
                      id="display"
                      name="display"
                      optionLabel="name"
                      onBlur={handleBlur}
                      value={values.display}
                      options={dropdownOptions}
                      error={errors.display && touched.display}
                      onChange={handleAutoComplete("display", setFieldValue)}
                      helperText={
                        errors.display && touched.display && errors.display
                      }
                    />
                  </div>
                  <div className="my-4">
                    <CustomSwitch
                      name="status"
                      label="Status"
                      labelPlacement="start"
                      checked={values.status}
                      onChange={handleChange}
                    />
                  </div>
                  <SubHeaderLabel margin>Valid</SubHeaderLabel>
                  <Radiobutton className="my-3">
                    <RadioGroup
                      name="instant"
                      aria-label="instant"
                      value={values.instant}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="schedule"
                        label="Instant"
                        value={values.schedule}
                        onChange={handleChange}
                        control={<Radio size="small" />}
                      />
                    </RadioGroup>
                  </Radiobutton>
                  <Radiobutton className="my-3">
                    <RadioGroup
                      name="schedule"
                      aria-label="schedule"
                      value={values.schedule}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="schedule"
                        label="Schedule"
                        control={<Radio size="small" />}
                      />
                    </RadioGroup>
                  </Radiobutton>
                  <div className="twoColumn-division my-2">
                    <DateTimePickerWrapper>
                      <KeyboardDateTimePicker
                        variant="inline"
                        fullWidth
                        ampm={false}
                        hideTabs
                        autoOk
                        label="From Date"
                        value={values.fromDate}
                        onChange={handleAutoComplete("fromDate", setFieldValue)}
                        format="yyyy/MM/dd HH:mm"
                      />
                    </DateTimePickerWrapper>
                    <DateTimePickerWrapper>
                      <KeyboardDateTimePicker
                        variant="inline"
                        fullWidth
                        ampm={false}
                        hideTabs
                        autoOk
                        label="To Date"
                        value={values.toDate}
                        onChange={handleAutoComplete("fromDate", setFieldValue)}
                        format="yyyy/MM/dd HH:mm"
                      />
                    </DateTimePickerWrapper>
                  </div>
                  <div className="my-3">
                    <CustomCheckbox label="Never Expire" />
                  </div>
                  <div className="bottom-section py-3">
                    <Button
                      variant="buttonprimary"
                      onClick={() => {
                        resetForm();
                        // setState(initialValues);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="buttonprimary" type="submit">
                      Add
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Container>
      </SectionStyles>
    </>
  );
};

export default SectionList;
