import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Socket() {
    const { roomID } = useParams(); 
    const [document, setDocument] = useState("");
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState(''); // Store the username
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Track cursor position
    const [showTooltip, setShowTooltip] = useState(false); // Show/Hide tooltip

    useEffect(() => {
        // Fetch the username from the backend using the roomID
        const fetchUsername = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user/${roomID}`);
                const data = await response.json();

                if (response.ok) {
                    setUsername(data.name);
                } else {
                    alert("Error fetching username");
                }
            } catch (err) {
                alert("Error fetching username");
                console.error("Error:", err);
            }
        };

        fetchUsername();
    }, [roomID]);

    useEffect(() => { 
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);

        socket.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === "init") {
                    setDocument(message.data);
                } else if (message.type === "update") {
                    setDocument(message.data);
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socket.onerror = () => {
            console.error("WebSocket connection error");
        };

        return () => {
            socket.close();
        };
    }, []);

    // Handle input change
    const handleChange = (event) => {
        setDocument(event.target.value);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: "update",
                data: event.target.value
            }));
        }
    };

    // Track cursor position
    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setCursorPosition({ x: clientX, y: clientY });
        setShowTooltip(true);
    };

    // Hide tooltip after user stops moving the cursor
    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div className="flex justify-center items-center flex-col p-4 bg-gray-100 min-h-screen">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-6 relative">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Hello, {username}</h1>
                <div className="mb-4">
                    <p className="text-lg text-gray-700">
                        Start typing in the text area below. Your changes will be reflected in real-time:
                    </p>
                </div>

                {/* Textarea with Mouse Tracking */}
                <div className="relative">
                    {showTooltip && (
                        <div
                            className="absolute bg-gray-800 text-white px-2 py-1 rounded-md text-sm transition-opacity duration-300"
                            style={{
                                top: cursorPosition.y - 40,  // Position tooltip above cursor
                                left: cursorPosition.x - 5, // Center tooltip
                                position: 'fixed', // Keep tooltip at cursor position
                                zIndex: 1000, // Ensure it's above everything
                                cursor: 'default'
                            }}
                        >
                            {username} 
                        </div>
                    )}

                    <textarea
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        value={document}
                        onChange={handleChange}
                        onMouseMove={handleMouseMove} // Track cursor movement
                        onMouseLeave={handleMouseLeave} // Hide tooltip when cursor leaves
                        rows={10}
                        placeholder="Type something..."
                    />
                </div>
            </div>
        </div>
    );
}

export default Socket;
