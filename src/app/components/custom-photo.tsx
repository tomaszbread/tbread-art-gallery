// CustomPhoto.tsx
"use client";

import React, { MouseEventHandler } from 'react';

interface CustomPhotoProps {
  photo: {
    src: string;
    alt: string;
  };
  width: number;
  height: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>; // Adapt to MouseEventHandler
}

const CustomPhoto: React.FC<CustomPhotoProps> = ({ photo, width, height, onClick }) => (
  <a
    href={photo.src}
    data-pswp-width={width}
    data-pswp-height={height}
    onClick={onClick} // Properly handles MouseEventHandler
    style={{ display: 'block', width, height }}
  >
    <img
      src={photo.src}
      alt={photo.alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </a>
);

export default CustomPhoto;
