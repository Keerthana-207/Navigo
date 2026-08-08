import { useEffect, useRef, useState } from "react";
import {
    Sun,
    Moon,
    Bell,
    ChevronDown,
    User,
    LogOut
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { NAV_LINKS } from "../../constants";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {

    const [activeTab, setActiveTab] = useState("Home");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [alertsOpen, setAlertsOpen] = useState(false);

    const { theme, toggleTheme } = useTheme();

    const navigate = useNavigate();
    const location = useLocation();

    const dropdownRef = useRef(null);

    // ========================================
    // Get logged-in user
    // ========================================

    const storedUser =
        localStorage.getItem("user") ||
        sessionStorage.getItem("user");

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;

    // ========================================
    // Set active tab based on current route
    // ========================================

    useEffect(() => {

        const currentLink = NAV_LINKS.find(
            (link) => link.href === location.pathname
        );

        if (currentLink) {
            setActiveTab(currentLink.name);
        }

    }, [location.pathname]);

    // ========================================
    // Close dropdown when clicking outside
    // ========================================

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    // ========================================
    // Profile
    // ========================================

    const handleProfile = () => {

        setDropdownOpen(false);

        navigate("/profile");

    };

    // ========================================
    // Logout
    // ========================================

    const handleLogout = () => {

        // Remove authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        setDropdownOpen(false);

        // Redirect to login
        navigate("/login");

    };

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
                bg-[var(--background)]
                backdrop-blur-xl
                shadow-[0_4px_18px_var(--shadow)]
            "
            style={{
                padding: "0 40px"
            }}
        >

            {/* ========================================
                LOGO
            ======================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-2
                    cursor-pointer
                    transition-transform
                    duration-200
                    hover:scale-105
                    active:scale-95
                "
                onClick={() => navigate("/dashboard")}
            >

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
                            "linear-gradient(135deg,#f97316,#ea6a0b)"
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

                <h1
                    className="
                        text-[32px]
                        font-bold
                        tracking-tight
                        text-[var(--primary)]
                    "
                >
                    Navigo
                </h1>

            </div>


            {/* ========================================
                NAVIGATION
            ======================================== */}

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

                    <button
                        key={link.name}
                        type="button"
                        onClick={() => {

                            setActiveTab(link.name);

                            navigate(link.href);

                        }}
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
                    </button>

                ))}

            </nav>


            {/* ========================================
                RIGHT SIDE
            ======================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >

                {/* Theme */}

                <button
                    type="button"
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
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setAlertsOpen(!alertsOpen)}
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
                        title="Smart Emergency Alerts"
                    >
                        <Bell size={20} />

                        <span
                            className="
                                absolute
                                top-2
                                right-2
                                w-2.5
                                h-2.5
                                rounded-full
                                bg-[var(--primary)]
                                border-2
                                border-[var(--surface)]
                                animate-pulse
                            "
                        />
                    </button>

                    {alertsOpen && (
                        <div
                            className="
                                absolute
                                right-0
                                mt-3
                                w-80
                                sm:w-96
                                rounded-2xl
                                border
                                border-[var(--outline-variant)]
                                bg-[var(--card-bg)]
                                text-[var(--text-primary)]
                                shadow-2xl
                                z-50
                                p-4
                                transition-all
                                duration-200
                            "
                            style={{ background: "var(--card-bg, #1a2636)" }}
                        >
                            <div className="flex items-center justify-between border-b border-[var(--divider)] pb-2 mb-3">
                                <h4 className="font-bold text-sm flex items-center gap-2">
                                    <span>🚨 Smart Emergency Alerts</span>
                                </h4>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[rgba(249,115,22,0.15)] text-[var(--primary)] font-bold">
                                    3 New
                                </span>
                            </div>

                            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                                <div
                                    onClick={() => { setAlertsOpen(false); navigate('/weather'); }}
                                    className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 cursor-pointer hover:bg-amber-500/15 transition-all text-xs"
                                >
                                    <div className="font-bold text-amber-500 flex items-center justify-between mb-1">
                                        <span>⚠️ Weather Advisory</span>
                                        <span className="text-[10px] text-opacity-70">Just now</span>
                                    </div>
                                    <p className="text-[11.5px] opacity-90">Rain forecast in Goa on Day 2. Pack waterproof jackets & umbrellas!</p>
                                </div>

                                <div
                                    onClick={() => { setAlertsOpen(false); navigate('/budget'); }}
                                    className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 cursor-pointer hover:bg-orange-500/15 transition-all text-xs"
                                >
                                    <div className="font-bold text-orange-500 flex items-center justify-between mb-1">
                                        <span>💰 Budget Alert</span>
                                        <span className="text-[10px] text-opacity-70">1h ago</span>
                                    </div>
                                    <p className="text-[11.5px] opacity-90">Trip expenses reaching 75% of target budget. Check budget health meter.</p>
                                </div>

                                <div
                                    onClick={() => { setAlertsOpen(false); navigate('/packing-list'); }}
                                    className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 cursor-pointer hover:bg-blue-500/15 transition-all text-xs"
                                >
                                    <div className="font-bold text-blue-400 flex items-center justify-between mb-1">
                                        <span>📋 Readiness Check</span>
                                        <span className="text-[10px] text-opacity-70">3h ago</span>
                                    </div>
                                    <p className="text-[11.5px] opacity-90">Packing completion is at 45%. Tap to complete essential items.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* ========================================
                    PROFILE DROPDOWN
                ======================================== */}

                <div
                    ref={dropdownRef}
                    className="relative"
                >

                    {/* Profile Button */}

                    <button
                        type="button"
                        onClick={() =>
                            setDropdownOpen(!dropdownOpen)
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            transition-opacity
                            hover:opacity-90
                        "
                    >

                        {/* Avatar */}

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
                                flex
                                items-center
                                justify-center
                            "
                        >

                            {user?.profileImage ? (

                                <img
                                    src={user.profileImage}
                                    alt={
                                        user.fullName ||
                                        "Profile"
                                    }
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                            ) : (

                                <span
                                    className="
                                        text-[var(--primary)]
                                        font-bold
                                        text-sm
                                    "
                                >
                                    {user?.fullName
                                        ?.charAt(0)
                                        .toUpperCase() || "U"}
                                </span>

                            )}

                        </div>


                        {/* User Information */}

                        <div
                            className="
                                hidden
                                lg:flex
                                flex-col
                                items-start
                            "
                        >

                            <span
                                className="
                                    text-sm
                                    font-semibold
                                    text-[var(--on-surface)]
                                "
                            >
                                {user?.fullName || "Explorer"}
                            </span>

                            <span
                                className="
                                    text-[11px]
                                    text-[var(--text-secondary)]
                                "
                            >
                                {user?.city && user?.country
                                    ? `${user.city}, ${user.country}`
                                    : "Traveler"}
                            </span>

                        </div>


                        {/* Arrow */}

                        <ChevronDown
                            size={16}
                            className={`
                                text-[var(--on-surface-variant)]
                                transition-transform
                                duration-200
                                ${
                                    dropdownOpen
                                        ? "rotate-180"
                                        : ""
                                }
                            `}
                        />

                    </button>


                    {/* ========================================
                        DROPDOWN MENU
                    ======================================== */}

                    {dropdownOpen && (

                        <div
                            className="
                                absolute
                                right-0
                                top-full
                                w-[220px]
                                rounded-xl
                                border
                                border-[var(--outline-variant)]
                                bg-[var(--surface-container-lowest)]
                                shadow-[0_12px_35px_var(--shadow)]
                                z-[100]
                                overflow-hidden
                            "
                            style={{
                                marginTop: "12px",
                                padding: "8px"
                            }}
                        >

                            {/* User Header */}

                            <div
                                className="
                                    border-b
                                    border-[var(--outline-variant)]
                                "
                                style={{
                                    padding: "10px 12px",
                                    marginBottom: "6px"
                                }}
                            >

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-[var(--on-surface)]
                                        truncate
                                    "
                                >
                                    {user?.fullName || "Explorer"}
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-[var(--text-secondary)]
                                        truncate
                                    "
                                    style={{
                                        marginTop: "3px"
                                    }}
                                >
                                    {user?.email || ""}
                                </p>

                            </div>


                            {/* Profile */}

                            <button
                                type="button"
                                onClick={handleProfile}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    rounded-lg
                                    text-sm
                                    text-[var(--on-surface)]
                                    hover:bg-[var(--surface-container)]
                                    transition-colors
                                    duration-150
                                "
                                style={{
                                    padding: "11px 12px",
                                    marginBottom: "3px"
                                }}
                            >

                                <User
                                    size={17}
                                    className="
                                        text-[var(--on-surface-variant)]
                                    "
                                />

                                <span>
                                    Profile
                                </span>

                            </button>


                            {/* Logout */}

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    rounded-lg
                                    text-sm
                                    text-red-500
                                    hover:bg-red-500/10
                                    transition-colors
                                    duration-150
                                "
                                style={{
                                    padding: "11px 12px"
                                }}
                            >

                                <LogOut size={17} />

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}

export default Navbar;