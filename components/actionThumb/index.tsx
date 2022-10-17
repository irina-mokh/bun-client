import styles from './actionThumb.module.scss';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { IAction } from '../../interfaces/action';

import { Action } from '../action';
import { Modal } from '../modal';
import { deleteAction } from '../../store/main/action';
import { AppThunkDispatch } from '../../store';
import { getCategoriesById, splitByDigits } from '../../utils';
import { selectMain } from '../../store/main/selectors';

export const ActionThumb = (props: IAction) => {
  const { id, sum, from, to } = props;
  const router = useRouter();
  const { query } = router;
  const catId = Number(query.id);

  const dispatch: AppThunkDispatch = useDispatch();
  const { categories } = useSelector(selectMain);
  //to get categories names by ID's
  const [catFrom, catTo] = getCategoriesById(categories, from, to);
  const cat1 = catId === to ? catTo : catFrom;
  const cat2 = cat1 === catTo ? catFrom : catTo;

  const isToCurCat = catTo.id == catId;
  const isAsset = cat1.type == 'asset';
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeleteAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) dispatch(deleteAction(id));
  };

  const color = isAsset && isToCurCat ? 'text-green-400' : '';
  const total = splitByDigits(Number(sum));
  const sumWithSign = isAsset ? (isToCurCat ? total : `-${total}`) : total;

  return (
    <article className={`${styles.container} ${color}`} onClick={() => setShowModal(true)}>
      <p className={styles.id}>{id}</p>
      <p className={styles.cat}>{cat2.name}</p>
      <p className={styles.sum}>{sumWithSign}</p>
      {showModal ? (
        <Modal close={closeModal} title={`Action ${id}`}>
          <Action data={props} onSave="edit" close={closeModal} />
        </Modal>
      ) : null}
      <button onClick={handleDeleteAction} className={styles.delete}>
        🗙
      </button>
    </article>
  );
};
