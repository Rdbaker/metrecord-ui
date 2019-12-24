import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import EndUserDetailsPane from 'containers/EndUserDetailsPane';
import EndUserEventsPane from 'containers/EndUserEventsPane';
import LoadingPulse from 'components/LoadingPulse';
import { uuidToName } from 'utils/generateName';

import './style.css';
import EndUserEventPane from 'containers/EndUserEventPane';


const EndUserPage = ({
  neverLoaded,
  endUserId,
  fetchEndUserEvents,
  loading,
  endUserData,
}) => {
  if (neverLoaded) {
    fetchEndUserEvents(endUserId)
    return <div className="loading-container--label">Loading visitor details <LoadingPulse /></div>;
  } else if (loading && (!endUserData || !endUserData.length)) {
    return <div className="loading-container--label">Loading visitor details <LoadingPulse /></div>;
  }

  const name = uuidToName(endUserId);

  return (
    <div className="end-user-details--container">
      <div className="end-user-header--breadcrumbs">
        <Link to="/users">visitors</Link>
        <div>&gt;</div>
        <div>{name}</div>
      </div>
      <h1>{name}</h1>
      <div className="end-user-event-details--container">
        <EndUserDetailsPane endUserId={endUserId} />
        <Switch>
          <Route path="/users/:uuid/" exact={true} component={EndUserEventsPane} />
          <Route path="/users/:uuid/events/:eventId" exact={true} component={EndUserEventPane} />
        </Switch>
      </div>
    </div>
  );
}


export default EndUserPage;