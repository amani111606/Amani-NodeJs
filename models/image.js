const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    publicId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required:true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps: true})

module.exports = mongoose.model('Image',imageSchema)