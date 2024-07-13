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
        <img
          src='../../../public/Loading.png'
          alt={alt}
          className={`${className}`}
        />
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