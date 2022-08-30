import styles from './actionThumb.module.scss';

import { useState } from 'react';

import { IAction } from '../../interfaces/action';

import { Action } from '../action';
import { Modal } from '../modal';
import { getCategories } from '../../utils';

export const ActionThumb = (props: IAction) => {
  const { id, sum, from, to, createdAt } = props;
  const date = new Date(createdAt);

  //get categories names by ID's
  const [catFrom, catTo] = getCategories(from, to);

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
          <Action {...props} />
        </Modal>
      ) : null}
    </article>
  );
};
