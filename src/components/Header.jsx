import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../redux/contants";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(user);
  const history = useHistory();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("persist:root");
    history.push("/login");
  };
  const handleClick = () => {
    document.querySelector(".nav-link").classList.add("active");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/admin">
          <h3>NWS</h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {user && (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" >
                <a
                  className="nav-link"
                  aria-current="page"
                  href="/admin/department"
                >
                  Department
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="/admin/employee"
                >
                  Employee
                </a>
              </li>
            </ul>
            <div className="d-flex">
              <h6
                style={{ color: "white", cursor: "pointer" }}
                onClick={handleLogout}
              >
                LOGOUT
              </h6>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
