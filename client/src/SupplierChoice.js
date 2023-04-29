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
    const component = <GraphsInfo suppliers={selectedSuppliers} />;
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
            value="Azure"
            checked={selectedSuppliers.includes("Azure")}
            onChange={handleCheckboxChange}
          />
          Microsoft Azure
        </label>
        <label>
          <input
            type="checkbox"
            name="supplier"
            value="AWS"
            checked={selectedSuppliers.includes("AWS")}
            onChange={handleCheckboxChange}
          />
          Amazon AWS
        </label>
        <label>
          <input
            type="checkbox"
            name="supplier"
            value="Google"
            checked={selectedSuppliers.includes("Google")}
            onChange={handleCheckboxChange}
          />
          Google Cloud
        </label>
        <button type="submit">Choose Suppliers</button>
      </form>
      {supplierComponent}
    </div>
  );
};

export default SupplierChoice;
