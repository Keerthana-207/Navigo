import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Eye, EyeOff, Sun, Moon, ArrowRight } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

function FormInput({
    type,
    value,
    onChange,
    id,
    name,
    placeholder,
    autoComplete
}) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="
                w-full
                py-3.5
                pl-10
                pr-3.5
                text-[14px]
                rounded-md
                outline-none
                border
                border-transparent
                transition-all
                duration-200
                bg-[var(--surface-container-low)]
                text-[var(--on-surface)]
                placeholder-[var(--text-secondary)]
                focus:border-[var(--primary)]
                focus:ring-4
                focus:ring-[#e8823f]/25
            "
            style={{
                paddingTop: "14px",
                paddingBottom: "14px",
                paddingLeft: "40px",
                paddingRight: "14px"
            }}
        />
    );
}

function CreateAccount() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const [loading, setLoading] = useState(false);

    const getPasswordStrength = (val) => {
        if (!val) {
            return {
                percent: "0%",
                label: "WEAK",
                gradient: "from-[#e2543f] to-[#e8823f]",
                textColor: "text-[#e2543f]"
            };
        }

        let score = 0;

        if (val.length >= 6) score++;
        if (val.length >= 10) score++;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
        if (/\d/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        if (score <= 1) {
            return {
                percent: "25%",
                label: "WEAK",
                gradient: "from-[#e2543f] to-[#e8823f]",
                textColor: "text-[#e2543f]"
            };
        }

        if (score <= 3) {
            return {
                percent: "60%",
                label: "FAIR",
                gradient: "from-[#e8823f] to-[#f2c14e]",
                textColor: "text-[#e8823f]"
            };
        }

        return {
            percent: "100%",
            label: "STRONG",
            gradient: "from-[#4cc985] to-[#2fae6c]",
            textColor: "text-[#4cc985]"
        };
    };

    const strength = getPasswordStrength(password);

    const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
        !fullName.trim() ||
        !email.trim() ||
        !password ||
        !city.trim() ||
        !country.trim()
    ) {
        toast.error("Please fill all fields.");
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: fullName.trim(),
                email: email.trim().toLowerCase(),
                password,
                city: city.trim(),
                country: country.trim(),
            }),
        });

        const data = await response.json();

        // Backend error
        if (!response.ok) {
            toast.error(
                data.message || "Registration failed."
            );
            return;
        }

        // Store JWT
        localStorage.setItem("token", data.token);

        // Store user information
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        // Success
        toast.success(
            data.message || "Account created successfully.",
                        {
                            onClose: () => {
                                navigate("/dashboard");
                            },
                        }
        );

        console.log("Registered user:", data.user);

    } catch (error) {
        console.error("Registration error:", error);

        toast.error(
            "Unable to connect to the server. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <>
            {/* Background Wrapper */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme={theme === "dark" ? "dark" : "light"}
            />

            <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    p-5
                    md:p-10
                    font-sans
                    transition-colors
                    duration-400
                    bg-[var(--background)]
                    text-[var(--on-background)]
                    relative
                    overflow-hidden
                "
                style={{ padding: "20px" }}
            >

                {/* Glow Effects */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[radial-gradient(ellipse_60%_45%_at_30%_15%,rgba(233,140,68,0.08),transparent)]
                        dark:bg-[radial-gradient(ellipse_60%_45%_at_30%_20%,rgba(233,140,68,0.06),transparent)]
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(120,150,230,0.06),transparent)]
                        dark:bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(80,110,200,0.05),transparent)]
                    "
                />

                <div className="relative w-full max-w-[1100px]">

                    {/* Theme Toggle */}

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle light and dark theme"
                        className="
                            fixed
                            top-6
                            right-6
                            z-50
                            w-10
                            h-10
                            rounded-full
                            border
                            flex
                            items-center
                            justify-center
                            transition-all
                            duration-250
                            hover:-translate-y-0.5
                            border-[var(--outline-variant)]
                            bg-[var(--surface-container-lowest)]
                            text-[var(--on-surface)]
                            shadow-lg
                        "
                    >
                        {theme === "dark" ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>

                    {/* Auth Shell */}

                    <div
                        className="
                            flex
                            flex-col
                            md:flex-row
                            rounded-[22px]
                            overflow-hidden
                            min-h-[780px]
                            border
                            shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]
                            transition-colors
                            duration-400
                            bg-[var(--background)]
                            border-[var(--outline)]
                        "
                    >

                        {/* LEFT PANEL */}

                        <div
                            className="
                                w-full
                                md:w-[46%]
                                p-7
                                md:p-10
                                flex
                                flex-col
                                gap-7
                            "
                            style={{ padding: "20px" }}
                        >

                            <div
                                className="
                                    flex-1
                                    min-h-[220px]
                                    md:min-h-[320px]
                                    rounded-[16px]
                                    border
                                    flex
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    relative
                                    bg-[var(--surface-container)]
                                    border-[var(--outline)]
                                "
                            >
                                <img
                                    className="
                                        w-[82%]
                                        h-[82%]
                                        object-contain
                                        drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                                    "
                                    src="/plane.svg"
                                    alt="Animated illustration of travel around the globe"
                                />
                            </div>

                            <div>
                                <h2
                                    className="
                                        text-[30px]
                                        font-extrabold
                                        tracking-[-0.01em]
                                        mb-2.5
                                        text-[var(--on-surface)]
                                        dark:text-[#f4f6fa]
                                    "
                                    style={{ marginBottom: "10px" }}
                                >
                                    Elevate Your Journey.
                                </h2>

                                <p
                                    className="
                                        text-[14.5px]
                                        leading-[1.6]
                                        max-w-[420px]
                                        text-[var(--text-secondary)]
                                        dark:text-[#8c96ab]
                                    "
                                >
                                    Experience seamless, highly curated
                                    travel itineraries designed for the
                                    discerning explorer.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT PANEL */}

                        <div
                            className="
                                w-full
                                md:w-[54%]
                                p-8
                                md:p-[40px_48px]
                                flex
                                items-center
                                justify-center
                            "
                            style={{ padding: "30px" }}
                        >
                            <div className="w-full max-w-[360px]">

                                {/* Brand */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2.5
                                    "
                                    style={{ marginBottom: "24px" }}
                                >
                                    <span
                                        className="
                                            w-[34px]
                                            h-[34px]
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            shrink-0
                                        "
                                        style={{
                                            background:
                                                "linear-gradient(135deg,var(--primary),var(--primary-hover))"
                                        }}
                                    >
                                        <svg
                                            className="w-[17px] h-[17px]"
                                            viewBox="0 0 24 24"
                                            fill="none"
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
                                            text-[var(--on-surface)]
                                            dark:text-[#f4f6fa]
                                        "
                                    >
                                        Navigo
                                    </span>
                                </div>

                                {/* Heading */}

                                <h1
                                    className="
                                        text-center
                                        text-[27px]
                                        font-extrabold
                                        tracking-[-0.01em]
                                        text-[var(--on-surface)]
                                        dark:text-[#f4f6fa]
                                    "
                                    style={{ marginBottom: "8px" }}
                                >
                                    Create Account
                                </h1>

                                <p
                                    className="
                                        text-center
                                        text-[14px]
                                        text-[var(--text-secondary)]
                                        dark:text-[#717d93]
                                    "
                                    style={{ marginBottom: "20px" }}
                                >
                                    Join us to craft your next elevated expedition.
                                </p>

                                {/* Form */}

                                <form
                                    onSubmit={handleRegister}
                                    noValidate
                                >

                                    {/* Full Name */}

                                    <div
                                        style={{
                                            marginBottom: "18px"
                                        }}
                                    >
                                        <label
                                            htmlFor="fullName"
                                            className="
                                                block
                                                text-[11px]
                                                font-bold
                                                tracking-[0.07em]
                                                uppercase
                                                text-[var(--text-secondary)]
                                                dark:text-[#7c8698]
                                            "
                                            style={{
                                                marginBottom: "8px"
                                            }}
                                        >
                                            Full Name
                                        </label>

                                        <div className="relative flex items-center">

                                            <svg
                                                className="
                                                    absolute
                                                    left-3.5
                                                    w-4
                                                    h-4
                                                    pointer-events-none
                                                    text-[#a2a8b6]
                                                    dark:text-[#b7bcc7]
                                                "
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path d="M20 21a8 8 0 1 0-16 0" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>

                                            <FormInput
                                                type="text"
                                                id="fullName"
                                                value={fullName}
                                                onChange={(e) =>
                                                    setFullName(e.target.value)
                                                }
                                                name="fullName"
                                                autoComplete="name"
                                                placeholder="Jane Doe"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}

                                    <div
                                        style={{
                                            marginBottom: "18px"
                                        }}
                                    >
                                        <label
                                            htmlFor="email"
                                            className="
                                                block
                                                text-[11px]
                                                font-bold
                                                tracking-[0.07em]
                                                uppercase
                                                text-[var(--text-secondary)]
                                                dark:text-[#7c8698]
                                            "
                                            style={{
                                                marginBottom: "8px"
                                            }}
                                        >
                                            Email Address
                                        </label>

                                        <div className="relative flex items-center">

                                            <svg
                                                className="
                                                    absolute
                                                    left-3.5
                                                    w-4
                                                    h-4
                                                    pointer-events-none
                                                    text-[#a2a8b6]
                                                    dark:text-[#b7bcc7]
                                                "
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <rect
                                                    x="2"
                                                    y="4"
                                                    width="20"
                                                    height="16"
                                                    rx="2"
                                                />
                                                <path d="m2 7 10 6 10-6" />
                                            </svg>

                                            <FormInput
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                name="email"
                                                autoComplete="email"
                                                placeholder="jane@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* City */}

                                    <div
                                        style={{
                                            marginBottom: "18px"
                                        }}
                                    >
                                        <label
                                            htmlFor="city"
                                            className="
                                                block
                                                text-[11px]
                                                font-bold
                                                tracking-[0.07em]
                                                uppercase
                                                text-[var(--text-secondary)]
                                                dark:text-[#7c8698]
                                            "
                                            style={{
                                                marginBottom: "8px"
                                            }}
                                        >
                                            City
                                        </label>

                                        <FormInput
                                            type="text"
                                            id="city"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                            name="city"
                                            autoComplete="address-level2"
                                            placeholder="Mumbai"
                                        />
                                    </div>

                                    {/* Country */}

                                    <div
                                        style={{
                                            marginBottom: "18px"
                                        }}
                                    >
                                        <label
                                            htmlFor="country"
                                            className="
                                                block
                                                text-[11px]
                                                font-bold
                                                tracking-[0.07em]
                                                uppercase
                                                text-[var(--text-secondary)]
                                                dark:text-[#7c8698]
                                            "
                                            style={{
                                                marginBottom: "8px"
                                            }}
                                        >
                                            Country
                                        </label>

                                        <FormInput
                                            type="text"
                                            id="country"
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                            name="country"
                                            autoComplete="country-name"
                                            placeholder="India"
                                        />
                                    </div>

                                    {/* Password */}

                                    <div
                                        style={{
                                            marginBottom: "18px"
                                        }}
                                    >
                                        <label
                                            htmlFor="password"
                                            className="
                                                block
                                                text-[11px]
                                                font-bold
                                                tracking-[0.07em]
                                                uppercase
                                                text-[var(--text-secondary)]
                                                dark:text-[#7c8698]
                                            "
                                            style={{
                                                marginBottom: "8px"
                                            }}
                                        >
                                            Password
                                        </label>

                                        <div className="relative flex items-center">

                                            <svg
                                                className="
                                                    absolute
                                                    left-3.5
                                                    w-4
                                                    h-4
                                                    pointer-events-none
                                                    text-[#a2a8b6]
                                                    dark:text-[#b7bcc7]
                                                "
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <rect
                                                    x="4"
                                                    y="10"
                                                    width="16"
                                                    height="10"
                                                    rx="2"
                                                />
                                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                            </svg>

                                            <FormInput
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                placeholder="••••••••"
                                                autoComplete="new-password"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                aria-label={
                                                    showPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                                className="
                                                    absolute
                                                    right-3
                                                    p-1
                                                    flex
                                                    cursor-pointer
                                                    text-[#a2a8b6]
                                                    dark:text-[#b7bcc7]
                                                    hover:text-[var(--on-surface)]
                                                "
                                                style={{ padding: "4px" }}
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={17} />
                                                ) : (
                                                    <Eye size={17} />
                                                )}
                                            </button>
                                        </div>

                                        {/* Strength */}

                                        <div
                                            className="
                                                flex
                                                justify-between
                                                text-[10.5px]
                                                font-bold
                                                tracking-[0.06em]
                                                text-[var(--text-secondary)]
                                                dark:text-[#717d93]
                                            "
                                            style={{
                                                marginTop: "10px",
                                                marginBottom: "6px"
                                            }}
                                        >
                                            <span>STRENGTH</span>

                                            <span
                                                className={`${strength.textColor}`}
                                            >
                                                {strength.label}
                                            </span>
                                        </div>

                                        <div
                                            className="
                                                h-1
                                                rounded-full
                                                overflow-hidden
                                                bg-[var(--surface-container-high)]
                                            "
                                        >
                                            <div
                                                className={`
                                                    h-full
                                                    rounded-full
                                                    bg-gradient-to-r
                                                    ${strength.gradient}
                                                    transition-all
                                                    duration-250
                                                `}
                                                style={{
                                                    width: strength.percent
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Submit */}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            padding: "15px 18px",
                                            marginTop: "22px",
                                            background:
                                                "linear-gradient(135deg, var(--primary), var(--primary-hover))"
                                        }}
                                        className="
                                            w-full
                                            rounded-md
                                            border-none
                                            font-bold
                                            text-[15px]
                                            cursor-pointer
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            text-[#231204]
                                            shadow-[0_12px_24px_-10px_rgba(232,130,63,0.55)]
                                            hover:shadow-[0_16px_28px_-10px_rgba(232,130,63,0.65)]
                                            hover:-translate-y-0.5
                                            active:translate-y-0
                                            transition-all
                                            duration-150
                                            disabled:opacity-60
                                            disabled:cursor-not-allowed
                                            disabled:hover:translate-y-0
                                        "
                                    >
                                        {loading
                                            ? "Creating Account..."
                                            : "Create Account"}

                                        {!loading && (
                                            <ArrowRight
                                                size={16}
                                                strokeWidth={2.2}
                                            />
                                        )}
                                    </button>
                                </form>

                                {/* Divider */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-[14px]
                                        before:flex-1
                                        before:h-px
                                        before:bg-[var(--outline-variant)]
                                        after:flex-1
                                        after:h-px
                                        after:bg-[var(--outline-variant)]
                                    "
                                    style={{
                                        margin: "22px 0"
                                    }}
                                >
                                    <span
                                        className="
                                            text-[11px]
                                            font-bold
                                            tracking-[0.08em]
                                            text-[var(--text-secondary)]
                                        "
                                    >
                                        OR
                                    </span>
                                </div>

                                {/* Google */}

                                <button
                                    type="button"
                                    className="
                                        w-full
                                        rounded-md
                                        font-semibold
                                        text-[14px]
                                        flex
                                        items-center
                                        justify-center
                                        gap-[10px]
                                        cursor-pointer
                                        border
                                        transition-all
                                        duration-150
                                        hover:-translate-y-0.5
                                        bg-[var(--surface-container-lowest)]
                                        border-[var(--outline-variant)]
                                        text-[var(--on-surface)]
                                    "
                                    style={{
                                        padding: "15px 18px"
                                    }}
                                >
                                    <svg
                                        className="w-[17px] h-[17px]"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.6 20.5H42V20.5H24v7h11.3C33.7 32 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.5l5.3-5.3C32.9 6.6 28.7 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
                                        />
                                        <path
                                            fill="#FF3D00"
                                            d="M6.3 14.7l5.8 4.2C13.6 15.6 18.4 12 24 12c2.6 0 5 .9 6.9 2.5l5.3-5.3C32.9 6.6 28.7 5 24 5c-7.1 0-13.3 3.9-16.7 9.7z"
                                        />
                                        <path
                                            fill="#4CAF50"
                                            d="M24 45c5.2 0 9.9-1.7 13.6-4.8l-6.3-5.3C29.4 36.6 26.8 37.5 24 37.5c-5.2 0-9.7-3-11.4-7.4l-6.5 5C9.5 40.6 16.2 45 24 45z"
                                        />
                                        <path
                                            fill="#1976D2"
                                            d="M43.6 20.5H42V20.5H24v7h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.3 5.3C41 35.4 44 30.6 44 25c0-1.3-.1-2.5-.4-4.5z"
                                        />
                                    </svg>

                                    Sign up with Google
                                </button>

                                {/* Login */}

                                <p
                                    className="
                                        text-center
                                        text-[13.5px]
                                        text-[var(--text-secondary)]
                                    "
                                    style={{
                                        marginTop: "22px",
                                        padding: "15px 18px"
                                    }}
                                >
                                    Already have an account?

                                    <a
                                        onClick={() => navigate("/login")}
                                        className="
                                            ml-1
                                            font-bold
                                            text-[var(--on-surface)]
                                            dark:text-[#f4f6fa]
                                            hover:underline
                                        "
                                    >
                                        Log In
                                    </a>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAccount;