import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import GlobalStats from "./global-stats/GlobalStats";
import "./Header.scss";

const Header: FC = () => {

  const handleClick = (e: any) => {
    if (e.classList.contains("bx-sun")) {
      e.classList.remove("bx-sun");
      e.classList.add("bx-moon");
    }
    else {
      e.classList.remove("bx-moon");
      e.classList.add("bx-sun");
    }
    document.body.classList.toggle("light-theme");
  }

  return (
    <div className="header__container">
      <GlobalStats />
      <div className="header__info">
        <Link to="/">
          <h1 className="header__logo">₵OINFLUENCE</h1>
        </Link>
        <div className="header__nav">
          <Link to="/cryptocurrencies">
            <h1 className="header__crypto-title">Cryptocurrencies</h1>
          </Link>
          <Link to="/news">
            <h1 className="header__news-title">News</h1>
          </Link>
        </div>
        <div className="header__theme">
          <i
            className="bx bx-sun change-theme"
            id="theme-button"
            onClick={(e) => handleClick(e.currentTarget)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
