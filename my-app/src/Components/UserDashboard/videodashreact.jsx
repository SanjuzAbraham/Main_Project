import React,{useState,useEffect} from 'react';
import { Button } from "react-bootstrap";
import "./videodash.css";
import "./userhome.css";
import { Link, useHistory } from "react-router-dom";

const axios = require("axios")

const Videodashreact = () => {
    let history = useHistory();
    const [course,setCourse]= useState(null)

    const logoutHandler = () =>{
      window.localStorage.removeItem("id");
      history.push("/login");
    }

    async function getCourses() {
        let response = await axios.post("http://localhost:5000/getcourse",{id:"61b9840fc4ab7b3c14bfff9a"});
        if (response.status === 200) {
          setCourse(response.data.courses);
          console.log(response.data.courses);
        }
      }

      const handleClick = () =>{
        history.push({
          pathname:'/react1',
          state: {video:course}
        })
      }
      useEffect(()=>{
        getCourses()
      },[])
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
            <th>Watch</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Beginning javascript</td>
            <td>
              <Button variant="outline-warning"  onClick={handleClick}>Play Now</Button>
            </td>
          </tr>
        
        </table>
      </div>
    </div>
  );
};

export default Videodashreact;
