import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";

function Dashboard() {
    const [selectedDay, setSelectedDay] = useState(null);

    return (
        <div>
            <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                shouldHighlightWeekends
                colorPrimary="#4dd3ef"
            />
        </div>
    )
}

export default Dashboard;