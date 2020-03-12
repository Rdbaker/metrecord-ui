import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLockAlt } from '@fortawesome/pro-duotone-svg-icons';
import { withRouter } from 'react-router-dom';

import { AuthAPI } from 'api/auth';
import { setToken } from 'utils/auth';
import * as AuthActions from 'modules/auth/actions';
import { getcurrentUser } from 'modules/auth/selectors';

import './style.css';
import LoadingDots from 'components/LoadingDots/index';

const goToHome = () => global.location = '/';


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

  componentDidUpdate() {
    if (this.props.currentUser) {
      this.props.history.push('/');
    }
  }

  setEmailLoginPending = () => {
    this.setState({
      emailLoginPending: true,
      emailLoginFailed: false,
    });
  }

  onEmailLoginSuccess = async ({ token }) => {
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
      .then(this.onEmailLoginSuccess)
      .catch(this.setEmailLoginFailed)
  }

  render() {
    const {
      emailInput,
      passwordInput,
      emailLoginFailed,
      emailLoginPending,
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
              <div className="metrecord-auth-form--action active">Log In</div>
              <div className="metrecord-auth-form--action" onClick={() => history.push('/signup')}>Sign Up</div>
            </div>
            <form onSubmit={this.onSubmitEmail}>
              <div className="auth-modal-form-input--container">
                <label htmlFor="email">Email</label>
                <FontAwesomeIcon icon={faAt} alt="email" />
                <input type="email" id="email" value={emailInput} placeholder="yours@example.com" onChange={this.onUpdateEmail} />
              </div>

              <div className="auth-modal-form-input--container">
                <label htmlFor="password">Password</label>
                <FontAwesomeIcon icon={faLockAlt} alt="password" />
                <input type="password" id="password" placeholder="your password" value={passwordInput} onChange={this.onUpdatePassword} />
              </div>
              {emailLoginFailed && <div className="auth-modal-form-error">Invalid email/password</div>}
            </form>
            <button className="auth-modal-form-submit-btn" onClick={this.onSubmitEmail}>{ emailLoginPending ? <LoadingDots /> : 'Go'}</button>
          </div>
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  currentUser: getcurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    setToken: (token) => dispatch(AuthActions.setToken({ token })),
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmailLogin));
