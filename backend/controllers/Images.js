import ImageModel from '../models/ImageModel.js'
import cloudinary from '../config/cloudinary.js'
import fs from 'fs'

const singleImageUploadHandler = async (req, res) => {
    try {
        console.log("file=>", req.file)
        const { originalname, mimetype, size, path } = req.file
        
        const options = {
            folder: 'Blinkit',
            allowed_formats: [ "jpg", "jpeg", "png", "gif" ],
            categorization: 'google_tagging',
            auto_tagging: .6,
            max_results: 5
        }

        const result = await cloudinary.uploader.upload(path, options)
        if (!result.secure_url) {
            res.status(500).json({
                success: false,
                message: 'Error uploading file to Cloudinary'
            });
        }

        const imageURL = result.secure_url
        const imageId = result.public_id
        const tags = result.tags

        const newImage = await ImageModel.create({
            fileName: originalname,
            fileType: mimetype,
            fileSize: size,
            uploadTimeStamp: new Date(),
            tags,
            imageURL,
            imageId
        })

        fs.unlinkSync(path)

        res.status(200).json({
            success: true,
            message: 'File Uploaded Successfully',
            data: newImage
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

const multipleImageUploadHandler = async (req, res) => {
    console.log("files=>", req.files)
    const images = req.files
    let n = images.length

    try {
        const promises = images.map(async(file) => {
            const { originalname, mimetype, size, path } = file
        
            const options = {
                folder: 'Blinkit',
                allowed_formats: [ "jpg", "jpeg", "png", "gif" ],
                categorization: 'google_tagging',
                auto_tagging: .6,
                max_results: 5
            }

            const result = await cloudinary.uploader.upload(path, options)
            if (!result.secure_url) {
                res.status(500).json({
                    success: false,
                    message: 'Error uploading file to Cloudinary'
                });
            }

            const imageURL = result.secure_url
            const imageId = result.public_id
            const tags = result.tags

            const newImage = await ImageModel.create({
                fileName: originalname,
                fileType: mimetype,
                fileSize: size,
                uploadTimeStamp: new Date(),
                tags,
                imageURL,
                imageId
            })

            fs.unlinkSync(path)
        })
        
        await Promise.all(promises)
        res.status(200).json({
            success: true,
            message: `${n} Images Uploaded Successfully`,
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
}

const getAllImagesHandler = async(req, res) => {
    try {
        const allImages = await ImageModel.find({})

        res.status(200).json({
            success: true,
            data: allImages
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch images, refresh the page and try again'
        })
    }
}

export { singleImageUploadHandler, multipleImageUploadHandler, getAllImagesHandler }