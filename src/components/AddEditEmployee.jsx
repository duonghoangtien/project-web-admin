import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../redux/contants";
import EmployeeForm from "./EmployeeForm";

export default function AddEditEmployee() {
  const history = useHistory();
  const { employeeId } = useParams();
  const isEdit = Boolean(employeeId);
  const [employee, setEmployee] = useState(null);
  const token = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!employeeId) return;

    (async () => {
      try {
        const response = await axios.get(`${API_URL}/employee/${employeeId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setEmployee(response.data);
      } catch (error) {
        console.log("Failed to fetch employee details", error);
      }
    })();
  }, [employeeId]);

  const defaultValues = Boolean(employeeId)
    ? employee
    : {
        nameEmployee: "",
        photo: "",
        jobTitle: "",
        cellPhone: "(+84)",
        email: "",
        managerId: "",
      };

  const handleFormSubmit = async (formValues) => {
    try {
      if (isEdit) {
        await axios.put(`${API_URL}/employee/${employeeId}`, formValues, {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      toast.success("Edit employee successfully!");
      } else {
        await axios.post(`${API_URL}/employee`, formValues, {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Add employee successfully!");
      }
  
      history.push("/admin/employee");
    } catch (error) {
      toast.error(error.response.data.message)
    }
  
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">
        {isEdit ? "Update employee" : "Add new employee"}
      </h1>
      {(!isEdit || Boolean(employee)) && (
        <EmployeeForm
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
