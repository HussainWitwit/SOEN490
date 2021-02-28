import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getWidgetValues } from '../../api/endpoints/DashboardEndpoints';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { convertWidgetResponse } from '../../utilities/ArrayManipulationUtilities';

export const setClassName = (title) => {
  let id;
  if (title === 'Potential Net Savings') {
    id = 'net-savings-widget'
  }
  else if (title === 'Potential ROI') {
    id = 'roi-widget'
  }
  else {
    id = 'inaction-widget'
  }
  return id;
}

function Dashboard () {
  const [widgetValues, setWidgetValues] = useState([]);

  const getValues = async () => {
    let response = await getWidgetValues();
    let detailedWidgets = convertWidgetResponse(response);
    setWidgetValues(detailedWidgets);
  }

  useEffect(() => {
    getValues();
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <div id='widget-container'>
        {widgetValues?.map((widget, index) => (
          <div key={index} id={setClassName(widget.title)}>
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