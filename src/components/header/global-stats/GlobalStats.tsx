import React, { FC } from 'react'
import millify from 'millify';
import './GlobalStats.scss'
import { useGetCryptosQuery } from '../../../services/cryptoApi';

const GlobalStats: FC = () => {
  const { data, isFetching} = useGetCryptosQuery(1);
  const globalStats = data?.data.stats
  if(isFetching) return (<div>'...Loading'</div>);

  return (
    <div className="GlobalStats">
      <span className="GlobalStats__cryptos">
        <h2>Cryptos: {globalStats?.totalCoins}</h2>
      </span>
      <span className="GlobalStats__exchanges">
        <h2>Exchanges: {millify(globalStats?.totalExchanges!)}</h2>
      </span>
      <span className="GlobalStats__market-cap">
        <h2>Market Cap: ${millify(globalStats?.totalMarketCap!)}</h2>
      </span>
      <span className="GlobalStats__hours-volume">
        <h2>24h Volume: ${millify(globalStats?.total24hVolume!)}</h2>
      </span>
      <span className="GlobalStats__markets">
        <h2>Markets: {globalStats?.totalMarkets}</h2>
      </span>
    </div>
  );
}

export default GlobalStats
