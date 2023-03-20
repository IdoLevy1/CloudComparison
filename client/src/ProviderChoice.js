import React, { useState } from "react";
import "./ProviderChoice.css";

const ProviderChoice = () => {
  const [provider, setProvider] = useState();

  // const handleChange = () => {
  //   setValue(!value);
  // };

  return (
    <div className="Selection">
      <h3>Select cloud provider (you may choose more than one)</h3>
      <label>
        <input
          type="radio"
          name="provider"
          value="Azure"
          onChange={(e) => setProvider(e.target.value)}
        />
        Microsoft Azure
      </label>
      <label>
        <input
          type="radio"
          name="provider"
          value="AWS"
          onChange={(e) => setProvider(e.target.value)}
        />
        Amazon AWS
      </label>
      <label>
        <input
          type="radio"
          name="provider"
          value="Google"
          onChange={(e) => setProvider(e.target.value)}
        />
        Google cloud
      </label>
    </div>
  );
};

export default ProviderChoice;
