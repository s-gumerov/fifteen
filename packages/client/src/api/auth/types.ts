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

export type TSignupResponse = {
  id: number,
}