import styles from './category.module.scss';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useEffect } from 'react';

import { AppThunkDispatch } from '../../store';
import { getActions } from '../../store/main/action';
import { ActionThumb } from '../../components/actionThumb';
import { ICategory } from '../../interfaces/category';
import { deleteCategory } from '../../store/main/action';
import { selectMain } from '../../store/main/selectors';
import { IAction } from '../../interfaces/action';

export default function Category() {
  const router = useRouter();
  const { query } = router;
  const id = Number(query.id);

  const dispatch: AppThunkDispatch = useDispatch();
  const { actions: allActs, categories } = useSelector(selectMain);
  const category = categories.find((cat: ICategory) => cat.id == id);
  useEffect(() => {
    dispatch(getActions(id));
  }, [dispatch]);

  //  create a set of dates
  const dates = new Set();
  allActs.forEach((act: IAction) => {
    dates.add(act.date);
  });

  // create a  rendered element
  const actionsByDate = Array.from(dates).map((date) => {
    const filteredActs = allActs.filter((act: IAction) => act.date === date);
    const renderedActs = filteredActs.map((action: IAction) => (
      <li key={action.id}>
        <ActionThumb {...action}></ActionThumb>
      </li>
    ));
    return (
      <li key={String(date)}>
        <p className={styles.date}>{new Date(String(date)).toLocaleDateString()}</p>
        <ul className={styles.list}>{renderedActs}</ul>
      </li>
    );
  });

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
    // move to main page
    router.push('/');
  };

  return (
    <div className="box flex flex-col justify-start">
      <Link href="/">
        <a className={styles.back}>{`< Back`}</a>
      </Link>
      <h2 className={styles.title}>{category?.name}</h2>
      <ul className={styles.content}>{actionsByDate}</ul>
      <button className="btn btn_red" onClick={handleDelete}>
        Delete category
      </button>
    </div>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
//   const id = Number(ctx.params?.id);
//   const dispatch: AppThunkDispatch = store.dispatch;
//   await dispatch(getActions(id));
//   const { actions, categories } = store.getState().main;
//   const category = categories.filter((cat: ICategory) => cat.id == id);
//   return {
//     props: {
//       cat: category.length ? category[0] : [],
//       acts: actions,
//     },
//   };
// });
