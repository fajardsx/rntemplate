
import RNFetchBlob from 'rn-fetch-blob'
import Constant from '../config/Constant'

const baseUrl = Constant.RESTLINK

export const callAPIUntrust = async (method, uri, params, additionalHeader) => {
  const envApi = baseUrl || ''

  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  var url = `${envApi}/${uri}`
  //console.log('AXIOS ', url)

  const headers = { ...defaultHeaders, ...additionalHeader }
  const dataOrParams = ['GET', 'DELETE'].includes(method.toUpperCase()) ? 'params' : 'data'
  var body=null;
  console.log(dataOrParams)
  if (dataOrParams == 'params') {
    url = addParameterToURL(url, params)
  }else if(dataOrParams == 'data'){
    body= JSON.stringify(params)
  }
  console.log('callAPIUntrust ', url)
  try {
    const response = await RNFetchBlob.config({
      trusty: true,
    }).fetch(method, url, headers,body)
    return {data:response.json()}
  } catch (error) {
    // Expired Token
    // if (error.response.status === 401) {
    //   return doRefreshToken({ method, uri, params, additionalHeader });
    // }
    console.log('RNFetchBlob error ', error)

    return null
  }
}
const addParameterToURL = (url, params={}) => {
    return `${url}?${Object.entries(params).map(x => (
        `${x[0]}=${encodeURIComponent(x[1])}`
    )).join("&")}`;
}
export default callAPIUntrust
