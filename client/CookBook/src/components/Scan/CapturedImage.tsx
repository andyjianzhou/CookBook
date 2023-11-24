import React, { useState } from 'react';
import { PinturaEditor } from '@pqina/react-pintura';
import '@pqina/pintura/pintura.css';
import { getEditorDefaults } from '@pqina/pintura';

type CapturedImageProps = {
  image: string;
}

const CapturedImage: React.FC<CapturedImageProps> = ({ image }) => {
  const [inlineResult, setInlineResult] = useState<string | null>(null);
  return (
    <div style={{height: '80vh'}}>
    {/* <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
      {/* Create a custom component to make edits on the image - copy snapchat in Features page */}
      <PinturaEditor
        {...getEditorDefaults()}
          src={image}
          onProcess={(res) =>
              setInlineResult(URL.createObjectURL(res.dest))
          }
      />
      {inlineResult && <img src={inlineResult} alt="" />}
    {/* </div> */}
    </div>
  );
}

export default CapturedImage;
