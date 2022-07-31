import { ICategory } from '../interfaces/category';

import { Section } from '../components/section';
import { wrapper, AppThunkDispatch } from '../store';
import { getAllCategories } from '../store/main/action';

interface HomeProps {
  categories: [ICategory];
}

const Home = ({ categories }: HomeProps) => {
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
        <Section data={incomes}></Section>
        <Section data={assets}></Section>
        <Section data={expenses}></Section>
      </div>
    </main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch: AppThunkDispatch = store.dispatch;
  await dispatch(getAllCategories());
  const { categories } = store.getState().main;
  return { props: { categories } };
});

export default Home;
