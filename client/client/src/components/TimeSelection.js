import React, { useState } from "react";

const TimeSelection = ({ onSelectChange, onDateChange, isRealTime }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    onSelectChange(value);
  };

  const handleStartDateChange = (event) => {
    const value = event.target.value;
    const formattedStartDate = formatDateTime(value);
    setStartDate(formattedStartDate);
    onDateChange(formattedStartDate, endDate);
  };

  const handleEndDateChange = (event) => {
    const value = event.target.value;
    const formattedEndDate = formatDateTime(value);
    setEndDate(formattedEndDate);
    onDateChange(startDate, formattedEndDate);
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
        <option value="real-time">Real-time</option>
        <option value="history">History</option>
      </select>
      {isRealTime ? null : (
        <div className="date-picker-container">
          <label>Start Date:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label>End Date:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      )}
    </div>
  );
};

export default TimeSelection;
