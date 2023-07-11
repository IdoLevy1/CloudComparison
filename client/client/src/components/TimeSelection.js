import React, { useState } from "react";
import { Select, MenuItem, Button, InputLabel } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/TimeSelection.css";

const TimeSelection = ({ onSelectChange, onDateChange, isRealTime }) => {
  const [startDate, setStartDate] = useState("");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    onSelectChange(value);
  };

  const handleSubmit = () => {
    console.log(startDate);
    if (startDate) {
      onDateChange(startDate);
    }
  };

  return (
    <div className="selection-container">
      <Select
        sx={{
          width: 150,
          height: 50,
          backgroundColor: "#d5d6de",
          borderRadius: "8px",
        }}
        value={isRealTime ? "real-time" : "history"}
        onChange={handleSelectChange}
        className="selectState"
      >
        <MenuItem value="real-time">Real-time</MenuItem>
        <MenuItem value="history">History</MenuItem>
      </Select>
      {!isRealTime && (
        <div className="date-picker-container">
          <div className="date-picker-wrapper">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="yyyy-MM-dd HH:mm"
              minDate={new Date(2023, 4, 15)}
              maxDate={new Date(2023, 5, 30)}
              className="date-picker"
            />
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
    </div>
  );
};

export default TimeSelection;
