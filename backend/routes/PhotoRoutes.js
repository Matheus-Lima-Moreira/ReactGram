const express = require('express');
const router = express.Router();

// Controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhoto } = require('../controllers/PhotoController');

// Middlewares
const { photoInsertValidation, photoUpdateValidation, commentValidation } = require('../middlewares/photoValidation');
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');
const { imageUpload } = require('../middlewares/imageUpload');

// Routes

// Insert (/api/photos)
router.post(
  '/',
  authGuard,
  imageUpload.single('image'),
  photoInsertValidation(),
  validate,
  insertPhoto
);

// Delete (/api/photos/:id)
router.delete(
  '/:id',
  authGuard,
  deletePhoto
);

// Get all (/api/photos)
router.get(
  '/',
  authGuard,
  getAllPhotos
);

// Get user photos (/api/photos/user/:id)
router.get(
  '/user/:id',
  authGuard,
  getUserPhotos
);

router.get(
  '/search',
  authGuard,
  searchPhoto
);

// Get photo by id (/api/photos/:id)
router.get(
  '/:id',
  authGuard,
  getPhotoById
);

// Update photo (/api/photos/:id)
router.put(
  '/:id',
  authGuard,
  photoUpdateValidation(),
  validate,
  updatePhoto
);

// Like photo (/api/photos/like/:id)
router.put(
  '/like/:id',
  authGuard,
  likePhoto
);

// Comment photo (/api/photos/comment/:id)
router.put(
  '/comment/:id',
  authGuard,
  commentValidation(),
  validate,
  commentPhoto
);

module.exports = router;