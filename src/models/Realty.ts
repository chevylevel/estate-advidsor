export interface RealtyData {
    name: string;
    type: string;
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
    isPossibleToStay: boolean;
    constructionDeadlineYear: number,
    constructionDeadlineQuarter: number,
    withView: boolean;
    withInstallment: boolean;
    description: string;
    tags:string[],
    images: {
        id: string,
        url: string,
    }[];
}

export interface Realty extends RealtyData {
    _id: string;
}
