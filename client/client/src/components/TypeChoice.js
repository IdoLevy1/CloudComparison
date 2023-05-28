import React, { useState } from "react";

const TypeChoice = (props) => {
  const { selectedType, onTypeChange } = props;
  const types = ["2cpu-4GB", "4cpu-16GB", "8cpu-32GB"];

  //   const onOptionChange = (e) => {
  //     setType(e.target.value);
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
    <div className="typeChoice">
      <h3>Machine type:</h3>
      {types.map((type) => (
        <div key={type}>
          <label>
            <input
              type="checkbox"
              name="type"
              value={type}
              checked={selectedType === type}
              onChange={onTypeChange}
            />
            {type}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TypeChoice;
