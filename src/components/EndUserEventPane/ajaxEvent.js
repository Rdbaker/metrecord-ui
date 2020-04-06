import React from 'react';


const ErrorEvent = ({
  request,
  response,
  value,
}) => {
  return (<div>
    <div className="error-event-title--container">
      <div className="error-event--title">Ajax request</div>
    </div>
    <div>
      <div>{request.options.method} to <a href={request.uri} target="_blank">{request.uri}</a> returned [{response.status}] after {value}ms</div>
    </div>
  </div>)
}


export default ErrorEvent;