import React, { Component } from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSnippet } from '../account/snippet';

import './style.css';


class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.checkIfNeedsOnboarding();
  }

  checkIfNeedsOnboarding = () => {
    this.setState({ loading: false });
  }

  copySnippet = () => {
    this.textArea.focus();
    this.textArea.select();
    document.execCommand('copy');
  }

  render() {
    const {
      loading,
    } = this.state;

    if (loading) {
      return null;
    }

    const {
      clientId,
    } = this.props;

    return (
      <div className="agora-onboarding-container">
        <h1>Get started</h1>
        <p>follow these simple steps to get started with Agora</p>
        <h3>1. Install the widget</h3>
        <p>Click the snippet to copy it to your clipboard</p>
        <pre className="agora-snippet" onClick={this.copySnippet}>{getSnippet(clientId)}</pre>
        <textarea className="agora-snippet-textarea" ref={elt => this.textArea = elt} value={getSnippet(clientId)} />
        <h3>2. Configure your settings</h3>
        <p>Head to <Link to="/settings">your settings</Link> to customize your widget</p>
        <h3>3. Start chatting</h3>
        <p>Take a look at <Link to="/chat">the chat view</Link> to see the community chat on your site</p>
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  clientId: path(['org', 'data', 'client_id'], state),
});


export default connect(mapStateToProps)(Onboarding);