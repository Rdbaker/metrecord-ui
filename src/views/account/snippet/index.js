import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { clientId, clientSecret, orgId, orgCreatedAt } from 'modules/org/selectors';
import './style.css';
import LoadingDots from 'components/LoadingDots/index';

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString(window.navigator.language, { month: 'short', day: 'numeric', year: 'numeric' })
}

export const getSnippet = (clientId) => (`
(function(window, document) {
  if (window.metrecord) console.error('Metrecord embed already included');
  window.metrecord = {}, m = ['init', 'open', 'submit', 'debug']; window.metrecord._c = [];
  m.forEach(me => window.metrecord[me] = function() {window.metrecord._c.push([me, arguments])});
  var elt = document.createElement('script');
  elt.type = "text/javascript"; elt.async = true;
  elt.src = "https://js.metrecord.com/widget/shim.js";
  var before = document.getElementsByTagName('script')[0];
  before.parentNode.insertBefore(elt, before);
})(window, document, undefined);
metrecord.init('${clientId}');`)

class AccountSnippet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };
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
      clientId,
      orgId,
      clientSecret,
      orgCreatedAt,
    } = this.props;

    const {
      copied,
    } = this.state;

    return (
      <div className="metrecord-snippet-settings--container">
        <p>
            To add Metrecord to your app, copy the snippet of code below and paste it where you would like to get user feedback.
        </p>
        {!clientId &&
          <div>Loading your snippet <LoadingDots /></div>
        }
        {clientId &&
          <pre className="metrecord-snippet" type="multi" onClick={this.copySnippet}>
            {getSnippet(clientId)}
          </pre>
        }
        <div className={cx('metrecord-snippet-copied--text', { visible: copied })}>copied to clipboard!</div>
        <textarea className="metrecord-snippet-textarea" readOnly={true} ref={elt => this.textArea = elt} value={getSnippet(clientId)} />
        <div>
          <div>Extra info about your account</div>
          <div className="org-settings-extra-info--container">
            <div><strong>ID</strong> <small>{orgId}</small></div>
            <div><strong>Created</strong> <small>{formatDate(orgCreatedAt)}</small></div>
            <div><strong>Client ID</strong> <small>{clientId}</small></div>
            <div><strong>Client secret</strong> <small>{clientSecret}</small></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clientId: clientId(state),
  clientSecret: clientSecret(state),
  orgId: orgId(state),
  orgCreatedAt: orgCreatedAt(state),
})

export default connect(mapStateToProps)(AccountSnippet);
