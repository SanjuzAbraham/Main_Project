import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../UserDashboard/navbar/navbar";
import "./userhome.css";
import { Modal, Button, Form } from "react-bootstrap";
import GooglePayButton from '@google-pay/button-react'
const axios = require("axios");

const UserHome = () => {
  const history = useHistory();
  let search=window.localStorage.getItem("search");
  const [courses, setCourses] = useState(null);
  const [paidcourses, setPaidCourses] = useState(null);
  // const [userPaidcourses, setUserPaidCourses] = useState([]);

  const [showmodal, setShowModal] = useState(false);
  const userId = window.localStorage.getItem("id");
  const userName = window.localStorage.getItem("username");
  const [courseName, setCourseName] = useState();
  const [courseCategory, setCourseCategory] = useState();
  const [courseId, setCourseId] = useState();
  const [courseDesc, setCourseDesc] = useState();
  const [courseAmount, setCourseAmount] = useState();
  const [unid, setCourseUid] = useState();
  let button="";

  async function getCourses() {
    const data={
      search:search,
    }
    let response = await axios.get("http://localhost:5000/getcourses",data);
    if (response.status === 200) {
      setCourses(response.data.courses);
    }
  }
  async function getPaidCourses() {
    let response = await axios.get("http://localhost:5000/getpaidcourses");
    if (response.status === 200) {
      setPaidCourses(response.data.tcourses);
    }
  }
  // async function userGetpaidcourses() {
  //   let response = await axios.post("http://localhost:5000/userGetpaidcourses",{uid:localStorage.getItem("id")});
  //   if (response.status === 200) {
  //     setUserPaidCourses(response.data.paidcourses);
  //     console.log(userPaidcourses);
  //   }
  // }
  

  const handleClose = () => setShowModal(false);
  const handleShow = (unid,cid, cname, ccategory, cdesc, camt) => {
    setCourseUid(unid);
    setCourseId(cid);
    setCourseName(cname);
    setCourseCategory(ccategory);
    setCourseDesc(cdesc);
    setCourseAmount(camt);
    setShowModal(true);
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("id");
    history.push("/login");
  };

  async function handleEnrol(unid,cid, cname) {
    let data = {
      unid:unid,
      uid: userId,
      uname: userName,
      cid: cid,
      cname: cname,
    };
    let response = await axios.post(
      "http://localhost:5000/addenrolledcourses",
      data
    );
    if (response.status == 200) {
      alert("Enrolled");
    } else {
      console.log("failed");
    }
  }
  if(courseAmount==null){
    button="Enroll";
  }else{
    button="Pay & Enroll"
  }
  useEffect(() => {
    const isToken = localStorage.getItem("id");
    if (!isToken) {
      history.push("/login");
    } else {
      getCourses();
      getPaidCourses();
      // userGetpaidcourses();

    }
  }, []);
function coursePayment (uniqueCourse_id,courseIdc,courseNamec){
  const courseUniqueId = uniqueCourse_id;
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("username");
  const courseId = courseIdc;
  const courseName= courseNamec;
  // console.log(uniqueCourseId);
  // console.log(userID);
  // console.log(userName);
  // console.log(courseId);
  // console.log(courseName);
  axios.post('http://localhost:5000/paidCourse',{courseUniqueId,userId,userName,courseId,courseName}).then((res)=>{
    console.log(res);
  })

return;
}
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
      <Modal show={showmodal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{courseName}</h3>
          <p>{courseCategory}</p>
          <h5>{courseDesc}</h5>
          
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleEnrol(unid,courseId, courseName);
            }}
          >
            
           Enroll Now
          </Button>
        </Modal.Footer>
      </Modal>
      <h2 style={{ color: "red", marginLeft: "20%" }}>Free Courses</h2>
      <div className="cardbody">
        {courses &&
          courses.length > 0 &&
          courses.map((p) => {
            
            return (
              <div className="row1">
                <div className="column1">
                  <div className="sub-card" style={{ marginTop: "-40%" }}>
                    <h3>{p.courseName}</h3>
                    <p>{p.courseCategory}</p>
                    <Button
                      variant="info"
                      onClick={() =>
                        handleShow(
                          p._id,
                          p.courseId,
                          p.courseName,
                          p.courseCategory,
                          p.courseDesc,
                          p.courseAmount
                        )
                      }
                    >
                      View Details
                    </Button>{" "}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <h2 style={{ color: "red", marginLeft: "20%" }}>Paid Courses</h2>
      <div className="cardbody">
        {paidcourses &&
          paidcourses.length > 0 &&
          paidcourses.map((a) => {

            return (
              <div className="row1">
                <div className="column1">
                  <div className="sub-card" style={{ marginTop: "-40%" }}>
                    <h3>{a.courseName}</h3>
                    <p>{a.courseCategory}</p>
                    <p>{a.courseAmount}</p>
                   

                    <GooglePayButton
                            environment="TEST"
                            paymentRequest={{
                              apiVersion: 2,
                              apiVersionMinor: 0,
                              allowedPaymentMethods: [
                                {
                                  type: 'CARD',
                                  parameters: {
                                    allowedAuthMethods: [
                                      'PAN_ONLY',
                                      'CRYPTOGRAM_3DS',
                                    ],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                  },
                                  tokenizationSpecification: {
                                    type: 'PAYMENT_GATEWAY',
                                    parameters: {
                                      gateway: 'example',
                                      gatewayMerchantId:
                                        'exampleGatewayMerchantId',
                                    },
                                  },
                                },
                              ],
                              merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'course4U admin',
                              },
                              transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: String(a.courseAmount),
                                currencyCode: 'INR',
                                countryCode: 'IN',
                              },
                              shippingAddressRequired: true,
                              callbackIntents: [
                                
                                'PAYMENT_AUTHORIZATION',
                              ],
                            }}
                            onLoadPaymentData={(paymentRequest) => {
                              //console.log("payment sucess");
                              coursePayment(a._id,a.courseId,a.courseName);
                              console.log('Success', paymentRequest);
                            }}
                            onPaymentAuthorized={(paymentData) => {
                              console.log(
                                'Payment Authorised Success',
                                paymentData
                              );
                              return { transactionState: 'SUCCESS' };
                            }}
                            
                            existingPaymentMethodRequired="false"
                            buttonColor="light"
                            buttonType="pay"
                          />
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
