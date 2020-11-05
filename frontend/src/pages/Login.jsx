import React, { Component } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import LoginRecruiter from '../images/loginRecruiter';
import LoginUser from '../images/loginUser';

// axios.interceptors.response.use(null, error => {
//     const expError = error.response && error.response.status>=400 && error.response.status<500;
//     if(!expError){
//         //console.log('Unexpected Error');
//         toast.error('Unexpected Error');
//     }
//     console.log("Promise---",Promise.reject(error));
//     return Promise.reject(error);
// });

class Login extends Component {
    state = { 
        user: {
            email: '',
            password: ''
        },
        recruiter: {
            email: '',
            password: ''
        },
        error: {
            user: {},
            recruiter: {}
        }
    };

    schema = {
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    }

    validateUser = () => {
        console.log("in validateUser");
        const { error } = Joi.validate(this.state.user, this.schema);
        const errors = {
            user: {},
            recruiter: {}
        };
        if(!error) {
            errors.user.email = null;
            errors.user.password = null;
            return errors;
        }
        
        for(let item of error.details)
            errors.user[item.path[0]] = item.message;
        return errors;
    }

    validateRecruiter = () => {
        console.log("in validateRecruiter");
        const { error } = Joi.validate(this.state.recruiter, this.schema);
        const errors = {
            user: {},
            recruiter: {}
        };
        if(!error) {
            errors.recruiter.email = null;
            errors.recruiter.password = null;
            return errors;
        }
        
        for(let item of error.details)
            errors.recruiter[item.path[0]] = item.message;
        return errors;
    }

    validateProperty = (name, value) => {
        const schema1 = {
            [name]: this.schema[name]
        }
        const obj = {
            [name]: value
        }
        const {error} = Joi.validate(obj, schema1);
        //console.log(error.details);
        return error ? error.details[0].message : null;
    }

    onChangeUser = (e) => {
        console.log("in onChangeUser");
        const name = e.target.name;
        const value = e.target.value;

        const error = { ...this.state.error };
        const errorMessage = this.validateProperty(name,value);
        //console.log(errorMessage);
        if (errorMessage) error.user[name] = errorMessage;
        else delete error.user[name];
        const user = {...this.state.user};
        user[name] = value;
        this.setState({ user, error});
    }

    onChangeRecruiter = (e) => {
        console.log("in onChangeRecruiter");
        const name = e.target.name;
        const value = e.target.value;

        const error = { ...this.state.error };
        const errorMessage = this.validateProperty(name,value);
        //console.log(errorMessage);
        if (errorMessage) error.recruiter[name] = errorMessage;
        else delete error.recruiter[name];
        const recruiter = {...this.state.recruiter};
        recruiter[name] = value;
        this.setState({ recruiter, error});
    }

    handleSubmitUser = async (e) => {
        e.preventDefault();
        console.log("in handleSubmitUser");

        const errors = this.validateUser();
        //console.log("ERR-",errors);
        this.setState({error : errors});
        if(errors.user.email || errors.user.password)
            return;
        this.doSubmitUser();
    }

    handleSubmitRecruiter = async (e) => {
        e.preventDefault();
        console.log("in handleSubmitRecruiter");

        const errors = this.validateRecruiter();
        this.setState({error : errors});
        if(errors.recruiter.email || errors.recruiter.password)
            return;
        this.doSubmitRecruiter();
    }

    doSubmitUser = async () => {
        try {
            console.log("in doSubmitUser");
            const response = await axios.post('http://localhost:9000/api/user/login', this.state.user);

            const { data } = response;
            console.log(data.token);
            localStorage.setItem('token', data.token);
            const user = {
                email: '',
                password: ''
            };
            this.setState({user});
            window.location = '/';
        } catch (error) {
            console.log('error----',error.response);
            //const {data} = error.response;
            if(error.response && error.response.status === 404)
                toast.error("Invalid Details");
            if(error.response && error.response.status === 401)
                toast.error("Wrong Password");
            if(error.response === undefined || error.response.status === 400)
                toast.error("Unexpected Error");
        }
    }

    doSubmitRecruiter = async () => {
        try {
            console.log("in doSubmitRecruiter");
            const response = await axios.post('http://localhost:9000/api/recruiter/login', this.state.recruiter);
    
            const { data } = response;
            console.log(data.token);
            localStorage.setItem('token', data.token);
            const recruiter = {
                email: '',
                password: ''
            };
            this.setState({recruiter});
            window.location = '/';
        } catch (error) {
            console.log('error----',error.response);
            //const {data} = error.response;
            if(error.response && error.response.status === 404)
                toast.error("Invalid Details");
            if(error.response && error.response.status === 401)
                toast.error("Wrong Password");
            if(error.response === undefined || error.response.status === 400)
                toast.error("Unexpected Error");
        }
    }
    
    render() { 
        return ( 
            <div >
                <ToastContainer />
                <div className="row mx-auto my-auto" style={{width: '850px'}}>
                    <div className="card col-lg-5 mx-auto my-4 bg-secondary" style={{borderWidth: '3px', borderColor: 'black'}}>
                        <h4 className="pt-3 mx-auto">User Login</h4>
                        <hr className="w-50 mx-auto" />
                        <div className="card-img-top mx-auto" style={{width: '200px'}} >
                            <LoginUser />
                        </div>
                        <div className="card-body p-0 pt-3"> 
                            <form className="container my-auto" onSubmit={this.handleSubmitUser}>
                                <div className="form-group">
                                    <label className="font-weight-bold">Email address</label>
                                    <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.user.email} onChange={this.onChangeUser} />
                                    {this.state.error.user.email && <Label color='red' className="mt-2">{this.state.error.user.email}</Label>}
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Password</label>
                                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" value={this.state.user.password} onChange={this.onChangeUser}/>
                                    {this.state.error.user.password && <Label color='red' className="mt-2">{this.state.error.user.password}</Label>}
                                </div>

                                <Button type="submit" className="mt-1 mb-3 ml-1" color="green">Login</Button>
                            </form>
                        </div>
                    </div>
                    <div className="card col-lg-5 mx-auto my-4 bg-secondary" style={{borderWidth: '3px', borderColor: 'black'}}>
                        <h4 className="pt-3 mx-auto">Recruiter Login</h4>
                        <hr className="w-50 mx-auto" />
                        <div className="card-img-top mx-auto" style={{width: '200px'}} >
                            <LoginRecruiter/>
                        </div>
                        <div className="card-body p-0 pt-3">
                            <form className="container my-auto" onSubmit={this.handleSubmitRecruiter}>
                                <div className="form-group">
                                    <label className="font-weight-bold">Email address</label>
                                    <input name="email" type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" value={this.state.recruiter.email} onChange={this.onChangeRecruiter} />
                                    {this.state.error.recruiter.email && <Label color='red' className="mt-2">{this.state.error.recruiter.email}</Label>}
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Password</label>
                                    <input name="password" type="password" className="form-control" id="exampleInputPassword2" value={this.state.recruiter.password} onChange={this.onChangeRecruiter}/>
                                    {this.state.error.recruiter.password && <Label color='red' className="mt-2">{this.state.error.recruiter.password}</Label>}
                                </div>

                                <Button type="submit" className="mt-1 mb-3 ml-1" color="green">Login</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Login;