import React from 'react';
import { TextareaItem, List, DatePicker, InputItem, Picker, Stepper } from 'antd-mobile';
import RadioComponent from '@/components/RadioComponent';
import CheckboxComponent from '@/components/CheckboxComponent';
import NestRadio from '@/components/NestRadio';
import Select from '@/components/SelectComponent';
import * as R from 'ramda';
import { IPaper } from '@/utils/paperData';
import dayjs from 'dayjs';
import styles from './form.less';
export interface IPropsForm {
  data: any;
  onChange: any;
  state: any;
  showErr?: any;
  showKey?: boolean;
  [key: string]: any;
}
export default function FormComponent({
  data,
  onChange,
  showKey = true,
  state,
  showErr,
}: IPropsForm) {
  return data.map(
    ({ title, data, type = 'radio', subTitle, disabled, ...props }: IPaper, key: number) => {
      let idxTitle = showKey ? `${key + 1}.${title}` : title;

      let prop = {
        onChange: (e: any) => onChange(e, key),
        title: idxTitle,
        idx: key,
        key,
        state,
        data: typeof data === 'string' ? [data] : data,
        length: props.length,
        sort: props.sort,
        maxLength: props.maxLength,
        showErr: !R.equals(showErr, {}),
        dept: props.dept,
        desc: props.desc,
        disabled: disabled || false,
      };

      let { showErr: _showErr, onChange: _onChange, idx, ...rest } = prop;

      switch (type) {
        case 'radio':
          return <RadioComponent subTitle={subTitle} {...prop} key={key} />;
        case 'select':
          return <Select {...prop} key={key} />;
        case 'checkbox':
          if (typeof subTitle !== 'undefined' && typeof subTitle !== 'string') {
          }
          // prop.title += props.length ? '' : '(可多选)';
          return <CheckboxComponent {...prop} key={key} />;
        case 'group':
          if (typeof subTitle !== 'undefined' && typeof subTitle !== 'string') {
            return <NestRadio subTitle={subTitle} {...prop} key={key} />;
          }
          return null;
        case 'goods':
          return (
            <List renderHeader={prop.title} {...rest} key={key}>
              {data.length > 0 &&
                data.map((item, i) => (
                  <List.Item
                    wrap
                    key={item.name}
                    style={{
                      margin: '5px 0',
                      paddingRight: 5,
                      backgroundColor: state[key][i] > 0 ? '#f6fcff' : '#fff',
                    }}
                  >
                    <div className={styles.alignRow}>
                      <img src={item.img} style={{ width: 72, height: 72, marginRight: 5 }} />
                      <div style={{ fontSize: 15, flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>
                          {item.name}
                          <span style={{ marginLeft: 5, fontWeight: 'normal' }}>({item.spec})</span>
                        </div>

                        <div
                          className={styles.alignRow}
                          style={{ justifyContent: 'space-between' }}
                        >
                          <div className={styles.alignColumn}>
                            <span>已选:{item.choosed}</span>
                            <div style={{ color: '#e23', fontWeight: 600, fontSize: 18 }}>
                              ￥{item.price}
                            </div>
                          </div>
                          <Stepper
                            style={{ width: 80 }}
                            showNumber
                            max={50}
                            min={0}
                            value={state[key][i] || 0}
                            onChange={val => {
                              let nextState = R.clone(state);
                              nextState[key][i] = val;
                              // console.log(nextState);
                              onChange(nextState);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </List.Item>
                ))}
            </List>
          );
        case 'input':
          return (
            <List {...rest} key={key}>
              <div className="inputTitle">{prop.title}</div>
              <InputItem
                {...rest}
                placeholder={rest.placeholder || props.placeholder}
                value={typeof state[key] === 'undefined' ? '' : '' + state[key]}
                onChange={val => {
                  let nextState: string[] = R.clone(state);
                  nextState[key] = val;
                  onChange(nextState);
                }}
              />
            </List>
          );

        case 'textarea':
          let cascade = typeof props.cascade === 'number';
          let needRemark = cascade && Number(state[key - 1]) === props.cascade;
          return (
            <List renderHeader={prop.title} key={key}>
              <TextareaItem
                disabled={cascade && !needRemark}
                value={
                  cascade && !needRemark
                    ? '无'
                    : typeof state[key] === 'undefined'
                    ? ''
                    : String(state[key])
                }
                onChange={val => {
                  let nextState: (string | string[])[] = R.clone(state);
                  let res: string =
                    (props.cascade && state[key - 1] == '1') || typeof val === 'undefined'
                      ? '无'
                      : val;
                  nextState[key] = res.trim();
                  prop.onChange(nextState);
                }}
                rows={3}
                placeholder="请在此输入"
                clear={true}
              />
            </List>
          );
        case 'DatePicker':
          return (
            <DatePicker
              minDate={new Date('2019-08-05')}
              maxDate={new Date()}
              mode="date"
              title={idxTitle}
              value={new Date(state[key])}
              key={key}
              onChange={(e: Date) => {
                // console.log(e);
                let nextState: (string | string[])[] = R.clone(state);
                nextState[key] = dayjs(e).format('YYYY-MM-DD');
                onChange(nextState);
              }}
            >
              <List.Item arrow="horizontal">日期</List.Item>
            </DatePicker>
          );
        default:
          return prop.title;
      }
    },
  );
}
