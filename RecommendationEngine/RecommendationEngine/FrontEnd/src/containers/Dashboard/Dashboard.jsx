import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getWidgetMetrics } from '../../api/endpoints/DashboardEndpoints';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { convertWidgetResponse } from '../../utilities/ArrayManipulationUtilities';

export const pickStylingId = (title) => {
  let id;
  if (title === 'Potential Net Savings') {
    id = 'net-savings-widget'
  }
  else if (title === 'Average ROI') {
    id = 'roi-widget'
  }
  else {
    id = 'inaction-widget'
  }
  return id;
}

function Dashboard () {
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
      <h1>Dashboard</h1>
      <div id='widget-container'>
        {widgetMetrics?.map((widget, index) => (
          <div key={index} id={pickStylingId(widget.title)}>
            <div id='tooltip-container'>
              <Tooltip title={widget.description}>
                <HelpOutlineOutlinedIcon size={1} />
              </Tooltip>
            </div>
            <div id='title-container'>{widget.title}</div>
            <div>
              <div id='widget-contents'>
                <div id='sign'>{widget.sign}</div>
                <div id='money-value'>{widget.value.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;