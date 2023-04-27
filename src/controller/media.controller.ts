import { getImage, getImagesByUser, saveImage } from '../adapter/media.adapter.js';
import { getFileExtension } from '../helpers/get_file_name.js';

const uploadNetworksImages = async (req, res) => {
  try {
    if (!req.file) {
      res.end();
      return;
    }
    const fileName = getFileExtension(req.file?.originalname);
    if (!fileName) {
      res.end();
      return;
    }
    const { id, originalName, size, type, url, publish } = await saveImage(
      req.user.id,
      req.query?.publish_id,
      req?.file,
      req.query?.network,
      fileName
    );
    res.status(200).send({
      fileName,
      id,
      originalName,
      size,
      type,
      url,
      publish
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

// const getUploadNetworkImages = async (req, res) => {
//   try {
//     const fileName = getFileExtension(req.file?.originalname);
//     if (!fileName) res.end();
//     const response = await saveImage(req?.file, req.query?.network, fileName);
//     res.status(200).send(response);
//   } catch (e) {
//     console.log(e.message);
//     res.status(400).send({
//       message: e.message,
//       status: 400,
//     });
//   }
// };

const getImageById = async (req, res) => {
  try {
    const response = await getImage(req.query.id);
    res.status(200).send(response);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

const getImages = async (req, res) => {
  try {
    const response = await getImagesByUser(req.user.id);
    res.status(200).send(response);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
}

export { uploadNetworksImages, getImageById, getImages };
