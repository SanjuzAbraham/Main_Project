import React from 'react';
import "../../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import {Link, useHistory} from 'react-router-dom';
import Video1 from '../../../videos/2. CSS/017. TUTNetFlix.com_let-s-learn-css.mp4';

const Css1 = () =>{

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
        <Link to="/videodashcss">
          <a>Back</a>
        </Link>
      </div>
      <div className="cardbody">
      <Player
      playsInline
      src={Video1}
    />
      </div>
    </div>
    )
}

export default Css1;