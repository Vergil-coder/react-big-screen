import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import styles from './index.less';
import '../../assets/less/common.less';
import useIndex from '@/utils/useDraw';
import HeaderTab from '@/components/HeaderTab';
import IllegalData from '@/components/IllegalData';
import InterProvincialData from '@/components/InterProvincialData';
import PoliceDistribution from '@/components/PoliceDistribution';
import gzData from '@/assets/json/gdData.json';
import chinaData from '@/assets/json/chinaData.json';
import TrafficRoutes from '@/components/TrafficRoutes';
import TrafficTools from '@/components/TrafficTools';
import TrafficVolume from '@/components/TrafficVolume';
import RecordNumberTab from '@/components/RecordNumberTab';
import Map from '@/components/Map';

const Home = () => {
  const { appRef, calcRate, windowDraw } = useIndex();
  useEffect(() => {
    windowDraw();
    calcRate();
  }, []);
  echarts.registerMap('广东', gzData as any);
  echarts.registerMap('中国', chinaData as any);
  return (
    <div className={styles.app}>
      <div className={styles.home} ref={appRef}>
        <div className={styles['big-screen']}>
          <HeaderTab />
          <div className={styles.content}>
            <div className={styles['content-left']}>
              <TrafficRoutes />
              <TrafficTools />
              <TrafficVolume />
            </div>
            <div className={styles['content-center']}>
              <RecordNumberTab />
              <Map />
            </div>
            <div className={styles['content-right']}>
              <IllegalData />
              <InterProvincialData />
              <PoliceDistribution />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
