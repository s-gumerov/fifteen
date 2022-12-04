export enum themeReducerTypes {
  getThemes= '/get-themes',
  setUserTheme = 'user/set-theme',
  getUserTheme='/user/get-theme'
}

export type TTheme = 'dark' | 'pink'

export type TThemeState = {
  theme: TTheme
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}
