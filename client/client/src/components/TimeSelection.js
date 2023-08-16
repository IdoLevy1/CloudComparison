import React, { useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/TimeSelection.css";

const TimeSelection = ({ onSelectChange, onDateChange, isRealTime, isCustom }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedValue, setSelectedValue] = useState('real-time');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelectChange(value);
    if(value ==='Last-Week') {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime()  - 7 * 24 * 60 * 60 * 1000);
      onDateChange(oneWeekAgo, now);
    }
    else if(value ==='Last-Month') {
      const now = new Date();
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      onDateChange(oneMonthAgo, now);
      }
  };
  const handleDateChange = (date, type) =>{

      if(type === 'start'){
        setStartDate(date)
      }
      else if(type === 'end'){
        setEndDate(date);
      }

      if(startDate && endDate && endDate > startDate)
        setIsButtonDisabled(false);

  }

  return (
    <div className="selection-container">
      <Select
        sx={{
          width: 150,
          height: 50,
          backgroundColor: "#e1e3e3",
          borderRadius: "8px",
          borderColor: "GrayText",
          fontSize: "18px",
          fontFamily: "Tahoma, Verdana, Segoe, sans-serif",
        }}
        value={selectedValue}
        onChange={handleSelectChange}
        className="selectState"
      >
        <MenuItem value="real-time">Real-time</MenuItem>
        <MenuItem value="Last-Week">Last Week</MenuItem>
        <MenuItem value="Last-Month">Last Month</MenuItem>
        <MenuItem value="Custom">Custom</MenuItem>
      </Select>
      {!isRealTime && isCustom && (
        <div className="date-picker-container">
          <div className="date-picker-wrapper">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => handleDateChange(date,'start')}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="yyyy-MM-dd HH:mm"
              minDate={new Date(2023, 4, 15)}
              maxDate={new Date(2023, 6, 30)}
              className="date-picker"
            />
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleDateChange(date,'end')}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="yyyy-MM-dd HH:mm"
              minDate={new Date(2023, 4, 15)}
              maxDate={new Date(2023, 6, 30)}
              className="date-picker"
            />
          </div>
          <Button onClick={()=>onDateChange(startDate, endDate)} disabled={isButtonDisabled}>Submit</Button>
        </div>
      )}
    </div>
  );
};

export default TimeSelection;
