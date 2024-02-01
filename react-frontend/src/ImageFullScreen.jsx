import React from 'react';

const ImageFullScreen = ({ imageUrl, onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'transparent', color: 'white', border: 'none', fontSize: '20px', cursor: 'pointer' }} onClick={onClose}>
        X
      </button>
      <img style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} src={imageUrl} alt="Full Screen" />
    </div>
  );
};

export default ImageFullScreen;
