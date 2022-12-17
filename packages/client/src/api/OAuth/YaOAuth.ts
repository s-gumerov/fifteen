import { axiosInstance } from '../axios'
import { ENDPOINT } from '../const'
import { TAuthResponse, TOAuth } from '../auth'
import { getLocationOrigin, isClient } from '../../utils'

export const getServiceId = async () => {
  try {
    const result = await axiosInstance(ENDPOINT.SERVICE_ID, {
      method: 'get',
      params: { redirect_uri: isClient() ? getLocationOrigin() : '' },
    })
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const authorizeWithYaOAuth = async (
  data: TOAuth
): Promise<TAuthResponse> => {
  try {
    const result = await axiosInstance<TAuthResponse>('/api/v2/oauth/yandex', {
      method: 'post',
      data,
    })
    return result.data
  } catch (error) {
    console.log(error)
  }
}
