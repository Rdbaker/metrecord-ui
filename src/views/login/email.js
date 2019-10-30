import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthAPI } from 'api/auth';
import { setToken } from 'utils/auth';
import * as AuthActions from 'modules/auth/actions';
import authBackgroundSrc from 'images/auth background.png';

import './style.css';

const goToHome = () => global.location = '/home';


class EmailLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      passwordInput: '',
      emailLoginPending: false,
      emailLoginFailed: false,
    };
  }

  setEmailLoginPending = () => {
    this.setState({
      emailLoginPending: true,
      emailLoginFailed: false,
    });
  }

  onEmailLoginSuccess = async (res) => {
    const { token } = await res.json();
    this.props.dispatcher.setToken(token);
    setToken(token);
    setTimeout(goToHome, 200);
  }

  setEmailLoginFailed = () => {
    this.setState({
      emailLoginFailed: true,
      emailLoginPending: false,
    });
  }

  onUpdateEmail = (e) => {
    this.setState({
      emailInput: e.target.value,
    });
  }

  onUpdatePassword = (e) => {
    this.setState({
      passwordInput: e.target.value,
    });
  }

  onSubmitEmail = async (e) => {
    e.preventDefault();
    this.setEmailLoginPending();
    AuthAPI.loginViaEmail(this.state.emailInput, this.state.passwordInput)
      .then(res => {
        if (res.status === 200) {
          this.onEmailLoginSuccess(res);
        } else {
          this.setEmailLoginFailed();
        }
      })
      .catch(this.setEmailSendFailed);
  }

  render() {
    const {
      emailInput,
      passwordInput,
      emailSendFailed,
      emailSendPending,
    } = this.state;

    return (
      <div>
        <main id="main-content" className="with-header">
          <div className="quicksnap-auth-form--background" style={{ backgroundImage: `url(${authBackgroundSrc})` }}></div>
          <div className="quicksnap-auth-form">
            <h2>Login</h2>
            <form onSubmit={this.onSubmitEmail}>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={emailInput} placeholder="email" onChange={this.onUpdateEmail} />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={passwordInput} onChange={this.onUpdatePassword} />
              </div>
              <div>
                <button type="submit" onClick={this.onSubmitEmail}>Go</button>
              </div>
              {emailSendPending && <div>Logging you in...</div>}
              {emailSendFailed && <div>We could not send the email</div>}
            </form>
            <div>
              or <Link to="/signup">create a new account</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}


const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    setToken: (token) => dispatch(AuthActions.setToken({ token })),
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(EmailLogin);
