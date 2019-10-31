import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Layout from 'components/Layout';

import './styles.scss';

class Login extends Component {
  state = {
    username: ''
  };

  handleUsernameChange = e => this.setState({ username: e.target.value });

  handleLoginClick = () => this.props.history.push('/chat');

  render() {
    const { username } = this.state;

    return (
      <Layout>
        <div className="login__wrapper">
          <h1 className="title">Login Chatbot app</h1>
          <form className="login-form">
            <div className="form-control">
              <label className="label" for="username">
                Username
              </label>
              <input
                type="text"
                className="username"
                value={username}
                onChange={this.handleUsernameChange}
              />
            </div>
            <button className="login-btn" onClick={this.handleLoginClick}>
              Login
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Login);
