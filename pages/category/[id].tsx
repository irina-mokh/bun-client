import styles from './category.module.scss';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { AppThunkDispatch } from '../../store';
import { getActions } from '../../store/main/action';
import { ActionThumb } from '../../components/actionThumb';
import { ICategory } from '../../interfaces/category';
import { deleteCategory, editCategory } from '../../store/main/action';
import { selectMain } from '../../store/main/selectors';
import { IAction } from '../../interfaces/action';
import { ConfirmDialog } from '../../components/confirmDialog';

export default function Category() {
  const router = useRouter();
  const { query } = router;
  const id = Number(query.id);

  const [showDialog, setShowDialog] = useState(false);

  const dispatch: AppThunkDispatch = useDispatch();
  const { actions: allActs, categories } = useSelector(selectMain);
  const curActions = allActs.filter((act) => act.from == id || act.to == id);
  console.log('filtered actions', curActions);
  const category = categories.find((cat: ICategory) => cat.id == id);
  useEffect(() => {
    dispatch(getActions(id));
  }, [dispatch]);

  //  create a set of dates
  const dates = new Set<string>();
  curActions.forEach((act: IAction) => {
    dates.add(act.date);
  });
  function dateToNum(d: string) {
    const s = d.split('-');
    return Number(s[0] + s[1] + s[2]);
  }
  // create a  rendered element
  const actionsByDate = Array.from(dates)
    .sort((a, b) => dateToNum(b) - dateToNum(a))
    .map((date) => {
      const filteredActs = curActions.filter((act: IAction) => act.date === date);
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

  const handleDeleteCategory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
    // move to main page
    router.push('/');
  };

  const [name, setName] = useState(category?.name);
  const editCategoryName = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category) {
      dispatch(
        editCategory({
          ...category,
          name: name ? name : category.name,
        })
      );
    }
  };

  return (
    <div className="box flex flex-col justify-start">
      <Link href="/">
        <a className={styles.back}>{`< Back`}</a>
      </Link>
      <form onSubmit={editCategoryName} className={styles.header}>
        <input
          className={styles.title}
          title="edit category title"
          autoComplete="off"
          defaultValue={name}
          name="categoryName"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" className={styles.submit} value="&#10003;" />
      </form>
      <ul className={styles.content}>{actionsByDate}</ul>
      <button className="btn btn_red" onClick={() => setShowDialog(true)}>
        Delete category
      </button>
      {showDialog && (
        <ConfirmDialog
          confirmText={`Delete category ${category?.name.toUpperCase()}?`}
          setOpen={setShowDialog}
          onConfirm={handleDeleteCategory}
        />
      )}
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
