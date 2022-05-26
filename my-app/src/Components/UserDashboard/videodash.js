import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./videodash.css";
import "./userhome.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { VideoProgress } from "react-video-progress";

const axios = require("axios");

const Videodashcss = () => {
  let history = useHistory();
  const location = useLocation();
  let [coursesvideo, setCoursesVideo] = useState(null);
  const [cid, setCourseId] = useState(null);
  const courseuniqueid = location.state.cid;
  let vsrc = "C:/Users/Futurense/Desktop/MINI_NEW/my-server/routes/videos/";
  const logoutHandler = () => {
    window.localStorage.removeItem("id");
    history.push("/login");
  };

  async function getCourses() {
    const data = {
      cid: courseuniqueid,
    };
    let response = await axios.post(
      "http://localhost:5000/getcoursevideo",
      data
    );
    if (response.status === 200) {
      setCoursesVideo(response.data.courses);
    }
  }

  async function getPaidCourses() {
    const data = {
      cid: courseuniqueid,
    };
    let response = await axios.post(
      "http://localhost:5000/getpaidcoursevideo",
      data
    );
    if (response.status === 200) {
      setCoursesVideo(response.data.courses);
    }
  }

  useEffect(() => {
    getCourses();
    getPaidCourses();
  }, []);
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
          <a>Profile</a>
        </Link>
        <Link to="">
          <a>Contact</a>
        </Link>
        <Link>
          <a onClick={logoutHandler}>Log Out</a>
        </Link>
      </div>
      <div className="cardbody">
        <table>
          <tr>
            <th>Video No.</th>
            <th>Video Name</th>
          </tr>
          {coursesvideo &&
            coursesvideo.length > 0 &&
            coursesvideo.map((p) => {
              return (
                <tr>
                  <td>{p.courseId}</td>
                  <td>{p.courseName}</td>
                  {p.courseVideos.map((a) => {
                    console.log('http://localhost:5000/routes/videos/'+a)
                    return (
                      <div>
                        <VideoProgress
                          progressStart="BottomLeft"
                          type="OneLine"
                          pathColor="red"
                          pathWidth="4px"
                          pathBorderRadius="2px"
                          src={'http://localhost:5000/routes/videos/'+a}
                          height="200px"
                          controls
                        />
                      </div>
                    );
                  })}
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default Videodashcss;
