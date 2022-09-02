export interface IActionForm {
  sum: string;
  from: number;
  to: number;
  date?: Date;
}
export interface IAction extends IActionForm {
  id: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface IActionProps {
  data: IAction | IActionForm;
  close?: () => void;
}
