import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer__container">
				<h2 className="footer__title">
					Made with ❤ by{' '}
					<a href="https://github.com/THEFULGORE" target="_blank">
						THEFULGORE
					</a>
				</h2>
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
