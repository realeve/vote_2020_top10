import React from 'react';
import { Result, Icon } from 'antd-mobile';

export default function ResultComponent({
  title = '提交成功',
  status = 'success',
  message = '感谢您的参与',
  ...props
}) {
  return (
    <Result
      img={
        status === 'success' ? (
          <Icon
            type="check-circle"
            style={{
              fill: '#1F90E6',
              width: 60,
              height: 60,
            }}
          />
        ) : (
          <Icon
            type="cross-circle-o"
            style={{
              fill: '#F13642',
              width: 60,
              height: 60,
            }}
          />
        )
      }
      title={title}
      message={message}
      {...props}
    />
  );
}
