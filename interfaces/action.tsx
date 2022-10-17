export interface IAction {
  sum: string;
  from: number;
  to: number;
  date: string;
  id?: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IActionProps {
  data: IAction;
  close: () => void;
  onSave: string;
}
