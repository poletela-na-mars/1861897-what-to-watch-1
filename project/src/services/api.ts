import axios, {AxiosInstance} from 'axios';

const BASE_URL = 'https://10.react.pages.academy/wtw';
const TIMEOUT = 5000;

const createApi = (): AxiosInstance => (
  axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  })
);

export default createApi;
