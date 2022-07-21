import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ICategory } from '../interfaces/category';

const modalRoot = document.body;

interface ModalProps {
  data: ICategory[];
  handleClick: () => void;
}

export const Modal = (props: ModalProps) => {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  });

  el.classList.add('overlay');
  el.addEventListener('click', props.handleClick);

  const content = (
    <div className="modal">
      <button className="modal__close" onClick={props.handleClick}>
        X
      </button>
    </div>
  );

  return ReactDOM.createPortal(content, el);
};
