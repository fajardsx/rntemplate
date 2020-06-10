import axios from 'axios'
import { Platform, Alert } from 'react-native'
import callAPIUntrust from './callApiUntrust'
import Constant from '../config/Constant'

const baseUrl = Constant.RESTLINK

export const callAPI = async (method, uri, params, additionalHeader) => {
  const disableSSL = false
  const envApi = baseUrl || ''

  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const url = `${envApi}/${uri}`
  console.log('AXIOS ', url)

  const headers = { ...defaultHeaders, ...additionalHeader }

  const dataOrParams = ['GET', 'DELETE'].includes(method.toUpperCase()) ? 'params' : 'data'
  const defaultConfig = { method, headers, url }
  const config = {
    ...defaultConfig,
    [dataOrParams]: params,
    withCredentials: true,
  }
  //disableSSL?await callAPIUntrust(method,uri,params,additionalHeader):
  try {
    const response =  await axios(config)
    return response
  } catch (error) {
    // Expired Token
    // if (error.response.status === 401) {
    //   return doRefreshToken({ method, uri, params, additionalHeader });
    // }
    console.log('Axios error ', error)
   
    if (error.response && error.response.data) {
      throw error.response.data
    }
    // tslint:disable-next-line: no-console
    Platform.OS == 'android'
      ? ToastAndroid.show(error.toString(), ToastAndroid.SHORT)
      : Alert.alert('error', error)
    //console.error('error not defined', error)
  
    return null
  }
}

export default callAPI