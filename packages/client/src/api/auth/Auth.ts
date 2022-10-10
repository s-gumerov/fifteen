import { axiosInstance } from '../axios';
import {
  STORE_NAME,
  TAuthData, TAuthResponse,
  TSignupData,
  TSignupResponse,
  TUserInfo
} from '..'

export const signUp = async (data: TSignupData): Promise<TSignupResponse> => {
  try {
    const result = await axiosInstance<TSignupResponse>('/api/v2/auth/signup',{
      method: "post",
      data,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const authorize = async (data: TAuthData): Promise<TAuthResponse> => {
  try {
    const result = await axiosInstance<TAuthResponse>('/api/v2/auth/signin', {
      method: "post",
      data,
    });
    const userInfo = await getUserInfo();
    localStorage.setItem(STORE_NAME, JSON.stringify(userInfo));
    return result.data;
  } catch (error) {
    console.log(error)
  }
};

export const getUserInfo = async () => {
  try {
    const result = await axiosInstance<TUserInfo>('/api/v2/auth/user', {
      method: "get"
    })
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await axiosInstance<string>('/api/v2/auth/logout', {
      method: "post",
    });
    localStorage.removeItem(STORE_NAME);
  } catch (error) {
    return error;
  }
};