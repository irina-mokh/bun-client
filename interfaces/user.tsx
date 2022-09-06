export interface IUser {
  id: number;
  token: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface INewUser {
  email: string;
  password: string;
}

export interface IAuthForm extends INewUser {
  tab: 'signin' | 'signup';
  password2?: string;
}
