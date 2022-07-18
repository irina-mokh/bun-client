import { ICategory } from '../interfaces/category';
import Link from 'next/link';

export const Bun = (props: ICategory) => {
  const { name, total, id } = props;
  return (
    <div className="rounded-full w-20 h-20 bg-orange-400 flex flex-col justify-center items-center relative m-2">
      <Link href={`/category/${id}`}>
        <a>{name}</a>
      </Link>
      <p>{total}</p>
      <p className="absolute top-0 right-0 z-10">{id}</p>
    </div>
  );
};
