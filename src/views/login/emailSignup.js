import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLockAlt, faAddressCard } from '@fortawesome/pro-duotone-svg-icons';
import { withRouter } from 'react-router-dom';
import { path } from 'ramda';

import { AuthAPI } from 'api/auth';
import { setToken } from 'utils/auth';
import * as AuthActions from 'modules/auth/actions';

import './style.css';
import LoadingDots from 'components/LoadingDots/index';

const goToHome = () => global.location = '/';


class EmailSignup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nameInput: '',
      emailInput: '',
      passwordInput: '',
      emailSignUpPending: false,
      emailSignUpFailed: false,
      emailSignUpError: null,
    };
  }

  setEmailSignUpPending = () => {
    this.setState({
      emailSignUpPending: true,
      emailSignUpFailed: false,
    });
  }

  onEmailSignUpSuccess = async ({ token }) => {
    this.props.dispatcher.setToken(token);
    setToken(token);
    setTimeout(goToHome, 200);
  }

  setEmailSignUpFailed = (e) => {
    this.setState({
      emailSignUpFailed: true,
      emailSignUpPending: false,
      emailSignUpError: e,
    });
  }

  onUpdateName = (e) => {
    this.setState({
      nameInput: e.target.value,
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

  onSubmitEmail = (e) => {
    e.preventDefault();
    this.setEmailSignUpPending();
    AuthAPI.signupViaEmail(this.state.emailInput, this.state.passwordInput, this.state.nameInput)
      .then(this.onEmailSignUpSuccess)
      .catch(this.setEmailSignUpFailed);
  }

  render() {
    const {
      nameInput,
      emailInput,
      passwordInput,
      emailSignUpPending,
      emailSignUpError
    } = this.state;

    const {
      history
    } = this.props;

    return (
      <div>
        <main id="main-content" className="with-header">
          <div className="metrecord-auth-form--background"></div>
          <div className="metrecord-auth-form">
            <h1>Metrecord</h1>
            <div className="metrecord-auth-form--actions">
              <div className="metrecord-auth-form--action" onClick={() => history.push('/login')}>Log In</div>
              <div className="metrecord-auth-form--action active">Sign Up</div>
            </div>
            <form onSubmit={this.onSubmitEmail}>
              <div className="auth-modal-form-input--container">
                <label htmlFor="name">Name</label>
                <FontAwesomeIcon icon={faAddressCard} alt="name" />
                <input type="text" id="name" value={nameInput} placeholder="Jane Doe" onChange={this.onUpdateName} />
              </div>

              <div className="auth-modal-form-input--container">
                <label htmlFor="email">Email</label>
                <FontAwesomeIcon icon={faAt} alt="email" />
                <input type="email" id="email" value={emailInput} placeholder="yours@example.com" onChange={this.onUpdateEmail} />
              </div>
              {emailSignUpError && <div className="auth-modal-form-error">{path(['errors', 'email'], emailSignUpError)}</div>}

              <div className="auth-modal-form-input--container">
                <label htmlFor="password">Password</label>
                <FontAwesomeIcon icon={faLockAlt} alt="password" />
                <input type="password" id="password" placeholder="your password" value={passwordInput} onChange={this.onUpdatePassword} />
              </div>
              {emailSignUpError && <div className="auth-modal-form-error">{path(['errors', 'password'], emailSignUpError)}</div>}
              <button type="submit" className="auth-modal-form-hidden-submit-btn"></button>
            </form>
            <p className="tos-link">By signing up you agree to <a href="https://www.metrecord.com/terms" target="_blank" rel="noopener noreferrer">the terms of service</a></p>
            <button className="auth-modal-form-submit-btn" onClick={this.onSubmitEmail}>{ emailSignUpPending ? <LoadingDots /> : 'Go'}</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmailSignup));
