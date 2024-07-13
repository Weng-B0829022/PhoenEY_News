import React, { useState } from 'react';
const ImgWithLoading = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    console.log('Image loaded');
    setIsLoading(false);
  };

  return (
    <div >
      {isLoading && (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
          <rect width="100%" height="100%" fill="#2F384E" />
        </svg>

      )}
      <img
        src={src}
        alt={alt}
        className={`${className}`}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ImgWithLoading;