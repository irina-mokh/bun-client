import { IAction } from './action';

export interface ICategoryForm {
  type: string;
  total?: number;
  name: string;
}
export interface ICategoryNew extends ICategoryForm {
  userId: number;
}

export interface ICategory extends ICategoryNew {
  id: number;
}

export interface CategoryProps {
  cat: ICategory;
  acts: IAction[];
}
