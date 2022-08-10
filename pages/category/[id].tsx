import { useRouter } from 'next/router';

import { wrapper, AppThunkDispatch } from '../../store';
import { getActions } from '../../store/main/action';
import { ActionThumb } from '../../components/actionThumb';
import { CategoryProps, ICategory } from '../../interfaces/category';

export default function Category({ cat, acts }: CategoryProps) {
  const { query } = useRouter();

  const actions = acts.map((action) => {
    return (
      <li key={action.id}>
        <ActionThumb {...action}></ActionThumb>
      </li>
    );
  });
  return (
    <div className="container px-4 mx-auto">
      <h1>Category c id {query.id}</h1>
      <h2>{cat.name}</h2>
      <p>{cat.name}</p>
      <ul>{actions}</ul>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const id = Number(ctx.params?.id);
  const dispatch: AppThunkDispatch = store.dispatch;
  dispatch(getActions(id));
  const { actions, categories } = store.getState().main;
  const category = categories.filter((cat: ICategory) => cat.id == id);

  return {
    props: {
      cat: category,
      acts: actions,
    },
  };
});
