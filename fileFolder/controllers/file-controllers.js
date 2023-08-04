const File = require('../models/FilesModels');

const path = require('path');

const fs = require('fs');
// const path = require('path');

const deleteFileFromUploads = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    }
    //  else {
    //   console.log('File deleted successfully:', filePath);
    // }
  });
};

const uploadFiles = (req, res) => {
  const files = req.files.map(({ filename, mimetype, path, size }) => {
    return {
      filename,
      mimetype,
      path,
      size,
    };
  });

  File.create(files)
    .then((result) => {
      return res.status(200).json({ files: result });
    })
    .catch((err) => {
      return console.log('err');
    });
};

const getFiles = async (req, res) => {
  const id = req.query.id;
  let files;
  let where = {};
  if (id) {
    where._id = id;
  }

  try {
    files = await File.find(where);
  } catch (error) {
    return console.log(error);
  }

  if (!files) {
    return res.status(404).json({ message: 'No Files Found' });
  }

  return res.status(200).json(files);
};

const deleteFile = async (req, res) => {
  const { id } = req.params;
  let result;
  try {
    result = await File.findByIdAndDelete(id);
  } catch (error) {
    return console.log({ error });
  }

  if (!result) {
    return res.status(404).json({ message: 'File Not Found' });
  }

  deleteFileFromUploads(result.path);

  return res.status(200).json({ deletedFile: result });
};

const downloadFile = async (req, res) => {
  try {
    const fileObj = await File.findById(req.params.id);
    const filePath = path.join(process.cwd(), fileObj.path);
    return res.download(filePath);
  } catch (error) {
    return console.log(error);
  }
};

const updateFile = async (req, res) => {
  const { id } = req.params;

  const { filename, mimetype, path, size } = req.files[0];
  let updatedFile;

  try {
    updatedFile = await File.findByIdAndUpdate(id, {
      filename,
      mimetype,
      path,
      size,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!updatedFile) {
    return res.status(404).json({ message: 'file not found to update' });
  }

  deleteFileFromUploads(updatedFile.path);
  return res.status(200).json({
    _id: updatedFile._id,
    filename,
    mimetype,
    path,
    size,
    createdAt: updatedFile.createdAt,
    updatedAt: updatedFile.updatedAt,
  });
};

module.exports = {
  uploadFiles,
  getFiles,
  deleteFile,
  downloadFile,
  updateFile,
};
