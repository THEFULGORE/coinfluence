import React from "react";
import { Link } from "react-router-dom";
import './Footer.scss'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <h2 className="footer__title">Coinfluence</h2>
        <h3 className="footer__rights">All rights reserved</h3>
        <div className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/cryptocurrencies">Crypto</Link>
          <Link to="/news">News</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
