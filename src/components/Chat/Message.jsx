import React, { useState } from "react"; // Добавляем импорт useState

// Вспомогательный компонент для полоски прогресса (без изменений)
const ProgressBar = ({ value }) => {
    const widthPercentage = Math.min(Math.max(value * 100, 0), 100);
    return (
        <div className="w-full bg-gray-500 rounded-full h-1.5 dark:bg-gray-700 my-1">
            <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${widthPercentage}%` }}
            ></div>
        </div>
    );
};

function Message({ message }) {
    const { sender, type, content } = message;
    const isUser = sender === "user";

    // --- НОВОЕ: Состояние для показа всех предсказаний ---
    const [showAllPredictions, setShowAllPredictions] = useState(false);
    // --- Конец нового ---

    const renderBackendContent = () => {
        if (type === "error") {
            return <span className="text-red-400">{content}</span>;
        }

        if (
            type === "prediction" &&
            content?.top_predictions &&
            Array.isArray(content.top_predictions) &&
            content.top_predictions.length > 0
        ) {
            const allPredictions = content.top_predictions;
            const initialCount = 5; // Сколько показывать изначально

            // Определяем, какие предсказания показывать сейчас
            const predictionsToShow = showAllPredictions
                ? allPredictions // Если showAll true, показываем все
                : allPredictions.slice(0, initialCount); // Иначе - только первые N

            const canShowMore = allPredictions.length > initialCount;

            return (
                <div>
                    {/* Заголовок убираем из списка, чтобы кнопка была ниже */}
                    <p className="font-semibold mb-2">
                        Топ-
                        {showAllPredictions
                            ? allPredictions.length
                            : Math.min(
                                  initialCount,
                                  allPredictions.length
                              )}{" "}
                        распознанных жестов:
                    </p>
                    <ul className="space-y-2">
                        {predictionsToShow.map((prediction, index) => (
                            // Оборачиваем li для лучшего позиционирования, если понадобится
                            <li key={index} className="relative">
                                <div className="flex justify-between items-center text-sm">
                                    <span
                                        className={`font-medium ${
                                            index === 0
                                                ? "text-lg text-blue-300" // Выделяем самый вероятный
                                                : ""
                                        }`}
                                    >
                                        {prediction.gesture}
                                    </span>
                                    <span
                                        className={`text-xs ml-2 whitespace-nowrap ${
                                            // Добавляем whitespace-nowrap
                                            index === 0
                                                ? "text-blue-300 font-semibold"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {(prediction.probability * 100).toFixed(
                                            4
                                        )}
                                        %
                                    </span>
                                </div>
                                <ProgressBar value={prediction.probability} />
                            </li>
                        ))}
                    </ul>
                    {/* Кнопка "Показать все" / "Скрыть" */}
                    {canShowMore && (
                        <button
                            onClick={() =>
                                setShowAllPredictions(!showAllPredictions)
                            } // Переключаем состояние
                            className="text-xs text-blue-400 mt-2 hover:underline focus:outline-none"
                        >
                            {showAllPredictions
                                ? "Скрыть"
                                : `Показать еще ${
                                      allPredictions.length - initialCount
                                  }`}
                        </button>
                    )}
                </div>
            );
        }
        // Стандартный вывод
        return (
            <span>
                {typeof content === "object"
                    ? JSON.stringify(content)
                    : content}
            </span>
        );
    };

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
        >
            <div
                className={`rounded-lg max-w-[75%] md:max-w-[60%] break-words ${
                    isUser ? " text-white" : "bg-[#303030] text-white px-4 py-2" // Добавил padding обратно, если у User его нет
                }`}
            >
                {isUser && type === "video" ? (
                    <video
                        src={content}
                        controls
                        className="max-w-full h-auto rounded-md max-h-[300px]"
                    />
                ) : (
                    renderBackendContent()
                )}
            </div>
        </div>
    );
}

export default Message;
