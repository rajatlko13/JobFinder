import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

class JobsPageRecruiter extends Component {
    state = { 
        jobList: []
     }

    async componentDidMount() {
        try {
            const { recruiterId } = jwtDecode(localStorage.getItem('token'));
            const jobList = await axios.get("http://localhost:9000/api/jobs/" + recruiterId);
            console.log(jobList.data.jobs);
            this.setState({ jobList: jobList.data.jobs });

        } catch (error) {
            console.log(error);
        }
    }

    renderJobList = () => {
        const list = this.state.jobList.map((job,index) => {
            return (
                <div className="col-lg-4 my-3" key={index} >
                    <Card>
                        <Card.Content key={job.title} header={job.title} />
                        <Card.Content key={job.description} description={job.description} />
                        <Card.Content key={index} extra>
                            <Link key='1' to={`/recruiter/job/${job._id}`} >
                                <Button color='purple'>View</Button>
                            </Link>
                        </Card.Content>
                    </Card>
                </div>
            );
        });
        return list;
    }

    render() { 
        return ( 
            <div className="container mt-3">
                <Link to="/recruiter/newJob">
                    <Button color='green' size='small' className='px-2'><Icon name="add" className="px-1" />Post New Job</Button>
                </Link>
                <div className="row container mx-auto mt-3">
                    { this.state.jobList.length? this.renderJobList() : <h1>No Jobs Posted</h1>}
                </div>
            </div>
         );
    }
}
 
export default JobsPageRecruiter;