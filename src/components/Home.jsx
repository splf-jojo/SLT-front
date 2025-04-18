import { Link } from "react-router-dom";
import logo from "../assets/logo2.png"; // если логотип не нужен — удалите

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-blue-200 px-4">
            {/* Заголовок */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-center">
                Sign&nbsp;
                <span className="text-blue-600">Language</span>
                &nbsp;Translator
            </h1>

            {/* Дополнительный слоган */}
            <p className="text-2xl md:text-3xl font-semibold mb-12 text-center">
                Speak with Your Hands
            </p>

            {/* Кнопки */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* 1. Chat */}
                <Link
                    to="/chat"
                    className="flex flex-col items-center rounded-xl px-10 py-6 shadow-lg
                     bg-white/70 backdrop-blur hover:scale-[1.03] transition-transform"
                >
                    <span className="text-2xl font-semibold mb-2">Chat</span>
                    <span className="text-sm text-gray-600 text-center">
                        Откройте окно чата
                        <br />с переводчиком жестового языка
                    </span>
                </Link>

                {/* 2. Mobile Web App */}
                <Link
                    to="/mobile-web-app"
                    className="flex flex-col items-center rounded-xl px-10 py-6 shadow-lg
                     bg-white/70 backdrop-blur hover:scale-[1.03] transition-transform"
                >
                    <span className="text-2xl font-semibold mb-2">
                        Mobile Web App
                    </span>
                    <span className="text-sm text-gray-600 text-center">
                        Используйте переводчик
                        <br />
                        на мобильном устройстве
                    </span>
                </Link>
            </div>
        </div>
    );
}
