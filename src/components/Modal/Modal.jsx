import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', clickKeyDown);
  }, []);

  const clickBackdrop = e => {
    if (e.currentTarget === e.target) {
      window.removeEventListener('keydown', clickKeyDown);
      onClose();
    }
  };

  const clickKeyDown = e => {
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', clickKeyDown);
      onClose();
      console.log(e);
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
