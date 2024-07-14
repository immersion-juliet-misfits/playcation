import React, { useEffect } from 'react';

const ImageUpload = ({ cloudName, uploadPreset, handleUpload, successUpload }) => {
  useEffect(() => {
      cloudinary.openUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          sources: ['local', 'url'],
          showAdvancedOptions: false,
          cropping: true,
          multiple: false,
          defaultSource: 'local',
          styles: {
            palette: {
              window: '#10173a',
              sourceBg: '#20304b',
              windowBorder: '#7171D0',
              tabIcon: '#79F7FF',
              inactiveTabIcon: '#8E9FBF',
              menuIcons: '#CCE8FF',
              link: '#72F1FF',
              action: '#5333FF',
              inProgress: '#00ffcc',
              complete: '#33ff00',
              error: '#cc3333',
              textDark: '#000000',
              textLight: '#ffffff',
            },
            fonts: {
              default: null,
              'sans-serif': {
                url: null,
                active: true,
              },
            },
          },
        },
        (err, info) => {
        if (err) {
          console.error('Upload Widget error - ', err);
        } else if (!err && info.event === 'success') {
            handleUpload(info.info.secure_url);
            successUpload()
          }
        }
      );
  }, []);
};

export default ImageUpload;