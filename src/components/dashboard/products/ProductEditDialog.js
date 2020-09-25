import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { Edit, Close } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getTaxSelect, getUnitSelect } from "../common/constMaps";
import Form from "../../common/Form";
import Grid from "@material-ui/core/Grid";
import Controls from "../../common/controls/Controls";
import useForm from "../../common/useForm";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    padding: theme.spacing(3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const taxSelect = getTaxSelect();

const unitSelect = getUnitSelect();

function ProductEditDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialFValues = {
    title: props.product.title,
    shortDescription: props.product.shortDescription,
    longDescription: props.product.longDescription,
    category: props.product.category,
    unitSelect: props.product.unitSelect,
    unitValue: props.product.unitValue,
    price: props.product.price,
    taxSelect: props.product.taxSelect,
    discount: props.product.discount,
    tax: props.product.tax,
    visibility: props.product.visibility,
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("title" in fieldValues)
      tmp.title = fieldValues.title ? "" : "This field is required.";
    if ("shortDescription" in fieldValues)
      tmp.shortDescription = fieldValues.shortDescription
        ? ""
        : "This field is required.";
    if ("longDescription" in fieldValues)
      tmp.longDescription = fieldValues.longDescription
        ? ""
        : "This field is required.";
    if ("category" in fieldValues)
      tmp.category = fieldValues.category
        ? ""
        : "Select a category or create new ";
    if ("unitValue" in fieldValues)
      tmp.unitValue =
        fieldValues.unitValue > 0
          ? ""
          : "Value should be a number and greater then 0";
    if ("price" in fieldValues)
      tmp.price =
        fieldValues.price > 0
          ? ""
          : "Price should be a number and greater then 0";
    if ("discount" in fieldValues)
      tmp.discount =
        fieldValues.discount >= 0
          ? ""
          : "Discount percentage should be a number and greater than or equal to zero";
    if ("tax" in fieldValues)
      tmp.tax =
        fieldValues.tax >= 0
          ? ""
          : "Tax percentage should be a number and greater than or equal to zero";
    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    handleSwitchChange,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = () => {
    if (validate()) {
      props.callbackSave(values, props.product);
      setOpen(false);
    }
  };

  return (
    <div>
      <IconButton
        color="primary"
        aria-label={"Edit product info"}
        onClick={handleClickOpen}
      >
        <Edit />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Product
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={0} justify="center">
              <Grid xs={12} sm={6} item>
                <Controls.Switch
                  name="visibility"
                  label="Product Visibility"
                  value={values.visibility}
                  onChange={handleSwitchChange}
                  color="primary"
                />
                <Controls.Input
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleInputChange}
                  error={errors.title}
                />
                <Controls.InputArea
                  name="shortDescription"
                  label="Short Description"
                  value={values.shortDescription}
                  onChange={handleInputChange}
                  error={errors.shortDescription}
                  rowsMax={2}
                />
                <Controls.InputArea
                  name="longDescription"
                  label="Long Description"
                  value={values.longDescription}
                  onChange={handleInputChange}
                  error={errors.longDescription}
                  rowsMax={5}
                />
                <Controls.Select
                  name="category"
                  label="Category"
                  value={values.category}
                  onChange={handleInputChange}
                  options={props.categorySelect}
                  error={errors.category}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Grid xs={12} item container>
                  <Grid xs={6} item>
                    <Controls.Select
                      name="unitSelect"
                      label="Select Unit"
                      value={values.unitSelect}
                      onChange={handleInputChange}
                      options={unitSelect}
                      error={errors.uniSelect}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Controls.Input
                      name="unitValue"
                      label="Value"
                      value={values.unitValue}
                      onChange={handleInputChange}
                      error={errors.unitValue}
                    />
                  </Grid>
                </Grid>
                <Grid xs={12} item container>
                  <Grid xs={6} item>
                    <Controls.Input
                      name="price"
                      label="Price"
                      value={values.price}
                      onChange={handleInputChange}
                      error={errors.price}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Controls.Input
                      name="discount"
                      label="Discount Percentage"
                      value={values.discount}
                      onChange={handleInputChange}
                      error={errors.discount}
                    />
                  </Grid>
                </Grid>
                <Grid xs={12} item container>
                  <Grid xs={6} item>
                    <Controls.Select
                      name="taxSelect"
                      label="Tax Type"
                      value={values.taxSelect}
                      onChange={handleInputChange}
                      options={taxSelect}
                      error={errors.taxSelect}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Controls.Input
                      name="tax"
                      label="Tax Value"
                      value={values.tax}
                      onChange={handleInputChange}
                      error={errors.tax}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </div>
      </Dialog>
    </div>
  );
}

export default ProductEditDialog;
