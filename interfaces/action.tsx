export interface INewAction {
  sum: string;
  from: number;
  to: number;
}

export interface IAction extends INewAction {
  id: number;
  updatedAt: Date;
  createdAt: Date;
}
