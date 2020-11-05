import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Label } from 'semantic-ui-react';

class JobDetailsRecruiter extends Component {
    state = { 
        job: ''
     }

    async componentDidMount() {
        try {
            const { recruiterId } = jwtDecode(localStorage.getItem('token'));
            const job = await axios.get(`http://localhost:9000/api/jobs/${recruiterId}/${this.props.match.params.jobId}`);
            this.setState({ job: job.data.jobs[0] });
        } catch (error) {
            console.log(error);
        }
    }

    getLastDate = () => {
        const { lastDate } = this.state.job;
        const str= new Date(lastDate);
        return str.toUTCString();
    }

    render() { 
        const {title, description, skills, lastDate} = this.state.job;
        return ( 
            <div className="container mt-2">
                <h2 className="text-danger">Job Details</h2>
                <h4>Job Title : <span className="text-white">{title}</span></h4>
                <h4>Job Description : <span className="text-white">{description}</span></h4>
                <h4>Skills Required : <span className="text-white">{skills}</span></h4>
                <h4>Last Date to Apply : <span className="text-white">{this.getLastDate()}</span></h4>
            </div>
         );
    }
}
 
export default JobDetailsRecruiter;