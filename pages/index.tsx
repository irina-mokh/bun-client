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
  const userId = user ? user.id : 0;

  const { categories, period, actions } = useSelector(selectMain);

  useEffect(() => {
    Promise.all([dispatch(getAllCategories(userId)), dispatch(getActions(0))]);
  }, [period]);

  useEffect(() => {
    categories.forEach((cat) => dispatch(updateTotalByPeriod(cat.id)));
  }, [actions]);

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

export default Home;
