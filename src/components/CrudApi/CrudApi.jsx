import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "../CrudApi/Crud.modules.css";

export const CalendarComponent = () => {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "Event 1", date: "2024-07-01" },
          { title: "Event 2", date: "2024-07-02" },
        ]}
      />
    </div>
  );
};

export default CalendarComponent;
