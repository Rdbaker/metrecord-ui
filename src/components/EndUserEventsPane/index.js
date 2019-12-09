import React from 'react';

import Button from 'components/shared/Button';

import './style.css';


const mostRecentEventTime = groups => {
  const lastGroup = groups[groups.length - 1];
  const lastEvent = lastGroup[lastGroup.length - 1];
  return lastEvent.created_at;
}

const formatNum = new Intl.NumberFormat(window.navigator.language)
const formatDateFromString = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString(
    window.navigator.language,
    { month: 'short', day: '2-digit', year: 'numeric' }
  );
};

const formatTimeFromString = dateString => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(
    window.navigator.language,
  );
};

const UserContextEvent = ({
  created_at,
  location,
  document,
}) => (
  <div className="event-row--container">
    <div className="event-row--date">{formatTimeFromString(created_at)}</div>
    <div className="event-row--content">
      <div className="event-row-event-type orange">Page Load</div>
      <div className="event-row-event--value">{document.title} <a target="_blank" href={location.href}>{location.href}</a></div>
    </div>
  </div>
);

const TrackEvent = ({
  created_at,
  metric,
  value,
}) => (
  <div className="event-row--container">
    <div className="event-row--date">{formatTimeFromString(created_at)}</div>
    <div className="event-row--content">
      <div className="event-row-event-type green">Data Track</div>
      <div className="event-row-event--value">{metric}: {formatNum.format(value)}</div>
    </div>
  </div>
);

const ErrorEvent = ({
  message,
  created_at,
}) => (
  <div className="event-row--container">
    <div className="event-row--date">{formatTimeFromString(created_at)}</div>
    <div className="event-row--content">
      <div className="event-row-event-type red">Error</div>
      <div className="event-row-event--value">{message}</div>
    </div>
  </div>
)

const UnknownEvent = ({
  created_at,
}) => (
  <div className="event-row--container">
    <div className="event-row--date">{formatTimeFromString(created_at)}</div>
    <div className="event-row--content">
      <div className="event-row-event-type pink">Unknown Event</div>
    </div>
  </div>
);


const Event = ({
  event
}) => {
  switch(event.event_type) {
    case 'user_context':
      return <UserContextEvent {...event} {...event.data} />
    case 'track':
      return <TrackEvent {...event} {...event.data} />
    case 'error':
      return <ErrorEvent {...event} {...event.data} />
    default:
      return <UnknownEvent {...event} />
  }
}

const EventGroup = ({
  events,
}) => (
  <div>
    <div className="event-group--header">
      <div className="event-group-header--date">{formatDateFromString(events[0].created_at)}</div>
      <div className="event-group-header--divider"/>
    </div>
    <div className="event-group-data--container">
      {events.map(event => <Event key={event.id} event={event} />)}
    </div>
  </div>
)

const EndUserEventsPane = ({
  eventGroups = [],
  endUserId,
  fetchEndUserEvents,
}) => {
  return (
    <div className="end-user-events-pane--container">
      <h3>Event Timeline</h3>
      {eventGroups.map(group => <EventGroup key={group[0].id} events={group} />)}
      <Button buttonType="subtle" onClick={() => fetchEndUserEvents(endUserId, mostRecentEventTime(eventGroups))}>Load More</Button>
    </div>
  );
}


export default EndUserEventsPane;