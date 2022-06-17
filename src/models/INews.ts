export interface INews {
    readLink: string,
    value: INewsValue[]
}

export interface INewsValue {
    name: string,
    url: string,
    image: {
        thumbnail: {
            contentUrl: string,
            width: number,
            height: number
        }
    },
    description: string,
    provider: INewsProvider[],
    datePublished: string,
    category: string

}

interface INewsProvider {
    name: string,
    image: {
        thumbnail: {
            contentUrl: string
        }
    }
}