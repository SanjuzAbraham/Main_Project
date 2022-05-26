import React, { useState , useEffect} from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";

const axios = require("axios");

const Login = () => {
  let history = useHistory();

  const [email, setEmail] = useState(null);
  const [pass, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: pass,
    };
    const response = await axios.post("http://localhost:5000/login", data);
    if (response.status === 200) {
      window.localStorage.setItem("id",response.data.id);
      window.localStorage.setItem("username",response.data.username);
      window.localStorage.setItem("useremail",response.data.email);
      window.localStorage.setItem("userrole",response.data.role);
      if (response.data.role === "admin") {
        history.push("/Admindashboard");
      }
      else if (response.data.role === "teacher"){
        history.push("/teacheradmin");
      } 
      else {
        // alert("logged In")
        history.push("/userhome");
      }
    } else if (response.status === 400) {
      alert("User not available");
    } else {
      alert("Invalids");
    }
    
  };
  useEffect(() => {
    const isToken = localStorage.getItem("id");
    // if (isToken) {
    //   history.push("/userhome");
    // }
  }, [history]);

  return (
    <div className="d-flex justify-content-center half image-container">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-12">
          <div className="form-block mx-auto">
            <div className="text-center mb-5">
              <h3 className="text-uppercase">
                Login to <strong>COURSE4U</strong>
              </h3>
            </div>
            <form className="font-loader">
              <div className="form-group first">
                <label for="username">Username</label>
                <input
                  type="text"
                  data-test="username"
                  className="form-control"
                  placeholder="your E-mail"
                  id="username"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group last mb-3">
                <label for="password">Password</label>
                <input
                  type="password"
                  data-test="password"
                  className="form-control"
                  placeholder="Your Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-sm-flex mb-3 align-items-center">
                <span className="ml-auto">
                  <div className="forgot-pass">
                   <Link to="/forgot">Forgot Password</Link> 
                    </div>
                </span>
              </div>

              <input
                type="button"
                value="Sign In"
                className="btn btn-block py-2 btn-primary "
                id="sbtn"
                style={{ width: "100%" }}
                onClick={handleSubmit}
              />

              {/* <span className="text-center my-3 d-block">or</span> */}

              <div className="">
                {/* <div
                  className="btn btn-block py-2 btn-google"
                  style={{ width: "100%" }}
                >
                  <span className="icon-google mr-3"></span>
                  Signin with Google
                </div> */}
                <div className="d-sm-flex mb-3 mt-3 align-items-center">
                  <span className="ml-auto">
                    <div className="forgot-pass">
                      Don't have an account!!
                      <Link to="/register"> Sign Up</Link>
                    </div>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
