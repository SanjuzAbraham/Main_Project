import React, { useEffect, useState } from "react";
import "./Main.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation, useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./editform.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const axios = require("axios");

function Main() {
  let history = useHistory();
  const [cid, setId] = useState(null);
  const [cname, setName] = useState(null);
  const [ctype, setType] = useState(false);
  const [ccategory, setCategory] = useState(null);
  const [cdesc, setDesc] = useState(null);
  const [cstartdate, setStartDate] = useState(null);
  const [cenddate, setEndDate] = useState(null);
  const [courses, setCourses] = useState(null);
  const [clinkvideo, setLinkVideo] = useState(null);



  const [CIDError, setCIDError] = useState(false);
  const [CNError, setCNError] = useState(false);
  var idChk = /^([a-zA-Z0-9 _-]+)$/;
  var nameChk = /^[a-zA-Z ]*$/;
  const validateCourseID = () => {
    console.log("Hi77");
    if (!idChk.test(cid)) {
      setCIDError(true);
    } else {
      setCIDError(false);
    }
  };
  const validateCoursename = () => {
    if (!nameChk.test(cname)) {
      setCNError(true);
    } else {
      setCNError(false);
    }
  };

  
  
  const handleSubmit = async (e) => {
    // console.log("end date",cenddate);
    // const data = {
    //   cid: cid,
    //   cname: cname,
    //   ctype: ctype,
    //   ccategory: ccategory,
    //   cstartdate: cstartdate,
    //   cenddate: cenddate,
    //   cdesc: cdesc,
    //   clinkvideo: clinkvideo,
    // };

    e.preventDefault();

    var formData = new FormData();
    for (const key of Object.keys(clinkvideo)) {
      formData.append("VideoLink", clinkvideo[key]);
    }
    formData.append("cid", cid);
    formData.append("cname", cname);
    formData.append("ctype", ctype);
    formData.append("ccategory", ccategory);
    formData.append("cstartdate", cstartdate);
    formData.append("cenddate", cenddate);
    formData.append("cdesc", cdesc);
    console.log(formData);

    // const response = await axios.post("http://localhost:5000/addcourse", data);
    // if (response.status === 200) {
    //   history.push("/Admindashboard");
    //   window.location.reload(false);
    // }

    const response = await axios({
      method: "POST",
      url: "http://localhost:5000/addcourse",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
        history.push("/Admindashboard");
        window.location.reload(false);
       }
    

  };

  const [show, setShow] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [courseEditId, setCourseEditId] = useState();
  const [courseEditName, setCourseEditName] = useState();
  const [courseEditCategory, setCourseEditCategory] = useState();
  const [courseEditType, setCourseEditType] = useState(false);
  const [courseEditDesc, setCourseEditDesc] = useState();
  const [courseEditStartDate, setCourseEditStartDate] = useState();
  const [courseEditEndDate, setCourseEditEndDate] = useState();
  const [courseEditLinkVideo, setCourseEditLinkVideo] = useState();
  const [courseObId, setCourseObId] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handleEditCourse = (obid, id, name, type, category, desc) => {
    // if (type == "paid"){
    //   document.getElementById("radio1").checked="true";
    // }
    // else{
    //   document.getElementById("radio2").checked="true";
    // }
    setCourseEditId(id);
    setCourseEditName(name);
    setCourseEditCategory(category);
    setCourseEditType(type);
    setCourseEditDesc(desc);
    setCourseEditStartDate(desc);
    setCourseEditEndDate(desc);
    setCourseEditLinkVideo(desc);
    setCourseObId(obid);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  async function getCourses() {
    let response = await axios.get("http://localhost:5000/getcourses");
    if (response.status === 200) {
      setCourses(response.data.courses);
      console.log(response.data.courses);
    }
  }


  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:3000/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  async function handleEdit() {
    let data = {
      courseID: courseObId,
      cid: cid,
      cname: cname,
      ctype: ctype,
      ccategory: ccategory,
      cdesc: cdesc,
      cstartdate: cstartdate,
      cenddate: cenddate,
      clinkvideo: clinkvideo,
    };
    let response = axios
      .post("http://localhost:5000/updateCourse", data)
      .then(() => {
        window.location.reload(false);
      });
    if (response.status == 200) {
      handleCloseModal();
    }
  }
  async function handleBlock(id) {
    let data = {
      courseID: id,
    };
    let response = axios
      .post("http://localhost:5000/deleteCourse", data)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // async function handleActivate(id) {
  //   let data = {
  //     courseID: id,
  //   };
  //   let response = axios
  //     .post("http://localhost:5000/activateUser", data)
  //     .then(() => {
  //       window.location.reload(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  useEffect(() => {
    getCourses();
    
  }, []);

  const data = {};
  return (
    <div className="d-flex">
      <Sidebar />
      <main>
        <div className="main__container">
          <button className="btn btn-primary" onClick={handleShow}>
            Add Course
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <Form.Control
                  type="text"
                  placeholder="Course ID"
                  id="cid"
                  onChange={(e) => setId(e.target.value)}
                  onKeyUp={validateCourseID}
                />
                <br />
                <div className="d-flex flex-column mb-4">
                <div
                  className={
                    CIDError ? "error error-visible " : "error error-hidden"
                  }
                >
                  <p>Please enter a Valid Course ID</p>
                </div>
              </div>
                <Form.Control
                  type="text"
                  placeholder="Course Name"
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={validateCoursename}
                />
                <br />
                <div className="d-flex flex-column mb-4">
                <div
                  className={
                    CNError ? "error error-visible " : "error error-hidden"
                  }
                >
                  <p>Please enter a valid Course Name</p>
                </div>
                </div>
                {/* <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  value="paid"
                  onChange={(e) => setType(e.target.value)}
                />
                Paid
                <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  value="Free"
                  onChange={(e) => setType(e.target.value)}
                />
                Free */}
                {/* <br /> */}
                {/* <br /> */}
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultChecked>Select Category</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Management Studies">Management Studies</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="General">General</option>
                </Form.Select>
                <br />
                <Form.Control
                  inline
                  type="date"
                  placeholder="Start Date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <br />
                <Form.Control
                  inline
                  type="date"
                  placeholder="End Date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <br />
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  style={{ height: "100px" }}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <br />
                {/* <Form.Control
                  type="text"
                  placeholder="Video Link"
                  onChange={(e) => setLinkVideo(e.target.value)}
                /> */}
                <label for="files">Select Video Link</label>
                <Form.Control
                  type="file"
                  placeholder="Video Link"
                  accept="mp4, mkv"
                  multiple
                  onChange={(e) => setLinkVideo(e.target.files)}
                />
                <br/>
                {/* <label for="files">Select Document</label>
                <Form.Control
                  type="file" 
                  placeholder="Add Document"
                  onChange={saveFile} 
                /> */}
              </form>
              {/* <button onClick={uploadFile}>Upload</button> */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleSubmit}>
                Add Course
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Update Modal */}

          <Modal show={showmodal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <Form.Control
                  type="text"
                  placeholder={courseEditId}
                  id="cid"
                  onChange={(e) => setId(e.target.value)}
                  onKeyUp={validateCourseID}
                />
                <br />
                <div className="d-flex flex-column mb-4">
                <div
                  className={
                    CIDError ? "error error-visible " : "error error-hidden"
                  }
                >
                  <p>Please enter a Valid Course ID</p>
                </div>
              </div>
                <Form.Control
                  type="text"
                  placeholder={courseEditName}
                  id="cname"
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={validateCoursename}
                />
                <br />
                <div className="d-flex flex-column mb-4">
                <div
                  className={
                    CNError ? "error error-visible " : "error error-hidden"
                  }
                >
                  <p>Please enter a valid Course Name</p>
                </div>
                </div>
                <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  checked={courseEditType == "paid" ? true : false}
                  value="paid"
                  id="radio1"
                  onChange={(e) => setType(e.target.value)}
                />
                Paid
                <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  checked={courseEditType == "Free" ? true : false}
                  value="Free"
                  id="radio2"
                  onChange={(e) => setType(e.target.value)}
                />
                Free
                <br />
                <br />
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultChecked>{courseEditCategory}</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Management Studies">Management Studies</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="General">General</option>
                </Form.Select>
                <br />
                <Form.Control
                  inline
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <br />
                <Form.Control
                  inline
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <br />
                <Form.Control
                  as="textarea"
                  placeholder={courseEditDesc}
                  style={{ height: "100px" }}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <br />
                <Form.Control
                  type="text"
                  placeholder={courseEditLinkVideo}
                  onChange={(e) => setLinkVideo(e.target.value)}
                />

                <button onClick={uploadFile}>Upload</button>

              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleEdit}>
                Update Course
              </Button>
            </Modal.Footer>
          </Modal>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Course Name</th>
                <th>Course Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Video Link</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.length > 0 &&
                courses.map((p) => {
                  return (
                    <tr>
                      <td>{p.courseId}</td>
                      <td>{p.courseName}</td>
                      <td>{p.courseType}</td>
                      <td>{p.courseCategory}</td>
                      <td>{p.courseDesc}</td>
                      <td>{p.courseStartDate}</td>
                      <td>{p.courseEndDate}</td>
                      <td>{p.courseVideos[1]}</td>
                      <td>{p.courseStatus}</td>
                      <td colSpan="2">
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          style={{width:"150px", marginBottom: "2px"}}
                          onClick={() => {
                            handleEditCourse(
                              p._id,
                              p.courseId,
                              p.courseName,
                              p.courseType,
                              p.courseCategory,
                              p.courseStartDate,
                              p.courseEndDate,
                              p.courseLinkVideo
                            );
                          }}
                        >
                          Edit <i className="fa fa-pen"></i>
                        </button>
                        <br/>
                        <button
                          className="btn btn-danger"
                          style={{width:"150px"}}
                          onClick={() => {
                            handleBlock(p._id);
                          }}
                        >
                          
                          Deactivate<i className="fa fa-trash"></i>
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

export default Main;
