import React from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';

import Button from 'components/shared/Button';
import { EventTypeOptions } from 'constants/events';

import './style.css';


const mostRecentEventTime = groups => {
  const lastGroup = groups[groups.length - 1];
  const lastEvent = lastGroup[lastGroup.length - 1];
  if (lastEvent) {
    return lastEvent.created_at;
  }
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
      <div className="event-row-event--value">{document.title} <a className="event-row-event-value--fixed-width" target="_blank" href={location.href}>{location.href}</a></div>
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
      <div className="event-row-event--value event-row-event-value--fixed-width">{message}</div>
    </div>
  </div>
)

const AjaxEvent = ({
  name,
  created_at,
}) => (
  <div className="event-row--container">
    <div className="event-row--date">{formatTimeFromString(created_at)}</div>
    <div className="event-row--content">
      <div className="event-row-event-type dark-green">Ajax</div>
      <div className="event-row-event--value event-row-event-value--fixed-width">{name}</div>
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
  event,
  onClick,
}) => {
  switch(event.event_type) {
    case 'user_context':
      return <div onClick={onClick}><UserContextEvent {...event} {...event.data} /></div>
    case 'track':
      return <div onClick={onClick}><TrackEvent {...event} {...event.data} /></div>
    case 'error':
      return <div onClick={onClick}><ErrorEvent {...event} {...event.data} /></div>
    case 'ajax':
      return <div onClick={onClick}><AjaxEvent {...event} {...event.data} /></div>
    default:
      return <div onClick={onClick}><UnknownEvent {...event} /></div>
  }
}

const EventGroup = ({
  events,
  pushHistory,
  endUserId,
}) => (
  <div>
    <div className="event-group--header">
      <div className="event-group-header--date">{formatDateFromString(events[0].created_at)}</div>
      <div className="event-group-header--divider"/>
    </div>
    <div className="event-group-data--container">
      {events.map(event => <Event key={event.id} event={event} onClick={() => pushHistory(`/users/${endUserId}/events/${event.id}`)} />)}
    </div>
  </div>
)

const EndUserEventsPane = ({
  eventGroups = [],
  endUserId,
  fetchEndUserEvents,
  moreDataLoading,
  history,
  eventFilter,
  setFilter,
}) => {
  console.log(eventGroups)
  return (
    <div className="end-user-events-pane--container">
      <div className="end-user-events-pane--title">
        <h3>Event Timeline</h3>
        <Select placeholder="filter events" className="end-user-events--filter" clearable={true} options={EventTypeOptions} value={eventFilter} onChange={setFilter} />
      </div>
      {eventGroups.map(group => {
        if (!group.length) {
          return null;
        }
        return <EventGroup key={group[0].id} events={group} pushHistory={history.push} endUserId={endUserId} />;
      })}
      <Button loading={moreDataLoading} disabled={moreDataLoading} buttonType="subtle" onClick={() => fetchEndUserEvents(endUserId, mostRecentEventTime(eventGroups))}>Load More</Button>
    </div>
  );
}


export default withRouter(EndUserEventsPane);