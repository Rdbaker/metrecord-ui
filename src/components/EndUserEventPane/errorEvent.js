import React from 'react';


const dateFormat = {
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};

const getEltName = (elt) => {
  const re = new RegExp(/<(\w+) .*/, 'i');
  try {
    return re.exec(elt)[1];
  } catch (e) {
    return '';
  }
};

const getEltClass = elt => {
  const re = new RegExp(/.* class="([^"]*)".*/, 'i');
  try {
    return '.' + re.exec(elt)[1].split(' ').filter(cls => !!cls).join('.');
  } catch (e) {
    return '';
  }
}

const getEltId = elt => {
  const re = new RegExp(/.* id="([^"]*)".*/, 'i');
  try {
    return '#' + re.exec(elt)[1].split(' ').filter(id => !!id).join('#');
  } catch (e) {
    return '';
  }
}

const getInnerText = elt => {
  const re = new RegExp(/.*>([^(<\/)]*)<\/.*/, 'i');
  try {
    const innerText = re.exec(elt)[1];
    if (innerText) {
      return <strong>{innerText}</strong>;
    } else {
      return <em>no inner text</em>;
    }
  } catch (e) {
    return <em>no inner text</em>;
  }
}

const makeEltString = rawElt => {
  return <div>{getEltName(rawElt)}{getEltClass(rawElt)}{getEltId(rawElt)} {getInnerText(rawElt)}</div>;
}

const StackTraceLine = ({
  line
}) => {
  if (!line) return null;

  const [functionName, rest] = line.split('@');
  const parts = rest.split(':');
  const column = parts[parts.length - 1];
  const lineNo = parts[parts.length - 2];
  const filePath = parts.slice(0, parts.length - 2).join(':');

  return <div className="stack-trace-line--container">
    <strong>{filePath}</strong>
    in
    <strong>{functionName}</strong>
    at line, column
    <strong>{lineNo}, {column}</strong>
  </div>
}


const ClickEvent = ({
  clientTimestamp,
  elt
}) => {
  if (!clientTimestamp) return null;

  const datestr = new Date(clientTimestamp).toLocaleString(window.navigator.language, dateFormat);

  return <div className="click-event--container">
    <div className="click-event--element">{makeEltString(elt)}</div>
    <div className="click-event--timer">{datestr}</div>
  </div>
}


const ErrorEvent = ({
  clicks,
  clientTimestamp,
  message,
  stack,
  context,
}) => {
  return (<div>
    <div className="error-event-title--container">
      <div className="error-event--title">Error</div>
      <div className="error-event-title--location">{context.location.href}</div>
    </div>
    <div className="error-event-section--container">
      <div className="error-event-section--header">Error message &amp; stacktrace</div>
      <pre>{message}</pre>
      <div className="stack-trace--container">{stack.split('\n').map((line, i) => <StackTraceLine line={line} key={i} />)}</div>
    </div>
    <div className="error-event-section--container">
      <div className="error-event-section--header">Recent user click events</div>
      <div>{clicks.map(click => <ClickEvent {...click} /> )}</div>
    </div>
  </div>)
}


export default ErrorEvent;