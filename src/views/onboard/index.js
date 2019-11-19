import React, { Component } from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import cx from 'classnames';

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
    this.setState({
      copied: true,
    }, this.unsetCopied)
  }

  unsetCopied = () => {
    setTimeout(() => this.setState({ copied: false }), 2000);
  }

  render() {
    const {
      loading,
      copied,
    } = this.state;

    if (loading) {
      return null;
    }

    const {
      clientId,
    } = this.props;

    return (
      <div className="metrecord-onboarding-container">
        <h1>Get started</h1>
        <p>follow these simple steps to get started with Metrecord</p>
        <h3>1. Install the embed</h3>
        <p>Click the snippet to copy it to your clipboard</p>
        <pre className="metrecord-snippet" onClick={this.copySnippet}>{getSnippet(clientId)}</pre>
        <textarea readOnly={true} className="metrecord-snippet-textarea" ref={elt => this.textArea = elt} value={getSnippet(clientId)} />
        <div className={cx('metrecord-snippet-copied--text', { visible: copied })}>copied to clipboard!</div>
        <h3>2. Capture an event</h3>
        <p>Try recording how many page views you get!</p>
        <pre>metrecord.track('page_view')</pre>
        <h3>3. View metrics</h3>
        <p>Take a look at <Link to="/home">the dashboard view</Link> to see your default dashboard</p>
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  clientId: path(['org', 'data', 'client_id'], state),
});


export default connect(mapStateToProps)(withRouter(Onboarding));
