import React, { Component } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

class NewJobPage extends Component {
    
    state = { 
        job: {
            title: '',
            description: '',
            skills: '',
            lastDate: ''
        },
        error: {}
    }

    schema = {
        title: Joi.string().required().label('Job Title'),
        description: Joi.string().required().label('Job Description'),
        skills: Joi.string().label('Skills') ,
        lastDate: Joi.date().min('now').required().label('Last Date to Apply')
    };

    validate = () => {
        const { error } = Joi.validate(this.state.job, this.schema, { abortEarly : false });
        if(!error)
            return;

        const errors = {};
        for(let item of error.details) 
            errors[item.path[0]] = item.message;
        return errors;
    }

    validateProperty = (name, value) => {
        const schema = {
            [name]: this.schema[name]
        }
        const obj = {
            [name]: value
        }
        const { error } = Joi.validate(obj, schema);
        return error? error.details[0].message : null;
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const error = {...this.state.error};
        const errorMessage = this.validateProperty(name, value);
        if(errorMessage)
            error[name] = errorMessage;
        else
            delete error[name];

        const job = {...this.state.job};
        job[name] = value;
        this.setState({ job, error });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ error: errors || {} });
        if(errors)  return;
        this.doSubmit();
    }

    doSubmit = async () => {
        try {
            const { recruiterId } = jwtDecode(localStorage.getItem('token'));
            console.log(recruiterId);
            const response = await axios.post('http://localhost:9000/api/jobs/add/'+recruiterId, this.state.job);
            console.log('response---',response);
            toast.success("Job Posted Successfully");
            const job = {
                title: '',
                description: '',
                skills: '',
                lastDate: ''
            };
            this.setState({job});
        } catch (error) {
            console.log('error----',error.response);
            toast.error("Unexpected Error");
        }
    }

    render() { 
        return ( 
            <div className="container">
                <ToastContainer/>
                <h3 className="text-center">Post New Job</h3>
                <form className="mx-auto" style={{width: '350px'}} onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input name="title" type="text" className="form-control" id="exampleInputTitle1" value={this.state.job.title} onChange={this.onChange} />
                        {this.state.error.title && <div className="badge badge-danger my-2 p-2">{this.state.error.title}</div>}
                    </div>
                    <div className="form-group">
                        <label>Job Description</label>
                        <input name="description" type="text" className="form-control" id="exampleInputDescription1" value={this.state.job.description} onChange={this.onChange} />
                        {this.state.error.description && <div className="badge badge-danger my-2 p-2">{this.state.error.description}</div>}
                    </div>
                    <div className="form-group">
                        <label>Skills Required</label>
                        <input name="skills" type="text" className="form-control" id="exampleInputSkills1" value={this.state.job.skills} onChange={this.onChange} />
                        {this.state.error.skills && <div className="badge badge-danger my-2 p-2">{this.state.error.skills}</div>}
                    </div>
                    <div className="form-group">
                        <label>Last Date to Apply</label>
                        <input name="lastDate" type="date" className="form-control" id="exampleInputDate1" value={this.state.job.lastDate} onChange={this.onChange}/>
                        {this.state.error.lastDate && <div className="badge badge-danger my-2 p-2">{this.state.error.lastDate}</div>}
                    </div>
                    
                    <button type="submit" className="btn btn-primary my-2">Submit</button>
                </form>
            </div>
         );
    }
}
 
export default NewJobPage;