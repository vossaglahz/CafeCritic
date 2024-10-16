export interface IGetData<T> {
    [key: string]: T
};

export type ImagesData = {
    id: string,
    imageName: string;
    placeId: string;
}