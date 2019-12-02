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
  buttonType="primary",
  ...rest,
}) => {
  return (
    <button className={cx('metrecord-btn', size, className, buttonType, { disabled })} {...rest}>
      {loading ? <LoadingDots /> : children}
    </button>
  )
}

export default Button;
