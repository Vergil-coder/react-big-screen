import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { queryIllegalData } from '@/services/bigScreen';

export interface ApifoxModal {
  data: Datum[];
}

export interface Datum {
  max: number;
  value: number;
}

const IllegalData = () => {
  const { data } = useRequest<ApifoxModal>(queryIllegalData);

  const indicator = [
    { name: '超速', max: 1700 },
    { name: '违停', max: 1700 },
    { name: '闯禁行', max: 1700 },
    { name: '压线', max: 1700 },
    { name: '闯红灯', max: 1700 },
  ];

  const option = useMemo(() => {
    return {
      title: {
        text: '违\n法\n数\n量\n和\n类\n型\n分\n布',
        top: '30%',
        left: '1%',
        textStyle: {
          color: '#fff',
          fontSize: '18',
        },
      },
      radar: {
        // shape: 'circle',
        indicator: indicator,
        axisName: {
          color: '#fff',
          fontSize: '18',
          borderRadius: 3,
          padding: [3, 5],
          formatter: (value: string) => {
            return '「' + value + '」';
          },
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: [
              'rgba(0,206,209, 0.1)',
              'rgba(0,206,209, 0.2)',
              'rgba(0,206,209, 0.3)',
              'rgba(0,206,209, 0.4)',
              'rgba(0,206,209, 0.5)',
              'rgba(0,206,209, 0.6)',
            ].reverse(),
          },
        },
        splitArea: {
          areaStyle: {
            color: [
              'rgba(0,255,255, 0.1)',
              'rgba(0,255,255, 0.2)',
              'rgba(0,255,255, 0.3)',
              'rgba(0,255,255, 0.4)',
              'rgba(0,255,255, 0.5)',
              'rgba(0,255,255, 0.6)',
            ].reverse(),
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowBlur: 30,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
          },
        },
        axisLine: {
          //指向外圈文本的分隔线样式
          lineStyle: {
            color: 'rgba(0,0,0,0)',
          },
        },
      },
      series: [
        {
          type: 'radar',
          areaStyle: {
            color: 'rgba(255,237,145, 0.5)',
          },
          itemStyle: {
            color: 'rgba(255,237,145,0.8)',
            borderColor: 'rgba(255,237,145,0.2)',
            borderWidth: 10,
          },
          lineStyle: {
            color: 'rgba(255,237,145, 0.6)',
            width: 2,
          },
          label: {
            show: true,
          },
          data: [
            {
              value: data?.data.map((res) => res.value),
            },
          ],
        },
      ],
    };
  }, [data]);
  return (
    <div style={{ height: '33%', width: '100%', position: 'relative' }}>
      <ReactECharts
        className="borderOne"
        option={option}
        style={{ height: '100%', width: '100%' }}
      ></ReactECharts>
    </div>
  );
};

export default IllegalData;
