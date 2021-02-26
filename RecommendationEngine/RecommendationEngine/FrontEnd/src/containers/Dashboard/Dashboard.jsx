import React, { useState } from 'react';
import { Calendar, Badge } from 'antd';
import { Grid } from '@material-ui/core';
import './Dashboard.css';

function Dashboard() {
    function getListData(value) {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'processing', content: '(3) Wash Day' },
            ];
            break;
          case 10:
            listData = [
              { type: 'processing', content: '(2) Wash Day' },
            ];
            break;
          case 15:
            listData = [
              { type: 'processing', content: '(3) Wash Day' },
            ];
            break;
          default:
        }
        return listData || [];
      }
      
      function dateCellRender(value) {
        const listData = getListData(value);
        return (
          <ul className="events">
            {listData.map(item => (
              <li key={item.content}>
                <Badge count={5}/>
              </li>
            ))}
          </ul>
        );
      }
      
      function getMonthData(value) {
        if (value.month() === 8) {
          return 1394;
        }
      }
      
      function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      }
      
    return (
        <div>
            <div>
                <br></br>
                <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
                    <Grid id="grid1" item>
                        <h3 id="title">Dashboard</h3>
                        <h6 id="subtitle">View a calendar with upcomming wash days</h6>
                    </Grid>
                </Grid>
                <br></br>
            </div>
            <Calendar dateCellRender={dateCellRender(new Moment('2021-02-25'))} monthCellRender={monthCellRender} />
        </div>
    )
}

export default Dashboard;