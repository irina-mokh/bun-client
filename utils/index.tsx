import { useSelector } from 'react-redux';
import { selectMain } from '../store/main/selectors';
import { ICategory } from '../interfaces/category';

export const getCategories = (from: number, to: number) => {
  const { categories } = useSelector(selectMain);
  const catFrom = categories.find((cat: ICategory) => cat.id === from);
  const catTo = categories.find((cat: ICategory) => cat.id === to);

  return [catFrom, catTo];
};
