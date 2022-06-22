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

export interface ISingleCoin {
    data: {
        coin: ICoin
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
    description: string,
    btcPrice: number
    listedAt: number,
    change: number,
    rank: number,
    coinrankingUrl: string,
    "24hVolume": number,
    allTimeHigh?: IPrice,
    numberOfMarkets?: number,
    numberOfExchanges?: number,
    supply?: {
        confirmed: boolean,
        circulating: number,
        total: number
    }
    links: ILinks[]
}

export interface ICoinHistory {
    data: {
        change: number,
        history: IPrice[]
    }
}

interface IPrice {
    price: number,
    timestamp: number
}

interface ILinks {
    name: string,
    type: string,
    url: string
}