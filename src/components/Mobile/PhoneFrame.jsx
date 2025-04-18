export default function PhoneFrame({ children }) {
    return (
        <div
            className="rounded-[2rem] bg-black
                shadow-2xl w-[370px] h-[760px] p-1
                "
        >
            {/* экран */}
            <div className="w-full h-full overflow-hidden rounded-[1.5rem] bg-[#171717]">
                {children}
            </div>
        </div>
    );
}
