export interface IGetData<T> {
    [key: string]: T
};

export type PlaceData = {
    id: string,
    title: string,
    description: string,
    published: boolean,
    imageName: string,
    mainImage: string
}