import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {API_BASE_URL, endpoints} from '../../../../api/endpoints';

const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const videoUrl = `${API_BASE_URL}${endpoints.getGeneratedVideo}?filename=${encodeURIComponent(id)}`;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <ArrowLeft className="mr-2" size={20} />
        返回
      </button>
      
      <h1 className="text-2xl font-bold mb-4">影片播放</h1>
      
      <div className="aspect-w-16 aspect-h-9">
        <video controls className="w-full h-full rounded-lg shadow-lg">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Video;