import { uploadImage } from '../adapter/media.adapter.js';
import { getFileExtension } from '../helpers/get_file_name.js';

const uploadNetworksImages = async (req, res) => {
  try {
    const fileName = getFileExtension(req.file?.originalname);
    if (!fileName) res.end();
    const response = await uploadImage(
      req?.file,
      req.query?.network,
      fileName
    );
    res.status(200).send(response);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      status: 400,
    });
  }
};

export { uploadNetworksImages };
