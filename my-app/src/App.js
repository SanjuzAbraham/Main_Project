import Register from './Components/Authentication/register';
import Login from './Components/Authentication/login';
import Landing from './Components/Landing/landing'; 
import Dashboard from'./Components/Admin/Dashboard/Dashboard'
//import Admin from './Components/Admin/adminp';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Useradmin from './Components/Admin/UserAdmin/useradmin';
import Teacheradmin from './Components/Admin/TeacherAdmin/teacheradmin';
import Userdashboard from './Components/dashboard/dashboard';
import UserHome from './Components/UserDashboard/userhome';
import Main from './Components/Admin/Main/Main'
import Mycourse from './Components/UserDashboard/mycourse';
import Videodashhtml from './Components/UserDashboard/videodashhtml';
import Videodashcss from './Components/UserDashboard/videodashcss';
import Videodashjs from './Components/UserDashboard/videodashjs';
import Html1 from './Components/UserDashboard/videosCollection/html1';
import Html2 from './Components/UserDashboard/videosCollection/html2';
import Css1 from './Components/UserDashboard/videosCollection/css1';
import Css2 from './Components/UserDashboard/videosCollection/css2';
import Js1 from './Components/UserDashboard/videosCollection/js1';
import Js2 from './Components/UserDashboard/videosCollection/js2';
import React1 from './Components/UserDashboard/videosCollection/react1';
import Videodash from './Components/UserDashboard/videodash';
import Forgot from './Components/Authentication/forgot';
import Profile from './Components/UserDashboard/editprofile';
import Contact from './Components/Landing/contact';
<link rel="stylesheet" href="/css/video-react.css" />;



function App() {
  return (
    <div>
      <Router>
        <Switch>
        <Route  exact path = "/" component={Landing}/>
            <Route  path = "/Admindashboard" component={Main}/>
            <Route  path = "/login" component={Login}/>
            <Route  path = "/register" component={Register}/>
            <Route path ="/useradmin" component={Useradmin}/>
            <Route path="/userhome" component={UserHome}/>
            <Route path ='/mycourse' component={Mycourse}/>
            <Route path='/videodashhtml' component={Videodashhtml}/>
            <Route path='/videodashcss' component={Videodashcss}/>
            <Route path='/videodashjs' component={Videodashjs}/>
            <Route path='/videodash' component={Videodash}/>
            <Route path = "/html1" component={Html1}/>
            <Route path = "/html2" component={Html2}/>
            <Route path = "/css1" component={Css1}/>
            <Route path = "/css2" component={Css2}/>
            <Route path = "/js1" component={Js1}/>
            <Route path = "/js2" component={Js2}/>
            <Route path= '/react1' component={React1}/>
            <Route path= '/forgot' component={Forgot}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/teacheradmin' component={Teacheradmin}/>
        </Switch>
      </Router>     
    </div>
  );
}

export default App;
