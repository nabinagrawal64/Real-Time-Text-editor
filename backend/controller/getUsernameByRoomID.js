const Room = require('../model/room'); // Assuming User is the model for users

// Controller to fetch the username based on roomID
const getUsernameByRoomID = async (req, res) => {
    const { roomID } = req.params; // Get roomID from the URL parameter
    console.log(roomID);

    try {
        // Find the user by roomID
        const user = await Room.findOne({ roomID });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found for the given RoomID" });
        }

        // Return the user's username
        res.status(200).json({ name: user.name });
    } catch (err) {
        res.status(500).json({ message: "Error fetching username", error: err });
    }
};

module.exports = { getUsernameByRoomID };
