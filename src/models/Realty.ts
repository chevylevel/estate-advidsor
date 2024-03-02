export interface RealtyData {
    name: string;
    realtyType: string;
    ownership: string;
    ownershipPeriod: string;
    squareMin: number;
    squareMax: number;
    priceMin: number;
    priceMax: number;
    roiSale: number;
    roiRent: number;
    bedrooms: number;
    landSquareMin: number;
    landSquareMax: number;
    location: string;
    occupancy: number;
    beachDistance: number;
    livingPossibility: string;
    constructionStatus: string;
    windowView: string;
    description: string;
    images: {
        id: string,
        url: string,
    }[];
}

export interface Realty extends RealtyData {
    _id: string;
}
