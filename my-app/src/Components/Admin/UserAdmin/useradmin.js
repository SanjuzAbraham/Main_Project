import React, { useEffect, useState } from "react";
import "../Main/Main.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation,useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./editform.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar"
const axios = require("axios");

function Useradmin() {
  let history = useHistory();
  const [users,setUsers]=useState(null);
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getCourses() {
    let response = await axios.get("http://localhost:5000/getStudents");
    if (response.status === 200) {
      setUsers(response.data.users);
      console.log(response.data.users);
    }
  }
  async function handleBlock(id) {
    let data = {
      userID: id,
    };
    let response = axios
      .post("http://localhost:5000/blockUser", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleDelete(id) {
    let data = {
      userID: id,
    };
    let response = axios
      .post("http://localhost:5000/deleteUser", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleActivate(id) {
    let data = {
      userID: id,
    };
    let response = axios
      .post("http://localhost:5000/activateUser", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  useEffect(() => {
    getCourses();
  }, []);

  const data = {};
  return (
    <div className="d-flex w-100 h-100">
      <Sidebar/>
    <main>
      
      <div className="main__container">
          <Link to="/Admindashboard">
        <button className="btn btn-primary" >Back</button>
</Link>
        <Table striped bordered hover size="sm" >
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
             users.length > 0 &&
              users.map((u) => {
                return (
                  <tr>
                    
                    <td>{u.fullname}</td>
                    <td>{u.email}</td>
                    <td>{u.status}</td>
                    <td className= "d-flex justify-content-around" >
                      <button
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={()=>{handleActivate(u._id);}}
                      >
                        Unblock <i className="fa fa-pen" ></i>
                      </button>
                      <button className="btn btn-warning" onClick={()=>{handleBlock(u._id);}}>
                        Block<i className="fa fa-circle"></i>
                      </button>
                      <button className="btn btn-danger" onClick={()=>{handleDelete(u._id);}}>
                        Delete<i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </main>
    </div>
  );
}

export default Useradmin;
