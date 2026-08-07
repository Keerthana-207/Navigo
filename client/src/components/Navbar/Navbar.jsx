import { useState } from "react";
import { Sun, Moon, Bell, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { NAV_LINKS } from "../../constants";

function Navbar() {
    const [activeTab, setActiveTab] = useState("Home");
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            className="
                fixed
                top-0
                left-0
                z-50
                w-full
                h-20
                flex
                items-center
                justify-between
                border-b
                border-[var(--outline-variant)]
                bg-[var(--glass)]
                backdrop-blur-xl
                shadow-[0_4px_18px_var(--shadow)]
            "
            style={{ padding: "0 40px" }}
        >
            {/* Logo */}

            <h1
                className="
                    text-[32px]
                    font-bold
                    tracking-tight
                    text-[var(--primary)]
                    cursor-pointer
                    transition-transform
                    duration-200
                    hover:scale-105
                    active:scale-95
                "
            >
                Navigo
            </h1>

            {/* Navigation */}

            <nav
                className="
                    hidden
                    md:flex
                    items-center
                    gap-8
                    h-full
                "
            >
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setActiveTab(link.name)}
                        className={`
                            h-full
                            flex
                            items-center
                            border-b-2
                            transition-all
                            duration-200
                            ${
                                activeTab === link.name
                                    ? "border-[var(--primary)] text-[var(--primary)] font-semibold"
                                    : "border-transparent text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]"
                            }
                        `}
                    >
                        {link.name}
                    </a>
                ))}
            </nav>

            {/* Right Side */}

            <div className="flex items-center gap-4">

                {/* Theme */}

                <button
                    onClick={toggleTheme}
                    className="
                        flex
                        items-center
                        justify-center
                        w-10
                        h-10
                        rounded-full
                        transition-all
                        duration-200
                        text-[var(--on-surface-variant)]
                        hover:bg-[var(--surface-container)]
                        hover:text-[var(--on-surface)]
                        active:scale-95
                    "
                >
                    {theme === "dark" ? (
                        <Sun size={20} />
                    ) : (
                        <Moon size={20} />
                    )}
                </button>

                {/* Notification */}

                <button
                    className="
                        relative
                        flex
                        items-center
                        justify-center
                        w-10
                        h-10
                        rounded-full
                        transition-all
                        duration-200
                        text-[var(--on-surface-variant)]
                        hover:bg-[var(--surface-container)]
                        hover:text-[var(--on-surface)]
                        active:scale-95
                    "
                >
                    <Bell size={20} />

                    <span
                        className="
                            absolute
                            top-2
                            right-2
                            w-2
                            h-2
                            rounded-full
                            bg-[var(--primary)]
                            border-2
                            border-[var(--surface)]
                        "
                    />
                </button>

                {/* Profile */}

                <button
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        transition-opacity
                        hover:opacity-90
                    "
                >
                    <div
                        className="
                            w-10
                            h-10
                            overflow-hidden
                            rounded-full
                            border
                            border-[var(--outline)]
                            bg-[var(--surface-container)]
                            transition-transform
                            duration-200
                            hover:scale-105
                        "
                    >
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuwgkNEyprSqgCSZqPXy8SYM-M0pF1UULCQQuSUlc8SgR7BtWzayWAS2eF7VKviMtCFZgQv-hPz5TJfaexJmvHryF7XCP0LrGFQv9aGw_zTr6rEWKN-ge04-OtvNoreljtgawPl_wdaeEf8q93sn2fHG0g5DYwCprPFVB8lPpo2gkKzh_GdXNHtRfydtDyH-soCf26GpatJBuqBU-ZPW2GjqGdgWqyKPG5nmHxclOGZdexwZIh8juAqQ"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <ChevronDown
                        size={16}
                        className="text-[var(--on-surface-variant)]"
                    />
                </button>

            </div>
        </header>
    );
}

export default Navbar;