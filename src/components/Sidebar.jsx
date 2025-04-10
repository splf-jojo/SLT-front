import React from "react";

function Sidebar() {
    // Массив с элементами истории
    const sessions = [
        "04.09 gray sheep, hi, blue, S",
        "03.09 hi, blue, S, house, red",
        "28.08 house, red, cat, green",
    ];

    return (
        <div className="w-64 h-screen flex flex-col bg-[#171717]">
            <div className="p-4 ">
                <h2 className="text-xl font-bold text-white">История</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ul>
                    {sessions.map((session, index) => (
                        <li
                            key={index}
                            className="p-2 m-2 rounded-lg text-white cursor-pointer hover:bg-[#212121] text-sm font-medium"
                        >
                            {session}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
