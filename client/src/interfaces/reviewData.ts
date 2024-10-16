export interface IGetData<T> {
    [key: string]: T
};

export type ReviewData = {
    id: string,
    text: string;
    ratingFood: number;
    ratingQuality: number;
    ratingInterior: number;
    datetime: string;
    placeId: string;
}