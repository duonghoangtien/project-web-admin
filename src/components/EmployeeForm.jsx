import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDepartment } from "../redux/actions/departmentAction";

export default function EmployeeForm({ defaultValues, onSubmit }) {
  const [values, setValues] = useState(defaultValues);
  const { nameEmployee, photo, jobTitle, cellPhone, email, managerId } = values;
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const token = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();
  const { departmentList } = useSelector((state) => state.department);

  useEffect(() => {
    dispatch(fetchAllDepartment(token));
  }, [dispatch, token]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  function jsonToFormData(jsonObject) {
    const formData = new FormData();
    for (const key in jsonObject) {
      formData.set(key, jsonObject[key]);
    }
    return formData;
  }

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImage(file);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !nameEmployee ||
      !photo ||
      !jobTitle ||
      !cellPhone ||
      !email ||
      !managerId
    ) {
      setTimeout(() => {
        setError("Please enter all field");
      }, 2000);
    }
    delete values.manager;
    const payload = { ...values };
    payload.photo = image;
    console.log(payload);
    const formData = jsonToFormData(payload);

    if (onSubmit) {
      await onSubmit(formData);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmitForm}>
        <div className="mb-3">
          <label className="form-label">Name Employee</label>
          <input
            type="text"
            name="nameEmployee"
            value={nameEmployee}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <div>
            <label className="form-label">Photo</label>
          </div>
          <input type="file" name="photo" onChange={handleChangePhoto} />
          <input
            type="text"
            name="photo"
            value={photo}
            onChange={handleOnChange}
            className="form-control"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cellphone</label>
          <input
            type="text"
            name="cellPhone"
            value={cellPhone}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Manger</label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="managerId"
            value={managerId}
            onChange={handleOnChange}
          >
            <option value=""> -- </option>
            {departmentList.map((opt) => (
              <option value={opt.id} key={opt.id}>
                {opt.nameDepartment}
              </option>
            ))}
          </select>
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
