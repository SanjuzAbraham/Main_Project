import React, { useState } from "react";
import Main from "../Main/Main";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Useradmin from "../UserAdmin/useradmin";

import "./Dashboard.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../../Authentication/login";
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Route path="/login" component={Login}/>
       <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
   
      <div className="dashboardContainer">
       
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <Switch>
          <Route exact path="/Admindashboard">
            <Main/>
              </Route>
              <Route path="/useradmin" >
         
      <Useradmin />
      </Route>
      </Switch>
      </div>
    
    
    
    </Router>
  );
}

export default Dashboard;
