import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthAPI } from 'api/auth';
import { setToken } from 'utils/auth';
import * as AuthActions from 'modules/auth/actions';
import authBackgroundSrc from 'images/auth background.png';

import './style.css';

const goToChat = () => global.location = '/chat';


class EmailSignup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      passwordInput: '',
      emailSignUpPending: false,
      emailSignUpFailed: false,
    };
  }

  setEmailSignUpPending = () => {
    this.setState({
      emailSignUpPending: true,
      emailSignUpFailed: false,
    });
  }

  onEmailSignUpSuccess = async (res) => {
    const { token } = await res.json();
    this.props.dispatcher.setToken(token);
    setToken(token);
    setTimeout(goToChat, 200);
  }

  setEmailSignUpFailed = () => {
    this.setState({
      emailSignUpFailed: true,
      emailSignUpPending: false,
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
    this.setEmailSignUpPending();
    AuthAPI.signupViaEmail(this.state.emailInput, this.state.passwordInput)
      .then(res => {
        if (res.status === 200) {
          this.onEmailSignUpSuccess(res);
        } else {
          this.setEmailSignUpFailed();
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
          <div className="agora-auth-form--background" style={{ backgroundImage: `url(${authBackgroundSrc})` }}></div>
          <div className="agora-auth-form">
            <h2>Signup</h2>
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
              {emailSendPending && <div>Creating your account...</div>}
              {emailSendFailed && <div>We could not send the email</div>}
            </form>
            <div>
              or <Link to="/login">login to your account</Link>
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


export default connect(mapStateToProps, mapDispatchToProps)(EmailSignup);
