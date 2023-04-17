import { ManagedUpload } from 'aws-sdk/clients/s3.js';
import { s3 } from '../config/s3_bucket.js';
import { Media } from '../entity/media.entity.js';
import { FILE_IMAGES } from '../helpers/regex.js';
import { mediaRepository } from '../repository/media.repository.js';
import { getPublishById } from './publish.adapter.js';
import { getUser } from './user.adapter.js';

interface S3Response {
  location: string;
  key: string;
  fileName: string;
  originalName: string;
  fileType: string;
}

const uploadImageToS3 = (file, path: string, fileName: string) => {
  const ACL = 'public-read';
  if (!FILE_IMAGES.test(fileName))
    throw Error('Extension de archivo no valida');

  const albumBucketName = process.env.AWS_BUCKET_NAME;
  const keyName = `networks/${path}/${fileName}`;
  const objectParams = {
    Bucket: albumBucketName,
    Key: keyName,
    Body: file.buffer,
    ACL,
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

const saveImage = async (userId, publish_id, file, path: string, fileName: string) => {
  const response: S3Response = await uploadImageToS3(file, path, fileName);
  const publish = publish_id ? [await getPublishById(publish_id)] : [];
  const user = await getUser(userId);
  const media = {
    fileName: response.fileName,
    type: response.fileType,
    originalName: response.originalName,
    size: file.size,
    url: response.location,
    publish: publish,
    user
  }
  return mediaRepository.save(media);
};

const getImage = async (id) => {
  const membership: Media = await mediaRepository.findOneBy({ id });
  if (!membership) throw Error('Media File no encontrado');

  return membership;
}

export { saveImage, getImage };
