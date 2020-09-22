import React, { useState, useEffect } from 'react';
import { Toast, WingBlank, Button } from 'antd-mobile';
import { connect } from 'dva';
import FormComponent from '@/components/FormComponent';
import router from 'umi/router';
import * as db from '@/utils/db';
import * as R from 'ramda';
import paper from '@/utils/paper';
import * as lib from '@/utils/lib';
import { useInterval } from 'react-use';

// import Detail from './votedetail';

// 部署链接不同
const _usertype = window.location.href.includes('2020art_teacher') ? 1 : 0;

function NewPage({ user, usertype = _usertype }: any) {
  const [state, setState] = useState([[]]);
  const [valid, setValid] = useState(false);

  const [isend, setIsend] = useState(true);

  const getStatus = () => {
    db.getCbpc2020VoteArtConfig().then((res) => {
      setIsend(res == 0);
      if (res == 0 && !isend) {
        Toast.fail('活动已关闭');
      }
    });
  };

  useInterval(getStatus, 5000);

  useEffect(() => {
    getStatus();
    let res = window.localStorage.getItem('art2020');
    if (res == lib.ymd()) {
      setValid(false);
      usertype == 0 && router.push('/result');
    } else {
      setValid(true);
    }
  }, []);

  const onChange = (nextState: any, key: number) => {
    let v = R.clone(nextState);
    setState(v);
  };

  const onSubmit = () => {
    let choice = state[0].join(',');
    let params = {
      openid: user.openid,
      choice,
      nickname: user.nickname,
      headimgurl: user.headimgurl,
      usertype,
    };

    db.addCbpc2020VoteArt(params)
      .then((e: number) => {
        if (e) {
          window.localStorage.setItem('art2020', lib.ymd());
          if (usertype === 0) {
            router.push('/result');
          } else {
            Toast.success('投票成功，请查看下方投票结果');
          }
          return;
        }

        Toast.fail('投票失败，请稍后重试');
      })
      .catch((e) => {
        let data = e.response.data;
        if (data['Error Message'].includes('Duplicate')) {
          Toast.fail('请勿重复投票');
        }
      });
  };

  return (
    <div>
      <WingBlank style={{ height: 60, lineHeight: '60px', fontWeight: 'bold' }}>
        {usertype === 0 ? '现场观众' : '评委'}投票通道
      </WingBlank>

      <div>
        {paper.length === 0 ? (
          <WingBlank style={{ height: 180, lineHeight: '180px' }}>投票尚未开始，请稍候</WingBlank>
        ) : (
          <FormComponent
            showKey={false}
            data={paper}
            onChange={onChange}
            state={state}
            showErr={{}}
          />
        )}
      </div>
      <Button
        style={{ margin: '30px 15px' }}
        type="primary"
        onClick={onSubmit}
        disabled={isend || !valid || state[0].length == 0}
      >
        {isend ? '活动已关闭' : !valid ? '已投票' : '提交'}
      </Button>

      {/* {usertype == 1 && <Detail />} */}
    </div>
  );
}

export default connect(({ common }: any) => ({ ...common }))(NewPage);
