import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import { GetWidgetMetrics, GetCalendarDates, GetActionPerDay, GetActionPerCompoundId, GetHistogramYears, GetHistogramValues } from '../../api/endpoints/DashboardEndpoints';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { convertWidgetResponse, convertHistogramResponse } from '../../utilities/ArrayManipulationUtilities';
import { currencyCAD } from '../../utilities/GeneralUtilities';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { List, ListItem } from '@material-ui/core';
import { dateFormat } from '../../utilities/DateTimeUtilities';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { mapStateToProps as mapAssetFilterStateToProps } from '../../redux/AssetFilterReducer/reducer-actions';
import { connect } from 'react-redux';
import { Chart, Interval, Axis } from 'bizcharts';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

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

function ListOfActions ({ listActionValues, selectedDate }) {
  return (
    <Grid className="listOfActions">
      {listActionValues.length === 0 &&
        <div className="list">
          <h2 id="actions-unavailable">{selectedDate}<br />There are no actions associated to the selected date.</h2>
        </div>
      }
      {listActionValues.length > 0 &&
        <List className="list-actions" style={{ paddingTop: "0px" }}>
          <div className="action-maintitle">
            <h2 id="actions-available">Recommended Actions<br />{selectedDate}</h2>
          </div>
          {listActionValues && listActionValues.map((action, index) => (
            <ListItem key={index}>
              <div id='action-item-container'>
                <p id='action-title'>{action.assetName}</p>
                <p id='action-title'>{action.recommendationName}</p>
                <hr className="solid"></hr>
                <p id='action-date'>Net saving: {currencyCAD(action.netSaving)} $</p>
                <p id='action-date'>Return on investment: {currencyCAD(action.returnOnInvestment)}%</p>
                <div id='display-text-container'>
                  {action.displayText}
                </div>
                <p id='suggestion-date'>Suggested on {dateFormat(action.recommendedOnDate)}</p>
              </div>
            </ListItem>
          ))}
        </List>
      }
    </Grid>
  )
}

function Dashboard (props) {

  const [widgetMetrics, setWidgetMetrics] = useState([]);
  const [calendarValues, setCalendarValues] = useState([]);
  const [listActionValues, setListActionValues] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(Date.now()));
  const [histogramValues, setHistogramValues] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const calendarRef = useRef();

  function formatDate (date) {
    var d = new Date(date);
    return (d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, 0) + '-' + d.getDate().toString().padStart(2, 0));
  }

  const getCalendarEvents = (calendar) => {
    return calendar.map((element) => {
      return {
        date: element.date,
        title: element.nbOfActions + ' actions',
        id: element.id,
        color: element.status === 'Inactive' ? 'grey' : ''
      }
    })
  }
   /* istanbul ignore next */
  const handleEventClick = async (ev) => {
    var startDate = ev.event.startStr
    let actionsResponse = await GetActionPerCompoundId(ev.event.id)
    setListActionValues(actionsResponse);
    setSelectedDate(startDate);
    calendarRef.current.getApi().select(startDate)
  }
   /* istanbul ignore next */
  const handleDateClick = async (ev) => {
    if (ev.jsEvent) {
      var startDate = ev.startStr
      let actionsResponse = [];
      if (calendarValues.some((el) => el.date === ev.startStr))
        actionsResponse = await GetActionPerDay(startDate)
      setListActionValues(actionsResponse);
      setSelectedDate(startDate);
    }
  }
   /* istanbul ignore next */
  const handleClickHistogram = (month) => {
    let year = new Date().getFullYear() - 1;
    let date = month.toString() + '-01-' + year.toString();
    setSelectedDate(formatDate(date));
    calendarRef.current.getApi().gotoDate(formatDate(date));
  }

  /* istanbul ignore next */
  useEffect(() => {
    async function getHistogram () {
      let histogramYears = await GetHistogramYears(props.selectedAsset);
      setYearList(histogramYears);
      setYear(histogramYears[histogramYears.length - 1])
      let histogramResponse = await GetHistogramValues(props.selectedAsset, year);
      setHistogramValues(convertHistogramResponse(histogramResponse));
    }
    getHistogram();
  }, [year, props.selectedAsset])

  /* istanbul ignore next */
  useEffect(() => {
    async function getDashboardValues () {
      setLoading(true);

      let widgetResponse = await GetWidgetMetrics(props.selectedAsset);
      let detailedWidgets = convertWidgetResponse(widgetResponse);
      setWidgetMetrics(detailedWidgets);

      let calendarResponse = await GetCalendarDates(props.selectedAsset);
      let calendar = calendarResponse.map((element) => {
        return {
          date: formatDate(element.date),
          nbOfActions: element.nbOfActions,
          id: element.id,
          status: element.status
        };
      })
      setCalendarValues(getCalendarEvents(calendar));

      var dt = new Date();
      let actionsResponse = await GetActionPerDay(dt.toISOString())
      setListActionValues(actionsResponse);

      setLoading(false);
    }
    getDashboardValues();
  }, [props.selectedAsset])

  return (
    <div className="dashboard-container">
      <div>
        <Dialog
          open={loading}
          onClose={()=> setLoading(false)}
          disableBackdropClick={false}
          BackdropProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}
        >
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        </Dialog>

        <br></br>
        <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
          <Grid id="grid1" item>
            <h3 id="title">Dashboard</h3>
            <h6 id="subtitle">View a summary of past and potential future recommendations and their metrics</h6>
          </Grid>
        </Grid>
        <br></br>
      </div>
      <div id='widget-container'>
        <div id='histogram'>
          <div id='year-dropdown'>
            <FormControl variant="outlined" >
              <InputLabel>Year</InputLabel>
              <Select
                disabled={!yearList.length}
                value={year}
                onChange={(event) => setYear(event.target.value)}
                label="Year"
              >
                {yearList?.map((year, index) => (
                  <MenuItem key={index} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Chart
            height={300}
            width={520}
            data={histogramValues}
            onIntervalClick={(e) => { handleClickHistogram(e.data.data.month) }}
            scale={{ total: { alias: 'Net Saving ($)' } }}
            interactions={['element-single-selected']}
          >
            <Axis name="total" label={{ formatter: val => `${Number(val).toLocaleString()}` }} title />
            <Interval position="monthName*total" />
          </Chart>
        </div>
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
                <div id='money-value'>{currencyCAD(widget.value)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='rows'>
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            selectable={true}
            initialView='dayGridMonth'
            eventClick={(ev) => handleEventClick(ev)}
            select={(ev) => handleDateClick(ev)}
            events={calendarValues}
            handleWindowResize={true}
            ref={calendarRef}
          />
        </div>
        <ListOfActions listActionValues={listActionValues} selectedDate={selectedDate} />
      </div>
    </div>
  )
}

export default connect(mapAssetFilterStateToProps)(Dashboard);

/* istanbul ignore next */
Dashboard.propTypes = {
  selectedAsset: PropTypes.string.isRequired,
};