import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'reactstrap';

class AuthPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated(token) {
    if (token) return true;
  }

  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    }; // eslint-disable-line

    // cant access login page while logged in
    if (
      AuthPage.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))
    ) {
      return <Redirect to={from} />;
    }

    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(AuthPage));
