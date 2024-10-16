import React from 'react';
import './ShowOneData.css';

interface ShowAllReviewsProps {
    text: string;
    ratingFood: number;
    ratingQuality: number;
    ratingInterior: number;
    datetime: string;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const ShowAllReviews: React.FC<ShowAllReviewsProps> = ({ text, ratingFood, ratingQuality, ratingInterior, datetime }) => {
    return (
        <div className="content-rev">
            <h1 className='rev-main-text'>{text}</h1>
            <p className='additional-text-rev'>{formatDate(datetime)}</p>
            <div className='rev-container'>
                <p className='rev-text'>ratingFood: {ratingFood}</p>
                <p className='rev-text'>ratingQuality: {ratingQuality}</p>
                <p className='rev-text'>ratingInterior: {ratingInterior}</p>
            </div>
        </div>
    );
};

export default ShowAllReviews;
