import styles from './bun.module.scss';

import { ICategory } from '../../interfaces/category';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef, MutableRefObject } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { AppThunkDispatch } from '../../store';
import { deleteCategory } from '../../store/main/action';

import { Action } from '../action';
import { Modal } from '../modal';

export const Bun = (props: ICategory) => {
  const { name, total, id, type } = props;
  const [newAction, setNewAction] = useState();
  const router = useRouter();
  const dispatch: AppThunkDispatch = useDispatch();
 // action creation modal
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  let border = 'transparent';

  switch (type) {
    case 'income':
      border = 'border-teal-600';
      break;
    case 'asset':
      border = 'border-cyan-500';
      break;
    case 'expense':
      border = 'border-yellow-300';
      break;
  }

  const handleDeleteCategory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
    router.push('/');
  };

  // drag and drop
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  // Drag task
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'bun',
      item: props,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.3 : 1,
      }),
    }),
    [props]
  );

  // Drop task
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'bun',
      drop: async (drag: ICategory) => {
        if (drag.type == 'expense' || type === 'income' || drag.id === id) {
          return;
        }
        setNewAction ({
          from: drag.id,
          to: id,
          sum: '',
        });
        setShowModal(true);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [props]
  );

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
        <div className={`${styles.category} ${border} ${outline}`} ref={ref} style={{opacity}}>
          <a className={styles.category__name}>{name}</a>
          <p className={styles.category__total}>{total}</p>
          {/* temp */}
          <p className="absolute -top-4 left-0 z-10 text-slate-500">{id}</p>

          <button onClick={handleDeleteCategory} className={styles.delete}>
            🗙
          </button>
        </div>
      </Link>
      {showModal ? (
        <Modal close={closeModal} title={`New transaction`}>
          <Action data={newAction} close={closeModal}/>
        </Modal>
      ) : null}
    </>
  );
};
