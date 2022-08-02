export interface IUser {
  id: number;
  token: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
}
