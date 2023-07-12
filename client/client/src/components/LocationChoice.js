import React, { useState } from "react";
import "../styles/LocationChoice.css";

const TypeChoice = (props) => {
  const { selectedLocation, onLocationChange } = props;
  const locations = ["Virginia", "UK", "Japan"];

  //   const onOptionChange = (e) => {
  //     setLocation(e.target.value);
  //   };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (!type) {
  //     alert("Please select a machine type");
  //     return;
  //   }
  //   const component = <GraphsInfo type={type} />;
  //   setCPUComponent(component);
  // };

  return (
    <div className="locationChoice">
      <h3>Machine location</h3>
      {locations.map((location) => (
        <div key={location}>
          <label>
            <input
              type="checkbox"
              name="type"
              value={location}
              checked={selectedLocation === location}
              onChange={onLocationChange}
            />
            {location}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TypeChoice;
