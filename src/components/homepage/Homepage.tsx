import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { useGetNewsQuery } from "../../services/newsApi";
import "./Homepage.scss";
import { Spinner } from "../Spinner/Spinner";

const Homepage: FC = () => {
  const { data: newsList, isFetching: isNewsFetching } = useGetNewsQuery({
    newsCategory: "Cryptocurrency",
    count: 10,
  });
  const { data: cryptosList, isFetching: isCryptoFetching } =
    useGetCryptosQuery(10);

  if (isCryptoFetching || isNewsFetching) {
    return <><Spinner /></>;
  }

  return (
    <div className="homepage">
      <div className="homepage__news">
        {newsList &&
          newsList.value.map((news, i) => (
            <div key={i} className="news">
              <a href={news.url} className="news__url" target="_blank">
                <div className="news__image-container">
                  <div className="news__content">
                    <div className="news__provider">
                      <img
                        className="news__provider-image"
                        src={
                          news.provider[0].image !== undefined
                            ? news.provider[0].image.thumbnail.contentUrl
                            : ""
                        }
                        alt=""
                      />
                      <h3 className="news__provider-name">
                        {news.provider[0].name}
                      </h3>
                    </div>
                    <h2 className="news__title">{news.name}</h2>
                    <p className="news__description">
                      {news.description.length > 150
                        ? `${news.description.substring(0, 150)}...`
                        : news.description}
                    </p>
                  </div>
                  <img
                    className="news__image"
                    src={news?.image?.thumbnail?.contentUrl || ""}
                    alt="news"
                  />
                </div>
              </a>
            </div>
          ))}
      </div>
      <div className="homepage__currencies">
        <div className="currencies">
          <div className="currencies__header">
            <h2 className="currencies__title">
              10 most popular cryptocurrencies
            </h2>
          </div>
          <div className="currencies__list">
            {cryptosList?.data.coins.map((coin, i) => (
              <Link key={i} to={`/cryptocurrencies/${coin.uuid}`}>
                <div className={"coin" + (i % 2 == 0 ? " odd" : " even")}>
                  <div className="coin__name">
                    <img src={coin.iconUrl} alt="" className="coin__image" />
                    <div>
                      <h2 className="coin__title">{coin.name}</h2>
                      <h3 className="coin__symbol">{coin.symbol}</h3>
                    </div>
                  </div>
                  <div className="coin__stats">
                    <h2 className="coin__price">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(coin.price)}
                    </h2>
                    <div className="coin__change-container">
                      <div className={coin.change < 0 ? 'arrow-down' : 'arrow-up'}></div>
                      <h2 className={"coin__change"} style={{color: coin.change < 0 ? "#ea3943" : "#16c784"}}>{Math.abs(coin.change)}%</h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
