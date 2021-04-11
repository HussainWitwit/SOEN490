import {mapErrorToErrorList} from "./ValidationUtilities"
import { toast, ToastOptions } from 'react-toastify';

const toastConfigurations: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
}

export const notifyError = (err: any): any => {
    if (err.code === 400) {
        mapErrorToErrorList(err).forEach((msg: any) => {
            toast.error(msg, toastConfigurations)
        })
    } else {
        toast.error(err.content, toastConfigurations);
    }
};