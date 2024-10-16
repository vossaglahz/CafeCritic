import React from 'react';
import './ShowData.css'

interface ShowPlaceProps {
  title: string;
  mainImage: string;
  onPlace: VoidFunction;
}

const ShowPlaces: React.FC<ShowPlaceProps> = ({ title, mainImage, onPlace}) => {

  return (
    <div className="content" onClick={onPlace}>
        <img className='image-content' src={`http://localhost:8000/uploads/${mainImage}`} alt="image of place" />
        <h1 className='text'>{title}</h1>
    </div>
  );
};

export default ShowPlaces;