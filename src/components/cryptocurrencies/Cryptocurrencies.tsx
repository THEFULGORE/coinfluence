import millify from "millify";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICoin } from "../../models/IStats";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import "./Cryptocurrencies.scss";

const Cryptocurrencies: FC = () => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery(100);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSort, setToggleSort] = useState(false);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const sortCryptos = (key: string) => {
    if (toggleSort) {
      setCryptos(
        cryptos
          ?.map((el) => el)
          .sort((a, b) => {
            return (
              Number(b[key as keyof ICoin]) - Number(a[key as keyof ICoin])
            );
          })
      );
    } else {
      setCryptos(
        cryptos
          ?.map((el) => el)
          .sort((a, b) => {
            return (
              Number(a[key as keyof ICoin]) - Number(b[key as keyof ICoin])
            );
          })
      );
    }
    //switchOrder = !switchOrder;
    setToggleSort(!toggleSort)
  };

  return (
    <div>
      <div className="nav-header">
        <div className="search-bar">
          <input
            placeholder="Search Cryptocurrency"
            type="text"
            className="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter">
          <button
            className={"filter__button filter__market-cap"}
            onClick={() => sortCryptos("marketCap")}
          >
            Market Cap
            <div
              className={toggleSort ? "filter-arrow-up" : "filter-arrow-down"}
            ></div>
          </button>
          <button
            className="filter__button filter__price"
            onClick={() => sortCryptos("price")}
          >
            Price
            <div
              className={toggleSort ? "filter-arrow-up" : "filter-arrow-down"}
            ></div>
          </button>
          <button
            className="filter__button top__growth"
            onClick={() => sortCryptos("change")}
          >
            Top growth
            <div
              className={toggleSort ? "filter-arrow-up" : "filter-arrow-down"}
            ></div>
          </button>
        </div>
      </div>
      <div className="crypto">
        {cryptos?.map((coin, i) => (
          <Link key={i} to={`/cryptocurrencies/${coin.uuid}`}>
            <div
              className="cryptocoin"
              style={{
                backgroundColor: coin.change < 0 ? "#ea39434d" : "#16c7844d",
                borderColor: coin.change < 0 ? "#ea3943" : "#16c784",
              }}
            >
              <div className="cryptocoin__header">
                <h2 className="cryptocoin__name">
                  {coin.rank}.{coin.name}
                </h2>
                <img src={coin.iconUrl} alt="" className="cryptocoin__image" />
              </div>
              <div className="cryptocoin__info">
                <h3 className="cryptocoin__price">
                  Price:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(coin.price)}
                </h3>
                <h3 className="cryptocoin__market-cap">
                  Market Cap: ${millify(coin.marketCap)}
                </h3>
                <h3 className="cryptocoin__change">
                  24H Change: {coin.change}%
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
