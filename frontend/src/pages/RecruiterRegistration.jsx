import React, { Component } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddRecruiter from '../images/addRecruiter';

class RecruiterRegistration extends Component {
    state = { 
        recruiter: {
            company: '',
            email: '',
            contact: '',
            password: ''
        },
        error: {}
    }

    schema = {
        company: Joi.string().required().label('Company Name'),
        email: Joi.string().email().required().label('Email'),
        contact: Joi.number().positive().required().label('Contact No.') ,
        password: Joi.string().required().label('Password')
    };

    validate = () => {
        const { error } = Joi.validate(this.state.recruiter, this.schema, { abortEarly : false });
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

        const recruiter = {...this.state.recruiter};
        recruiter[name] = value;
        this.setState({ recruiter, error });
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
            const response = await axios.post('http://localhost:9000/api/recruiter/register', this.state.recruiter);
            console.log('response---',response);
            toast.success("Registration Successful");
            const recruiter = {
                company: '',
                email: '',
                contact: '',
                password: ''
            };
            this.setState({recruiter});
        } catch (error) {
            console.log('error----',error.response);
            //const {data} = error.response;
            if(error.response && error.response.status === 400)
                toast.error("Email already registered!");
            if(error.response === undefined)
                toast.error("Unexpected Error");
        }
        
    }

    render() { 
        return ( 
            <div className="container">
                <ToastContainer />
                <h5 className="text-center">Recruiter Registration</h5>
                <div className="text-center">
                    <AddRecruiter width="120px" />
                </div>
                <form className="mx-auto" style={{width: '350px'}} onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input name="company" type="text" className="form-control" id="exampleInputCompany1" value={this.state.recruiter.company} onChange={this.onChange} />
                        {this.state.error.company && <div className="badge badge-danger my-2 p-2">{this.state.error.company}</div>}
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.recruiter.email} onChange={this.onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        {this.state.error.email && <div className="badge badge-danger my-2 p-2">{this.state.error.email}</div>}
                    </div>
                    <div className="form-group">
                        <label>Contact No.</label>
                        <input name="contact" type="number" min="0" className="form-control" id="exampleInputContact1" value={this.state.recruiter.contact} onChange={this.onChange} />
                        {this.state.error.contact && <div className="badge badge-danger my-2 p-2">{this.state.error.contact}</div>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" value={this.state.recruiter.password} onChange={this.onChange}/>
                        {this.state.error.password && <div className="badge badge-danger my-2 p-2">{this.state.error.password}</div>}
                    </div>
                    
                    <button type="submit" className="btn btn-primary my-2">Submit</button>
                </form>
            </div>
         );
    }
}
 
export default RecruiterRegistration;