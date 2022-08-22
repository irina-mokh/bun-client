import { ICategory } from '../interfaces/category';
import Link from 'next/link';

export const Bun = (props: ICategory) => {
  const { name, total, id, type } = props;
  let border = '';
  switch (type) {
    case 'income':
      border = 'border-green';
      break;
    case 'asset':
      border = 'border-gray';
      break;
    case 'expense':
      border = 'border-yellow';
      break;
  }
  return (
    <div
      className={`rounded-full w-20 h-20 flex flex-col justify-center items-center relative mr-2 border-4 ${border} bg-neutral-300`}
    >
      <Link href={`/category/${id}`}>
        <a>{name}</a>
      </Link>
      <p className="font-bold">{total}</p>
      {/* temp */}
      <p className="absolute top-0 right-0 z-10 text-red bg-linen">{id}</p>
    </div>
  );
};
