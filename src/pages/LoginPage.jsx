import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { LOGIN } from "../redux/contants";

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const { username, password } = values;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const response = await axios.post("/auth/login", { username, password });
      if (response.data.statusCode !== 404) {
        dispatch({
          type: LOGIN,
          payload: response.data.accessToken,
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.accessToken)
        );
        toast.success("Login successfuly");
        history.push("/admin/department");
      } else {
        toast.error("Account not found");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="container wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={handleSubmitForm}>
          <h1 className="text-center">Login Page</h1>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleOnChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              className="form-control"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
