import React, { useState, useEffect } from 'react';
import './ManageRecommendationDrawer.css';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { stringRecurrenceFormatting } from '../../utilities/DateTimeUtilities';
import { mapTemplateStateToProps, mapDispatchToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { connect } from 'react-redux';
import ForceRunPopUp from '../ForceRunPopUp/ForceRunPopUp';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
import { dateFormat } from '../../utilities/DateTimeUtilities';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';
import NotificationHub from '../../api/notification-hub/NotificationHub';
import PropTypes from 'prop-types';

export function ManageRecommendationDrawer ({
  configuredRecommendation, toggleDialog, setEditableConfiguredRecommendation, templateType, openScheduleDrilldown
}) {
  const [openForceRunPopUp, setOpenForceRunPopUp] = useState(false);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openJobLogPopup, setOpenJobLogPopup] = useState(false);
  const [jobLogId, setJobLogId] = useState(null);
  const notificationHub = NotificationHub.getHubConnection();

  useEffect(() => {
    const handleNotification = (notification) =>{
      if (configuredRecommendation.id === notification.scheduleId){
        updatePanel(configuredRecommendation.id)
      }
    }
    notificationHub.on('ReceiveNotification', handleNotification);
    return function cleanup() {
      notificationHub.off('ReceiveNotification', handleNotification);
    };
  }, [notificationHub.on('ReceiveNotification'), configuredRecommendation]);

  // Animation style
  const props = useSpring({
    opacity: 1,
    transform: 'translate3d(0px,0,0)',
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
  });

  const updatePanel = (id) => {
    openScheduleDrilldown(id)
  }

  const handleOpenLogPopup = () => {
    setOpenJobLogPopup(!openJobLogPopup)
  }

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
                  return <div className="asset-values" key={index}>{asset.displayText}{configuredRecommendation.assetList != null && configuredRecommendation.assetList.length === index + 1 ? '' : ', '}</div>
                })}
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className="parameter-tile">
              <p className="value-title">Parameters</p>
              <p className="value-title">Value</p>
            </div>
            <div className="values-param">{configuredRecommendation.parameters != null && configuredRecommendation.parameters.length ?
              (configuredRecommendation.parameters.map((parameter, index) => {
                return <div className="parameter-tile" key={index}><div>{parameter.displayText}</div><div>{parameter.parameterType === 'DATE' ? dateFormat(parameter.parameterValue) : parameter.parameterValue}</div></div>;
              })) : 'N/A'}</div>
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
                configuredRecommendation.lastJobs.map((value, index) => (
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
                    key={index}
                  >
                    <div
                      className={value !== null ? value.status : "Empty"}
                      onClick={() => {
                        if (value !== null) {
                          setJobLogId(value.id);
                          setOpenJobLogPopup(true)
                        }
                      }}>
                    </div>
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
              <Button variant="outlined" onClick={() => { toggleDialog(); setEditableConfiguredRecommendation(configuredRecommendation, templateType); }}>Edit</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="force-run-button">
              <Button variant="outlined" id="forceRunRecButton" onClick={handleForceRunPopUpOpen}>Force run</Button>
              <ForceRunPopUp title={configuredRecommendation.name} handleForceRunPopUpOpen={handleForceRunPopUpOpen} open={openForceRunPopUp} recommendationId={configuredRecommendation.id} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="delete-button">
              <Button variant="outlined" id="deleteRecButton" onClick={handleDeletePopUpOpen}>Delete</Button>
              <DeletePopUp title={configuredRecommendation.name} handleDeletePopUpOpen={handleDeletePopUpOpen} open={openDeletePopUp} recommendationId={configuredRecommendation.id} />
            </div>
          </Grid>
          {openJobLogPopup &&
            <JobLogPopUp className={"job-log-style"} jobId={jobLogId} controlled={openJobLogPopup} handleOpenLogPopup={handleOpenLogPopup}></JobLogPopUp>
          }
        </Grid>
      </div>
    </animated.div>
  );
}

export default connect(mapTemplateStateToProps, mapDispatchToProps)(ManageRecommendationDrawer);

/* istanbul ignore next */
ManageRecommendationDrawer.propTypes = {
  configuredRecommendation: PropTypes.string.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  setEditableConfiguredRecommendation: PropTypes.func.isRequired,
  templateType: PropTypes.string.isRequired,
};