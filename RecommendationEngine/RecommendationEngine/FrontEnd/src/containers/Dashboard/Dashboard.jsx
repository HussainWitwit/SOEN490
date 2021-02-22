import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";
import './Dashboard.css';

function Dashboard() {
    const [selectedDay, setSelectedDay] = useState(null);
    
    return (
        <div>
            <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                colorPrimary="#4dd3ef"
                customDaysClassName={[
                    { year: 2021, month: 2, day: 23, className: 'washDay' },
                ]}
                shouldHighlightWeekends
                />
        </div>
    )
}

export default Dashboard;