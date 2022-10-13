export type TAuthData = {
  login: string,
  password: string,
}

export type TSignupData = {
  first_name: string,
  second_name: string,
  email: string,
  phone: string
  password_again?: string,
} & TAuthData;

export type TUserInfo = {
  id: number,
  display_name: string,
  avatar: string,
} & Omit<TSignupData, 'password'>;

export type TSignupResponse = {
  id: number,
} | undefined;

export type TAuthResponse = "OK" | undefined;