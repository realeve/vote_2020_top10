import React, { useState, useEffect } from 'react';
import { WingBlank } from 'antd-mobile';
import * as db from '@/utils/db';
import * as R from 'ramda';
import paper from '@/utils/paper';

import './index.less';

const handleData = ({ data }) => {
  let arr = R.repeat(0, 10);
  let arrTeacher = R.repeat(0, 10);
  let sumAudience = data.filter((item) => item.usertype == 0).length;
  let sumTeacher = data.length - sumAudience;

  data.filter((item) => item.usertype == 0).length;

  data.map((item) =>
    item.choice.split(',').map((idx) => {
      if (item.usertype == 0) {
        arr[idx] += 1;
      } else {
        arrTeacher[idx] += 1;
      }
    }),
  );
  let res = R.clone(paper[0].data);
  let list = res
    .map((item, idx) => ({
      ...item,
      value: arr[idx],
      valueTeacher: arrTeacher[idx],
      score: (
        (sumTeacher == 0 ? 0 : (arrTeacher[idx] / sumTeacher) * 100 * 0.7) +
        (sumAudience == 0 ? 0 : (arr[idx] / sumAudience) * 100 * 0.3)
      ).toFixed(2),
    }))
    .sort((b, a) => Number(a.score) - Number(b.score));
  return {
    list,
    sumTeacher,
    sumAudience,
  };
};

export default () => {
  const [state, setState] = useState({
    list: [],
    sumTeacher: 0,
    sumAudience: 0,
  });
  useEffect(() => {
    db.getCbpc2020VoteArt().then(handleData).then(setState);
  }, []);
  return (
    <WingBlank>
      <h3>投票详情</h3>
      <p>
        总分=(观众票数/观众总人数 {state.sumAudience} )*30 + (评委票数/评委总人数 {state.sumTeacher} 
        )*70
      </p>
      <ul>
        <li>
          <span>选手</span>
          <span>
            观众
            <br />
            票数
          </span>
          <span>
            评委
            <br />
            票数
          </span>
          <span>总分</span>
        </li>
        {state.list.map((item, idx) => (
          <li key={item.name}>
            <span>
              {idx + 1}.{item.name}
            </span>
            <span>{item.value}</span>
            <span>{item.valueTeacher}</span>
            <span>{item.score}</span>
          </li>
        ))}
      </ul>
    </WingBlank>
  );
};
