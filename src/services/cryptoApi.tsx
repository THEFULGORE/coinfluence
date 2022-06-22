import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICoinHistory, ISingleCoin, IStats } from "../models/IStats";

const cryptoApiHeaders = {
  "x-rapidapi-key": "8a2b28b6c3msh2366e70c26b029cp1b819djsn25951fde9587",
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<IStats, any>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<ISingleCoin, any>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<ICoinHistory, any>({
      query: ({ coinUID, timePeriod }) => createRequest(`/coin/${coinUID}/history?timePeriod=${timePeriod}`), }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
