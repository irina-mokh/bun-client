import styles from './bun.module.scss';

import { ICategory } from '../../interfaces/category';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { AppThunkDispatch } from '../../store';
import { deleteCategory } from '../../store/main/action';

export const Bun = (props: ICategory) => {
  const { name, total, id, type } = props;
  const router = useRouter();
  const dispatch: AppThunkDispatch = useDispatch();

  const handleDeleteCategory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
    router.push('/');
  };
  let border = '';
  switch (type) {
    case 'income':
      border = 'border-teal-600';
      break;
    case 'asset':
      border = 'border-cyan-500';
      break;
    case 'expense':
      border = 'border-yellow-300';
      break;
  }
  return (
    <Link href={`/category/${id}`}>
      <div className={`${styles.category} ${border}`}>
        <a className={styles.category__name}>{name}</a>
        <p className={styles.category__total}>{total}</p>
        {/* temp */}
        <p className="absolute -top-4 left-0 z-10">{id}</p>

        <button onClick={handleDeleteCategory} className={styles.delete}>
          🗙
        </button>
      </div>
    </Link>
  );
};
