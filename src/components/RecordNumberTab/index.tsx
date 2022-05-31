import classnames from 'classnames';
import React, { useMemo } from 'react';
import styles from './index.less';
import { useRequest } from 'ahooks';
import { queryRecordNumber } from '@/services/bigScreen';

const RecordNumberTab = () => {
  const { data } = useRequest(queryRecordNumber);
  const statistical = useMemo(() => data?.data, [data]);
  return (
    <div className={classnames(styles['recordNumber-tab'], 'borderOne')}>
      <h3 className="title lineOne">广东省交通数据情况</h3>
      <ul className="recordNumber">
        <li>
          <p className="alert">{statistical?.industryNum}</p>{' '}
          <h3>当前警情数(起)</h3>
        </li>
        <li>
          <p className="congestion">{statistical?.exponent}</p>{' '}
          <h3>区域拥堵指数</h3>
        </li>
        <li>
          <p>{statistical?.illegalNum}</p> <h3>当月违章数(次)</h3>
        </li>
      </ul>
    </div>
  );
};

export default RecordNumberTab;
