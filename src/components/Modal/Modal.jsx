import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', clickKeyDown);

    return () => {
      window.removeEventListener('keydown', clickKeyDown);
    };
  });

  const clickBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const clickKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={clickBackdrop}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;
