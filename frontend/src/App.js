import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import UserRegistration from './pages/UserRegistration';
import RecruiterRegistration from './pages/RecruiterRegistration';
import JobsPageRecruiter from './pages/JobsPageRecruiter';
import NewJobPage from './pages/NewJobPage';
import JobDetailsRecruiter from './pages/JobDetailsRecruiter';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './utilities/ProtectedRoute';
import './App.css';

function App(props) {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
          <Route path="/home" component={Home} />
          <Route path="/features" component={Features} />
          {/* <Route path="/adminLogin" component={AdminLogin} />
          <ProtectedRoute path="/quizPageAdmin" component={QuizPageAdmin} role="admin" {...this.props} />
          <Route path="/login" component={Login} /> */}
          <Route path="/userRegistration" component={UserRegistration} />
          <Route path="/recruiterRegistration" component={RecruiterRegistration} />
          <ProtectedRoute path="/recruiter/jobs" component={JobsPageRecruiter} role="recruiter" {...props} />
          <ProtectedRoute path="/recruiter/newJob" component={NewJobPage} role="recruiter" {...props} />
          <ProtectedRoute path="/recruiter/job/:jobId" component={JobDetailsRecruiter} role="recruiter" {...props} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/:page" component={NotFoundPage} />
          <Route path="/" component={Home} />
          <Redirect to="/:page"/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
