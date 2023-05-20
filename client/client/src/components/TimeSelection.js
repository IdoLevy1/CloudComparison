import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/TimeSelection.css";

const TimeSelection = ({ onSelectChange, onDateChange, isRealTime }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    onSelectChange(value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date) {
      onDateChange(date, endDate);
    }
    console.log(startDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date) {
      onDateChange(startDate, date);
    }
    console.log(endDate);
  };

  const handleSubmit = () => {
    console.log(startDate);
    console.log(endDate);
    if (startDate && endDate) {
      onDateChange(startDate, endDate);
    }
  };

  const formatDateTime = (dateTime) => {
    const selectedDate = new Date(dateTime);
    const year = selectedDate.getUTCFullYear();
    const month = padZero(selectedDate.getUTCMonth() + 1);
    const day = padZero(selectedDate.getUTCDate());
    const hours = padZero(selectedDate.getUTCHours());
    const minutes = padZero(selectedDate.getUTCMinutes());
    const seconds = padZero(selectedDate.getUTCSeconds());
    const milliseconds = padZero(selectedDate.getUTCMilliseconds(), 3);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
  };

  const padZero = (value, length = 2) => {
    return String(value).padStart(length, "0");
  };

  return (
    <div className="selection-container">
      <select onChange={handleSelectChange} className="selection">
        <option value="history">History</option>
        <option value="real-time">Real-time</option>
      </select>
      {isRealTime ? null : (
        <div className="date-picker-container">
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={new Date(2023, 4, 15)} // May is month 4 (zero-based)
            maxDate={new Date(2023, 5, 30)} // June is month 5 (zero-based)
            className="date-picker"
          />
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={new Date(2023, 4, 15)} // May is month 4 (zero-based)
            maxDate={new Date(2023, 5, 30)} // June is month 5 (zero-based)
            className="date-picker"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default TimeSelection;
