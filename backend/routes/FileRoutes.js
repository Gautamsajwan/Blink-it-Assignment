import express from 'express'
import upload from '../middlewares/multer.js'
import { singleImageUploadHandler, multipleImageUploadHandler, getAllImagesHandler } from '../controllers/Images.js'
import fetchUser from '../middlewares/JWT.js'

const router = express.Router()

router.post('/uploadSingle', upload.single('image'), singleImageUploadHandler)

router.post('/uploadMultiple', upload.array('images'), multipleImageUploadHandler)

router.get('/allImages', fetchUser, getAllImagesHandler)

export default router