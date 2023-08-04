const express = require('express');

const multer = require('multer');

const fs = require('fs');
const path = require('path');

const {
  uploadFiles,
  getFiles,
  deleteFile,
  downloadFile,
  updateFile,
} = require('../controllers/file-controllers');

function sanitizeFileName(fileName) {
  // Replace all invalid characters with an empty string
  // const sanitizedFileName = fileName.replace(/[\\/:*?"<>|!@#$%^&*\s]/g, '');

  const sanitizedFileName = fileName.replace(
    /[\\/:*?"<>|!@#$%^&*()\+=\[\]{}'~`\s]/g,
    ''
  );

  // Remove leading and trailing whitespaces
  const trimmedFileName = sanitizedFileName.trim().toLowerCase();

  // Make sure the file name is not empty after sanitization
  if (!trimmedFileName) {
    throw new Error('File name is invalid after sanitization');
  }

  return trimmedFileName;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}_${sanitizeFileName(file.originalname)}`;
    cb(null, name);
  },
});

const fileUploadMiddleWare = multer({
  storage: storage,
});

const fileRouter = express.Router();

fileRouter.get('/files', getFiles);

fileRouter.post('/upload', fileUploadMiddleWare.any(), uploadFiles);

fileRouter.delete('/delete/:id', deleteFile);

fileRouter.get('/download/:id', downloadFile);

fileRouter.put('/update/:id', fileUploadMiddleWare.any(), updateFile);

module.exports = fileRouter;
