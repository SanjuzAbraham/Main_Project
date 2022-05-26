import React from 'react';
import "../../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import {Link, useHistory} from 'react-router-dom';
import Video2 from '../../../videos/1. HTML/002. TUTNetFlix.com_setting-up-vs-code.mp4';

const Html2 = () =>{

const history = useHistory();
  const logoutHandler = () =>{
    window.localStorage.removeItem("id");
    history.push("/login");
  }

    return(
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
        <Link to="/videodashhtml">
          <a>Back</a>
        </Link>
      </div>
      <div className="cardbody">
      <Player
      playsInline
      src={Video2}
    />
      </div>
    </div>
    )
}

export default Html2;