import { ICategory } from '../interfaces/category';
import Link from 'next/link';

export const Bun = (props: ICategory) => {
  const { name, total, id } = props;
  return (
    <div className="bun rounded-full w-20 h-20 flex flex-col justify-center items-center relative m-2">
      <Link href={`/category/${id}`}>
        <a>{name}</a>
      </Link>
      <p className="font-bold">{total}</p>
      <p className="absolute top-0 right-0 z-10">{id}</p>
    </div>
  );
};
