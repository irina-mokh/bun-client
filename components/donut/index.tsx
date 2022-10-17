import styles from './donut.module.scss';

import { ICategory } from '../../interfaces/category';
import { IAction } from '../../interfaces/action';

import Link from 'next/link';
import { useState, useRef, MutableRefObject } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { AppThunkDispatch } from '../../store';
import { deleteCategory } from '../../store/main/action';

import { Action } from '../action';
import { Modal } from '../modal';
import { splitByDigits } from '../../utils';

export const Donut = (props: ICategory) => {
  const { name, total, id, type } = props;
  const [newAction, setNewAction] = useState<IAction>({
    from: 1,
    to: 1,
    sum: '',
    date: new Date().toISOString().split('T')[0],
  });
  const dispatch: AppThunkDispatch = useDispatch();

  // action creation modal
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  //border by category type
  let border = 'transparent';
  switch (type) {
    case 'income':
      border = 'border-slate-400';
      break;
    case 'asset':
      border = 'border-teal-500';
      break;
    case 'expense':
      border = 'border-yellow-300';
      break;
  }

  const handleDeleteCategory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
  };

  // drag and drop
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // Drag donut
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'donut',
      item: props,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 'opacity-0' : 'opacity-100',
      }),
    }),
    [props]
  );

  // Drop donut
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'donut',
      drop: async (drag: ICategory) => {
        if (drag.type == 'expense' || type === 'income' || drag.id === id) {
          return;
        }
        setNewAction((state) => ({
          ...state,
          from: drag.id,
          to: id,
        }));
        setShowModal(true);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [props]
  );

  // outline for drop area
  const isActive = canDrop && isOver;
  let outline = 'outline-transparent';
  if (isActive) {
    outline = 'outline-lime-500';
  } else if (canDrop) {
    outline = 'outline-slate-500';
  }

  drag(drop(ref));

  return (
    <>
      <Link href={`/category/${id}`}>
        <div className={`${styles.category} ${border} ${outline} ${opacity}`} ref={ref}>
          <a className={styles.category__name}>{name}</a>
          <p className={styles.category__total}>{splitByDigits(total)}</p>
          {/* temp */}
          <p className="absolute -top-4 left-0 z-10 text-slate-500 text-xs">{id}</p>

          <button onClick={handleDeleteCategory} className={`${styles.delete} close-btn`}>
            🗙
          </button>
        </div>
      </Link>
      {showModal ? (
        <Modal close={closeModal} title={`New transaction`}>
          <Action data={newAction} close={closeModal} onSave="create" />
        </Modal>
      ) : null}
    </>
  );
};
