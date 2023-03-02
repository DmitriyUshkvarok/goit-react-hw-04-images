import { Component } from 'react';
// import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.clickKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickKeyDown);
  }

  clickBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  clickKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.backdrop} onClick={this.clickBackdrop}>
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
