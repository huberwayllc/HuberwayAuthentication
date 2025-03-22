import React, { useState } from 'react';

const Step8 = ({ formData, handleNext, handleBack }) => {
  const [role, setRole] = useState(formData.role || '');

  const handleCheckboxChange = (value) => {
    setRole(value);
  };

  return (
    <div>
      <button onClick={handleBack} className="back">
        Back
      </button>
      <h1>Which best describes your role?</h1>
      <input
        type="radio"
        name="role"
        value="manager"
        onChange={() => handleCheckboxChange('manager')}
        checked={role === 'manager'}
      />
      Manager
      <input
        type="radio"
        name="role"
        value="developer"
        onChange={() => handleCheckboxChange('developer')}
        checked={role === 'developer'}
      />
      Developer
      <input
        type="radio"
        name="role"
        value="sales"
        onChange={() => handleCheckboxChange('sales')}
        checked={role === 'sales'}
      />
      Sales
      {/* Add more roles as needed */}
      <button onClick={handleNext} disabled={!role} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

export default Step8;
