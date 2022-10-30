import { axiosInstance } from '../axios';
import {
  StoreName,
  TAuthData, TAuthResponse,
  TSignupData,
  TSignupResponse,
  TUserInfo
} from '..'

export const setUserToLocalStorage = async () => {
  const userInfo = await getUserInfo();
  localStorage.setItem(StoreName.user, JSON.stringify(userInfo));
}

export const signUp = async (data: TSignupData): Promise<TSignupResponse> => {
  try {
    const result = await axiosInstance<TSignupResponse>('/api/v2/auth/signup',{
      method: "post",
      data,
    });
    await setUserToLocalStorage();
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
    await setUserToLocalStorage();
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
    localStorage.removeItem(StoreName.user);
  } catch (error) {
    return error;
  }
};