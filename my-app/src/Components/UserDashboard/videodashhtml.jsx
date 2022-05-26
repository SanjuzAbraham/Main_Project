import React from "react";
import { Button } from "react-bootstrap";
import "./videodash.css";
import "./userhome.css";
import { Link, useHistory } from "react-router-dom";

const Videodashhtml = () => {
  let history=useHistory();

  const logoutHandler = () =>
  {
    window.localStorage.removeItem("id");
    history.push("/login");
  }

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
          <a>Profile</a>
        </Link>
        <Link to="">
          <a>Contact</a>
        </Link>
        <Link>
          <a onClick={logoutHandler}>Log Out</a>
        </Link>
      </div>
      <div className="cardbody">
        <table>
          <tr>
            <th>Video No.</th>
            <th>Video Name</th>
            <th>Watch</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Welcome to the Course</td>
            <td>
              <Button variant="dark" onClick={()=>history.push('/html1')}>Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Setting up vs code</td>
            <td>
              <Button variant="dark" onClick={()=>history.push('/html2')}>Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Installing extensions</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Creating a html tag</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Basic Layout</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Meta tags</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>The h and p tags</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>Images and videos</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>9</td>
            <td>The a tag</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td>Forms</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>11</td>
            <td>Lists</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>12</td>
            <td>Comments</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>13</td>
            <td>Tables</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>14</td>
            <td>Classes and Ids</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>15</td>
            <td>HTML5 Semantics</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>16</td>
            <td>HTML5 Entities</td>
            <td>
              <Button variant="dark">Play Now</Button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Videodashhtml;
