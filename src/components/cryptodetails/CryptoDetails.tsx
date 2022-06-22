import millify from "millify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import { useGetNewsQuery } from "../../services/newsApi";
import LineChart from "../lineChart/LineChart";
import "./CryptoDetails.scss";
import parse from 'html-react-parser';

const CryptoDetails = () => {
  const { coinUID } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [timePeriod, setTimePeriod] = useState(selectedPeriod);
  const { data, isFetching } = useGetCryptoDetailsQuery(coinUID);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinUID,
    timePeriod,
  });
  const [newsCategory, setNewsCategory] = useState(data?.data.coin.name);
  const { data: newsList } = useGetNewsQuery({
    newsCategory: newsCategory,
    count: 4,
  });
  const coinDetails = data?.data?.coin;
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
    },
    { title: "Rank", value: `$ ${coinDetails?.rank}` },
    {
      title: "24h Volume",
      value: `$ ${
        coinDetails?.["24hVolume"] && millify(coinDetails?.["24hVolume"])
      }`,
    },
    {
      title: "Market Cap",
      value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coinDetails?.allTimeHigh?.price &&
        millify(coinDetails?.allTimeHigh?.price)
      }`,
    },
  ];

  useEffect(() => {
    if (data) {
      setNewsCategory(data?.data.coin.name);
    }
  }, [data]);

  const changeTimePeriod = (time: string) => {
    setTimePeriod(time);
    setSelectedPeriod(time);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crypto-details">
      <div className="coin-info__container">
        <div className="coin-info">
          <h2 className="coin-info__name">{coinDetails?.name}</h2>
          <h3 className="coin-info__symbol">{coinDetails?.symbol}</h3>
        </div>
        <div className="coin-details">
          <h1 className="coin-details__price">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(coinDetails?.price!)}
          </h1>
          <div className="coin-details__stats">
            <div className="coin-details__side-stats">
              <h2 className="coin-details__change">24h change</h2>
              <div className="coin-details__change-container">
                <div
                  className={
                    coinDetails?.change! < 0 ? "arrow-down" : "arrow-up"
                  }
                ></div>
                <h2
                  className="coin-details__change-value"
                  style={{
                    color: coinDetails?.change! < 0 ? "#ea3943" : "#16c784",
                  }}
                >
                  {coinDetails?.change!}%
                </h2>
              </div>
            </div>
            <div className="coin-details__side-stats">
              <h2 className="coin-details__market-cap">Market cap</h2>
              <h2 className="coin-details__market-cap-value">
                ${millify(coinDetails?.marketCap!)}
              </h2>
            </div>
            <div className="coin-details__side-stats">
              <h2 className="coin-details__ath">All time high</h2>
              <h2 className="coin-details__ath-value">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(coinDetails?.allTimeHigh?.price!)}
              </h2>
            </div>
            <div className="coin-details__side-stats">
              <h2 className="coin-details__day-volume">24h volume</h2>
              <h2 className="coin-details__day-volume-value">
                ${millify(coinDetails?.["24hVolume"]!)}
              </h2>
            </div>
          </div>
        </div>
        <div className="date-range">
          <div className="date-range__price">
            <h1 className="date-range__price-descr">
              {coinDetails?.name} period change:
            </h1>
            <h1
              style={{
                color: coinHistory?.data?.change! < 0 ? "#ea3943" : "#16c784",
              }}
            >
              {coinHistory?.data?.change}%
            </h1>
          </div>
          <div className="date-range__buttons">
            {time.map((date) => (
              <button
                className={
                  "date-range__button " +
                  (selectedPeriod === date ? "selected" : "")
                }
                key={date}
                onClick={() => changeTimePeriod(date)}
              >
                {date.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="line-chart">
          {coinDetails && coinHistory && (
            <LineChart
              coinHistory={coinHistory}
              currentPrice={millify(coinDetails?.price)}
              coinName={coinDetails?.name}
            />
          )}
        </div>
        <div className="coin-desc-link">
          <h3 className="coin-desc-link__title">
            What is {coinDetails?.name}?
          </h3>
          <p>{parse(coinDetails?.description!)}</p>
        </div>
      </div>
      <div className="side-info">
        <div>
          <h1>Recent news</h1>
          {newsList &&
            newsList.value.map((news, i) => (
              <div key={i} className="side-info__container">
                <a href={news.url} className="side-info__url" target="_blank">
                  <div className="side-info__image-container">
                    <div className="side-info__content">
                      <h2 className="side-info__title">{news.name}</h2>
                    </div>
                    <div className="side-info__description-container">
                      <p className="side-info__description">
                        {news.description}
                      </p>
                    </div>
                  </div>
                  <div className="side-info__provider">
                    <img
                      className="side-info__provider-image"
                      src={
                        news.provider[0].image !== undefined
                          ? news.provider[0].image.thumbnail.contentUrl
                          : ""
                      }
                      alt=""
                    />
                    <h3 className="side-info__provider-name">
                      {news.provider[0].name}
                    </h3>
                  </div>
                </a>
              </div>
            ))}
        </div>
        <div className="side-links">
          <h1 className="side-links__title">Links</h1>
          <div className="side-links__container">
            {coinDetails &&
              coinDetails.links.map((link) => (
                <div key={link.name} className="side-links__type">
                  <h3>{link.type}</h3>
                  <a href={link.url} className="side-links__hyperlink">
                    {link.name}
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
