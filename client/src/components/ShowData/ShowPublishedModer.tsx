import React from 'react';
import './ShowData.css'

interface ShowPublishedProps {
  title: string;
  mainImage: string;
  onPublish: (id: string) => void;
  onDelete: (id: string) => void;
  id: string;
}

const ShowPublished: React.FC<ShowPublishedProps> = ({ title, mainImage, onPublish, onDelete, id}) => {

  return (
    <div className="content">
        <img className='image-content' src={`http://localhost:8000/uploads/${mainImage}`} alt="image of place" />
        <h1 className='text'>{title}</h1>
        <button className='publish-btn' onClick={() => onPublish(id)}>Publish</button>
        <button className='delete-btn' onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default ShowPublished;