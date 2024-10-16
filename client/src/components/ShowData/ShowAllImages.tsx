import React from 'react';
import './ShowOneData.css'

interface ShowAllImagesProps {
    imageName: string;
}

const ShowAllImages: React.FC<ShowAllImagesProps> = ({ imageName }) => {

  return (
    <>
    <div className="images-container">
        <img className='uploadedImages' src={`http://localhost:8000/uploads/${imageName}`} alt="images of place" />
    </div>
    </>
  );
};

export default ShowAllImages;