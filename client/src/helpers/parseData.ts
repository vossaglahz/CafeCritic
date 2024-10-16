import { ReviewData } from '@/interfaces/reviewData';
import { IGetData, PlaceData } from '../interfaces/placeData'
import { ImagesData } from '@/interfaces/imagesData';

export const parsePlaceData = (data: IGetData<{id: string, title: string; description: string, published: boolean, imageName: string, mainImage: string}>): PlaceData[] => {
    return Object.keys(data).map(id => {
        return {
            id: data[id].id,
            title: data[id].title,
            description: data[id].description,
            published: data[id].published,
            imageName: data[id].imageName,
            mainImage: data[id].mainImage
        };
    });
};

export const parseImageData = (data: IGetData<{id: string, imageName: string, placeId: string }>): ImagesData[] => {
    return Object.keys(data).map(id => {
        return {
            id: data[id].id,
            imageName: data[id].imageName,
            placeId: data[id].placeId
        };
    });
};

export const parseReviewData = (data: IGetData<{id: string, text: string, ratingFood: number, ratingQuality: number, ratingInterior: number, datetime: string, placeId: string }>): ReviewData[] => {
    return Object.keys(data).map(id => {
        return {
            id: data[id].id,
            text: data[id].text,
            ratingFood: data[id].ratingFood,
            ratingQuality: data[id].ratingQuality,
            ratingInterior: data[id].ratingInterior,
            datetime: data[id].datetime,
            placeId: data[id].placeId
        };
    });
};