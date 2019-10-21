import React from 'react';


const sevenDays = 1000 * 60 * 60 * 24 * 7;
const threeHours = 1000 * 60 * 60 * 3;


const ChartDateSelect = ({
  onChange,
}) => {
  const now = new Date();
  return (
    <div>
      <div onClick={() => onChange({ start: new Date(now - threeHours), end: now })}>last three hours</div>
      <div onClick={() => onChange({ start: new Date(now - sevenDays), end: now })}>last seven days</div>
    </div>
  )
}

export default ChartDateSelect;
