import { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { NextPageContext } from 'next';

import { ICategory } from '../interfaces/category';

import { Section } from '../components/section';
import { AppDispatch, wrapper } from '../store';
import { getAllCategories } from '../store/main/action';

interface HomeProps {
  categories: [ICategory];
}
const Home = ({ categories }: HomeProps) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(rehydrate(categories));
  // }, [dispatch, categories]);

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
  console.log('categories', categories);
  return (
    <main className="grid grid-rows-[120px_120px_minmax(120px,_1fr)] my-2">
      <div className="container mx-auto px-2">
        <Section data={incomes}></Section>
        <Section data={assets}></Section>
        <Section data={expenses}></Section>
      </div>
    </main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(getAllCategories());
  const { categories } = store.getState().main;
  return { props: { categories } };
});

//   { store }: NextPageContext) {
//   await store.dispatch(getAllCategories());
//   const categories = store.getState().main.categories;
//   return {
//     props: { categories },
//   };
// }

// const { categories } = useSelector(selectMain);
// const dispatch: AppDispatch = useDispatch();
// const response = await fetch(`https://bun-app.herokuapp.com/api/category`);
// const categories = await response.json();

export default Home;
