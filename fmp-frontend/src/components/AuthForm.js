import logo200Image from 'assets/img/logo/logo_200.png';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { loginUser } from '../actions/user';
import { registerUser, registerError } from '../actions/register';
class AuthForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async handleSubmit(event)  {
    if (this.isSignup) {
      alert('signup')
    }
    else {
      alert('login')
      this.props.dispatch(loginUser({creds: {
        username: this.state.username,
        password: this.state.password
      },
      history: this.props.history}));
    }
    event.preventDefault();
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      emailLabel,
      emailInputProps,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        {this.isSignup && (
          <FormGroup>
            <Label for={emailLabel}>{emailLabel}</Label>
            <Input {...emailInputProps} onChange={this.handleChange} />
          </FormGroup>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} onChange={this.handleChange} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} onChange={this.handleChange}/>
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  emailLabel: PropTypes.string,
  emailInputProps: PropTypes.object,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  emailLabel: 'E-mail',
  emailInputProps: {
    type: 'email',
    name: 'email',
    placeholder: 'E-mail',
  },
  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'username',
    name: 'username',
    placeholder: 'Username',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    name: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    name: 'confirmPassword',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};


function mapStateToProps(state) {
  return {
      isFetching: state.auth.isFetching,
      isAuthenticated: state.auth.isAuthenticated,
      errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(AuthForm));
