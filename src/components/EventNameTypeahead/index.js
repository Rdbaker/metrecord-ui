import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/pro-regular-svg-icons';

import LoadingDots from 'components/LoadingDots/index';

import './style.css';

let timeoutId = null;

const numFmtr = new Intl.NumberFormat(navigator.languages, {notation: 'compact'});

const highlightWords = (line, word) => {
  const regex = new RegExp( '(' + word + ')', 'gi' );
  return line.replace( regex, "<strong>$1</strong>" );
}

const htmlDecode = (input) => {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

const TypeaheadResult = ({
  name,
  last_seen: lastSeen,
  first_seen: firstSeen,
  count,
  searchString,
  onClick,
}) => (
  <div className="typeahead-result--container" onClick={onClick}>
    <div className="typeahead-top-row--container">
      <div className="typeahead-name--container">
        <div className="typeahead-result-field--label">name</div>
        <div className="typeahead-result-name" dangerouslySetInnerHTML={{ __html: highlightWords(htmlDecode(name), searchString) }} />
      </div>
      <div className="typeahead-events-count-badge"><div className="typeahead-result-field--label">events</div><div className="typeahead-result-field--value">{numFmtr.format(count)}</div></div>
    </div>
    <div className="typeahead-bottom-row--container">
      <div>
        <div className="typeahead-result-field--label">first seen</div>
        <div className="typeahead-result-field--value">{new Date(lastSeen).toLocaleDateString(navigator.languages, { dateStyle: 'medium' })}</div>
      </div>
      <div>
        <FontAwesomeIcon icon={faLongArrowRight} />
      </div>
      <div>
        <div className="typeahead-result-field--label">last seen</div>
        <div className="typeahead-result-field--value">{new Date(firstSeen).toLocaleDateString(navigator.languages, { dateStyle: 'medium' })}</div>
      </div>
    </div>
  </div>
)

const NoResults = ({
  name
}) => {
  if (!name || name.length > 1) {
    return <div className="typeahead-no-results">no results</div>
  } else {
    return <div className="typeahead-no-results">no results - try 2 or more letters</div>
  }
}

const EventNameTypeahead = ({
  dispatcher: {
    fetchNameTypeahead,
  },
  typeaheadStale,
  typeaheadLoading,
  typeaheadData,
  onClick,
}) => {
  const [name, setName] = useState('');
  // need to timeout us being able to show no results to wait for the
  // fetch action to be dispatched
  const [canShowNoResults, setCanShowNoResults] = useState(true);
  const chooseOption = (option) => {
    setName(option.name);
    onClick(option);
    setCanShowNoResults(false);
  };
  const loading = typeaheadLoading(name);
  const data = typeaheadData(name);

  const fetchData = (val) => {
    if (typeaheadStale(val) && !typeaheadLoading(val) && !!val) {
      fetchNameTypeahead(val);
    }
  }

  const updateName = (e) => {
    const val = e.target.value;
    setCanShowNoResults(false);
    setName(val);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fetchData(val);
      setCanShowNoResults(true);
    }, 120);
  }

  return (
    <div className="event-typeahead--container">
      <label autoComplete="off" htmlFor="event-name" className="event-typeahead--label">Search events by name</label>
      <input id="event-name" placeholder="Event name..." className="event-typeahead-input" value={name} onChange={updateName} />
      {loading && <div className="event-typeahead-loading">Loading<LoadingDots /></div>}
      {!!name && !loading &&
        <div className="typeahead-results--container">
          {!!data.length && data.map((res, i) => <TypeaheadResult key={i} {...res} searchString={name} onClick={() => chooseOption(res)} />)}
          {!data.length && canShowNoResults && <NoResults name={name} />}
        </div>
      }
    </div>
  )
}

export default EventNameTypeahead;
