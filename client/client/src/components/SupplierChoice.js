import React, { useState } from "react";

const SupplierChoice = ({ selectedSupplier, onSupplierChange }) => {
  const suppliers = ["Azure", "Amazon", "Google"];

  return (
    <div className="supplierChoice">
      <h3>Cloud providers</h3>
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
