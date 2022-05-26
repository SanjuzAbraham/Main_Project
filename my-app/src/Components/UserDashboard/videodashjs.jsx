import React from "react";
import { Button } from "react-bootstrap";
import "./videodash.css";
import "./userhome.css";
import { Link, useHistory } from "react-router-dom";

const Videodashjs = () => {
    let history = useHistory();

    const logoutHandler = () =>{
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
            <td>Beginning javascript</td>
            <td>
              <Button variant="outline-warning"  onClick={()=>history.push('/js1')}>Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Installing vscode</td>
            <td>
              <Button variant="outline-warning"  onClick={()=>history.push('/js2')}>Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Loading Javascipt</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Const and Let</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Comments</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Operators</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>Primitive Datatypes</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>Concatenation</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>9</td>
            <td>Prettier</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td>Comparisons and conditions</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>11</td>
            <td>truthy and falsy values</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>12</td>
            <td>Functions</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>13</td>
            <td>Objects</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>14</td>
            <td>Arrays</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>15</td>
            <td>Switch Statement</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>16</td>
            <td>for loop</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td>for of for each</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td>for in while</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td>scope</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td>Dom introduction</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td>The dom</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td>Exploring Document</td>
            <td>
              <Button variant="outline-warning">Play Now</Button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Videodashjs;
