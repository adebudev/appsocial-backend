import { config } from 'dotenv';
config(); 

import { ManagedUpload } from 'aws-sdk/clients/s3.js';
import { s3 } from '../config/s3_bucket.js';
import { FILE_IMAGES } from '../helpers/regex.js';

const uploadImage = (file, path: string, fileName: string) => {
  if (!FILE_IMAGES.test(fileName)) throw Error('Extension de archivo no valida');

  const albumBucketName = process.env.AWS_BUCKET_NAME;
  const keyName = `networks/${path}/${fileName}`;
  const objectParams = {
    Bucket: albumBucketName,
    Key: keyName,
    Body: file.buffer,
    ACL: 'public-read',
  };

  // Create object upload promise
  return new Promise((resolve, reject) => {
    const uploadPromise = s3.upload(objectParams).promise();
    uploadPromise
      .then((data: ManagedUpload.SendData) => {
        resolve({
          location: data.Location,
          key: data.Key,
          fileName,
          originalName: file.originalname,
          fileType: file.mimetype,
        });
      })
      .catch((error) => reject(error));
  });
};

export { uploadImage };
