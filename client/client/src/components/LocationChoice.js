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
<<<<<<< HEAD
      <h3>Machine location</h3>
=======
      <h3>Machine location:</h3>
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
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
