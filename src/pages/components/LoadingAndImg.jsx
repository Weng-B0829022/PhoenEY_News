import React, { useState, useEffect } from 'react';

const ImgWithLoading = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      console.error('Image failed to load');
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className='w-full h-full'>
      {isLoading ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
          <rect width="100%" height="100%" fill="#2F384E" />
        </svg>
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          className={`object-cover ${className}`}
        />
      )}
    </div>
  );
};

export default ImgWithLoading;