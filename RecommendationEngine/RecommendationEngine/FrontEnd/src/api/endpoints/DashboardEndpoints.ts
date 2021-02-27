import { Widget } from '../models/Widget';
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"
import { toast } from 'react-toastify';

export async function getWidgetValues(): Promise<Widget[] | null> {
    let widgetValues = null;
    await fetch('api/result/widgets')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            widgetValues = res;
            // console.log(widgetValues);
            return widgetValues
        })
        .catch(err => {
            if (err.code === 400) {
                mapErrorToErrorList(err).map((msg: any) => {
                    toast.error(msg, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
            } else {
                toast.error(err.content, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    return widgetValues;
}