import fetch from 'dva/fetch';
const BASE_URL = 'http://localhost:7001'
function parseJSON(response) {
  return response.json();
}
function checkCode(result) {//{code:0,data}
  if (result.code == 0) {
    return result.data;
  }else{
    console.log('result',result)
    const error = new Error(result.data);
    error.result = result;
    throw error; 
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  //允许携带cookies
  // options.credentials =   "include"
  console.log('发送出去',BASE_URL+url)
  return fetch(BASE_URL+url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
    .catch(err => ({ err }));
}
