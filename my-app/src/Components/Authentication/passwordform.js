import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const axios = require("axios");

const PasswordForm = (props) => {
  let history = useHistory();
  var myInput = document.getElementById("password");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");
  const handleFocus = () => {
    document.getElementById("message").style.display = "block";
  };
  const handleBlur = () => {
    document.getElementById("message").style.display = "none";
  };
  const handleOnkeyup = () => {
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
    if (myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };

  const [otp, setOtp] = useState(null);
  const [pass, setPass] = useState(null);
  const [cpass, setCpass] = useState(null);
  const email = props.email
  
  const handleSubmit = async (e) => {
      e.preventDefault();
    const data = {
        email: email,
        otpcode: otp,
        password: pass,
    };
    if (otp.length>0){
        console.log("err"+data)
      if (pass === cpass) {
        const response = await axios.post(
          "http://localhost:5000/changepass",
          data
        );
        alert(response.statusText);
          history.push("/login");
      } 
      else {
        alert("Password Mismatch");
      }
    } 
    else {
      alert("Enter Full details");
    }
  };

  return (
    <div className="d-flex justify-content-center half image-container2">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-12">
          <div className="form-block mx-auto">
            <div className="text-center mb-5">
              <h3 className="text-uppercase">
                <strong>Change Password</strong>
              </h3>
            </div>
            <form className="font-loader">
              <div className="form-group first">
                <label for="username">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="otp"
                  id="otp"
                  maxlength="4"
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
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
              <input
                type="button"
                value="Change Password"
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

export default PasswordForm;
