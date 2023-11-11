import React from 'react';

const PhotoGallery: React.FC = () => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} multiple />
            {/* You would then render your images here */}
            <div id="image-preview">
                {/* Image previews would be rendered here */}
            </div>
        </div>
    );
};

export default PhotoGallery;
