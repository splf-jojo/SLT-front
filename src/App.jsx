import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import ChatLayout from "./components/ChatLayout";
import MobileWebApp from "./pages/MobileWebApp"; // ⬅️ новое

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatLayout />} />

            <Route path="/mobile-web-app" element={<MobileWebApp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
