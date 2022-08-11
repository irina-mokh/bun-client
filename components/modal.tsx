import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  close: () => void;
  title: string;
  children: React.ReactNode;
};

export const Modal = ({ close, children, title }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    close();
  };

  const modalContent = 
    <div className="absolute top-0 left-0 w-full h-screen bg-light/50 " onClick={() => {
      close();
    }}>
      <div className="modal max-w-sm m-auto mt-2 bg-light">
        <header className="flex justify-between p-2 bg-gray text-white">
          {title && <h2>{title}</h2>}
          <button 
            className="border-none"
            onClick={closeModal}>
              🗙
          </button>
        </header>
        <div className="body">{children}</div>
      </div>
    </div>;
  
  return (isBrowser) ? ReactDOM.createPortal(modalContent, document.getElementById('modal-root')!)
  : null;
};
