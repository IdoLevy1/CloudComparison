import React, { useState } from "react";


const SupplierChoice = ({ selectedSupplier, onSupplierChange }) => {

    //const [selectedSuppliers, handleSupplierChange] = useState([]);
    const suppliers = ["Azure", "Amazon", "Google"];
  
    //const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    
    // const handleCheckboxChange = (e) => {
    //   const supplier = e.target.value;
    //   if (e.target.checked) {
    //     setSelectedSuppliers([...selectedSuppliers, supplier]);
    //   } else {
    //     setSelectedSuppliers(selectedSuppliers.filter((s) => s !== supplier));
    //   }
    // };
  
    return (
      <div className="supplierChoice">
        <h3>Select cloud suppliers:</h3>
        {suppliers.map((supplier) => (
          <div key={supplier}>
            <label>
              <input
                type="checkbox"
                name="supplier"
                value={supplier}
                checked={selectedSupplier.includes(supplier)}
                onChange={onSupplierChange}
              />
              {supplier}
            </label>
          </div>
        ))}
      </div>
    );
  };
  
  export default SupplierChoice;