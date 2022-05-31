import { extend } from 'umi-request';

let API_BASE =
  process.env.RELEASE_API_BASE ?? 'https://mock.apifox.cn/m1/1045531-0-default';

const request = extend({
  prefix: API_BASE,
  timeout: 1000,
});
export default request;
