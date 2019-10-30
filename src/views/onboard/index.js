import React, { Component } from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { getSnippet } from '../account/snippet';

import './style.css';
import { EventsAPI } from 'api/events';


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

  checkIfNeedsOnboarding = async () => {
    try {
      const { has_any_events: doesntNeedOnboarding } = await EventsAPI.hasAny();
      if (doesntNeedOnboarding) {
        this.props.history.push('/home');
      } else {
        this.setState({ loading: false });
      }
    } catch (e) {
      console.warn(e)
      this.setState({ loading: false });
    }
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
      <div className="quicksnap-onboarding-container">
        <h1>Get started</h1>
        <p>follow these simple steps to get started with Quicksnap</p>
        <h3>1. Install the embed</h3>
        <p>Click the snippet to copy it to your clipboard</p>
        <pre className="quicksnap-snippet" onClick={this.copySnippet}>{getSnippet(clientId)}</pre>
        <textarea className="quicksnap-snippet-textarea" ref={elt => this.textArea = elt} value={getSnippet(clientId)} />
        <h3>2. Configure your settings</h3>
        <p>Head to <Link to="/settings">your settings</Link> to customize your widget</p>
        <h3>3. View metrics</h3>
        <p>Take a look at <Link to="/home">the dashboard view</Link> to see the page load speeds on your site</p>
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  clientId: path(['org', 'data', 'client_id'], state),
});


export default connect(mapStateToProps)(withRouter(Onboarding));
