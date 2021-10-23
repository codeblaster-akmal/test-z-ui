import React, { createContext, useContext } from "react";
import styled from "styled-components";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import Button from "./button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const DialogBoxWrapper = styled.div`
  #alert-dialog-slide-title {
    color: ${({ theme }) => theme.themeColor.primary};
    font: ${({ theme }) => theme.fontAppearance.subheader};
  }
  #alert-dialog-slide-description {
    font: ${({ theme }) => theme.fontAppearance.tablelist};
  }
  .action-buttons {
    margin: 0 1rem 1rem 0;
  }
`;

const ToastWrapper = styled.div`
  .MuiSnackbarContent-root,
  .MuiSnackbarContent-message {
    padding: 0;
    background-color: transparent;
    min-width: 140px;
  }
  .MuiAlert-root {
    padding: 6px 23px;
    background-color: ${({ theme }) => theme.themeColor.primary};
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MSG_TYPE = {
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  SUCCESS: "success",
};

export const ToastContext = createContext();

export function useToaster() {
  const { handleClick } = useContext(ToastContext);
  return handleClick;
}

export function useDialog() {
  const { handleOpenDialog, handleCloseDialog } = useContext(ToastContext);
  return { handleOpenDialog, handleCloseDialog };
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export const ToastBarProvider = ({ children }) => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    msgType: "",
    msgContent: "",
    alertTitle: "",
    alertAction: "",
    ContentText: "",
    openDialog: false,
  });
  const [transition, setTransition] = React.useState(undefined);
  const { vertical, horizontal, open } = state;

  const handleClick = (msgType, msgContent) => {
    setState((prevState) => ({
      ...prevState,
      open: true,
      vertical: "top",
      horizontal: "center",
      msgType,
      msgContent,
    }));
    setTransition(() => TransitionRight);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, open: false });
  };

  const handleOpenDialog = (
    { alertTitle, alertAction, ContentText },
    callbackFunc,
    ...callbackValue
  ) => {
    setState((currentState) => {
      return {
        ...currentState,
        alertTitle,
        alertAction,
        ContentText,
        openDialog: true,
        callbackFunc,
        callbackValue: [...callbackValue],
      };
    });
  };

  const handleCloseDialog = () => {
    setState((currentState) => {
      return {
        ...currentState,
        openDialog: false,
      };
    });
  };

  const onConfirmClick = (callbackFunc, callbackValue) => {
    callbackFunc(...callbackValue);
  };

  return (
    <ToastContext.Provider
      value={{ handleClick, handleOpenDialog, handleCloseDialog }}
    >
      <Dialog
        open={state.openDialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogBoxWrapper>
          <DialogTitle id="alert-dialog-slide-title">
            {state.alertTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {state.ContentText}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="action-buttons">
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() =>
                onConfirmClick(state.callbackFunc, state.callbackValue)
              }
            >
              {state.alertAction}
            </Button>
          </DialogActions>
        </DialogBoxWrapper>
      </Dialog>
      <ToastWrapper>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          TransitionComponent={transition}
          key={vertical + horizontal}
          message={
            <Alert onClose={handleClose} severity={state.msgType}>
              {state.msgContent}
            </Alert>
          }
        />
      </ToastWrapper>
      {children}
    </ToastContext.Provider>
  );
};
