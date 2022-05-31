import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { queryTrafficTools } from '@/services/bigScreen';

type TTrafficTools = {
  year: string;
  highWay: number;
  waterWay: number;
  railWay: number;
};

const TrafficTools = () => {
  const { data: trafficTools } = useRequest(queryTrafficTools);
  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      legend: {
        icon: 'rect',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 20,
        left: '10%',
        data: ['水路机动客船', '公路营运客车', '铁路营运动车'],

        textStyle: {
          fontSize: 17,
          color: '#F1F1F3',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: trafficTools?.data.map((res: TTrafficTools) => res.year),
          axisLine: {
            lineStyle: {
              color: '#fff',
            },
          },
          axisLabel: {
            margin: 10,
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          max: 1500,
          axisLine: {
            lineStyle: {
              color: '#fff',
            },
          },
          axisLabel: {
            margin: 10,
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: '#fff',
            },
          },
        },
      ],
      series: [
        {
          name: '水路机动客船',
          type: 'line',
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(240, 2, 0,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(240, 2, 0,.1)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          itemStyle: {
            color: 'rgb(240, 2, 0)',
          },
          data: trafficTools?.data.map((res: TTrafficTools) => res.waterWay),
        },
        {
          name: '公路营运客车',
          type: 'line',
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0, 204, 235,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0, 204, 235,.1)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          itemStyle: {
            color: 'rgb(0, 204, 235)',
          },
          data: trafficTools?.data.map((res: TTrafficTools) => res.highWay),
        },
        {
          name: '铁路营运动车',
          type: 'line',
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(211, 187, 74,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(211, 187, 74,.1)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          itemStyle: {
            color: 'rgb(211, 187, 74)',
          },
          data: trafficTools?.data.map((res: TTrafficTools) => res.railWay),
        },
      ],
    };
  }, [trafficTools]);
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

export default TrafficTools;
