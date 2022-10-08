import axios from 'axios';
import { BASE_URL_API, TSignupData, TSignupResponse } from '..';

export const signUp = async (data: TSignupData) => {
  try {
    const result = await axios.post<TSignupResponse>(`${BASE_URL_API}/api/v2/auth/signup`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}