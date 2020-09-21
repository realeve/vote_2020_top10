import { setStore, now } from '@/utils/lib';
import weixin from '@/utils/WeiXin';

const namespace = 'common';
export default {
  namespace,
  state: {
    user: {},
  },
  reducers: {
    setStore,
  },
  effects: {
    *getWxUser(_, { put, call, select }) {
      // 大屏显示页面不加载
      if (window.location.href.includes('led')) {
        return;
      }
      // 调整用户信息获取
      let user = yield select((state) => state.common.user);
      if (user.openid) {
        return;
      }

      user = yield call(weixin.getWxUserInfo);
      console.log('用户信息载入完毕', user);
      if (!user) {
        return;
      }

      yield put({
        type: 'setStore',
        payload: {
          user,
        },
      });
    },
  },
  subscriptions: {
    async setup({ dispatch, history }) {
      // 不获取个人信息
      await dispatch({ type: 'getWxUser' });
      await weixin.init(false);
    },
  },
};
