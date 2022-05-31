import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import allData from '../../assets/json/chainas.json';
import { useRequest } from 'ahooks';
import { queryInterProvincialData } from '@/services/bigScreen';

const InterProvincialData = () => {
  const { data: interProvincial } = useRequest(queryInterProvincialData);
  const allDatas: any = allData;
  const convertData = (data: any[][]) => {
    const res: any = [];
    if (!data) {
      return res;
    }
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const fromCoord = allDatas[dataItem[0].name];
      const toCoord = [113.341527, 23.1270407];
      if (fromCoord && toCoord) {
        res.push({
          coords: [
            toCoord, // 起点
            fromCoord, // 终点
          ],
        });
      }
    }
    return res;
  };
  const chinaDatas: any[][] = interProvincial?.data;

  const series: any[] = [];
  [['广州市', chinaDatas]].forEach((item: any, i) => {
    series.push(
      {
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        large: true,
        effect: {
          show: true,
          constantSpeed: 30,
          symbol: 'pin',
          symbolSize: 6,
          trailLength: 0,
        },
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#58B3CC', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#ffbf31', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          width: 2,
          opacity: 0.4,
          curveness: 0.2,
        },
        data: convertData(item[1]),
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          //涟漪特效
          period: 3, //动画时间，值越小速度越快
          brushType: 'stroke', //波纹绘制方式 stroke, fill
          scale: 4, //波纹圆环最大限制，值越大波纹越大
        },
        symbolSize: 5,
        showEffectOn: 'render',
        itemStyle: {
          color: '#fdae39',
        },
        data: item[1]?.map(function (dataItem: any) {
          return {
            name: dataItem[0].name,
            value: allDatas[dataItem[0].name],
          };
        }),
      },
    );
  });

  const option = useMemo(() => {
    return {
      color: ['#34c6bb'],
      geo: {
        silent: true,
        map: '中国',
        zoom: 2.4,
        label: {
          show: false,
          color: '#fff',
        },
        top: '16%',
        tooltip: {
          show: false,
        },
        roam: false,
        itemStyle: {
          areaColor: 'rgba(0,255,255,.0)',
          borderColor: '#404a59',
          borderWidth: 1.5,
          // shadowColor: '#65798a',
          shadowOffsetX: 0,
          shadowOffsetY: 4,
          shadowBlur: 10,
        },
      },
      series: series,
    };
  }, [interProvincial]);

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

export default InterProvincialData;
