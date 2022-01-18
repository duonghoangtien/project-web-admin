import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllEmployee } from "../../redux/actions/employeeAction";

export default function EmployeePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { employeeList } = useSelector((state) => state.employee);
  const token = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    dispatch(fetchAllEmployee(token));
  }, [dispatch, token]);
  console.log(employeeList);
  async function handleDelete(employee) {
    try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      if (window.confirm(`Do you sure delete ${employee.nameEmployee} ?`)) {
          await axios.delete(`/employee/${employee.id}`, config);
        toast.success("Remove sucessfully");
      }
        dispatch(fetchAllEmployee(token));
    } catch (error) {
      //   toast.error(error.response.data.message);
      console.log(error);
    }
  }

  function handleEditEmployee(employee) {
    history.push(`/admin/employee/${employee.id}`);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Employee</h1>
      <Link to="/admin/employee/add">
        <button className="btn btn-primary mb-3">+Add employee</button>
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name Employee</th>
            <th>Photo</th>
            <th>Job Tittle</th>
            <th>Cellphone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employeeList?.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.nameEmployee}</td>
              <td>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src={employee.photo.replace(
                    `uploads`,
                    "https://nws-management.herokuapp.com/"
                  )}
                  alt="photo"
                />
              </td>
              <td>{employee.jobTitle}</td>
              <td>{employee.cellPhone}</td>
              <td>{employee.email}</td>
              <td>
                <a
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditEmployee(employee)}
                >
                  Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee)}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
