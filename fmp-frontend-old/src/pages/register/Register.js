import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import Widget from '../../components/Widget';
import { registerUser, registerError } from '../../actions/register';
import Login from '../login';
import axiosInstance from "../../axiosAPI";

class Register extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email:""
        };

        this.doRegister = this.doRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.isPasswordValid = this.isPasswordValid.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    checkPassword() {
        if (!this.isPasswordValid()) {
            if (!this.state.password) {
                this.props.dispatch(registerError("Password field is empty"));
            } else {
                this.props.dispatch(registerError("Passwords are not equal"));
            }
            setTimeout(() => {
                this.props.dispatch(registerError());
            }, 3 * 1000)
        }
    }

    isPasswordValid() {
       return this.state.password && this.state.password === this.state.confirmPassword;
    }

    async doRegister(e) {
        e.preventDefault();
        if (!this.isPasswordValid()) {
            this.checkPassword();
        } else {
            this.props.dispatch(registerUser({
                creds: {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password
                },
                history: this.props.history
            }));
        }
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/app'}}; // eslint-disable-line

        // cant access login page while logged in
        if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
            return (
                <Redirect to={from}/>
            );
        }

        return (
            <div className="auth-page">
                <Container>
                    <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Register with Family Meal Planner</h3>}>
                        <p className="widget-auth-info">
                            Please fill all fields below.
                        </p>
                        <form onSubmit={this.doRegister}>
                            {
                                this.props.errorMessage && (
                                    <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                                        {this.props.errorMessage}
                                    </Alert>
                                )
                            }
                            <FormGroup className="mt">
                                <Label for="username">Username</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-user text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="username" className="input-transparent pl-3" value={this.state.username}
                                           onChange={this.handleChange} type="username"
                                           required name="username" placeholder="Username"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mt">
                                <Label for="email">Email</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-user text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="email" className="input-transparent pl-3" value={this.state.email}
                                           onChange={this.handleChange} type="email"
                                           required name="email" placeholder="Email"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-lock text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="password" className="input-transparent pl-3" value={this.state.password}
                                           onChange={this.handleChange} type="password"
                                           required name="password" placeholder="Password"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword">Confirm</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-lock text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="confirmPassword" className="input-transparent pl-3" value={this.state.confirmPassword}
                                           onChange={this.handleChange} onBlur={this.checkPassword} type="password"
                                           required name="confirmPassword" placeholder="Confirm"/>
                                </InputGroup>
                            </FormGroup>
                            <div className="bg-widget-transparent auth-widget-footer">
                                <Button type="submit" color="danger" className="auth-btn"
                                        size="sm" style={{color: '#fff'}}>{this.props.isFetching ? 'Loading...' : 'Register'}</Button>
                                <p className="widget-auth-info mt-4">
                                    Already have the account? Login now!
                                </p>
                                <Link className="d-block text-center mb-4" to="login">Enter the account</Link>
                            </div>
                        </form>
                    </Widget>

                </Container>
                <footer className="auth-footer">
                {new Date().getFullYear()} &copy; Family Menu Planner - A family meal planning and meal prep solution  Made by <a href="http://daveleblanc.tech/" rel="noopener noreferrer" target="_blank">Dave LeBlanc</a>.
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.register.isFetching,
        errorMessage: state.register.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Register));

