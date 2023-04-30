import React, { useState } from "react";
import "./SupplierChoice.css";
import GraphsInfo from "./GraphsInfo";

const SupplierChoice = () => {
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [supplierComponent, setSupplierComponent] = useState(null);

  const handleCheckboxChange = (e) => {
    const supplier = e.target.value;
    if (e.target.checked) {
      setSelectedSuppliers([...selectedSuppliers, supplier]);
    } else {
      setSelectedSuppliers(selectedSuppliers.filter((s) => s !== supplier));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const component = <GraphsInfo supplier={selectedSuppliers} />;
    setSupplierComponent(component);
  };

  return (
    <div className="SupplierChoice">
      <form onSubmit={handleSubmit}>
        <h3>Select cloud suppliers</h3>
        <label>
          <input
            type="checkbox"
            name="supplier"
            value="AzureCloud"
            checked={selectedSuppliers.includes("AzureCloud")}
            onChange={handleCheckboxChange}
          />
          Microsoft Azure
        </label>
        <label>
          <input
            type="checkbox"
            name="supplier"
            value="AmazonCloud"
            checked={selectedSuppliers.includes("AmazonCloud")}
            onChange={handleCheckboxChange}
          />
          Amazon AWS
        </label>
        <label>
          <input
            type="checkbox"
            name="supplier"
            value="GoogleCloud"
            checked={selectedSuppliers.includes("GoogleCloud")}
            onChange={handleCheckboxChange}
          />
          Google Cloud
        </label>
        <button type="submit">Choose Suppliers</button>
      </form>
      <h11>{selectedSuppliers}</h11>
      {supplierComponent}
    </div>
  );
};

export default SupplierChoice;
