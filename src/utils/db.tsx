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
