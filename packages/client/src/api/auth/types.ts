export type TAuthData = {
  login: string
  password: string
}

export type TSignupData = {
  id?: number
  first_name: string
  second_name: string
  email: string
  phone: string
  password_again?: string
} & TAuthData

export type TUserInfo = {
  id?: number
  display_name?: string
  avatar?: string
} & Omit<TSignupData, 'password'>

export type TOAuth = {
  code: string
  redirect_uri: string
}

export type TChangeAvatar = {
  avatar: FormData
}

export type TUserPassword = {
  oldPassword: string
  newPassword: string
}

export type TSignupResponse =
  | {
      id: number
    }
  | undefined

export type TAuthResponse = 'OK' | undefined
export type TChangeProfileResponse = 'OK' | undefined
export type TChangePasswordResponse = 'OK' | undefined
export type TChangeAvatarResponse = 'OK' | undefined
