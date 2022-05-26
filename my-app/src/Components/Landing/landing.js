import React from "react";
import './landing.css';
import {Link} from 'react-router-dom';
import Particles from 'react-particles-js';

import Logo from '../../assets/vectors/Mainlogo.png';
import Logos from '../../assets/vectors/Logo.svg';

import Landing1 from '../../assets/vectors/landing1.png';
import Report from '../../assets/vectors/graphical_reportcard.png';
import Track from '../../assets/vectors/trackuseractivity.png';
import Datacard from '../../assets/vectors/exportdatacard.png';
import Visitor from '../../assets/vectors/visitorslocation.png';

import Facebook from '../../assets/vectors/facebook.svg';
import Twitter from '../../assets/vectors/twitter.svg';
import Linkedin from '../../assets/vectors/linkedin.svg';
import Instagram from '../../assets/vectors/foot-insta.svg';
import Tiktok from '../../assets/vectors/ticktock.svg';
import Redit from '../../assets/vectors/foot-redit.svg';
import Messenger from '../../assets/vectors/foot-messenger.svg';
import Discord from '../../assets/vectors/foot-discord.svg';
import Btc from '../../assets/vectors/foot-btc.svg';
import Telegram from '../../assets/vectors/foot-telegram.svg';

import Particle2 from '../../assets/vectors/particle2.png';
import Particle3 from '../../assets/vectors/particle3.png';
import Particle4 from '../../assets/vectors/particle4.png';

import Png1 from '../../assets/vectors/png1.png';
import Png2 from '../../assets/vectors/png2.png';
import Png3 from '../../assets/vectors/png3.png';
import Png4 from '../../assets/vectors/png4.png';

import Svg1 from '../../assets/img/learn-hero 1.svg';
import Svg2 from '../../assets/img/learn-hero 2.png';
import Svg3 from '../../assets/img/learn-hero 3.png';
import Svg4 from '../../assets/img/learn-hero 4.png';
import Banner from '../../assets/img/banner.png';




const Landing = () => {
  return (
    <div>
      <div id="navbar-wrapper" className="sticky-top position-relative">
        <nav
          className="
          navbar navbar-expand-lg navbar-light
          mt-2
          col-11 col-xl-10
          mx-auto
        "
        >
          <a className="navbar-brand my-auto">
            <img
              src={Logo}
              className="headerlogo"
              alt="Pro Analysis Logo"
              width="500"
              height="150"
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mx-auto">

              <li className="nav-item mx-3">
                <a
                  className="nav-link"
                  id="contactUs"
                  onclick="menuClick(this.id)"
               //   href="#contactUsSection"
                >
                  About us
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link"
                  id="roadmap"
                >
                  <Link to ='/contact'>
                  Contact Us
                  </Link>
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link"
                  id="roadmap"
                  onclick="menuClick(this.id)"
                //  href="#roadmap"
                >
                  Why Course4U
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link"
                  id="packges"
                  onclick="menuClick(this.id)"
               //   href="#roadmap"
                >
                  Courses
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="btn">
                  <Link to = "/register"><button>Sign Up</button></Link>
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="btn">
                <Link to = "/login"><button>Sign In</button></Link>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="position-relative">
        <div
          id="neon_particles"
          className="particle-className position-absolute w-100"
        ></div>
      </div>
      <div className="main-wrapper mx-auto my-3 d-flex">
        <div className="text-container text-light">
          <h2>
            Learning is essential
            <br />
            Nothing can stop you
          </h2>
          <h4>
            Free Online Courses
            <br />
            made for you
            <br />
            and track your growth along the way.
          </h4>
          <div className="button-group mt-3">
            <button className="btn button-first text-light btnstyle">Give it a try</button>
          </div>
        </div>
        <div className="img-container">
          <img
            src={Banner}
            data-tilt
            className=""
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div className="position-relative">
        <div
          id="neon_particles"
          className="particle-className position-absolute w-100"
        ></div>
      </div>
      <div className="keyfeaturesContainer mx-auto w-75">
        <div className="keyfeatureHead">Key Features</div>
        <div className="subheadKey">
          Making the learning world easier and simple for emerging education.
        </div>
        <div className="feature-card mt-5">
          <img
            src={Svg4}
            style={{height:150}}
            data-tilt
            data-aos="fade-down-right"
            alt=""
            className="mx-3"
            srcset=""
          />
          <img
            src={Svg1}
            style={{height:150}}
            alt=""
            data-tilt
            data-aos="fade-down-right"
            className="mx-3"
            srcset=""
          />
          <img
            src={Svg2}
            style={{height:150}}
            alt=""
            data-tilt
            data-aos="fade-down-left"
            className="mx-3"
            srcset=""
          />
          <img
            src={Svg3}
            style={{height:150}}
            alt=""
            data-tilt
            data-aos="fade-down-left"
            className="mx-3"
            srcset=""
          />
        </div>
      </div>
      <div className="position-relative">
        <div className="position-absolute" style={{left: "100px"}}>
          <img src={Particle2} alt="" srcset="" />
        </div>
      </div>
      <div className="keyfeaturesContainer">
        <div className="text-center mt-5 key-heading">
          <div className="keyfeatureHead">Why Choose Us</div>
        </div>
        <div className="subheadKey">
          Course4U is a secured, scalable, and a great way for learning.
        </div>
        <div className="subcontainer-odd">
          <div className="img-wrapper" data-aos="fade-down-right">
            <img src={Png1} data-tilt alt="png1" />
          </div>
          <div className="text-justify my-auto">
            <div className="text-wrapper ml-5">
              <h4 className="section-title-dark">
                Your Progress
              </h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              fermentum metus suscipit porttitor varius.
            </div>
          </div>
        </div>
        <div className="position-relative">
          <div className="position-absolute" style={{right:"0"}}>
            <img src={Particle3} alt="" srcset="" />
          </div>
        </div>
        <div className="position-relative">
          <div className="position-absolute">
            <img src={Particle4} alt="" srcset="" />
          </div>
        </div>
        <div className="subcontainer-even">
          <div className="text-justify  my-auto">
            <div className="text-wrapper bigmargin">
              <h4 className="section-title-dark text-left">
                Beautiful & interactive dashboard
              </h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              fermentum metus suscipit porttitor varius.
            </div>
          </div>
          <div className="img-wrapper" data-aos="fade-down-left">
            <img
              src={Png2}
              data-tilt
              alt="png2"
              srcset=""
            />
          </div>
        </div>
        <div className="subcontainer-odd">
          <div className="img-wrapper">
            <img
              src={Png3}
              data-tilt
              alt="png3"
              data-aos="fade-down-right"
            />
          </div>
          <div className="text-justify my-auto">
            <div className="text-wrapper ml-5">
              <h4 className="section-title-dark">
                Get Certificates
              </h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              fermentum metus suscipit porttitor varius.
            </div>
          </div>
        </div>
        <div className="position-relative">
          <div className="position-absolute" style={{right:"0"}}>
            <img src="./assets/vectors/particle3.png" alt="" srcset="" />
          </div>
        </div>
        <div className="subcontainer-even">
          <div className="text-justify my-auto">
            <div className="text-wrapper bigmargin">
              <h4 className="section-title-dark">
                Free and paid courses
              </h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              fermentum metus suscipit porttitor varius.
            </div>
          </div>
          <div className="img-wrapper mr-5">
            <img
              src={Png4}
              data-tilt
              alt="png4"
              data-aos="fade-down-left"
            />
          </div>
        </div>
      </div>
      <div className="position-relative">
        <div className="position-absolute">
          <img src={Particle4} alt="" srcset="" />
        </div>
      </div>
      <div className="footer-wrap position-relative">
        <div className="custom-shape-divider-top-1624109078">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="footer-content">
          <img src={Logos} alt="Pro Logo" />
        </div>
        <div className="footer-text">
          Makes you perfect
        </div>
        

        <div className="footer-social-wrap d-flex align-items-center">
          <a /**/href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Facebook}
              className="img-fluid"
              alt="Facebook"
            />
          </a>
          <a href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Twitter}
              className="img-fluid"
              alt="twitter"
            />
          </a>
          <a href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Linkedin}
              className="img-fluid"
              alt="linkedin"
            />
          </a>
          <a href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Instagram}
              className="img-fluid"
              alt="Instagram"
            />
          </a>
          <a href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Tiktok}
              className="img-fluid"
              alt="ticktock"
            />
          </a>
          <a href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Redit}
              className="img-fluid"
              alt="Reddit"
            />
          </a>
          <a href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Messenger}
              className="img-fluid"
              alt="Messenger"
            />
          </a>
          <a href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Discord}
              className="img-fluid"
              alt="Discord"
            />
          </a>
          <a href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Btc}
              className="img-fluid"
              alt="bitcoin"
            />
          </a>
          <a href="#" className="col-2 col-md col-xl mb-3">
            <img
              src={Telegram}
              className="img-fluid"
              alt="Telegram"
            />
          </a>
        </div>

        <div className="text-muted footer-text">
          &copy; Proanalysis 2021 &nbsp;&nbsp;&nbsp;All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Landing;
