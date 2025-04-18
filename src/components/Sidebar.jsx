import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePlus, HiChevronLeft, HiChevronRight } from "react-icons/hi2"; // heroicons v2
import logo from "../assets/logo2.png"; // замените на своё лого

export default function Sidebar() {
    const [open, setOpen] = useState(true);

    // Примеры сессий (заглушка)
    const sessions = [
        "04.09 gray sheep, hi, blue, S",
        "03.09 hi, blue, S, house, red",
        "28.08 house, red, cat, green",
    ];

    return (
        <aside
            className={`${
                open ? "w-64" : "w-16"
            } h-screen flex flex-col bg-[#171717] transition-[width] duration-200`}
        >
            {/* ── Верхняя панель ─────────────────────────────────────── */}
            <div
                className={`flex items-center  ${
                    open ? "justify-between px-3" : "justify-center"
                }  py-4`}
            >
                {/* логотип ведёт на корень */}

                {open && (
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="logo" className={"w-8 h-8"} />
                    </Link>
                )}

                {/* кнопка сворачивания / разворачивания */}
                <button
                    onClick={() => setOpen((p) => !p)}
                    className="text-gray-400 hover:text-gray-200   "
                >
                    {open ? (
                        <HiChevronLeft size={20} />
                    ) : (
                        <HiChevronRight size={20} />
                    )}
                </button>
            </div>

            {/* ── Кнопка New chat ───────────────────────────────────── */}
            <Link
                to="/chat"
                className="mx-3 mb-3 inline-flex items-center gap-2
                   rounded-xl bg-blue-600 hover:bg-blue-700
                   px-4 py-2 text-sm font-medium text-white
                   transition active:scale-95"
            >
                <HiOutlinePlus size={16} />
                {open && "New chat"}
            </Link>

            {/* ── список сессий ─────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto">
                <ul>
                    {sessions.map((s, i) => (
                        <li
                            key={i}
                            className={`mx-2 mb-1 flex cursor-pointer items-center rounded-lg
                          p-2 text-sm font-medium text-white hover:bg-[#212121]
                          ${!open && "justify-center"}`}
                        >
                            {open ? (
                                <span className="truncate">{s}</span>
                            ) : (
                                /* при сужении просто точка‑индикатор */
                                <span className="h-2 w-2 rounded-full bg-gray-400" />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
