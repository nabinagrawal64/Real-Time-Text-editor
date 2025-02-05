import { Route, Routes } from "react-router-dom"
import Join from "./auth/join"
import Socket from "./socket/socket"
import CreateRoom from "./auth/Create"

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Join />} />
                <Route path="/socket" element={<Socket />} />
                <Route path="/create/:roomID" element={<CreateRoom />} />
                <Route path="/room/:roomID" element={<Socket />} />
            </Routes>
        </div>
    )
}

export default App
