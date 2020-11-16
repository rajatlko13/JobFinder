import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

class JobsPageRecruiter extends Component {
    state = { 
        jobList: [],
        filteredJobList: [],
        search: ''
     }

    async componentDidMount() {
        try {
            const { recruiterId } = jwtDecode(localStorage.getItem('token'));
            const jobList = await axios.get("http://localhost:9000/api/jobs/" + recruiterId);
            console.log(jobList.data.jobs);
            this.setState({ jobList: jobList.data.jobs, filteredJobList: jobList.data.jobs });

        } catch (error) {
            console.log(error);
        }
    }

    renderJobList = () => {
        const list = this.state.filteredJobList.map((job,index) => {
            return (
                <div className="col-lg-4 my-3" key={index} >
                    <Card className="mx-auto">
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

    searchJob = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const filteredJobList = this.state.jobList.filter( job => job.title.toLowerCase().indexOf(value.toLowerCase().trim())>=0);
        this.setState({ filteredJobList, search: value });
    }

    render() { 
        return ( 
            <div className="container mt-3">
                <Link to="/recruiter/newJob">
                    <Button color='green' size='small' className='px-2'><Icon name="add" className="px-1" />Post New Job</Button>
                </Link>
                <div class="input-group mt-4">
                    <input className="form-control border-white" type='search' name='search' id='search' placeholder="Search" value={this.state.search} onChange={this.searchJob} autoComplete='off' />
                    <div class="input-group-append">
                        <span class="input-group-text bg-white border border-white"><Icon name='search' className="mb-1 ml-2" /></span>
                    </div>
                </div>
                
                {this.state.filteredJobList.length>0 ?
                    <div className="row mx-auto mt-3">
                        { this.state.jobList.length? this.renderJobList() : <h1>No Jobs Posted</h1>}
                    </div> : <h2>No Job Found</h2>
                }
            </div>
         );
    }
}
 
export default JobsPageRecruiter;