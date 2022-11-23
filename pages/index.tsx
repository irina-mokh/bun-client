import { ICategory } from '../interfaces/category';

import { Section } from '../components/section';
import { AppThunkDispatch } from '../store';
import { getAllCategories } from '../store/main/action';
import { useRouter } from 'next/router';
import styles from './home/home.module.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPeriod, updateTotalByPeriod } from '../store/main/reducer';
import { selectAuth } from '../store/auth/selectors';
import { selectMain } from '../store/main/selectors';
import { getActions } from '../store/main/action';

const Home = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuth);

  const { categories, period, actions } = useSelector(selectMain);

  useEffect(() => {
    const userId = user ? user.id : 0;
    Promise.all([dispatch(getAllCategories(userId)), dispatch(getActions(0))]).then(() =>
      categories.forEach((cat) => dispatch(updateTotalByPeriod(cat.id)))
    );
  }, []);

  useEffect(() => {
    categories.forEach((cat) => dispatch(updateTotalByPeriod(cat.id)));
  }, [period, actions, categories]);

  const incomes: ICategory[] = [];
  const assets: ICategory[] = [];
  const expenses: ICategory[] = [];

  categories.forEach((item: ICategory) => {
    switch (item.type) {
      case 'income':
        incomes.push(item);
        break;
      case 'asset':
        assets.push(item);
        break;
      case 'expense':
        expenses.push(item);
        break;
    }
  });

  if (user) {
    return (
      <main className={`box ${styles.main}`}>
        <input
          className={`input ${styles.period}`}
          type="month"
          value={period}
          onChange={(e) => dispatch(setPeriod(e.target.value))}
        ></input>
        <Section data={incomes} type="income" />
        <Section data={assets} type="asset" />
        <Section data={expenses} type="expense" />
      </main>
    );
  } else {
    router.push('/auth');
  }
};

// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//   const dispatch: AppThunkDispatch = store.dispatch;
//   // temp login
//   await dispatch(
//     login({
//       email: 'test2@mail.ru',
//       password: '123456',
//     })
//   );

//   const { user } = store.getState().auth;
//   const userId = user ? user.id : 0;

//   await dispatch(getAllCategories(userId));
//   const { categories } = store.getState().main;
//   return { props: { categories } };
// });

export default Home;
