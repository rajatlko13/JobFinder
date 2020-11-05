import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import VerifyAuthentication from '../utilities/verifyAuthentication';
import JobFinder from '../images/jobFinder';
import LoginRecruiter from '../images/loginRecruiter';
import { Button, Icon } from 'semantic-ui-react';

class Navbar extends Component {
    state = { 
        recruiter: '',
        user: ''
     }

    componentDidMount() {
        const recruiter = VerifyAuthentication.isRecruiterAuthenticated();
        const user = VerifyAuthentication.isUserAuthenticated();
        this.setState({ recruiter, user });
    }

    render() { 

        const { recruiter, user } = this.state;

        return ( 
            <nav className="navbar navbar-expand-lg navbar-dark text-white">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{marginRight: '0'}}>JobFinder<JobFinder width='45px' /></Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ml-4" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
                            <NavLink className="nav-link" to="/features">Features</NavLink>
                            { !recruiter && !user &&
                            <React.Fragment>
                                <NavLink className="nav-link" to="/login">Login</NavLink> 
                                <NavLink className="nav-link" to="/userRegistration">User Registration</NavLink>
                                <NavLink className="nav-link" to="/recruiterRegistration">Recruiter Registration</NavLink>
                            </React.Fragment> }
                            { recruiter && 
                            <React.Fragment>
                                <NavLink className="nav-link" to="/recruiter/jobs">Jobs</NavLink>
                                <NavLink className="nav-link" to="/logout" style={{position: 'fixed', right: '15px'}}>
                                    <Button inverted color="red"><Icon name="sign-out" />Logout</Button>
                                </NavLink>
                            </React.Fragment> }
                            { user && 
                            <React.Fragment>
                                <NavLink className="nav-link" to="/userPage1">UserPage1</NavLink>
                                <NavLink className="nav-link" to="/quizPageUser">Quizzes</NavLink>
                                <NavLink className="nav-link" to="/userCoins">QuizCoins</NavLink>
                                <NavLink className="nav-link" to="/logout" style={{position: 'fixed', right: '15px'}}>
                                    <Button inverted color="red"><Icon name="sign-out" />Logout</Button>
                                </NavLink>
                            </React.Fragment> }
                        </div>
                    </div>
                </div>
            </nav>
         );
    }
}
 
export default Navbar;