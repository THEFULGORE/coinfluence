import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Cryptocurrencies, News, Homepage, CryptoDetails, Footer } from './components';
import Ticker from './components/header/ticker/Ticker';

function App() {
	return (
		<div className="App">
			<div className="header">
				<Header />
				<Ticker />
			</div>
			<div className="main">
				<Routes>
					<Route path="/*" element={<Homepage />} />
					<Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
					<Route path="/cryptocurrencies/:coinUID" element={<CryptoDetails />} />
					<Route path="/news" element={<News />} />
				</Routes>
			</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	);
}

export default App;
