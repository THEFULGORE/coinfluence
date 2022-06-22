import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICoin } from "../../../models/IStats";
import { useGetCryptosQuery } from "../../../services/cryptoApi";
import "./Ticker.scss";

const Ticker: FC = () => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery(50);
  const [cryptos, setCryptos] = useState(cryptosList?.data.coins);

  useEffect(() => {
    setCryptos(cryptosList?.data.coins);
  }, [cryptosList]);
  return (
    <div className="ticker">
      {cryptos?.map((currency: ICoin) => (
        <div key={currency.uuid} className="ticker__el">
          <Link to={`/cryptocurrencies/${currency.uuid}`}>
            <h2 style={{ color: currency.change < 0 ? "#ea3943" : "#16c784" }}>
              {currency.symbol} {currency.change}%
            </h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Ticker;
