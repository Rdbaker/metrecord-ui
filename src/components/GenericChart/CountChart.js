import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck, faTimes } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';


class CountChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isEditingTitle: false,
      titleInput: this.props.title,
    };
  }

  onChangeInput = (e) => {
    this.setState({
      messageInput: e.target.value,
    });
  }

  maybeSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.submitTitle();
    } else if (e.keyCode === 27) {
      e.preventDefault();
      this.titleCancel();
    }
  }

  submitTitle = () => {
    this.props.onTitleChange(this.state.titleInput);
    this.setState({
      isEditingTitle: false
    });
  }

  titleCancel = () => {
    this.setState({
      isEditingTitle: false,
      titleInput: this.props.title,
    })
  }


  render() {
    const {
      count,
      title,
      size,
    } = this.props

    const {
      isEditingTitle,
      titleInput,
    } = this.state

    return (
      <div className={cx("count-chart--container", size)}>
        {!isEditingTitle && <div>{title} {!!this.props.onTitleChange && <FontAwesomeIcon onClick={() => this.setState({ isEditingTitle: true })} icon={faPencil} size="xs" />}</div>}
        {isEditingTitle && <div><input value={titleInput} onKeyDown={this.maybeSubmit} onChange={(e) => this.setState({ titleInput: e.target.value })} /> <FontAwesomeIcon onClick={this.submitTitle} icon={faCheck} size="xs" /> <FontAwesomeIcon onClick={this.titleCancel} icon={faTimes} size="xs" /></div>}
        <div className="count-chart--value">
          {count}
        </div>
      </div>
    )
  }
}

export default CountChart;
