import React from "react";
import Sidebar from "./components/Sidebar";
import ModelSelector from "./components/ModelSelector";
import Chat from "./components/Chat/Chat";

function App() {
    return (
        <div className="h-screen flex overflow-hidden bg-[#171717] text-white">
            <Sidebar />
            {/* 1. Добавлен overflow-y-auto для скролла этой области */}
            <div className="flex-1 flex flex-col xl:flex-row bg-[#212121] overflow-y-auto">
                {/* Левая колонка с селектором модели */}
                <div className="p-2 xl:w-60 flex-shrink-0">
                    <ModelSelector />
                </div>

                {/* Центральная колонка с чатом */}
                {/* Убедитесь, что этот контейнер может расти/сжиматься */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Chat теперь займет необходимое пространство, управляемое flex */}
                    <Chat />
                </div>

                {/* Правая колонка (пустая) */}
                <div className="xl:w-60 flex-shrink-0 hidden xl:block"></div>
            </div>
        </div>
    );
}

export default App;
