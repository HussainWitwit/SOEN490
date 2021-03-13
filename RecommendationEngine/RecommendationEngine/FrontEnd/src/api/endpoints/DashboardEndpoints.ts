import { Widget } from '../models/Widget';
import { CalendarDates } from '../models/CalendarDates';
import { Action } from '../models/Action';
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"
import { toast } from 'react-toastify';

export async function GetWidgetMetrics(): Promise<Widget[] | null> {
    let widgetMetrics: Widget[] = [];
    await fetch('api/result/widgets')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            widgetMetrics = res;
            return widgetMetrics
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
    return widgetMetrics;
}

export async function GetCalendarDates(): Promise<CalendarDates[] | null> {
    let calendarDates: CalendarDates[] = [];
    await fetch('api/action/calendar')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            calendarDates = res;
            return calendarDates
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
    return calendarDates;
}

export async function GetActionPerDay(date: string): Promise<Action[] | null> {
    let actionList: Action[] = [];
    await fetch('api/action/date/' + date)
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            actionList = res;
            return actionList
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
    return actionList;
}