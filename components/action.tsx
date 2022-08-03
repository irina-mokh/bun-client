import Link from 'next/link';
import { useSelector } from 'react-redux';

import { IAction } from '../interfaces/action';
import { ICategory } from '../interfaces/category';

import { selectMain } from '../store/main/selectors';

export const Action = (props: IAction) => {
  const { id, sum, from, to, createdAt } = props;
  const date = new Date(createdAt);

  const { categories } = useSelector(selectMain);
  const catFrom = categories.find((cat: ICategory) => cat.id === from);
  console.log(catFrom);
  const catTo = categories.find((cat: ICategory) => cat.id === to);

  return (
    <Link href={`/action/${id}`}>
      <a className="flex justify-between border border-slate-400 rounded-lg p-1 m-1 bg-slate-200">
        <p>{id}</p>
        <p className="font-bold">{date.toLocaleDateString()}</p>
        <p>{`from: ${catFrom.name}`}</p>
        <p className="font-bold">{sum}</p>
        <p>{`to: ${catTo.name}`}</p>
      </a>
    </Link>
  );
};
