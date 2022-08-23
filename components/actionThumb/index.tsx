import styles from './actionThumb.module.scss';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { IAction } from '../../interfaces/action';
import { ICategory } from '../../interfaces/category';

import { selectMain } from '../../store/main/selectors';
import { Action } from '../action';
import { Modal } from '../modal';

export const ActionThumb = (props: IAction) => {
  const { id, sum, from, to, createdAt } = props;
  const date = new Date(createdAt);

  //get categories names by ID's
  const { categories } = useSelector(selectMain);
  const catFrom = categories.find((cat: ICategory) => cat.id === from);
  const catTo = categories.find((cat: ICategory) => cat.id === to);

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <article className={styles.actionThumb} onClick={() => setShowModal(true)}>
      <p className={styles.actionThumb__id}>{id}</p>
      <p className={styles.actionThumb__date}>{date.toLocaleDateString()}</p>
      <p className={styles.actionThumb__cat}>{`from: ${catFrom.name}`}</p>
      <p className="font-bold">{sum}</p>
      <p className={styles.actionThumb__cat}>{`to: ${catTo.name}`}</p>
      {showModal ? (
        <Modal close={closeModal} title={`Action ${id}`}>
          <Action item={props} catFrom={catFrom} catTo={catTo} />
        </Modal>
      ) : null}
    </article>
  );
};
