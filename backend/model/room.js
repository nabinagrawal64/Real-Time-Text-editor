const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Ensure no extra spaces around the name
    },
    roomID: {
        type: String,
        required: true,
        unique: true, // Ensure roomID is unique
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date to the current date/time
    },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room; // Export the Room model
