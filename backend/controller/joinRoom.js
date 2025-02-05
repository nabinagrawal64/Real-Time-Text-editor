const Room = require("../model/room"); // Import the User model

// Controller for joining a room by roomId
const joinRoom = async (req, res) => {
    const { roomID } = req.body; // Extract roomId from the request body
    console.log(roomID);

    if (!roomID) {
        return res.status(400).json({ message: "RoomID is required"});
    }

    try {
        // Find the user by roomId
        const user = await Room.findOne({ roomID });
        console.log(user);

        if (!user) {
            return res.status(404).json({
                message: "User not found for the given RoomID",
                error: error
            });
        }

        res.status(200).json({
            message: "User joined the room successfully",
            user,
        });
    } catch (err) {
        res.status(500).json({ message: "Error joining the room", error: err });
    }
};

module.exports = { joinRoom }; // Export the joinRoom function
