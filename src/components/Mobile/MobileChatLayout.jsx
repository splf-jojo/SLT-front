import Chat from "../Chat/Chat"; // ваш существующий Chat
import PhoneFrame from "./PhoneFrame";

export default function MobileChatLayout() {
    /* Tailwind breakpoint md = 768 px.
     - На мобильном (< md) — чат раскрывается на всю ширину/высоту.
     - На больших экранах — показываем красивый mock‑up. */
    return (
        <div className="min-h-screen flex justify-center items-center bg-[#212121]">
            {/* < md */}

            {/* ≥ md */}
            <div className="hidden md:block">
                <PhoneFrame>
                    {/* Чтобы Chat занимал весь «экран» телефона */}
                    <div className="h-full flex flex-col">
                        <Chat />
                    </div>
                </PhoneFrame>
            </div>
        </div>
    );
}
