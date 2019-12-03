import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { clientId } from 'modules/org/selectors';
import './style.css';
import LoadingDots from 'components/LoadingDots/index';

export const getSnippet = (clientId) => (`
(function(window, document) {
  if (window.metrecord) console.error('Metrecord embed already included');
  window.metrecord = {}, m = ['init', 'snap', 'track', 'debug']; window.metrecord._c = [];
  window.addEventListener('load', () => metrecord.snap());
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
    } = this.props;

    const {
      copied,
    } = this.state;

    return (
      <div className="metrecord-snippet-settings--container">
        <p>
            To add Metrecord to your app, copy the snippet of code below and paste it where you would like to record website metrics.
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clientId: clientId(state),
})

export default connect(mapStateToProps)(AccountSnippet);
