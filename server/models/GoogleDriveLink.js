const mongoose = require('mongoose');

const DriveTestLoadSchema = new mongoose.Schema({
    PatientId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming it references a patient document
        ref: 'UserSchemaDetails', // Reference to the Patient model
        required: true
    },
    ReportId: {
        type: String,
        required: true
    },
    ReportLink: {
        type: String,
        required: true
    },
    orderId: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Order" 
    },  
    LinkUploadDate: {
        type: Date,
        default: Date.now
    },
    StatusOfLink: {
        type: String,
        enum: ['Broken', 'Active', 'De-Active'], // Example statuses, adjust as needed
        default: 'Active'
    }
}, { timestamps: true });

module.exports = mongoose.model('DriveTestLoad', DriveTestLoadSchema);
