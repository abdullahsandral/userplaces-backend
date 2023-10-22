const Multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const MIME_TYPE_MAP = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};

let storage;
try {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'user-places',
      allowedFormats: ['jpg', 'jpeg', 'png']
    }
  });
} catch (error) {
  console.log('KRN');
}

const fileUpload = Multer({
  limits: 5000000,
  storage: storage
  // storage : Multer.diskStorage(
  // {
  //     destination : (req, file, cb) =>
  //     {
  //         cb(null, 'uploads/images');
  //     },
  //     filename : (req, file, cb) =>
  //     {
  //         const imageExtension = MIME_TYPE_MAP[file.mimetype];

  //         cb(null, uuid()+'.'+imageExtension);
  //     }
  // }
  // ),
  // fileFilter : (req, file, cb) =>
  // {
  //     const validImage = !!MIME_TYPE_MAP[file.mimetype];
  //     const error = validImage ? null : new Error("Invalid Image Mime Type");
  //     cb(error, validImage);
  // }
});

module.exports = fileUpload;
