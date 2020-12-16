import React from 'react';
import './ManageRecommendationDrawer.css';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { stringRecurrenceFormatting } from '../../utilities/ConfiguredRecommendationUtilities';

export default function ManageRecommendationDrawer({
  configuredRecommendation,
}) {
  // Animation style
  const props = useSpring({
    opacity: 1,
    transform: 'translate3d(0px,0,0)',
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
  });

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
                  return <div className="asset-values">{asset.displayText}{configuredRecommendation.assetList.length === index + 1 ? '' : ','}</div>
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
                  stringRecurrenceFormatting(
                    configuredRecommendation.granularity,
                    configuredRecommendation.recurrenceDatetime,
                    configuredRecommendation.recurrenceDayOfWeek
                  )}
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
                        id = 'execution-bar'
                        classes = {{
                          tooltip: 'execution-bar-tooltip',
                          popper: 'execution-bar-popper'
                        }}
                        arrow = {true}
                        title={
                          <div>
                            {/* <div>Id: {value.id}</div> */}
                            <div className = 'tooltip-status-style'>Status: <div className = {'style-'+value.status}>{value.status}</div></div>
                                <div>Date: {value.timestamp}</div>
                                {value.timestamp}
                          </div>
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
                  configuredRecommendation.lastJobs[4].status
                }
              >
                <Chip
                  label={configuredRecommendation.lastJobs[4].status.toUpperCase()}
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
