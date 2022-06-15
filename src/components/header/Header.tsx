import React, { FC } from "react";
import { Link } from "react-router-dom";
import GlobalStats from "./global-stats/GlobalStats";
import "./Header.scss"

const Header: FC = () => {
  return (
    <div className="header__container">
      <GlobalStats />
      <div className="header__info">
          <Link to="/">
            <h1 className="header__logo">COINFLUENCE</h1>
          </Link>
          <Link to="/cryptocurrencies">
            <h1 className="header__crypto-title">Cryptocurrencies</h1>
          </Link>
          <Link to="/news">
            <h1 className="header__news-title">News</h1>
          </Link>
      </div>
    </div>
  );
};

export default Header;
