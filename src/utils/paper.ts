import * as lib from './lib';
// 题目
export interface IPaper {
  title: string;
  data: string | string[] | any[];
  subTitle?: string | string[];
  type?: string;
  cascade?: number;
  [key: string]: any;
}

export let goodsData = lib.handlePaper([
  {
    title: '请选择你所支持的组合或选手，最多可选4项',
    type: 'checkbox',
    data: [
      { name: '陈嘉骢、李国亮', detail: '钢琴配乐朗诵《寻梦康桥》', dept: '可可战队' },
      {
        name: '王鸽、余杨',
        detail: '相声《说疫情》',
        dept: '曲苑杂弹战队',
      },
      {
        name: '吴思宇',
        detail: '古筝演奏《凉凉》',
        dept: '龙飞凤舞战队',
      },

      {
        name: '詹祎炜',
        detail: '尤克里里独奏《While my guitar gently weeps》',
        dept: '曲苑杂弹战队',
      },
      {
        name: '王庆组合',
        detail: '演唱《雪莲和卓玛》',
        dept: '龙飞凤舞战队',
      },
      {
        name: '唐奎',
        detail: '川剧变脸',
        dept: '曲苑杂弹战队',
      },
      {
        name: '陈强',
        detail: '演唱《没离开过》',
        dept: '龙飞凤舞战队',
      },
      {
        name: '黄萍组合',
        detail: '双人爵士舞串烧《That`s life》',
        dept: '可可战队',
      },
      {
        name: '杜娟',
        detail: '舞蹈《灵动的翅膀》',
        dept: '可可战队',
      },
      {
        name: '张晓霞、张英、张学毅',
        detail: '太极表演《月圆起舞》',
        dept: '龙飞凤舞战队',
      },
    ],
    key: 'choice',
    maxLength: 4,
  },
]);

export default goodsData;
