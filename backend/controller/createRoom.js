const Room = require('../model/room'); // Import the User model

// Controller for creating a new room
const createRoom = async (req, res) => {
  const { name, roomID } = req.body; // Extract name and roomID from the request body

    if (!name || !roomID) {
        return res.status(400).json({ message: 'Name and roomID are required' });
    }   

    try {
        // Create a new user document with the provided name and roomID
        const newUser = new Room({ name, roomID });
        await newUser.save(); // Save the user to the database
        res.status(201).json({ message: 'Room created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error creating room', error: err });
    }
};

module.exports = { createRoom };
