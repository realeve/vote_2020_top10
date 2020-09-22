import { axios, _commonData } from './axios';

export interface IAxiosState {
  title: string;
  rows: number;
  data: ({ [key: string]: any } | [])[];
  header: string[];
  ip: string;
  date: string[];
  source: string;
  time: string;
  serverTime: string;
  hash: string;
  [key: string]: any;
}

/**
 *   @database: { 微信开发 }
 *   @desc:     { 欢乐成钞人投票活动 }
 */
export const addCbpc2020VoteArt: (params: {
  openid: string;
  nickname: string;
  headimgurl: string;
  choice: string;
  usertype: string;
}) => Promise<number> = (params) =>
  axios({
    url: '/349/cf28b12be6.json',
    params,
  }).then(({ data: [{ affected_rows }] }) => affected_rows);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 查看投票结果 }
 */
export const getCbpc2020VoteArt: () => Promise<IAxiosState> = () =>
  axios({
    url: '/350/f1edbd94a0.json',
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 清除测试数据 }
 */
export const delCbpc2020VoteArt: () => Promise<boolean> = () =>
  axios({
    url: '/352/65f56968fb.json',
  }).then(({ data: [{ affected_rows }] }) => affected_rows > 0);

export const getCbpc2020VoteArtConfig: () => Promise<number> = () =>
  axios({
    url: '/353/4dbbc2794a.json',
  }).then((res) => res.data[0].status);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 更新活动状态 }
 */
export const setCbpc2020VoteArtConfig: (status: number) => Promise<boolean> = (status) =>
  axios({
    url: '/354/959c2c3f04.json',
    params: {
      status,
    },
  }).then(({ data: [{ affected_rows }] }) => affected_rows > 0);
