import React from "react";
import "./editprofile.css";

const Editprofile=()=>{
    let username=window.localStorage.getItem("username");
    let useremail=window.localStorage.getItem("useremail");
    let userrole=window.localStorage.getItem("userrole");
    return(
<div className="container rounded bg-white mt-5">
        <div className="row">
            <div className="col-md-4 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://i.imgur.com/0eg0aG0.jpg" width="90" /><span className="font-weight-bold">{username}</span><span className="text-black-50">{useremail}</span><span>{userrole}</span></div>
            </div>
            <div className="col-md-8">
                <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                            <h6>Back to home</h6>
                        </div>
                        <h6 className="text-right">Edit Profile</h6>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6"><input type="text"  placeholder={username} value={username} readOnly="true" /></div>
                        
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6"><input type="text"  placeholder={useremail} value={useremail} readOnly="true"/></div>
                    </div>
                    <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Editprofile;