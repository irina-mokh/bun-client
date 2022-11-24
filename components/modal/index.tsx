import styles from './modal.module.scss';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  close: () => void,
  title: string,
  children: React.ReactNode,
};

export const Modal = ({ close, children, title }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation();
    close();
  };

  const modalContent = (
    <div
      className={styles.overlay}
      onClick={closeModal}
      onKeyDown={(e) => {
        if ((e.key = 'Escape')) {
          close();
        }
      }}
    >
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <header className={styles.popup__header}>
          {title && <h2>{title}</h2>}
          <button className="close-btn" onClick={closeModal} aria-label="close">
            🗙
          </button>
        </header>
        <div className={styles.popup__body}>{children}</div>
      </div>
    </div>
  );
  const root = document.getElementById('modal-root');
  return isBrowser && root ? ReactDOM.createPortal(modalContent, root) : null;
};
