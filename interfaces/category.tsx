import { IAction } from './action';

export interface ICategory {
  id: number;
  type: string;
  total: number;
  name: string;
}

export interface CategoryProps {
  cat: ICategory;
  acts: IAction[];
}
