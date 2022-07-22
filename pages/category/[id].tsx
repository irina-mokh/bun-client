import { useRouter } from 'next/router';
import Link from 'next/link';

import { AppDispatch } from '../../store';
import { selectMain } from '../../store/main/selectors';
import { selectCategory } from '../../store/category/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { getAllCategories } from '../../store/main/action';
import { getActions } from '../../store/category/action';

import { CategoryProps } from '../../interfaces/category';

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

export async function getServerSideProps({ params }) {
  const { categories } = useSelector(selectMain);
  const dispatch: AppDispatch = useDispatch();
  dispatch(getAllCategories());

  const { actions } = useSelector(selectCategory);
  dispatch(getActions(params.id));

  // const response1 = await fetch(`https://bun-app.herokuapp.com/api/category/${params.id}`);
  // const cat = await response1.json();

  // const response2 = await fetch(`https://bun-app.herokuapp.com/api/action?catId=${params.id}`);
  // const acts = await response2.json();

  return {
    props: { categories, actions },
  };
}
