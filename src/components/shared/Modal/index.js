import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

import './style.css';

const Modal = ({
  onClose,
  children,
  isOpen,
  title,
  className,
}) => (isOpen &&
  <div className={cx("modal--container", className)}>
    <div className="modal-overlay--container" onClick={onClose}></div>
    <div className="modal-content--container">
      <div className="modal-content-title--container">{title} <span className="modal-close" onClick={onClose}><FontAwesomeIcon icon={faTimes} size="lg" /></span></div>
      <div className="modal-content-body--container">{children}</div>
    </div>
  </div>
)

export default Modal;
