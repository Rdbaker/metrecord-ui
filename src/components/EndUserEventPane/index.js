import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import LoadingPulse from 'components/LoadingPulse/index';
import { EventTypes } from 'constants/events';

import ErrorEvent from './errorEvent';

import './style.css';


const EndUserEventPane = ({
  event,
  dispatcher: {
    fetchEvent,
  },
  match: {
    params: {
      eventId,
      uuid: endUserId,
    }
  },
}) => {
  if (!event) {
    fetchEvent(eventId);
    return <div className="loading-container--label">Loading event details <LoadingPulse /></div>;
  }

  if (event === 'NOT_FOUND') {
    return <div>
      <Link to={`/users/${endUserId}/`}>&lt; back to timeline</Link>
      <h3>Event not found</h3>
    </div>
  }

  let component = <div>{event.name}</div>

  if (event.event_type === EventTypes.ERROR) {
    return <ErrorEvent {...event.data} />
  }

  return (
    <div>
      <div>
        <Link to={`/users/${event.end_user_id}/`}>&lt; back to timeline</Link>
        {component}
      </div>
    </div>
  );
}


export default withRouter(EndUserEventPane);