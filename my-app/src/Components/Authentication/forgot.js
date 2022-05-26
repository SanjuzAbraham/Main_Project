// import axios from 'axios';
// import React, {useState} from 'react';
// import './styles.module.css';


// const ForgotPassword = () => {

//   const [email, setEmail]=useState("");
//   const [msg, setMsg]=useState("");
//   const [error, setError]=useState("");

//   const handleSubmit = async(e) =>{
//     e.preventDefault();
//     try{
//       const url = `http://localhost:5000/password-reset`;
//       const data = await axios.post(url, email);
//       setMsg(data.message);
//       setError("");
//     }
//     catch(error){
//       if(error.response &&
//         error.response.status >= 400 &&
//         error.response.status <= 500){
//           setError(error.response.data.message);
//           setMsg("")
//         }
//     }
//   }

//   return(
//     <div className='container'>
//       <form className='form_container' onSubmit={handleSubmit}>
//         <h1>Forgot Password</h1>
//         <input
//           type="email"
//           placeholder='Email'
//           name="email"
//           onChange={(e)=> setEmail(e.target.value)}
//           value={data.email}
//           required
//           className="input"
//           />
//           {error && <div className='error_msg'>{error}</div>}
//           {msg && <div className='success_msg'>{msg}</div>}
//           <button type='submit' className='green_button'>Submit</button>
//       </form>
//     </div>
//   )
// };

// export default ForgotPassword;



import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./login.css";
import PasswordForm from './passwordform'
const axios = require("axios");

const Forgot = () => {
  let emailRef = useRef();
  const [Forgot, showForm] = useState(true);

  const sendOtp = async () => {
    try {
      let url = "http://localhost:5000/sendEmail";
      let options = {
        method: "POST",
        url: url,
        data: { email: emailRef.current.value },
      };
      let response = await axios(options);
      let record = response.data;
      if (record.statusText == "success") {
        toast.success(record.message); 
        showForm(false);
      } else {
        toast.error(record.message);
      }
    } catch (e) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    
    <div className="d-flex justify-content-center half image-container">
       <ToastContainer />
      <div className="row align-items-center justify-content-center">
        <div className="col-md-12">
          <div className="form-block mx-auto">
            <div className="text-center mb-5">
              <h3 className="text-uppercase">
                <strong>Forgot Password</strong>
              </h3>
            </div>
            {Forgot? 
            <form className="font-loader">
              <div className="form-group first">
                <label for="username">Username</label>
                <input
                  type="text"
                  data-test="username"
                  className="form-control"
                  placeholder="your E-mail"
                  id="username"
                  ref={emailRef}
                />
              </div>
              <div className="mb-5"></div>
              <input
                type="button"
                value="Send OTP"
                className="btn btn-block py-2 btn-primary "
                style={{ width: "100%" }}
                onClick={sendOtp}
              />
            </form>
:<PasswordForm email={emailRef.current.value}/>
}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
