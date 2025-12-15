const cloudinary = require('cloudinary').v2;
const { cloudinary: cloudConfig } = require('../config');

cloudinary.config(cloudConfig);

async function uploadFromPath(path, options = {}) {
  return cloudinary.uploader.upload(path, options);
}

module.exports = { uploadFromPath, cloudinary };
