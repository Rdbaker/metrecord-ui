import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import LoadingPulse from 'components/LoadingPulse/index';


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

  return (
    <div>
      <div>
        <Link to={`/users/${event.end_user_id}/`}>&lt; back to timeline</Link>
        <div>{event.name}</div>
      </div>
    </div>
  );
}


export default withRouter(EndUserEventPane);