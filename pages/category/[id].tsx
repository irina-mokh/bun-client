import { useRouter } from 'next/router';
import Link from 'next/link';

import { wrapper } from '../../store';
import { getActions } from '../../store/main/action';

import { CategoryProps, ICategory } from '../../interfaces/category';

export default function Category({ cat, acts }: CategoryProps) {
  const { query } = useRouter();

  const actions = acts.map((action) => {
    const date = new Date(action.createdAt);

    return (
      <li key={action.id}>
        <Link href={`/action/${action.id}`}>
          <a className="flex justify-between border border-slate-400 rounded-lg p-1 m-1 bg-slate-200">
            <p>{action.id}</p>
            <p className="font-bold">{date.toLocaleDateString()}</p>
            <p>{`from: ${action.from}`}</p>
            <p className="font-bold">{action.sum}</p>
            <p>{`to: ${action.to}`}</p>
          </a>
        </Link>
      </li>
    );
  });
  return (
    <div className="container px-4 mx-auto">
      <h1>Category c id {query.id}</h1>
      <p>{cat.name}</p>
      <ul>{actions}</ul>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const id = Number(ctx.params?.id);
  await store.dispatch(getActions(id));
  const { actions, categories } = store.getState().main;
  const category = categories.filter((cat: ICategory) => cat.id == id);

  return {
    props: {
      cat: category,
      acts: actions,
    },
  };
});
