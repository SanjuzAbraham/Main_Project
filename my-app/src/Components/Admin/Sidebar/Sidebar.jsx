import React, {useEffect} from "react";
import logo from "../../../assets/vectors/Logo.svg";
import { Link, Route, useLocation, useHistory } from "react-router-dom";
import "./Sidebar.css";


function Sidebar({ sidebarOpen, closeSidebar }) {

const history = useHistory();

  const logoutHandler = () =>{
    window.localStorage.removeItem("id");
    history.push("/login");
  }

  useEffect(() => {
    const isToken = localStorage.getItem("id");
    if (!isToken) {
      history.push("/login");
    }
  }, []);
  //console.log(closeSidebar);
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Course4U </h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link">
          <i className="fa fa-home"></i>

          <Link to="/Admindashboard">Manage Course</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-plus"></i>
          <Link to="/useradmin">Manage User</Link>
        
        </div>

        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <button onClick={logoutHandler}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
