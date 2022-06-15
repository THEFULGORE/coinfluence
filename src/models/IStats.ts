export interface IStats {
    status: string,
    data: {
        stats: {
            total: number,
            totalCoins: number,
            totalMarkets: number,
            totalExchanges: number,
            totalMarketCap: number,
            total24hVolume: number
        },
        coins: ICoin[]
    }
}

export interface ICoin {
    uuid: string,
    symbol: string,
    name: string,
    color: string,
    iconUrl: string,
    marketCap: number,
    price: number,
    btcPrice: number
    listedAt: number,
    change: number,
    rank: number,
    coinrankingUrl: string,
    "24hVolume": number
}