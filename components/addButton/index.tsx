import styles from './addButton.module.scss';
import { useState } from 'react';
import AddCategory from '../addCategory';
import { Modal } from '../modal';

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
      <button onClick={() => setShowModal(true)} className={styles.addButton}>
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
