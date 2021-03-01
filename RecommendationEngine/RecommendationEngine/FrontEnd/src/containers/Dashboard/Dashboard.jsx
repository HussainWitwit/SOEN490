import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getWidgetMetrics } from '../../api/endpoints/DashboardEndpoints';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { convertWidgetResponse } from '../../utilities/ArrayManipulationUtilities';
import { formatNumber } from '../../utilities/GeneralUtilities';
import Grid from '@material-ui/core/Grid';

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

    const getValues = async () => {
        let response = await getWidgetMetrics();
        let detailedWidgets = convertWidgetResponse(response);
        setWidgetMetrics(detailedWidgets);
    }

    useEffect(() => {
        getValues();
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
        </div>
    )
}

export default Dashboard;