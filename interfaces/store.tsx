import { IAction } from './action';
import { ICategory } from './category';

export type IMainState = {
  error: string | null,
  isLoading: boolean,
  categories: ICategory[] | [],
  actions: IAction[] | [],
  action: IAction | null,
};

export type IState = {
  main: IMainState,
};
