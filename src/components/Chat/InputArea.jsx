import React, { useState, useRef } from "react";
import { FaVideo, FaUpload } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

// Принимаем onSendMessage как пропс
function InputArea({ onSendMessage }) {
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Состояние для индикации загрузки
    const fileInputRef = useRef(null);

    const handleRecord = () => {
        alert("Функция записи с вебкамеры в разработке");
    };

    const handleUploadClick = () => {
        fileInputRef.current && fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoFile(file);
            setVideoPreviewUrl(url);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("video/")) {
            // Проверяем тип файла
            const url = URL.createObjectURL(file);
            setVideoFile(file);
            setVideoPreviewUrl(url);
        } else {
            alert("Пожалуйста, перетащите видеофайл.");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSend = async () => {
        if (!videoFile || isLoading) {
            // Не отправляем, если нет файла или уже идет отправка
            return;
        }

        setIsLoading(true); // Начинаем загрузку

        // Сразу добавляем сообщение пользователя в чат
        // Передаем URL для отображения видео в сообщении
        onSendMessage("user", "video", videoPreviewUrl);

        const formData = new FormData();
        formData.append("file", videoFile, videoFile.name);

        try {
            const response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("Результат предсказания:", result);
            // Добавляем сообщение от бэкенда
            onSendMessage("backend", "prediction", result);
        } catch (error) {
            console.error("Ошибка отправки видео:", error);
            // Можно добавить сообщение об ошибке в чат
            onSendMessage("backend", "error", `Ошибка: ${error.message}`);
        } finally {
            // Очищаем состояние после отправки (успешной или нет)
            setVideoFile(null);
            // Важно: Не очищаем videoPreviewUrl сразу, т.к. он используется в сообщении пользователя.
            // URL.revokeObjectURL(videoPreviewUrl); // Отозвать URL можно позже, когда компонент сообщения размонтируется, если это необходимо
            setVideoPreviewUrl(null); // Очищаем превью в InputArea
            setIsLoading(false); // Завершаем загрузку
        }
    };

    // Очистка URL при размонтировании компонента, чтобы избежать утечек памяти
    // React.useEffect(() => {
    //     return () => {
    //         if (videoPreviewUrl) {
    //             URL.revokeObjectURL(videoPreviewUrl);
    //         }
    //     };
    // }, [videoPreviewUrl]);

    return (
        // Убираем фиксированную высоту и ширину, добавляем w-full
        <div className="p-4 rounded-xl shadow-md flex flex-col bg-[#303030] w-full mb-4">
            {/* Область предпросмотра / drag & drop */}
            <div
                className={`flex-1 flex items-center justify-center mb-4 cursor-pointer border-2 border-dashed border-[#888] rounded min-h-[150px] ${
                    videoPreviewUrl ? "p-0" : "p-4"
                } ${isLoading ? "opacity-50" : ""}`} // Уменьшаем min-h, убираем padding если есть превью, добавляем прозрачность при загрузке
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={!videoPreviewUrl ? handleUploadClick : undefined} // Открывать диалог по клику на область, если нет превью
            >
                {videoPreviewUrl ? (
                    <video
                        src={videoPreviewUrl}
                        controls
                        className="max-h-[150px] h-auto w-auto rounded-lg" // Ограничиваем высоту превью
                    />
                ) : (
                    <span className="text-gray-400 text-center block">
                        Перетащите видео сюда или{" "}
                        <button
                            onClick={handleUploadClick}
                            className="text-blue-400 hover:underline focus:outline-none bg-transparent border-none p-0"
                        >
                            загрузите
                        </button>
                    </span>
                )}
            </div>

            {/* Скрытый input для выбора файла */}
            <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading} // Блокируем инпут во время загрузки
            />

            {/* Нижняя панель с кнопками */}
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <button
                        onClick={handleRecord}
                        disabled={isLoading} // Блокируем кнопки во время загрузки
                        className="flex items-center gap-2 px-3 py-2 rounded-2xl text-white border border-[#636363] hover:bg-[#292929] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaVideo />
                        <span className="text-sm hidden sm:inline">
                            Запись
                        </span>{" "}
                        {/* Скрываем текст на маленьких экранах */}
                    </button>

                    <button
                        onClick={handleUploadClick}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-3 py-2 rounded-2xl text-white border border-[#636363] hover:bg-[#292929] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaUpload />
                        <span className="text-sm hidden sm:inline">
                            Загрузка
                        </span>{" "}
                        {/* Скрываем текст на маленьких экранах */}
                    </button>
                </div>

                <button
                    onClick={handleSend}
                    disabled={!videoFile || isLoading} // Кнопка неактивна без файла или во время загрузки
                    className="flex items-center p-3 rounded-3xl text-[#292929] bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        // Простой спиннер для индикации загрузки
                        <svg
                            className="animate-spin h-5 w-5 text-[#292929]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        <IoSend className="text-lg" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default InputArea;
