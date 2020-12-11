import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ManageRecommendationDrawer.css';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
// import {getConfiguredRecommendationById} from '../../api/get/ConfiguredRecommendationEndpoints'


ManageRecommendationDrawer.propType = {
  isDrawerOpen: PropTypes.bool.isRequired,
  isInternalClosed: PropTypes.bool.isRequired,
  isDrawerPinned: PropTypes.bool.isRequired
}


//Extracting props instead of calling props everytime. Might be less readable. However, dev experience is amazing. A.J.U.U
export default function ManageRecommendationDrawer({ isDrawerOpen, isInternalClosed, isDrawerPinned, selectedScheduleId }) {

  const [isOpen, setIsOpen] = useState(isDrawerOpen === undefined ? false : isDrawerOpen);
  const [isPinClicked, setIsPinClicked] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  // const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   let response = await getConfiguredRecommendationById(selectedScheduleId);
  //   setData(response);
  // }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    isInternalClosed(open);
    setIsOpen(open);
  };

  const pinDrawerEvent = () => {
    setIsPinClicked(!isPinClicked);
    isDrawerPinned(!isPinClicked)
  }

  const editRecommendation = () => {
    console.log("Edit a recommendation")
  }


  useEffect(() => {
    // fetchData();
    setIsOpen(isDrawerOpen);
  }, [isDrawerOpen])

  return (
    <div>
      <div className='drawer-content'>
        <Grid container>
          <Grid item xs={12}>
            <p className='drawer-title'>Title</p>
            <p className='drawer-subtitle'>Description</p>
            <div className='drawer-description'>This is the description</div>
          </Grid>
          <Grid item xs={12}>
            <div className='assets'>
              <p className='value-title'>Assets</p>
              <p className='values'>Asset1, Asset2, Asset3, Asset4</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='inputs'>
              <p className='value-title'>Parameters</p>
              <p className='values'>Param1</p>
              <p className='values'>Param1</p>
              <p className='values'>Param1</p>
              <p className='values'>Param1</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='outputs'>
              <p className='value-title'>Value</p>
              <p className='values'>122</p>
              <p className='values'>122</p>
              <p className='values'>122</p>
              <p className='values'>122</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='assets'>
              <p className='value-title'>Schedule</p>
              <p className='values'>Yearly, every Monday 3pm</p>
            </div>
          </Grid>
          <p className='value-title'>Last Five Execution</p>
          <div className='last-five-status'>
            <div className='oval'></div>
            <div className='oval'></div>
            <div className='oval'></div>
            <div className='oval'></div>
            <div className='oval'></div>
          </div>
          <Grid item xs={12}>
            <p className='value-title'>Last Execution Status</p>
            <div className='execution-status'>
              <Chip label="RUNNING" />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='created-edited-by'>
              <p className='edited-by'>Last edited by: </p>
              <p className='created-edited-by-name'>Alain</p>
            </div>
          </Grid>
          {/* <p className='edit-recommendation' onClick={editRecommendation}>Edit recommendation</p> */}
          <Grid item xs={12}>
            <div className='edit-recommendation-button'>
              <Button variant="outlined">Edit a Recommendation</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='force-run-button'>
              <Button variant="outlined">Force run</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='delete-button'>
              <Button variant="outlined">Delete</Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
