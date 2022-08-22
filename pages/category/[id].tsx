import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { wrapper, AppThunkDispatch } from '../../store';
import { getActions } from '../../store/main/action';
import { ActionThumb } from '../../components/actionThumb';
import { CategoryProps, ICategory } from '../../interfaces/category';
import { deleteCategory } from '../../store/main/action';

export default function Category({ cat, acts }: CategoryProps) {
  const router = useRouter();
  const { query } = router;
  const id = Number(query.id);
  const dispatch: AppThunkDispatch = useDispatch();

  const actions = acts.map((action) => {
    return (
      <li key={action.id}>
        <ActionThumb {...action}></ActionThumb>
      </li>
    );
  });

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
    router.push('/');
  };

  return (
    <div className="container px-4 mx-auto">
      <header className="flex justify-between p-2 bg-gray text-white mt-2">
        <h1>Category c id {query.id}</h1>
        <button className="border-none" onClick={handleDelete}>
          🗙
        </button>
      </header>
      <h2>{cat.name}</h2>
      <p>{cat.name}</p>
      <ul>{actions}</ul>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const id = Number(ctx.params?.id);
  const dispatch: AppThunkDispatch = store.dispatch;
  await dispatch(getActions(id));
  const { actions, categories } = store.getState().main;
  const category = categories.filter((cat: ICategory) => cat.id == id);

  return {
    props: {
      cat: category,
      acts: actions,
    },
  };
});
