import React, { useState } from 'react';
import { PinturaEditor } from '@pqina/react-pintura';
import '@pqina/pintura/pintura.css';
import { getEditorDefaults } from '@pqina/pintura';

type CapturedImageProps = {
  image: string;
}

const CapturedImage: React.FC<CapturedImageProps> = ({ image }) => {
  const [inlineResult, setInlineResult] = useState();
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PinturaEditor>
        {...getEditorDefaults()}
        <img src={image} alt="captured" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </PinturaEditor>
    </div>
  );
}

export default CapturedImage;
