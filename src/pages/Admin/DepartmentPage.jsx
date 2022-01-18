import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllDepartment } from "../../redux/actions/departmentAction";
import { API_URL } from "../../redux/contants";

export default function DepartmentPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { departmentList } = useSelector((state) => state.department);
  const token = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    dispatch(fetchAllDepartment(token));
  }, [dispatch, token]);
  // console.log(departmentList)
  async function handleDelete(department) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      if (
        window.confirm(`Bạn chắc chắn muốn xóa ${department.nameDepartment}`)
      ) {
        await axios.delete(`${API_URL}/department/${department.id}`, config);
        toast.success("Remove sucessfully");
      }
      dispatch(fetchAllDepartment(token));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  function handleEditDepartment(department) {
    history.push(`/admin/department/${department.id}`);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Department</h1>
      <Link to="/admin/department/add">
        <button className="btn btn-primary mb-3">+Add department</button>
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name Department</th>
            <th>Office Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {departmentList?.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.nameDepartment}</td>
              <td>{department.officePhone}</td>
              <td>
                <a
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditDepartment(department)}
                >
                  Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(department)}
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
