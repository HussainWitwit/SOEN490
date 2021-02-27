import React from 'react';
import './Dashboard.css';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';

function Dashboard () {

  const widgetContents = [
    {
      id: 'net-savings-widget',
      title: 'Potential Net Savings',
      tooltipDescription: 'Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.',
      sign: '$',
      value: '638734'
    },
    {
      id: 'roi-widget',
      title: 'Potential ROI',
      tooltipDescription: 'Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.',
      sign: '%',
      value: '167'
    },
    {
      id: 'inaction-widget',
      title: 'Potential Losses',
      tooltipDescription: 'Aliquam eget finibus ante, non facilisis lectus.Sed vitae dignissim est, vel aliquam tellus.',
      sign: '$',
      value: '6484.5'
    },
  ]

  const setClassName = (title) => {
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

  return (
    <div>
      <h1>Dashboard</h1>
      <div id='widget-container'>
        {widgetContents.map((widget, index) => (
          <div key={index} id={setClassName(widget.title)}>
            <div id='tooltip-container'>
              <Tooltip title={widget.tooltipDescription}>
                <HelpOutlineOutlinedIcon size={1} />
              </Tooltip>
            </div>
            <div id='title-container'>{widget.title}</div>
            <div>
              <div id='widget-contents'>
                <div id='sign'>{widget.sign}</div>
                <div id='money-value'>{widget.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;