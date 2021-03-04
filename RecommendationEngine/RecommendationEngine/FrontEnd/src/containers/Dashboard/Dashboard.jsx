import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getWidgetMetrics } from '../../api/endpoints/DashboardEndpoints';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { convertWidgetResponse } from '../../utilities/ArrayManipulationUtilities';
import { formatNumber } from '../../utilities/GeneralUtilities';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


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
  const [loading, setLoading] = useState(false);

  const startLoadingSpinner = () => {
    setLoading(true);
  }

  const stopLoadingSpinner = () => {
    setLoading(false);
  }

  const getValues = async () => {
    startLoadingSpinner();
    let response = await getWidgetMetrics();
    let detailedWidgets = convertWidgetResponse(response);
    setWidgetMetrics(detailedWidgets);
    stopLoadingSpinner();
  }

  useEffect(() => {
    getValues();
  }, [])

  return (

    <div>
      <div id='dashboard-container'>
        <h1>Dashboard</h1>
        <Dialog
          open={loading}
          onClose={stopLoadingSpinner}
        >
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        </Dialog>
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
    </div>
  )
}

export default Dashboard;