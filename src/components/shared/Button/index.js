import React from 'react';
import cx from 'classnames';

import LoadingDots from 'components/LoadingDots';

import './style.css';


const Button = ({
  children,
  size="medium",
  loading=false,
  className,
  disabled=false,
  ...rest,
}) => {
  return (
    <div className={cx('metrecord-btn', size, className, { disabled })} {...rest}>
      {loading ? <LoadingDots /> : children}
    </div>
  )
}

export default Button;