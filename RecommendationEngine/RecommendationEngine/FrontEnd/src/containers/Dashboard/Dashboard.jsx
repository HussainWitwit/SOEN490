import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";
import { Grid } from '@material-ui/core';
import './Dashboard.css';

function Dashboard() {
    const [selectedDay, setSelectedDay] = useState(null);

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
            <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                colorPrimary="#4dd3ef"
                calendarClassName="responsive-calendar"
                customDaysClassName={[
                    { year: 2021, month: 2, day: 23, className: 'washDay' },
                ]}
                shouldHighlightWeekends
            />
        </div>
    )
}

export default Dashboard;