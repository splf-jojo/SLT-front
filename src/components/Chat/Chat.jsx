// Chat.js
import React, { useState } from "react";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import "../../index.css"; // Импортируем стили, если они нужны
// Убираем проп onShowAllPredictions, если он больше не нужен на этом уровне
function Chat() {
    const [messages, setMessages] = useState([]);

    const addMessage = (sender, type, content) => {
        const newMessage = {
            id: Date.now(), // Использовать более надежный ID в реальном приложении
            sender,
            type,
            content,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        // 2. Изменения для позиционирования InputArea:
        //    - Используем h-full, чтобы Chat занял всю высоту родительского flex-контейнера
        //    - flex flex-col остается для вертикального расположения
        //    - max-w-4xl mx-auto для центрирования и ограничения ширины
        <div className="flex flex-col w-full max-w-4xl mx-auto h-full">
            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <MessageList messages={messages} />
            </div>
            {/* InputArea будет внизу благодаря flex-контейнеру */}
            {/* Убираем pb-4, если не нужен отступ снизу внутри Chat */}
            {/* Добавляем flex-shrink-0 чтобы InputArea не сжимался */}
            <div className="flex-shrink-0">
                <InputArea onSendMessage={addMessage} />
            </div>
        </div>
    );
}

export default Chat;
