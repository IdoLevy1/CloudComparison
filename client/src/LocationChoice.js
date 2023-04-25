import React, { useState } from "react";
import "./LocationChoice.css";
import GraphsInfo from "./GraphsInfo";

const ProviderChoice = () => {
  const [location, setLocation] = useState();
  const [locationComponent, setLocationComponent] = useState(null);

  const onOptionChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const component = <GraphsInfo location={location} />;
    setLocationComponent(component);
  };

  return (
    <div className="locationChoice">
      <form onSubmit={handleSubmit}>
        <h3>Select machine location</h3>
        <label>
          <input
            type="radio"
            name="location"
            value="USA"
            checked={location === "USA"}
            onChange={onOptionChange}
          />
          USA
        </label>
        <label>
          <input
            type="radio"
            name="location"
            value="europe"
            checked={location === "europe"}
            onChange={onOptionChange}
          />
          Europe
        </label>
        <label>
          <input
            type="radio"
            name="location"
            value="asia"
            checked={location === "asia"}
            onChange={onOptionChange}
          />
          Asia
        </label>
        <button type="submit">Choose Type</button>
      </form>
      {locationComponent}
    </div>
  );
};

export default ProviderChoice;
