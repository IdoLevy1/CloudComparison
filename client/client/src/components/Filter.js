import React, { useState } from "react";
import { Link } from "react-router-dom";
import SupplierChoice from "./SupplierChoice";
import TypeChoice from "./TypeChoice";
import LocationChoice from "./LocationChoice";
import "../styles/Filter.css";

const Filter = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSupplier, setSelectedSuppliers] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleSupplierChange = (e) => {
    const supplier = e.target.value;
    if (e.target.checked) {
      setSelectedSuppliers([...selectedSupplier, supplier]);
    } else {
      setSelectedSuppliers(selectedSupplier.filter((s) => s !== supplier));
    }
    // setSupplierSelected(true);
  };

  return (
    <div className="submitChoice">
      <form onSubmit={handleFormSubmit}>
        <div className="checkbox-grid">
          <SupplierChoice
            selectedSupplier={selectedSupplier}
            onSupplierChange={handleSupplierChange}
          />
          <LocationChoice
            selectedLocation={selectedLocation}
            onLocationChange={(e) => setSelectedLocation(e.target.value)}
          />
          <TypeChoice
            selectedType={selectedType}
            onTypeChange={(e) => setSelectedType(e.target.value)}
          />
        </div>
        <Link
          to={"/Graphs"}
          state={{
            location: selectedLocation,
            type: selectedType,
            suppliers: selectedSupplier,
          }}
        >
          <button type="submit">Submit</button>
        </Link>
      </form>
    </div>
  );
};

export default Filter;
