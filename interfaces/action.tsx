import { ICategory } from './category';

export interface IAction {
  id: number;
  sum: string;
  from: number;
  to: number;
  updatedAt: Date;
  createdAt: Date;
}
export interface IActionProps {
  action: IAction;
  catFrom: ICategory;
  catTo: ICategory;
}
