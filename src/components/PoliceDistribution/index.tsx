import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { queryPoliceDistribution } from '@/services/bigScreen';

const PoliceDistribution = () => {
  const { data: policeDistribution } = useRequest(queryPoliceDistribution);

  const maxData = 2000;
  const option = useMemo(() => {
    return {
      tooltip: {},
      title: {
        text: `城区             警力分布数`,
        top: '15%',
        left: '3%',
        textStyle: {
          color: '#d8dee0',
        },
      },
      xAxis: {
        max: maxData,
        show: false,
        splitLine: { show: false },
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999',
          },
        },
        axisLabel: {
          margin: 10,
        },
      },
      yAxis: {
        data: ['天河区', '白云区', '黄埔区', '越秀区', '荔湾区'],
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          margin: 10,
          color: '#d8dee0',
          fontSize: 16,
        },
      },
      grid: {
        top: '80',
        height: 200,
        left: 70,
        right: 80,
      },
      series: [
        {
          // current data
          type: 'pictorialBar',
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbolClip: true,
          symbolSize: 30,
          symbolBoundingData: maxData,
          data: policeDistribution?.data,
          markLine: {
            symbol: 'none',
            label: {
              formatter: 'max: {c}',
              position: 'start',
            },
            lineStyle: {
              color: 'green',
              type: 'dotted',
              opacity: 0.2,
              width: 2,
            },
            data: [
              {
                type: 'max',
              },
            ],
          },
          z: 10,
        },
        {
          // full data
          type: 'pictorialBar',
          itemStyle: {
            opacity: 0.2,
          },
          label: {
            show: true,
            position: 'right',
            offset: [10, 0],
            color: '#0f8e9c',
            fontSize: 18,
            opacity: 1,
            fontWeight: 800,
            shadowBlur: 8,
            shadowColor: '#0f8e9c',
          },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbolSize: 30,
          symbolBoundingData: maxData,
          data: policeDistribution?.data,
          z: 5,
        },
      ],
    };
  }, [policeDistribution]);
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

export default PoliceDistribution;
