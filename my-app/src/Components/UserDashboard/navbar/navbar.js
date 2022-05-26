import React,{useState} from "react";
import { Link, useHistory } from "react-router-dom";
const Navbar = () =>{
  const[search,setSearch]=useState(null);
  window.localStorage.setItem("search",search);
return(
    <>
<nav className="navbar fixed-right navbar-expand-lg navbar-dark bg-dark" style={{marginLeft:'19%'}}>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    
    

      <Link to="/profile"><button className="btn btn-outline-success my-5 my-sm-0" style={{marginLeft:'1200%'}} type="button">Profile</button></Link>
      <input type="text" placeholder="Search.." name="search" onChange={(e) => setSearch(e.target.value)}/>
      <button>search</button>
  </div>
</nav>
</>
);
}

export default Navbar;