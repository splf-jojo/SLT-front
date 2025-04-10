// MessageList.js
import React, { useRef, useEffect } from "react";
import Message from "./Message";

function MessageList({ messages }) {
    const listEndRef = useRef(null); // Используем ref для элемента в конце списка

    // Эффект для автоскролла к последнему сообщению
    useEffect(() => {
        listEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]); // Зависимость от messages

    return (
        // 1. Убираем скролл и flex-1 из MessageList.
        //    Скролл теперь в App.js или в родительском div внутри Chat.js
        //    Оставляем padding и space-y для отступов между сообщениями.
        <div className="p-4 space-y-4">
            {messages.map((msg) => (
                <Message key={msg.id} message={msg} />
            ))}
            {/* Пустой div в конце списка, к которому будем скроллить */}
            <div ref={listEndRef} />
        </div>
    );
}

export default MessageList;
