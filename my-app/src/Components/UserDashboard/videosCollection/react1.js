import React,{useState,useEffect} from 'react';
import "../../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import {Link, useLocation, useHistory} from 'react-router-dom';
import Video1 from '../../../videos/3. JavaScript/0002. 1-installing-vscode.mp4';


const React1 = () =>{
    const history = useHistory();
   
    const location = useLocation();
    const [course, setCourse] = useState(location.state.video);
  console.log(course);

  const logoutHandler = () =>{
    window.localStorage.removeItem("id");
    history.push("/login");
  }
    //   useEffect(()=>{
    //    setCourse(location.state.video)
    //   },[])
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
        <Link to="/videodashjs">
          <a>Back</a>
        </Link>
      </div>
      <div className="cardbody">
      <Player
      playsInline
      src={"http://localhost:5000/" + course.courseVideos[0]}
    />
      </div>
    </div>
    )
}

export default React1;