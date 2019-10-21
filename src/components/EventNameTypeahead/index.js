import React, { useState, Fragment } from 'react';

import './style.css';

let timeoutId = null;

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
}) => (
  <div>
    <div>
      <div>name</div>
      <div dangerouslySetInnerHTML={{ __html: highlightWords(htmlDecode(name), searchString) }} />
      <div>events {count}</div>
    </div>
    <div>
      <div>
        <div>first seen</div>
        <div>{new Date(lastSeen).toLocaleDateString()}</div>
      </div>
      <div>
        <div>last seen</div>
        <div>{new Date(firstSeen).toLocaleDateString()}</div>
      </div>
    </div>
  </div>
)

const EventNameTypeahead = ({
  dispatcher: {
    fetchNameTypeahead,
  },
  typeaheadStale,
  typeaheadLoading,
  typeaheadData,
}) => {
  const [name, setName] = useState('');
  // need to timeout us being able to show no results to wait for the
  // fetch action to be dispatched
  const [canShowNoResults, setCanShowNoResults] = useState(true);
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
      <input placeholder="Event name..." className="event-typeahead-input" value={name} onChange={updateName} />
      {loading && <div>Loading...</div>}
      {!!name && !loading &&
        <Fragment>
          {!!data.length && <div className="typeahead-results--container">{data.map((res, i) => <TypeaheadResult key={i} {...res} searchString={name} />)}</div>}
          {!data.length && canShowNoResults && <div>no results</div>}
        </Fragment>
      }
    </div>
  )
}

export default EventNameTypeahead;