import React, { useState } from 'react'
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { useGetNewsQuery } from '../../services/newsApi';
import './News.scss'

const News = () => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: newsList } = useGetNewsQuery({
    newsCategory: newsCategory,
    count: 30,
  });
  
  const filterInput = (text:string) => {
    data?.data?.coins.forEach(coin => {
      if(coin.name.toLowerCase() === text.toLowerCase()) { setNewsCategory(text)}
    })
  }

  return (
    <div>
      <div className="news-page__search">
        <input
          type="text"
          placeholder="Search cryptocurrency"
          list="news-search"
          className='search news-page__input'
          onChange={(e) => filterInput(e.target.value)}
        />
        <datalist id="news-search">
          {data?.data?.coins.map((coin, i) => (
            <option key={i} value={coin.name}>{coin.name}</option>
          ))}
        </datalist>
      </div>
      <div className="news-page">
        {newsList &&
          newsList.value.map((news, i) => (
            <div key={i} className="news-page__container">
              <a href={news.url} className="news-page__url" target="_blank">
                <div className="news-page__image-container">
                  <div className="news-page__content">
                    <h2 className="news-page__title">{news.name}</h2>
                    <img
                      className="news-page__image"
                      src={news?.image?.thumbnail?.contentUrl || ""}
                      alt="news"
                    />
                  </div>
                  <div className="news-page__description-container">
                    <p className="news-page__description">{news.description}</p>
                  </div>
                </div>
                <div className="news-page__provider">
                  <img
                    className="news-page__provider-image"
                    src={
                      news.provider[0].image !== undefined
                        ? news.provider[0].image.thumbnail.contentUrl
                        : ""
                    }
                    alt=""
                  />
                  <h3 className="news-page__provider-name">
                    {news.provider[0].name}
                  </h3>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default News
