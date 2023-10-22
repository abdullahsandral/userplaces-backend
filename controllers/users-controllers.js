const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Places = require('../modals/placess-model');
const User = require('../modals/users-model');
const HttpError = require('../modals/HTTP-Error');

const getAllUsers = async (req, res, next) => {
  var allUsers;
  try {
    allUsers = await User.findAll({
      attributes: ['U_ID', 'U_Name', 'U_Email', 'U_Image', 'U_Places']
    });

    // if(allUsers.length<=0)
    // return next(new HttpError("NO USER EXISTTTTT",404));
  } catch (error) {
    return next(new HttpError(error));
  }

  res.send(allUsers);
};

const signUP = async (req, res, next) => {
  const { name, email, password } = req.body;
  var hashedPassword;

  try {
    const user = await User.findOne({ where: { U_Email: email } });

    if (user)
      return next(
        new HttpError('User with this E-Mail already Exist\nPlease Try a Different E-Mail', 422)
      );
  } catch (error) {
    return next(new HttpError(error));
  }

  try {
    hashedPassword = await bcrypt.hash(password, 7);

    if (!hashedPassword) return next(new HttpError('SignUp Failed due to Password Hashing'));
  } catch (error) {
    return next(new HttpError(error));
  }
  let createdUser;
  try {
    createdUser = await User.create({
      U_Name: name,
      U_Email: email,
      U_Password: hashedPassword,
      U_Image: req.file.path,
      U_Places: 0
    });

    if (!createdUser) return next(new HttpError('SignUp Failed'));
  } catch (error) {
    return next(new HttpError(error));
  }
  var token;
  try {
    token = jwt.sign(
      { userId: createdUser.U_ID, userEmail: createdUser.U_Email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (error) {
    return next(new HttpError(error));
  }

  res.json({
    U_ID: createdUser.U_ID,
    U_Image: createdUser.U_Image,
    U_Token: token
  });
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  var user;
  try {
    existingUser = await User.findOne({ where: { U_Email: email } });

    if (!existingUser)
      return next(new HttpError("Login Failed \nUSER with This Email Doesn't Exist", 404));
  } catch (error) {
    return next(new HttpError(error));
  }

  let validPassword = false;
  try {
    validPassword = await bcrypt.compare(password, existingUser.U_Password);

    if (!validPassword) return next(new HttpError('Inavalid Credentials', 401));
  } catch (error) {
    return next(new HttpError(error));
  }

  var token;
  try {
    token = jwt.sign(
      { userId: existingUser.U_ID, userEmail: existingUser.U_Email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (error) {
    return next(new HttpError(error));
  }

  res.json({
    U_ID: existingUser.U_ID,
    U_Image: existingUser.U_Image,
    U_Token: token
  });
};

exports.getAllUsers = getAllUsers;
exports.signIn = signIn;
exports.signUP = signUP;
