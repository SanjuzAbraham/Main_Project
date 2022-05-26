import React from "react";
import { Button } from "react-bootstrap";
import "./videodash.css";
import "./userhome.css";
import { Link, useHistory } from "react-router-dom";

const Videodashcss = () => {

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
            <td>Let's learn CSS</td>
            <td>
              <Button variant="success"  onClick={()=>history.push('/css1')}>Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>How to use CSS3</td>
            <td>
              <Button variant="success"   onClick={()=>history.push('/css2')}>Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Basic Syntax</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Selectors</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Specificity</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Padding and Margin</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>The box model</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>Pixels, rem , em</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>9</td>
            <td>Styling a button</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td>Display types</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>11</td>
            <td>Positions</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>12</td>
            <td>Pseudo elements and classes</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>13</td>
            <td>Media Queries</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>14</td>
            <td>Flexbox</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>15</td>
            <td>Grid</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>{" "}
          <tr>
            <td>16</td>
            <td>Basics of Sass</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td>The end</td>
            <td>
              <Button variant="success">Play Now</Button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Videodashcss;
