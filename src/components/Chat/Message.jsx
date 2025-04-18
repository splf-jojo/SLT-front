// Message.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // ⬅️ добавили

/***************** Progress bar (без изменений) *****************/
const ProgressBar = ({ value }) => {
    const widthPercentage = Math.min(Math.max(value * 100, 0), 100);
    return (
        <div className="w-full bg-gray-500 rounded-full h-1.5 dark:bg-gray-700 my-1">
            <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${widthPercentage}%` }}
            />
        </div>
    );
};

/************************* Message ******************************/
function Message({ message }) {
    const { sender, type, content } = message;
    const isUser = sender === "user";

    /* ↓↓↓  режим «mobile», если URL начинается с /mobile-web-app  */
    const { pathname } = useLocation();
    const isMobile = pathname.startsWith("/mobile-web-app");

    /* state, нужное ТОЛЬКО для десктопа (подробный список) */
    const [showAllPredictions, setShowAllPredictions] = useState(false);

    /* ---------- содержимое BACKEND‑сообщений ---------- */
    const renderBackendContent = () => {
        /* Ошибка */
        if (type === "error") {
            return <span className="text-red-400">{content}</span>;
        }

        /* Предсказания */
        if (
            type === "prediction" &&
            Array.isArray(content?.top_predictions) &&
            content.top_predictions.length
        ) {
            const predictions = content.top_predictions;

            /* ===== MOBILE: только кнопки ===== */
            if (isMobile) {
                return (
                    <div className="flex flex-wrap gap-2">
                        {predictions.slice(0, 5).map((p) => (
                            <button
                                key={p.gesture}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg active:scale-95 transition"
                                onClick={() =>
                                    console.log("Выбрано:", p.gesture)
                                }
                            >
                                {p.gesture}
                            </button>
                        ))}
                    </div>
                );
            }

            /* ===== DESKTOP: подробный список ===== */
            const initialCount = 5;
            const predictionsToShow = showAllPredictions
                ? predictions
                : predictions.slice(0, initialCount);

            const canShowMore = predictions.length > initialCount;

            return (
                <div>
                    <p className="font-semibold mb-2">
                        Топ-
                        {showAllPredictions
                            ? predictions.length
                            : Math.min(initialCount, predictions.length)}{" "}
                        распознанных жестов:
                    </p>

                    <ul className="space-y-2">
                        {predictionsToShow.map((pr, idx) => (
                            <li key={idx}>
                                <div className="flex justify-between items-center text-sm">
                                    <span
                                        className={`font-medium ${
                                            idx === 0
                                                ? "text-lg text-blue-300"
                                                : ""
                                        }`}
                                    >
                                        {pr.gesture}
                                    </span>
                                    <span
                                        className={`text-xs ml-2 whitespace-nowrap ${
                                            idx === 0
                                                ? "text-blue-300 font-semibold"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {(pr.probability * 100).toFixed(4)}%
                                    </span>
                                </div>
                                <ProgressBar value={pr.probability} />
                            </li>
                        ))}
                    </ul>

                    {canShowMore && (
                        <button
                            onClick={() => setShowAllPredictions((v) => !v)}
                            className="text-xs text-blue-400 mt-2 hover:underline focus:outline-none"
                        >
                            {showAllPredictions
                                ? "Скрыть"
                                : `Показать ещё ${
                                      predictions.length - initialCount
                                  }`}
                        </button>
                    )}
                </div>
            );
        }

        /* Стандартный вывод */
        return (
            <span>
                {typeof content === "object"
                    ? JSON.stringify(content)
                    : content}
            </span>
        );
    };

    /******************** JSX ********************/
    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
        >
            <div
                className={`rounded-lg max-w-[75%] md:max-w-[60%] break-words ${
                    isUser ? "text-white" : "bg-[#303030] text-white px-4 py-2"
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
