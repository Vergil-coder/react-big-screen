import React from 'react';
import plane from '@/assets/images/plane.png';
import waterway from '@/assets/images/waterway.png';
import railway from '@/assets/images/railway.png';
import styles from './index.less';
import classnames from 'classnames';
import { useRequest } from 'ahooks';
import { queryTrafficVolume } from '@/services/bigScreen';

type TTrafficVolume = {
  pic: string;
  name: string;
  passengerNum: number;
  freightNum: number;
};

const TrafficVolume = () => {
  const { data: trafficVolume } = useRequest(queryTrafficVolume);
  return (
    <div style={{ height: '33%', width: '100%', position: 'relative' }}>
      <div className={classnames(styles['traffic-volume'], 'borderOne')}>
        <div className={styles['title']}>
          <p className={styles['way']}>运输方式</p>
          <p className={styles['passenger-traffic']}>客运量</p>
          <p className={styles['freight']}>货运量</p>
        </div>
        <ul className={styles['list']}>
          {trafficVolume?.data.map((item: TTrafficVolume) => {
            return (
              <li key={item.name}>
                <p className={styles['way']}>
                  <img src={item.pic} alt="" />
                  <span>{item.name}</span>
                </p>
                <p
                  className={classnames(
                    styles['passenger-traffic'],
                    'passengerTraffic',
                  )}
                >
                  <span>{item.passengerNum}万人</span>
                </p>
                <p className={classnames(styles['freight'], 'freight')}>
                  <span>{item.freightNum}万吨</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TrafficVolume;
