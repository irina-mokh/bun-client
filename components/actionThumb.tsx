import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IAction } from '../interfaces/action';
import { ICategory } from '../interfaces/category';

import { selectMain } from '../store/main/selectors';
import Action from './action';
import { Modal } from '../components/modal';

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
    <article
      className="flex justify-between border border-slate-400 rounded-lg p-1 m-1 bg-slate-200"
      onClick={() => setShowModal(true)}
    >
      <p>{id}</p>
      <p className="font-bold">{date.toLocaleDateString()}</p>
      <p>{`from: ${catFrom.name}`}</p>
      <p className="font-bold">{sum}</p>
      <p>{`to: ${catTo.name}`}</p>
      {showModal ? (
        <Modal close={closeModal} title={`Action ${id}`}>
          <Action item={props} catFrom={catFrom} catTo={catTo} />
        </Modal>
      ) : null}
    </article>
  );
};
