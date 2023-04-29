import React, { useState } from "react";
import "./TypeChoice.css";
import GraphsInfo from "./GraphsInfo";

const TypeChoice = () => {
  const [type, setType] = useState("");
  const [CPUComponent, setCPUComponent] = useState(null);

  const onOptionChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const component = <GraphsInfo type={type} />;
    setCPUComponent(component);
  };

  return (
    <div className="typeChoice">
      <form onSubmit={handleSubmit}>
        <h3>Select machine type</h3>
        <label>
          <input
            type="radio"
            name="type"
            value="64GB-12CPU"
            checked={type === "64GB-12CPU"}
            onChange={onOptionChange}
          />
          64GB, 12CPU
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="32GB-1CPU"
            checked={type === "32GB-1CPU"}
            onChange={onOptionChange}
          />
          32GB, 1CPU
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="128GB-4CPU"
            checked={type === "128GB-4CPU"}
            onChange={onOptionChange}
          />
          128GB, 4CPU
        </label>
        <button type="submit">Choose Type</button>
      </form>
      {CPUComponent}
    </div>
  );
};

export default TypeChoice;
