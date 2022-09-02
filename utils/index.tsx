import { ICategory } from '../interfaces/category';

export const getCategoriesById = (categories: Array<ICategory>, from: number, to: number) => {
  const catFrom: ICategory = ensure(categories.find((cat) => cat.id === from));
  const catTo: ICategory = ensure(categories.find((cat) => cat.id === to));
  return [catFrom, catTo];
};

function ensure<T>(
  argument: T | undefined | null,
  message = 'This value was promised to be there.'
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }
  return argument;
}
