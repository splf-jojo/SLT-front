// src/pages/MobileWebApp.jsx
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Chat from "../components/Chat/Chat";

export default function MobileWebApp() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-[#212121]">
            {/* кнопка «назад» вне «телефона» */}
            <Link
                to="/"
                className="absolute top-10 left-10 z-50 flex items-center justify-center
                   w-16 h-16 rounded-full bg-[#292929]/80 hover:bg-[#3a3a3a]/90
                   text-white transition"
            >
                <FaArrowLeft size={24} />
            </Link>

            {/* «Телефон» */}
            <div className="relative w-[370px] h-[760px] rounded-[2rem] bg-[#171717] shadow-2xl p-1">
                <Chat />
            </div>
        </div>
    );
}
