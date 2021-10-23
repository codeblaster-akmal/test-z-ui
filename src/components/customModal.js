import React from "react";
import { Backdrop, Modal, Fade, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    minWidth: "30%",
    borderRadius: "0.3rem",
    "&:focus": {
      outline: "none",
    },
  },
}));

const CustomModal = ({ open, FadeIn, children, onClose }) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        className={classes.modal}
        BackdropComponent={Backdrop}
        disableBackdropClick
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={FadeIn}>
          <div className={classes.paper}>{children}</div>
        </Fade>
      </Modal>
    </>
  );
};
export default CustomModal;
