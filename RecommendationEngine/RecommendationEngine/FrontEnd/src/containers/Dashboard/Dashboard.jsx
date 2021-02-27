import React from 'react';
import './Dashboard.css';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined'; import Tooltip from '@material-ui/core/Tooltip';

function Dashboard () {

  return (
    <div>
      <h1>Dashboard</h1>
      <div id='widget-container'>
        <div id='net-savings-widget'>
          <div id='tooltip-container'>
            <Tooltip title="info">
              <HelpOutlineOutlinedIcon size={20} />
            </Tooltip>
          </div>
          <div id='title-container'>Potential Net Savings</div>
          <div>
            <div id='widget-contents'>
              <div id='sign'>$</div>
              <div id='money-value'>638734</div>
            </div>
          </div>
        </div>
        <div id='roi-widget'>
          <div id='tooltip-container'>
            <Tooltip title="info">
              <HelpOutlineOutlinedIcon size={20} />
            </Tooltip>
          </div>
          <div id='title-container'>Potential ROI</div>
          <div>
            <div id='widget-contents'>
              <div id='sign'>%</div>
              <div id='money-value'>157</div>
            </div>
          </div>
        </div>
        <div id='inaction-widget'><div id='tooltip-container'>
          <Tooltip title="info">
            <HelpOutlineOutlinedIcon size={20} />
          </Tooltip>
        </div>
          <div id='title-container'>Potential Losses</div>
          <div>
            <div id='widget-contents'>
              <div id='sign'>$</div>
              <div id='money-value'>5682</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;