import * as R from 'ramda';
// 活动开始前，参与测试人员数据加前缀
export const _dev = false;

const prefix = _dev ? 'devcoupon1' : 'coupon1';
let key: {
  [key: string]: string;
} = {
  user: prefix + 'user',
  data: prefix + 'data',
  status: prefix + 'status',
  hasSubmitted: prefix + 'hasSubmitted',
  loginfo: prefix + 'loginfo',
};

export const saveLoginfo = (data) => {
  window.localStorage.setItem(key.loginfo, JSON.stringify(data));
};

export const loadLoginfo = () => {
  return JSON.parse(window.localStorage.getItem(key.loginfo) || '{}');
};
export const saveUserinfo = (data) => {
  window.localStorage.setItem(key.user, JSON.stringify(data));
};

export const loadUserinfo = () => {
  return JSON.parse(window.localStorage.getItem(key.user) || '{}');
};
