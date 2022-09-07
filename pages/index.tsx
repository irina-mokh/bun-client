import { ICategory } from '../interfaces/category';
// import { useState } from 'react';

import { Section } from '../components/section';
import { wrapper, AppThunkDispatch } from '../store';
import { getAllCategories } from '../store/main/action';
import { useRouter } from 'next/router';

import { login } from '../store/auth/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../store/auth/selectors';
import { selectMain } from '../store/main/selectors';

const Home = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuth);
  //temp login
  // useEffect(() => {
  //   dispatch(login({ email: 'test2@mail.ru', password: '123456' }));
  // }, []);

  const { categories } = useSelector(selectMain);

  useEffect(() => {
    const userId = user ? user.id : 0;
    dispatch(getAllCategories(userId));
  }, [dispatch]);

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
      <main className="box grid grid-rows-[130px_130px_1fr] py-3">
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
