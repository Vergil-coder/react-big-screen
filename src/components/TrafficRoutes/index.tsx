import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { queryTrafficRoutes } from '@/services/bigScreen';

type TTrafficRoutes = {
  year: string;
  highWay: number;
  townWay: number;
};
const TrafficRoutes = () => {
  const { data: trafficRoutes } = useRequest(queryTrafficRoutes);

  const option = useMemo(() => {
    return {
      grid: {
        left: '1%',
        right: '4%',
        bottom: '6%',
        top: 30,
        padding: '0 0 10 0',
        containLabel: true,
      },
      legend: {
        //图例组件，颜色和名字
        left: 30,
        top: 0,
        itemGap: 16,
        itemWidth: 18,
        itemHeight: 10,
        data: [
          {
            name: '高速公路',
          },
          {
            name: '城镇公路',
          },
        ],
        textStyle: {
          color: '#fff',
          fontStyle: 'normal',
          fontSize: 15,
        },
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true, //坐标轴两边留白
          data: trafficRoutes?.data?.map((res: TTrafficRoutes) => res.year),
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            margin: 15,
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 15,
          },
          axisTick: {
            //坐标轴刻度相关设置。
            show: false,
          },
          axisLine: {
            //坐标轴轴线相关设置
            lineStyle: {
              color: '#fff',
              opacity: 0.2,
            },
          },
          splitLine: {
            //坐标轴在 grid 区域中的分隔线。
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitNumber: 5,
          axisLabel: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 14,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#fff'],
              opacity: 0.06,
            },
          },
        },
      ],
      series: [
        {
          name: '高速公路',
          type: 'bar',
          data: trafficRoutes?.data?.map((res: TTrafficRoutes) => res.highWay),
          barWidth: 10,
          barGap: 0, //柱间距离
          label: {
            //图形上的文本标签
            show: false,
          },
          itemStyle: {
            //图形样式
            borderRadius: [5, 5, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: 'rgba(127, 128, 225, 0.7)',
                },
                {
                  offset: 0.9,
                  color: 'rgba(72, 73, 181, 0.7)',
                },
                {
                  offset: 0.31,
                  color: 'rgba(0, 208, 208, 0.7)',
                },
                {
                  offset: 0.15,
                  color: 'rgba(0, 208, 208, 0.7)',
                },
                {
                  offset: 0,
                  color: 'rgba(104, 253, 255, 0.7)',
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          name: '城镇公路',
          type: 'bar',
          data: trafficRoutes?.data?.map((res: TTrafficRoutes) => res.townWay),
          barWidth: 10,
          barGap: 0.2, //柱间距离
          label: {
            //图形上的文本标签
            show: false,
          },
          itemStyle: {
            //图形样式
            borderRadius: [5, 5, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: 'rgba(239, 98, 5, 0.4',
                },
                {
                  offset: 0.9,
                  color: 'rgba(239, 98, 5, 0.4)',
                },
                {
                  offset: 0.31,
                  color: 'rgba(239, 98, 5, 0.5)',
                },
                {
                  offset: 0.15,
                  color: 'rgba(246, 129, 5, 0.7)',
                },
                {
                  offset: 0,
                  color: 'rgba(246, 129, 5, 1)',
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    };
  }, [trafficRoutes?.data]);
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

export default TrafficRoutes;
