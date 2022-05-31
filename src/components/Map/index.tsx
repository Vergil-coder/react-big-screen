import ReactECharts from 'echarts-for-react';
import gdData from '../../assets/json/gds.json';
import styles from './index.less';

const Map = () => {
  const gdDatas: any = gdData;
  const convertData = (data: any[][]) => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const fromCoord = gdDatas[dataItem[0].name];
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
  const chinaDatas = [
    [
      {
        name: '广州市',
        value: 1,
      },
    ],
    [
      {
        name: '韶关市',
        value: 0,
      },
    ],
    [
      {
        name: '深圳市',
        value: 0,
      },
    ],
    [
      {
        name: '珠海市',
        value: 0,
      },
    ],
    [
      {
        name: '汕头市',
        value: 1,
      },
    ],
    [
      {
        name: '佛山市',
        value: 0,
      },
    ],
    [
      {
        name: '江门市',
        value: 0,
      },
    ],
    [
      {
        name: '湛江市',
        value: 0,
      },
    ],
    [
      {
        name: '茂名市',
        value: 1,
      },
    ],
    [
      {
        name: '肇庆市',
        value: 0,
      },
    ],
    [
      {
        name: '惠州市',
        value: 0,
      },
    ],
    [
      {
        name: '梅州市',
        value: 0,
      },
    ],
    [
      {
        name: '汕尾市',
        value: 0,
      },
    ],
    [
      {
        name: '河源市',
        value: 0,
      },
    ],
    [
      {
        name: '阳江市',
        value: 0,
      },
    ],
    [
      {
        name: '清远市',
        value: 0,
      },
    ],
    [
      {
        name: '东莞市',
        value: 0,
      },
    ],
    [
      {
        name: '中山市',
        value: 0,
      },
    ],
    [
      {
        name: '潮州市',
        value: 0,
      },
    ],
    [
      {
        name: '揭阳市',
        value: 0,
      },
    ],
    [
      {
        name: '云浮市',
        value: 0,
      },
    ],
  ];

  const series: any[] = [];
  [['广州市', chinaDatas]].forEach((item: any, i) => {
    series.push(
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', //箭头图标
          symbolSize: 10, //图标大小
        },
        lineStyle: {
          width: 2, //尾迹线条宽度
          opacity: 1, //尾迹线条透明度
          curveness: 0.3, //尾迹线条曲直度
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
        label: {
          show: false,
          position: 'right', //显示位置
          offset: [5, 0], //偏移设置
          formatter: function (params: any) {
            //圆环显示文字
            return params.data.name;
          },
          fontSize: 13,
        },
        symbol: 'circle',
        // symbolSize: function(val:any) {
        //   return 5+ val[2] * 5; //圆环大小
        // },
        itemStyle: {
          show: false,
          color: '#34c6bb',
        },
        data: item[1].map(function (dataItem: any) {
          return {
            name: dataItem[0].name,
            value: gdDatas[dataItem[0].name],
          };
        }),
      },
    );
  });
  const option = {
    title: {
      text: '出行服务+大数据\n\n广东省交通大数据分析平台',
      textStyle: {
        fontSize: 24,
        color: '#fff',
      },
      left: '4%',
      top: '3%',
    },
    color: ['#34c6bb'],
    geo: {
      silent: true,
      map: '广东',
      zoom: 1.1,
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
        areaColor: 'rgba(0,255,255,.02)',
        borderColor: '#00ffff',
        borderWidth: 1.5,
        shadowColor: '#00ffff',
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 10,
      },
    },
    series: series,
  };
  return (
    <ReactECharts
      className={styles.map}
      option={option}
      style={{ height: '84%', width: '100%' }}
    ></ReactECharts>
  );
};

export default Map;
