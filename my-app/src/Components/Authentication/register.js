import React, { useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";

const axios = require("axios");

const Register = () => {
  let history = useHistory();

  var myInput = document.getElementById("password");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");

  // When the user clicks on the password field, show the message box
  const handleFocus = () => {
    document.getElementById("message").style.display = "block";
  };

  // When the user clicks outside of the password field, hide the message box
  const handleBlur = () => {
    document.getElementById("message").style.display = "none";
  };

  // When the user starts to type something inside the password field
  const handleOnkeyup = () => {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };

  const [name, setName] = useState(null);
  const [mail, setMail] = useState(null);
  const [role,setRole]=useState(null);
  const [pass, setPass] = useState(null);
  const [cpass, setCpass] = useState(null);

  const [nameError, setnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  var emailChk =
    /^([a-z A-Z 0-9_\-\.])+\@([a-z A-Z 0-9_\-])+\.([a-z A-Z]{2,4}).$/;
  var nameChk = /^[a-zA-Z ]*$/;

  const validateEmail = () => {
    if (!emailChk.test(mail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validateName = () => {
    console.log("gahgah")
    if (!nameChk.test(name)) {
      setnameError(true);
    } else {
      setnameError(false);
    }
  };

  const handleSubmit = async (e) => {
    const data = {
      fullname: name,
      email: mail,
      password: pass,
      role:role,
    };
    if(nameError == false &&
      emailError == false){
        if (pass === cpass) {
          const response = await axios.post("http://localhost:5000/register", data);
          if (response.status === 200) {
            alert(name + " , Your Account is Created");
            history.push("/login");
          }
        } else {
          alert("Password Mismatch");
        }
      }
    else{
      alert("Enter Full details");
    }
    console.log(name);
  };

  return (
    <div className="d-flex justify-content-center half image-container2">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-12">
          <div className="form-block mx-auto">
            <div className="text-center mb-5">
              <h3 className="text-uppercase">
                Register to <strong>COURSE4U</strong>
              </h3>
            </div>
            <form className="font-loader">
              <div className="form-group first">
                <label for="username">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="your name"
                  id="nameval"
                  pattern="[a-z]{1,15}"
                  title="Username should only letters. e.g. John"
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={validateName}
                  required
                />
              </div>
              <div className="d-flex flex-column mb-4">
                <div
                  className={
                    nameError ? "error error-visible " : "error error-hidden"
                  }
                >
                  <p>Please enter a valid Name</p>
                </div>
              </div>
              <div className="form-group first">
                <label for="username">E-mail</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="your E-mail"
                  id="email"
                  pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                  title="the email entered is not valid. Eg:sanju@gmail.com"
                  onChange={(e) => setMail(e.target.value)}
                  onKeyUp={validateEmail}
                  required
                />
              </div>
              <div className="d-flex flex-column mb-4">
                <div
                  className={
                    emailError ? "error error-visible " : "error error-hidden"
                  }
                >
                  <p>Please enter a valid Email</p>
                </div>
              </div>
              <div className="">
                <input type="radio" value="student" name="role" onChange={(e) => setRole(e.target.value)} />Student
                <input type="radio" value="teacher" name="role" onChange={(e) => setRole(e.target.value)} />Teacher
              </div>
              <div className="form-group last mb-3">
                <label for="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your Password"
                  id="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  onChange={(e) => setPass(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyUp={handleOnkeyup}
                  required
                />
              </div>
              <div className="message" id="message">
                <h3>Password must contain the following:</h3>
                <p id="letter" className="invalid">
                  A <b>lowercase</b> letter
                </p>
                <p id="capital" className="invalid">
                  A <b>capital (uppercase)</b> letter
                </p>
                <p id="number" className="invalid">
                  A <b>number</b>
                </p>
                <p id="length" className="invalid">
                  Minimum <b>8 characters</b>
                </p>
              </div>
              <div className="form-group last mb-3">
                <label for="password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your Password"
                  id="password"
                  onChange={(e) => setCpass(e.target.value)}
                />
              </div>

              <div className="d-sm-flex mb-5 align-items-center">
                <span className="ml-auto">
                  <div className="forgot-pass">
                    Already have an account!!
                    <Link to="/login">Sign In</Link>
                  </div>
                </span>
              </div>

              <input
                type="button"
                value="Sign Up"
                className="btn btn-block py-2 btn-primary "
                style={{ width: "100%" }}
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
