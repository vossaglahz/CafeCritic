import React from 'react';
import './ShowData.css'

interface ShowPublishedProps {
  title: string;
  mainImage: string;
}

const ShowPublished: React.FC<ShowPublishedProps> = ({ title, mainImage}) => {

  return (
    <div className="content">
        <img className='image-content' src={`http://localhost:8000/uploads/${mainImage}`} alt="image of place" />
        <h1 className='text'>{title}</h1>
        <p className='in-moderation'> - In Moderation</p>
    </div>
  );
};

export default ShowPublished;