import React from 'react';
import { Link } from 'react-router-dom';

import EndUserDetailsPane from 'containers/EndUserDetailsPane';
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
    return <LoadingPulse />;
  } else if (loading) {
    return <LoadingPulse />;
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
      <EndUserDetailsPane endUserId={endUserId} />
    </div>
  );
}


export default EndUserPage;