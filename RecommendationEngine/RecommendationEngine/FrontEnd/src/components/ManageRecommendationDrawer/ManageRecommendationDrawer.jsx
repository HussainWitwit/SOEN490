import React from 'react';
import './ManageRecommendationDrawer.css';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

//Extracting props instead of calling props everytime. Might be less readable. However, dev experience is amazing. A.J.U.U
export default function ManageRecommendationDrawer({
  configuredRecommendation,
}) {
  // Animation style
  const props = useSpring({
    opacity: 1,
    transform: 'translate3d(0px,0,0)',
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
  });

  var formatYear = { month: 'long', day: 'numeric' };
  var formatMonth = { day: 'numeric' };
  var formatTime = { hour: 'numeric', minute: '2-digit', hour12: true };
  var dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const stringRecurrenceFormatting = (granularity, dateInput, repeatDay) => {
    let date = new Date(dateInput);
    switch (granularity) {
      case 'Yearly':
        return `Every year on ${
          date.toLocaleTimeString('en-us', formatYear).split(',')[0]
        } at ${date.toLocaleTimeString('en-us', formatTime)}`;
      case 'Monthly':
        return `Every ${
          date.toLocaleTimeString('en-us', formatMonth).split(',')[0]
        }th of the month at ${date.toLocaleTimeString('en-us', formatTime)}`;
      case 'Weekly':
        return `Every ${dayOfWeek[repeatDay - 1]} at ${date.toLocaleTimeString(
          'en-us',
          formatTime
        )}`;
      default:
        return 'Invalid';
    }
  };

  return (
    <animated.div style={props}>
      <div className="drawer-content">
        <Grid container>
          <Grid item xs={12}>
            <p className="drawer-title">{configuredRecommendation.name}</p>
            <p className="drawer-subtitle">Description</p>
            <div className="drawer-description">
              {configuredRecommendation.description}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="recommendationType">
              <p className="value-title">Type</p>
              <p className="values">{configuredRecommendation.type}</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="assets">
              <p className="value-title">Assets</p>
              {configuredRecommendation.assetList &&
                configuredRecommendation.assetList.map((asset, index) => {
                  if (configuredRecommendation.assetList.length === index + 1) {
                    return (
                      <div className="asset-values">{asset.displayText} </div>
                    );
                  } else {
                    return (
                      <div className="asset-values">{asset.displayText}, </div>
                    );
                  }
                })}
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className="inputs">
              <p className="value-title">Parameters</p>
              {configuredRecommendation.parameters &&
                configuredRecommendation.parameters.map((parameter) => {
                  return (
                    <div className="values">{parameter.parameterName}</div>
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="outputs">
              <p className="value-title">Value</p>
              {configuredRecommendation.parameters &&
                configuredRecommendation.parameters.map((parameter) => {
                  return (
                    <div className="values">{parameter.parameterValue}</div>
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="assets">
              <p className="value-title">Preferred Scenario</p>
              <p className="values">
                {configuredRecommendation.preferredScenario}
              </p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="assets">
              <p className="value-title">Schedule</p>
              <p className="values">
                {configuredRecommendation.granularity &&
                  configuredRecommendation.recurrenceDayOfWeek &&
                  configuredRecommendation.recurrenceDatetime &&
                  stringRecurrenceFormatting(configuredRecommendation.granularity, configuredRecommendation.recurrenceDatetime, configuredRecommendation.recurrenceDayOfWeek)}
              </p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className="value-title">Last Five Executions</p>
            <div className="last-five-status">
              {configuredRecommendation.lastJobs &&
                configuredRecommendation.lastJobs.map((value) => {
                  return value == null ? (
                    <Tooltip title="No status available">
                      <div className="Empty"></div>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <span>
                          <p>Id: {value.id}</p>
                          <p>Status: {value.status}</p>
                          <p>Date: {value.timestamp}</p>
                        </span>
                      }
                    >
                      <div className={value.status}></div>
                    </Tooltip>
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className="value-title">Last Execution Status</p>
            {configuredRecommendation.lastJobs &&
            configuredRecommendation.lastJobs[4] ? (
              <div
                className={
                  'execution-status-' +
                  (configuredRecommendation.lastJobs &&
                    configuredRecommendation.lastJobs[4] &&
                    configuredRecommendation.lastJobs[4].status)
                }
              >
                <Chip
                  label={
                    configuredRecommendation.lastJobs &&
                    configuredRecommendation.lastJobs[4] &&
                    configuredRecommendation.lastJobs[4].status.toUpperCase()
                  }
                />
              </div>
            ) : (
              <div className={'execution-status-Empty'}>
                <Chip label="NO STATUS" />
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <div className="created-edited-by">
              <p className="edited-by">Last edited by: </p>
              <p className="created-edited-by-name">
                {configuredRecommendation.createdBy}
              </p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="edit-recommendation-button">
              <Button variant="outlined">Edit a Recommendation</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="force-run-button">
              <Button variant="outlined">Force run</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="delete-button">
              <Button variant="outlined">Delete</Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </animated.div>
  );
}
