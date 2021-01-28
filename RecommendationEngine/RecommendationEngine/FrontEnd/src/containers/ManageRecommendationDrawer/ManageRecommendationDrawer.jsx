import React from 'react';
import './ManageRecommendationDrawer.css';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { stringRecurrenceFormatting } from '../../utilities/DateTimeUtilities';
import { mapDispatchToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { connect } from 'react-redux';
import ConfirmationPopUp from '../../components/ConfirmationPopUp/ConfirmationPopUp';

export function ManageRecommendationDrawer({
  configuredRecommendation, toggleDialog, setEditableConfiguredRecommendation
}) {
  const [openForceRunPopUp, setOpenForceRunPopUp] = React.useState(false);
  const [openDeletePopUp, setOpenDeletePopUp] = React.useState(false);

  // Animation style
  const props = useSpring({
    opacity: 1,
    transform: 'translate3d(0px,0,0)',
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
  });

  const handleForceRunPopUpOpen = () => {
    setOpenForceRunPopUp(!openForceRunPopUp);
  };

  const handleDeletePopUpOpen = () => {
    setOpenDeletePopUp(!openDeletePopUp);
  };

  const formatDateTime = (date) => {
    let timeStamp = new Date(date);
    return timeStamp.toLocaleString();
  }

  return (
    <animated.div style={props}>
      <div className="drawer-content">
        <Grid container>
          <Grid item xs={12}>
            <p className="drawer-title">{configuredRecommendation.name}</p>
            <p className="drawer-subtitle">Description</p>
            <div className="drawer-description">
              {configuredRecommendation.description ? configuredRecommendation.description : 'N/A'}
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
                  return <div className="asset-values">{asset.displayText}{configuredRecommendation.assetList != null && configuredRecommendation.assetList.length === index + 1 ? '' : ', '}</div>
                })}
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className="inputs">
              <p className="value-title">Parameters</p>
              <div className="values">{configuredRecommendation.parameters != null && configuredRecommendation.parameters.length ?
                (configuredRecommendation.parameters.map((parameter, key) => {
                  return parameter.parameterName;
                })) : 'N/A'}</div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="outputs">
              <p className="value-title">Value</p>
              <div className="values">{configuredRecommendation.parameters && configuredRecommendation.parameters.length ?
                (configuredRecommendation.parameters.map((parameter, key) => {
                  return parameter.value;
                })) : 'N/A'}</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="assets">
              <p className="value-title">Preferred Scenario</p>
              <p className="values">
                {configuredRecommendation.preferredScenario === 'ROI' ? 'Return On Investment' : 'Net Saving'}
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
                configuredRecommendation.lastJobs.map((value, key) => (
                  <Tooltip
                    id='execution-bar'
                    classes={{
                      tooltip: 'execution-bar-tooltip',
                      popper: 'execution-bar-popper'
                    }}
                    placement='top'
                    arrow={true}
                    title={value !== null ?
                      <div>
                        <div className='tooltip-status-style'>Status: <div className={'style-' + value.status}>{value.status}</div></div>
                        <div>Date: {formatDateTime(value.timestamp)}</div>
                      </div>
                      : "No status Avalaible"}
                  >
                    <div className={value !== null ? value.status : "Empty"}></div>
                  </Tooltip>
                ))}
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
              <Button variant="outlined" onClick={() => { toggleDialog(); setEditableConfiguredRecommendation(configuredRecommendation, configuredRecommendation.id); }}>Edit</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="force-run-button">
              <Button variant="outlined" onClick={handleForceRunPopUpOpen}>Force run</Button>
              <ConfirmationPopUp type={"Force Run"} title={configuredRecommendation.name} handleForceRunPopUpOpen={handleForceRunPopUpOpen} open={openForceRunPopUp} recommendationId={configuredRecommendation.id} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="delete-button">
              <Button variant="outlined" id="deleteRecButton" onClick={handleDeletePopUpOpen}>Delete</Button>
              <ConfirmationPopUp type={"Delete"} title={configuredRecommendation.name} handleDeletePopUpOpen={handleDeletePopUpOpen} open={openDeletePopUp} recommendationId={configuredRecommendation.id} />
            </div>
          </Grid>
        </Grid>
      </div>
    </animated.div>
  );
}
export default connect(null, mapDispatchToProps)(ManageRecommendationDrawer)