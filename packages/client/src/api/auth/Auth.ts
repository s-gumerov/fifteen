import axios, { AxiosError } from 'axios'
import { BASE_URL_API, TAuthData, TSignupData, TSignupResponse } from '..'

export const signUp = async (data: TSignupData) => {
  try {
    const result = await axios.post<TSignupResponse>(`${BASE_URL_API}/api/v2/auth/signup`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export const authorize = async (data: TAuthData) => {
  try {
    const result = await axios.post<string>(`${BASE_URL_API}/api/v2/auth/signin`, data);
    return result.data;
  } catch (error) {
    console.log(error)
  }
}