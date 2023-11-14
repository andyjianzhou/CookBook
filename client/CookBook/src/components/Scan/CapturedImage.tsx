import React from 'react';

type CapturedImageProps = {
  image: string;
}

const CapturedImage: React.FC<CapturedImageProps> = ({ image }) => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={image} alt="captured" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </div>
  );
}

export default CapturedImage;
