export interface IAuthData {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface ILoginData {
  token?: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  access_token: string;
  user: IUser;
}
