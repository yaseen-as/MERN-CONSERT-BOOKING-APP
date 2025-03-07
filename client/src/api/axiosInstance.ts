import axios from "axios";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout:5000
});

export const protectedApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout:5000
});

protectedApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

protectedApi.interceptors.response.use(
  (response) => response
  ,
  async(error) => {
    try {
      let response;
      if (error.response.statusCode === 401) {
        const refreshToken = localStorage.getItem("refreshToken")
        console.log("refresh access token");
        response = await publicApi.post("/" ,{refreshToken})
        localStorage.setItem("refreshToken",response.data.refreshToken)
        localStorage.setItem("accessToken",response.data.accessToken)
      }
      error.config.headers.Authorization = `Bearer ${response?.data.accessToken}`;
  
      return protectedApi(error.config)
    } catch (error) {
      console.log("error in response interceptor",error);
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      window.location.href="/login"
    }
    return Promise.reject(error)
  }
);
