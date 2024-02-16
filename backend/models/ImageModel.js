import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
    uploadTimestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    tags: [{
        type: String,
        default: [],
    }],
    imageURL: {
        type: String,
    },
    imageId: {
        type: String,
    },
})

const ImageModel = new mongoose.model('Images', ImageSchema);

export default ImageModel