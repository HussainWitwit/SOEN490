import { Widget } from '../models/Widget';
import { CalendarDates } from '../models/CalendarDates';
import { MonthlyNetSavings } from '../models/JobResult';
import { Action } from '../models/Action';
import { handleErrors } from "../../utilities/ValidationUtilities"
import { notifyError } from "../../utilities/ErrorNotification"

export async function GetWidgetMetrics(assetId: number | null): Promise<Widget[] | null> {
    let widgetMetrics: Widget[] = [];
    await fetch('api/result/widgets/' + (assetId ? assetId : ''))
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            widgetMetrics = res;
            return widgetMetrics
        })
        .catch(err => {
            notifyError(err)
        })
    return widgetMetrics;
}

export async function GetCalendarDates(assetId: number | null): Promise<CalendarDates[] | null> {
    let calendarDates: CalendarDates[] = [];
    await fetch('api/action/calendar/' + (assetId ? assetId : ''))
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            calendarDates = res;
            return calendarDates
        })
        .catch(err => {
            notifyError(err)
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
            notifyError(err)
        })
    return actionList;
}

export async function GetActionPerCompoundId(id: string): Promise<Action[] | null> {
    let actionList: Action[] = [];
    await fetch('api/action/group/' + id)
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            actionList = res;
            return actionList
        })
        .catch(err => {
            notifyError(err)
        })
    return actionList;
}

export async function GetMonthlyNetSavings(): Promise<MonthlyNetSavings[] | null> {
    let monthlyNetSavingsList: MonthlyNetSavings[] = [];
    await fetch('api/')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            monthlyNetSavingsList = res;
            return monthlyNetSavingsList
        })
        .catch(err => {
            notifyError(err)
        })
    return monthlyNetSavingsList;
}