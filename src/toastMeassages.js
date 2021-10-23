import { toast } from 'react-toastify';

  /* Error success */
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const toastSuccess = (messages) =>{
    return toast.success(messages, options);
  }
  /* Error Warning */
  const toastWarning = (messages) =>{
    return toast.warn(messages, options);
  }
  /* Error Dark */
  const toastError = (messages) =>{
    return toast.error(messages, options);
  }

  export default {
    toastSuccess,
    toastWarning,
    toastError,
  };