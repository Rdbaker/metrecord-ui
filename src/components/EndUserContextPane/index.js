import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrowser, faLaptop, faMobile } from '@fortawesome/pro-duotone-svg-icons';
import { faSafari, faInternetExplorer, faChrome, faFirefox, faEdge, faApple } from '@fortawesome/free-brands-svg-icons';

import { getBrowserAndVersion, getFlagForLocale } from './helpers';

import './style.css';

const getBrowserIcon = (userAgent) => {
  const browserInfo = getBrowserAndVersion(userAgent);
  switch(browserInfo.name) {
    case 'IE':
      return faInternetExplorer;
    case 'Safari':
      return faSafari;
    case 'Chrome':
      return faChrome;
    case 'Firefox':
      return faFirefox;
    case 'Edge':
      return faEdge;
    default:
      return faBrowser;
  }
}

const getDeviceIcon = (platform) => {
  switch(platform.toLowerCase()) {
    case 'macintel':
      return <Fragment>
        <FontAwesomeIcon icon={faLaptop} />
        <FontAwesomeIcon icon={faApple} />
        </Fragment>;
    case 'iphone':
      return <Fragment>
        <FontAwesomeIcon icon={faMobile} />
        <FontAwesomeIcon icon={faApple} />
        </Fragment>;
    default:
      return null;
  }
}


const EndUserContextPane = ({
  contextEvent,
}) => {
  if (!contextEvent) {
    return (
      <div className="end-user-context-pane--container">
        <h5>No browser context could be found</h5>
      </div>
    );
  }

  return (
    <div className="end-user-context-pane--container">
      <div className="end-user-context-value--container">
        <div className="end-user-context--label">Language</div>
        <div>{getFlagForLocale(contextEvent.data.preferredLanguage)} {contextEvent.data.preferredLanguage}</div>
      </div>
      <div className="end-user-context-value--container">
        <div className="end-user-context--label">Device</div>
        <div>{getDeviceIcon(contextEvent.data.platform)} {contextEvent.data.platform}</div>
      </div>
      <div className="end-user-context-value--container">
        <div className="end-user-context--label">Browser</div>
        <div><FontAwesomeIcon icon={getBrowserIcon(contextEvent.data.userAgent)} size="1x" /> (version {getBrowserAndVersion(contextEvent.data.userAgent).version || 'unknown'})</div>
      </div>
    </div>
  );
}


export default EndUserContextPane;
