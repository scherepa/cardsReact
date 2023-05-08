import axios from "axios";
//first we worked with localhost(before build)
//export const API_URL = "https://localhost:3000";
//maybe...
//export const API_URL = "https://localhost:3600";
export const API_URL = "https://bizcards-2021.onrender.com";
//number of cards per page:
export const PER_PAGE = 5;

export const doApiGet = async (_url) => {
  try {
    let resp = await axios.get(_url);
    return resp.data;
  } catch (err) {
    
    throw err;
  }
}

export const doApiMethod = async (_url, _method, _bodyData) => {
  try {
    let resp = await axios({
      method: _method,
      url: _url,
      data: _bodyData,
      headers: {
        'content-type': "application/json",
        "x-auth-token": localStorage["tok"]
      }
    })
    return resp.data;
  }
  catch (err) {
    throw err;
  }
}
