import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../UserDashboard/navbar/navbar";
import "./userhome.css";
import { Modal, Button, Form } from "react-bootstrap";
const axios = require("axios");

const UserHome = () => {
  let history = useHistory();

  const [courses, setCourses] = useState(null);
  const [showmodal, setShowModal] = useState(false);
  const userId = window.localStorage.getItem("id");
  const userName = window.localStorage.getItem("username");
  const [courseName, setCourseName] = useState();
  const [courseCategory, setCourseCategory] = useState();
  const [courseId, setCourseId] = useState();
  const [courseDesc, setCourseDesc] = useState();

  const logoutHandler = () =>{
    window.localStorage.removeItem("id");
    history.push("/login");
  }

  async function getCourses() {
    let userId = window.localStorage.getItem("id");
    let response = await axios.post("http://localhost:5000/myCourses", {
      id: userId,
    });
    if (response.status === 200) {
      setCourses(response.data.courses);
      console.log(response.data.courses);
    }
  }
  async function viewVideo(cid){
    console.log(cid);
    history.push({
      pathname: '/videodash',
      state: {cid:cid},
    });
  }



  useEffect(() => {
    getCourses();
  }, []);

  const data = {};
  return (
    <div>
      <div id="mySidenav" className="sidenav">
        <Link to="/userhome">
          <a>Dashboard</a>
        </Link>
        <Link to="/mycourse">
          <a>My Courses</a>
        </Link>

        
        <Link to="">
          <a>Contact</a>
        </Link>
        <Link>
          <a onClick={logoutHandler}>Log Out</a>
        </Link>
      </div>
      <Navbar />
      <div className="cardbody">
        {courses &&
          courses.length > 0 &&
          courses.map((p) => {
            return (
              <div className="row1">
                <div className="column1">
                  <div className="sub-card">
                    <h3>{p.courseName}</h3>
                    <p>{p.courseCategory}</p>
                    
                    <Button
                      variant="info" id="gotobtn" onClick={()=>{viewVideo(p.courseUniqueId);}}
                      >Go to Course
                    </Button>
                    
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserHome;
