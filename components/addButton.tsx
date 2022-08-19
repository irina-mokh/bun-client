import Link from 'next/link';
import { useState } from 'react';
import AddCategory from './addCategory';
import { Modal } from '../components/modal';

interface AddButtonProps {
  type: string;
}
export const AddButton = (props: AddButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`rounded-full w-16 h-16 flex flex-col justify-center items-center mr-2 border-2 border-dotted border-slate-400 text-2xl`}
      >
        +
      </button>
      {showModal ? (
        <Modal close={closeModal} title={`Add ${props.type}`}>
          <AddCategory type={props.type} close={closeModal} />
        </Modal>
      ) : null}
    </>
  );
};
