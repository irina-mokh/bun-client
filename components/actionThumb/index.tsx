import styles from './actionThumb.module.scss';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IAction } from '../../interfaces/action';

import { Action } from '../action';
import { Modal } from '../modal';
import { deleteAction } from '../../store/main/action';
import { AppThunkDispatch } from '../../store';
import { updateTotals } from '../../store/main/reducer';
import { getCategoriesById } from '../../utils';
import { selectMain } from '../../store/main/selectors';

export const ActionThumb = (props: IAction) => {
  const { id, sum, from, to, createdAt } = props;
  const date = new Date(createdAt);

  const dispatch: AppThunkDispatch = useDispatch();
  const { categories } = useSelector(selectMain);
  //to get categories names by ID's
  const [catFrom, catTo] = getCategoriesById(categories, from, to);

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeleteAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteAction(id));
    dispatch(updateTotals({ from, to, sum }));
  };

  return (
    <article className={styles.container} onClick={() => setShowModal(true)}>
      <p className={styles.id}>{id}</p>
      <p className={styles.date}>{date.toLocaleDateString()}</p>
      <p className={styles.cat}>{`from: ${catFrom.name}`}</p>
      <p className="font-bold">{sum}</p>
      <p className={styles.cat}>{`to: ${catTo.name}`}</p>
      {showModal ? (
        <Modal close={closeModal} title={`Action ${id}`}>
          <Action data={props} />
        </Modal>
      ) : null}
      <button onClick={handleDeleteAction} className={styles.delete}>
        🗙
      </button>
    </article>
  );
};
