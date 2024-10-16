import React from 'react';
import './ShowOneData.css'

interface ShowOnePlaceProps {
  title: string;
  description: string;
  mainImage: string;
  onReview: (id: string) => void;
  onUploadImage: (id: string) => void;
  id: string;
  onImages: (id: string) => void;
  onReviews: (id: string) => void;
}

const ShowOnePlace: React.FC<ShowOnePlaceProps> = ({ title, description, mainImage, onReview, onUploadImage, onImages, onReviews, id}) => {

  return (
    <div className="content-one">
        <img className='image-content-one' src={`http://localhost:8000/uploads/${mainImage}`} alt="image of place" />
        <div className='one-text'>
          <h1 className='text-one'>{title}</h1>
          <p className='additional-text'>{description}</p>
          <button className='review-btn' onClick={() => onReview(id)}>Write Review</button>
          <button className='upload-btn' onClick={() => onUploadImage(id)}>Upload Image</button>
          <button className='see-all-btn' onClick={() => onImages(id)}>See All Images</button>
          <button className='see-all-rev-btn' onClick={() => onReviews(id)}>See All Reviews</button>
        </div>
    </div>
  );
};

export default ShowOnePlace;