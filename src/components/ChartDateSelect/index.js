import React from 'react';


const threeDays = 1000 * 60 * 60 * 24 * 3;
const oneHour = 1000 * 60 * 60;


const ChartDateSelect = ({
  onChange,
}) => {
  const now = new Date();
  return (
    <div>
      <div onClick={() => onChange({ start: new Date(now - oneHour), end: now })}>last hour</div>
      <div onClick={() => onChange({ start: new Date(now - threeDays), end: now })}>last three days</div>
    </div>
  )
}

export default ChartDateSelect;
