import React, { useState } from "react";

export default function DepartmentForm({ defaultValues, onSubmit }) {
  const [values, setValues] = useState(defaultValues);
  const { nameDepartment, officePhone } = values;
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!nameDepartment || !officePhone) {
      setTimeout(() => {
        setError("Please enter all field");
      }, 2000);
    }
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmitForm}>
        <div className="mb-3">
          <label className="form-label">Name Department</label>
          <input
            type="text"
            name="nameDepartment"
            value={nameDepartment}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Office Phone</label>
          <input
            type="text"
            name="officePhone"
            value={officePhone}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
