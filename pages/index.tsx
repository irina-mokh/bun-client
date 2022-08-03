import { ICategory } from '../interfaces/category';

import { Section } from '../components/section';
import { wrapper, AppThunkDispatch } from '../store';
import { getAllCategories } from '../store/main/action';

import { useDispatch, useSelector } from 'react-redux';

import { login } from '../store/auth/actions';
import { selectAuth } from '../store/auth/selectors';

interface HomeProps {
  categories: [ICategory];
}

const Home = ({ categories }: HomeProps) => {
  // temp
  // const dispatch: AppThunkDispatch = useDispatch();
  // const auth = useSelector(selectAuth);
  // console.log(auth);
  // dispatch(
  //   login({
  //     email: 'test2@mail.ru',
  //     password: '123456',
  //   })
  // );

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
  return (
    <main className="grid grid-rows-[120px_120px_minmax(120px,_1fr)] my-2">
      <div className="container mx-auto px-2">
        <Section data={incomes} type="income"></Section>
        <Section data={assets} type="asset"></Section>
        <Section data={expenses} type="expense"></Section>
      </div>
    </main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch: AppThunkDispatch = store.dispatch;
  // temp login
  await dispatch(
    login({
      email: 'test2@mail.ru',
      password: '123456',
    })
  );

  const { user } = store.getState().auth;
  const userId = user ? user.id : 0;
  console.log('-----USER ID:', userId);

  await dispatch(getAllCategories(userId));
  const { categories } = store.getState().main;
  return { props: { categories } };
});

export default Home;
