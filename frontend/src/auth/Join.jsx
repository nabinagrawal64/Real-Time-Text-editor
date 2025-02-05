import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Join = () => {
    const [roomID, setRoomID] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a POST request to the backend to verify the room ID
        try {
            const response = await fetch("http://localhost:8080/api/join-room", { // Replace with your actual backend URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ roomID }), // Send the roomID in the request body
            });

            const data = await response.json();

            if (response.ok) {
                // Room ID is valid, navigate to the socket page or another page
                navigate(`/room/${roomID}`);
            } else {
                // Room ID is invalid, show an alert
                alert(data.message || "Invalid Room ID");
                setRoomID(""); // Clear the input
            }
        } catch (error) {
            console.error("Error joining room:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const createRoom = () => {
        const newRoomID = uuidv4();
        navigate(`/create/${newRoomID}`);
    };

    return (
        <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 p-6">
            <h1 className="font-bold uppercase text-4xl text-pink-600 mb-6">Join a Room</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-80 flex flex-col gap-4">
                <label className="flex flex-col font-medium text-gray-700">
                    Room ID:
                    <input 
                        type="text" 
                        name="roomID" 
                        value={roomID}
                        onChange={(e) => setRoomID(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter Room ID"
                        autoFocus
                    />
                </label>
                <input 
                    type="submit" 
                    value="Join" 
                    className="bg-pink-600 text-white font-semibold py-2 rounded-lg cursor-pointer hover:bg-pink-700 transition"
                />
            </form>
            <p className="mt-4 text-gray-600">
                {"Don't have a room?"} 
                <button onClick={createRoom} className="text-pink-600 font-semibold hover:underline ml-1">Create a new room</button>
            </p>
        </div>
    );
}

export default Join;
