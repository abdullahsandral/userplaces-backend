require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const cors = require('cors');

const placesRoutes = require('./routes/placesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const db = require('./config/database-config');
const HttpError = require('./modals/HTTP-Error');

const app = express();

app.use(cors());

try {
  db.authenticate().then(() => console.log('Database Connected...'));
} catch (error) {
  console.dir(error);
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/users', usersRoutes);

app.use('/api/places', placesRoutes);

app.use((req, res, next) => {
  next(new HttpError('This Route DoesNot Exist on SERVER', 404));
});
console.log('Process : ', process.env.CLOUD_NAME);
app.use((error, req, res, next) => {
  // if(req.file)  { fileSystem.unlink(req.file.path, err => console.log(err)); }

  console.log('IN ERROR : ' + error.message);

  if (res.headerSent) return next(error);
  res.status(error.code || 500);
  res.json({
    errorMsg: error.message || 'An UNKONOWN Error Has Occured',
    errorCode: error.code || 500
  });
});

app.listen(process.env.PORT || 5000);
