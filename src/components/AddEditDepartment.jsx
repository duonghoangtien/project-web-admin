import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DepartmentForm from "./DepartmentForm";

export default function AddEditDepartment() {
  const history = useHistory();
  const { departmentId } = useParams();
  const isEdit = Boolean(departmentId);
  const [department, setDepartment] = useState(null);
  const token = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    if (!departmentId) return;

    (async () => {
      try {
        const response = await axios.get(`/department/${departmentId}`, config);
        console.log(response.data);
        setDepartment(response.data);
      } catch (error) {
        console.log("Failed to fetch department details", error);
      }
    })();
  }, [departmentId]);

  const defaultValues = Boolean(departmentId)
    ? department
    : {
        nameDepartment: "",
        officePhone: "(+84)",
      };

  const handleFormSubmit = async (formValues) => {
    console.log(formValues);
    if (isEdit) {
      await axios.put(`/department/${departmentId}`, formValues, config);
      toast.success("Edit department successfully!");
    } else {
      await axios.post(`/department`, formValues, config);
      toast.success("Add department successfully!");
    }

    history.push("/admin/department");
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">
        {isEdit ? "Update department" : "Add new department"}
      </h1>
      {(!isEdit || Boolean(department)) && (
        <DepartmentForm
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
