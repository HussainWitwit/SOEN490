import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getWidgetMetrics } from '../../api/endpoints/DashboardEndpoints';
import { getCalendarDates } from '../../api/endpoints/DashboardEndpoints';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { convertWidgetResponse } from '../../utilities/ArrayManipulationUtilities';
import { formatNumber } from '../../utilities/GeneralUtilities';
import Grid from '@material-ui/core/Grid';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";


export const pickStylingClassName = (title) => {
    let className;
    if (title === 'Potential Net Savings') {
        className = 'widget net-savings'
    }
    else if (title === 'Average ROI') {
        className = 'widget roi'
    }
    else {
        className = 'widget inaction'
    }
    return className;
}

function Dashboard() {
    const [widgetMetrics, setWidgetMetrics] = useState([]);
    const [calendarValues, setCalendarValues] = useState([]);

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const getWidgetValues = async () => {
        let response = await getWidgetMetrics();
        let detailedWidgets = convertWidgetResponse(response);
        setWidgetMetrics(detailedWidgets);
    }

    const getCalendarValues = async () => {
        let response = await getCalendarDates();
        let calendar = [];
        response.map((element) => {
            calendar.push({
                date: formatDate(element.date),
                nbOfActions: element.nbOfActions,
            });
        })
        calendarEvents(calendar)
    }

    function calendarEvents(calendar) {
        let events = [];
        calendar.map((element) => {
            events.push({
                date: element.date,
                title: element.nbOfActions + ' actions',
            })
        })
        setCalendarValues(events);
    }

    function handleDateClick() {
        // Do whatever
    }

    useEffect(() => {
        getWidgetValues();
        getCalendarValues();
    }, [])

    return (
        <div>
            <div>
                <br></br>
                <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
                    <Grid id="grid1" item>
                        <h3 id="title">Dashboard</h3>
                        <h6 id="subtitle">View a calendar with upcomming wash days</h6>
                    </Grid>
                </Grid>
                <br></br>
            </div>
            <div id='widget-container'>
                {widgetMetrics?.map((widget, index) => (
                    <div key={index} className={pickStylingClassName(widget.title)}>
                        <div id='tooltip-container'>
                            <Tooltip title={widget.description}>
                                <HelpOutlineOutlinedIcon size={1} />
                            </Tooltip>
                        </div>
                        <div id='title-container'>{widget.title}</div>
                        <div>
                            <div id='widget-contents'>
                                <div id='sign'>{widget.sign}</div>
                                <div id='money-value'>{formatNumber(widget.value)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                selectable={true}
                initialView='dayGridMonth'
                select={handleDateClick}
                events={calendarValues}
            />
        </div>
    )
}

export default Dashboard;