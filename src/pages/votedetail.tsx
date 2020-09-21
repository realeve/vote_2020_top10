import React, { useState, useEffect } from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.less';
import * as db from '@/utils/db';
import * as R from 'ramda';
import paper from '@/utils/paper';

const handleData = ({ data }) => {
  let arr = R.repeat(0, 10);
  let arrTeacher = R.repeat(0, 10);
  console.log(data);
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
  return res
    .map((item, idx) => ({
      ...item,
      value: arr[idx],
      valueTeacher: arrTeacher[idx],
      score: (arrTeacher[idx] * 0.7 + arr[idx] * 0.3).toFixed(1),
    }))
    .sort((b, a) => Number(a.score) - Number(b.score));
};

export default () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    db.getCbpc2020VoteArt().then(handleData).then(setState);
  }, []);
  return (
    <WingBlank>
      <h3>投票详情</h3>
      <p>总分=观众票数*0.3 + 评委票数*0.7</p>
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
        {state.map((item, idx) => (
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
