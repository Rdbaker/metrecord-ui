import React from 'react';
import { Link } from 'react-router-dom';

import EndUserDetailsPane from 'containers/EndUserDetailsPane';
import EndUserEventsPane from 'containers/EndUserEventsPane';
import LoadingPulse from 'components/LoadingPulse';
import { uuidToName } from 'utils/generateName';

import './style.css';


const EndUserPage = ({
  neverLoaded,
  endUserId,
  fetchEndUserEvents,
  loading,
}) => {
  if (neverLoaded) {
    fetchEndUserEvents(endUserId)
    return <div className="loading-container--label">Loading visitor details <LoadingPulse /></div>;
  } else if (loading) {
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
        <EndUserEventsPane endUserId={endUserId}/>
      </div>
    </div>
  );
}


export default EndUserPage;