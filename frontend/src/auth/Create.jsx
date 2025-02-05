import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
    const [name, setName] = useState("");
    const [roomID, setRoomID] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
    const navigate = useNavigate();

    const generateRoomID = () => {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmitting(true); // Disable the button during submission
        const newRoomID = generateRoomID();
        setRoomID(newRoomID);
        try {
            const response = await fetch("http://localhost:8080/api/create-room", { // Replace with your actual backend URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, roomID: newRoomID }), // Send the roomID in the request body
            });

            const data = await response.json();

            if (response.ok) {
                // Room ID is valid, navigate to the socket page or another page
                // navigate(`/room/${newRoomID}`);
                alert("Room is created successfully")
                // navigate("/home");
            } else {
                // Room ID is invalid, show an alert
                alert(data.message || "Invalid Room ID");
                setRoomID(""); // Clear the input
            }
        } catch (error) {
            console.error("Error creating room:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false); // Re-enable the button after the request completes
        }
    };

    return (
        <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 p-6">
            <h1 className="font-bold uppercase text-4xl text-pink-600 mb-6">Create a Room</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-80 flex flex-col gap-4">
                <label className="flex flex-col font-medium text-gray-700">
                    Name:
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your name"
                        required
                        disabled={isSubmitting}
                    />
                </label>
                
                <input 
                    type="submit" 
                    value="Create Room" 
                    disabled={isSubmitting} // Disable the button if form is being submitted
                    className={`${isSubmitting ? "bg-pink-700 text-white font-semibold py-2 rounded-lg" : "bg-pink-600 text-white font-semibold py-2 rounded-lg cursor-pointer hover:bg-pink-700 transition"}`}
                />
            </form>
            {roomID && (
                <div className="mt-4 text-gray-600 font-bold text-center">
                    <p>Your Name: <span className="text-pink-600">{name}</span></p>
                    <p>Your Room ID: <span className="text-pink-600">{roomID}</span></p>
                    <button 
                        onClick={() => navigate(`/room/${roomID}`)}
                        className="mt-4 bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                    >
                        Go to Home
                    </button>
                </div>
            )}
        </div>
    );
}

export default CreateRoom;
