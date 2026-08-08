import "../css/LandingPage.css";
import { Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function LandingPage() {
    const { theme, toggleTheme } = useTheme();

    return (
        <main className="hero-background flex flex-col items-center min-h-screen">
        <header
    className="
        w-full
        flex
        justify-between
        items-center
        bg-transparent
    "
    style={{
        padding: "16px 24px",
    }}
>
    {/* Logo */}
    <div className="flex items-center justify-center gap-2.5">
        <span
            className="
                w-[34px]
                h-[34px]
                rounded-full
                bg-gradient-to-br
                flex
                items-center
                justify-center
                shrink-0
                shadow-[0_4px_14px_rgba(0,0,0,0.25)]
            "
            style={{
                background:
                    "linear-gradient(135deg,#f97316,#ea6a0b)",
            }}
        >
            <svg
                className="w-[17px] h-[17px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="1.6"
                />
                <path
                    d="M15.5 8.5L13 13L8.5 15.5L11 11L15.5 8.5Z"
                    fill="white"
                />
            </svg>
        </span>

        <span
            className="
                text-[19px]
                font-extrabold
                tracking-[-0.01em]
                text-[#e8efff]
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]
            "
        >
            Navigo
        </span>
    </div>

    {/* Buttons */}
    <div>
        <button
            onClick={toggleTheme}
            className="
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-full

                text-[#e8efff]

                bg-white/5
                backdrop-blur-md

                border
                border-white/10

                shadow-[0_4px_14px_rgba(0,0,0,0.18)]

                transition-all
                duration-200

                hover:bg-white/10
                hover:border-white/20
                hover:text-white

                active:scale-95
            "
        >
            {theme === "dark" ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    </div>
        </header>
            {/* Hero Section */}
            <section
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center

                    w-[88%]
                    max-w-[900px]

                    rounded-2xl

                    backdrop-blur-[18px]
                    backdrop-saturate-150

                    bg-[var(--hero-overlay)]

                    border
                    border-white/10

                    shadow-[0_25px_70px_rgba(0,0,0,0.25)]
                "
                style={{
                    margin: "70px 0 0 0",
                    padding: "44px 48px 48px 48px",
                }}
            >

                {/* Small Welcome Text */}
                <span
                    className="
                        text-[11px]
                        md:text-[12px]
                        font-semibold
                        tracking-[0.28em]
                        uppercase
                        text-white/65
                    "
                    style={{
                        marginBottom: "18px",
                    }}
                >
                    Welcome to Navigo
                </span>


                {/* Heading */}
                <h1
                    className="
                        font-display-lg
                        text-[32px]
                        md:text-[46px]
                        leading-[1.08]
                        font-bold

                        text-[#dce8ff]

                        max-w-[700px]

                        drop-shadow-[0_3px_12px_rgba(0,0,0,0.35)]
                    "
                    style={{
                        margin: "0 0 22px 0",
                    }}
                >
                    Navigo: Your World,
                    <br />
                    Better Planned.
                </h1>


                {/* Description */}
                <p
                    className="
                        text-[14px]
                        md:text-[15px]
                        leading-[1.7]

                        text-[#d7c7bf]

                        max-w-[600px]
                    "
                    style={{
                        margin: "0 0 32px 0",
                    }}
                >
                    Experience the art of effortless exploration. Plan every
                    journey, track every expense, and discover the world with
                    clarity.
                </p>


                {/* Buttons */}
                <div
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        justify-center
                        items-center
                        gap-3
                    "
                >
                    {/* Primary Button */}
                    <button
                        className="
                            h-[50px]
                            rounded-full

                            flex
                            items-center
                            justify-center

                            bg-[var(--primary)]
                            hover:bg-[var(--primary-hover)]

                            text-white
                            text-[11px]
                            font-bold
                            tracking-[0.08em]

                            cursor-pointer

                            shadow-[0_8px_22px_rgba(249,115,22,0.35)]

                            hover:shadow-[0_10px_28px_rgba(249,115,22,0.45)]

                            active:scale-95
                            transition-all
                            duration-200
                        "
                        style={{
                            padding: "0 28px",
                        }}
                    >
                        START YOUR ADVENTURE
                    </button>


                    {/* Secondary Button */}
                    <button
                        className="
                            h-[50px]
                            rounded-full

                            flex
                            items-center
                            justify-center
                            gap-2

                            bg-transparent

                            border
                            border-white/15

                            text-[#dce8ff]
                            text-[11px]
                            font-semibold
                            tracking-[0.08em]

                            cursor-pointer

                            hover:bg-white/10
                            hover:border-white/25

                            active:scale-95
                            transition-all
                            duration-200
                        "
                        style={{
                            padding: "0 24px",
                        }}
                    >
                        CONTINUE YOUR JOURNEY

                        <ArrowRight
                            size={15}
                            strokeWidth={1.8}
                        />
                    </button>
                </div>

            </section>
        </main>
    );
}

export default LandingPage;