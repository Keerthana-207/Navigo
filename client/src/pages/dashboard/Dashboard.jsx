import { useState, useEffect } from "react";
import {
    Search,
    PlusCircle,
    Wallet,
    PlaneTakeoff,
    Backpack,
    Sun,
    AlertTriangle,
    ShieldCheck,
    Leaf,
    ArrowRight,
    Calendar,
    MapPin,
} from "lucide-react";

import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { getMyTrips } from "../../services/tripApi";
import "../css/Dashboard.css";

function ActionCard({
    icon,
    title,
    description,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                w-full
                text-left
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--card-bg)]
                text-[var(--on-surface)]
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                group
            "
            style={{
                padding: "24px",
            }}
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                "
                style={{
                    marginBottom: "16px",
                }}
            >
                <div
                    className="
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        bg-[var(--primary-container)]
                        text-[var(--primary)]
                        transition-transform
                        duration-300
                        group-hover:scale-110
                    "
                    style={{
                        width: "52px",
                        height: "52px",
                    }}
                >
                    {icon}
                </div>

                <ArrowRight
                    size={18}
                    className="
                        text-[var(--on-surface-variant)]
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                    "
                />
            </div>

            <h3
                className="
                    font-bold
                    text-lg
                    text-[var(--on-surface)]
                "
                style={{
                    marginBottom: "8px",
                }}
            >
                {title}
            </h3>

            <p
                className="
                    text-sm
                    leading-relaxed
                    text-[var(--on-surface-variant)]
                "
            >
                {description}
            </p>
        </button>
    );
}

function Dashboard() {
    const navigate = useNavigate();

    const [searchDest, setSearchDest] = useState("");

    const [user] = useState(() => {
        const storedUser =
            localStorage.getItem("user") ||
            sessionStorage.getItem("user");

        return storedUser
            ? JSON.parse(storedUser)
            : null;
    });

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    /*
    |--------------------------------------------------------------------------
    | Load User Trips
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        async function loadTrips() {
            try {
                const data = await getMyTrips();

                if (data.success) {
                    setTrips(data.trips || []);
                }
            } catch (error) {
                console.error(
                    "Failed to load trips:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadTrips();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Active Trip
    |--------------------------------------------------------------------------
    */

    const activeTrip =
        trips.length > 0
            ? trips[0]
            : null;

    /*
    |--------------------------------------------------------------------------
    | Dashboard Metrics
    |--------------------------------------------------------------------------
    */

    const readinessScore = activeTrip
        ? activeTrip.travelReadinessScore || 78
        : 85;

    const sustainabilityScore = activeTrip
        ? activeTrip.sustainabilityScore || 82
        : 88;

    const totalBudget =
        activeTrip?.budget || 50000;

    const spentBudget = activeTrip
        ? Math.round(totalBudget * 0.42)
        : 21000;

    const budgetHealth =
        totalBudget > 0
            ? Math.round(
                  (spentBudget / totalBudget) * 100
              )
            : 0;

    /*
    |--------------------------------------------------------------------------
    | Search / Plan Trip
    |--------------------------------------------------------------------------
    */

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (searchDest.trim()) {
            navigate(
                `/plan-trip?destination=${encodeURIComponent(
                    searchDest.trim()
                )}`
            );
        } else {
            navigate("/plan-trip");
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Layout>
            <main
                className="
                    dashboard-page
                    flex-grow
                    min-h-screen
                    bg-[var(--background)]
                    text-[var(--on-background)]
                    transition-colors
                    duration-300
                "
            >
                {/* =====================================================
                    HERO SEARCH SECTION
                ===================================================== */}

                <section
                    className="
                        relative
                        w-full
                        h-[55vh]
                        min-h-[460px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        overflow-hidden
                    "
                    style={{
                        padding:
                            "40px 24px",
                    }}
                >
                    {/* Background */}

                    <div
                        className="
                            absolute
                            inset-0
                            z-0
                        "
                    >
                        <img
                            alt="Bright travel sunrise"
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKNb1yW3eLi1Ae5Z2dg0g4UxO1NPCaVycGImUSPdc0FGNeBEUGJadTg0HYqD7BlAmh5AZ59AG73hKAgJdWX8D4jLQHK1ACuqsMa_LLwqZobpTUKUiD577l6k5Z0a2fXJCeLBQ6gTUB9bEPGa1P9Suu7LJkUJ1KNif0-i2VeLchzqmjmdM6fYbSe8vlOR_E9r6H_8U0xMqo3fHElnQAxGqt2RFCyl48EwDmazjJ_Drwe3Xx92f3iUiAOQ"
                        />

                        <div
                            className="
                                absolute
                                inset-0
                                backdrop-blur-[4px]
                            "
                            style={{
                                background:
                                    "var(--hero-overlay)",
                            }}
                        />

                        <div
                            className="
                                absolute
                                inset-0
                                pointer-events-none
                            "
                            style={{
                                background:
                                    "linear-gradient(to bottom, transparent 50%, var(--background) 100%)",
                            }}
                        />
                    </div>

                    {/* Hero Content */}

                    <div
                        className="
                            relative
                            z-10
                            w-full
                            max-w-3xl
                            mx-auto
                            text-center
                            flex
                            flex-col
                            items-center
                        "
                    >
                        <h1
                            className="
                                text-3xl
                                sm:text-5xl
                                font-extrabold
                                text-[var(--on-surface)]
                                tracking-tight
                                drop-shadow-md
                            "
                            style={{
                                marginBottom: "16px",
                            }}
                        >
                            Where will your next
                            adventure take you?
                        </h1>

                        <p
                            className="
                                text-base
                                sm:text-lg
                                text-[var(--on-surface-variant)]
                                max-w-xl
                            "
                            style={{
                                marginBottom: "32px",
                            }}
                        >
                            Plan your journey,
                            manage your budget,
                            and track travel
                            readiness in one place.
                        </p>

                        {/* Search */}

                        <form
                            onSubmit={
                                handleSearchSubmit
                            }
                            className="
                                w-full
                                max-w-2xl
                                flex
                                flex-col
                                sm:flex-row
                                items-center
                                glass-card
                                rounded-full
                                shadow-2xl
                                gap-3
                                border
                                border-[var(--border)]
                            "
                            style={{
                                padding: "8px",
                            }}
                        >
                            <div
                                className="
                                    flex-grow
                                    flex
                                    items-center
                                    w-full
                                "
                                style={{
                                    padding:
                                        "0 16px",
                                }}
                            >
                                <Search
                                    size={22}
                                    className="
                                        shrink-0
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        marginRight:
                                            "12px",
                                    }}
                                />

                                <input
                                    className="
                                        w-full
                                        bg-transparent
                                        border-none
                                        text-[var(--on-surface)]
                                        placeholder:text-[var(--on-surface-variant)]
                                        outline-none
                                        text-base
                                    "
                                    style={{
                                        padding:
                                            "12px 0",
                                    }}
                                    placeholder="Where to? (e.g. Goa, Paris, Tokyo)..."
                                    type="text"
                                    value={searchDest}
                                    onChange={(e) =>
                                        setSearchDest(
                                            e.target
                                                .value
                                        )
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="
                                    w-full
                                    sm:w-auto
                                    bg-gradient-to-r
                                    from-orange-500
                                    to-orange-600
                                    text-white
                                    rounded-full
                                    font-bold
                                    hover:scale-105
                                    transition-transform
                                    shrink-0
                                    shadow-lg
                                "
                                style={{
                                    padding:
                                        "14px 32px",
                                }}
                            >
                                Plan Trip
                            </button>
                        </form>
                    </div>
                </section>

                {/* =====================================================
                    SMART ALERTS
                ===================================================== */}

                <div
                    className="
                        max-w-7xl
                        mx-auto
                    "
                    style={{
                        padding:
                            "0 24px",
                        marginBottom:
                            "32px",
                    }}
                >
                    <div
                        className="
                            rounded-2xl
                            bg-amber-500/10
                            border
                            border-amber-500/30
                            flex
                            flex-col
                            sm:flex-row
                            items-start
                            sm:items-center
                            justify-between
                            gap-4
                            text-sm
                        "
                        style={{
                            padding: "16px",
                        }}
                    >
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <AlertTriangle
                                className="
                                    text-amber-500
                                    shrink-0
                                "
                                size={24}
                            />

                            <div>
                                <span
                                    className="
                                        font-bold
                                        text-amber-500
                                        mr-2
                                    "
                                >
                                    Smart Emergency
                                    Advisory:
                                </span>

                                <span
                                    className="
                                        text-[var(--on-surface)]
                                    "
                                >
                                    Light rain
                                    forecasted for
                                    Day 2 of your
                                    trip. Check
                                    packed gear.
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/weather")
                            }
                            className="
                                text-xs
                                font-bold
                                text-amber-500
                                underline
                                hover:opacity-80
                                shrink-0
                            "
                        >
                            View Weather Details →
                        </button>
                    </div>
                </div>

                {/* =====================================================
                    DASHBOARD METRICS
                ===================================================== */}

                <section
                    className="
                        max-w-7xl
                        mx-auto
                    "
                    style={{
                        padding:
                            "0 24px",
                        marginBottom:
                            "48px",
                    }}
                >
                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                        "
                        style={{
                            gap: "24px",
                        }}
                    >
                        {/* =================================================
                            TRAVEL READINESS
                        ================================================= */}

                        <div
                            className="
                                rounded-3xl
                                border
                                border-[var(--border)]
                                bg-[var(--card-bg)]
                                shadow-lg
                                hover:shadow-xl
                                transition-all
                            "
                            style={{
                                padding: "24px",
                            }}
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                                style={{
                                    marginBottom:
                                        "16px",
                                }}
                            >
                                <h3
                                    className="
                                        font-bold
                                        text-lg
                                        text-[var(--on-surface)]
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <ShieldCheck
                                        className="text-orange-500"
                                        size={22}
                                    />

                                    Travel Readiness
                                    Score
                                </h3>

                                <span
                                    className="
                                        text-xs
                                        font-bold
                                        rounded-full
                                        bg-emerald-500/15
                                        text-emerald-500
                                    "
                                    style={{
                                        padding:
                                            "4px 10px",
                                    }}
                                >
                                    Ready to Go!
                                </span>
                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                "
                                style={{
                                    margin:
                                        "24px 0",
                                }}
                            >
                                <div
                                    className="
                                        relative
                                        w-36
                                        h-36
                                        flex
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-8
                                        border-orange-500/20
                                        bg-orange-500/5
                                    "
                                >
                                    <div className="text-center">
                                        <span
                                            className="
                                                text-4xl
                                                font-black
                                                text-[var(--primary)]
                                            "
                                        >
                                            {
                                                readinessScore
                                            }
                                            %
                                        </span>

                                        <p
                                            className="
                                                text-[11px]
                                                text-[var(--on-surface-variant)]
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                            "
                                        >
                                            Score
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="
                                    space-y-2
                                    text-xs
                                "
                            >
                                <div
                                    className="
                                        flex
                                        justify-between
                                        text-[var(--on-surface-variant)]
                                    "
                                >
                                    <span>
                                        Packing
                                        Progress
                                    </span>

                                    <span className="font-bold text-[var(--on-surface)]">
                                        85%
                                    </span>
                                </div>

                                <div
                                    className="
                                        w-full
                                        h-2
                                        rounded-full
                                        bg-[var(--input-bg)]
                                        overflow-hidden
                                    "
                                >
                                    <div
                                        className="
                                            h-full
                                            bg-emerald-500
                                            rounded-full
                                        "
                                        style={{
                                            width:
                                                "85%",
                                        }}
                                    />
                                </div>

                                <div
                                    className="
                                        flex
                                        justify-between
                                        text-[var(--on-surface-variant)]
                                        pt-1
                                    "
                                >
                                    <span>
                                        Itinerary
                                        Scheduled
                                    </span>

                                    <span className="font-bold text-[var(--on-surface)]">
                                        70%
                                    </span>
                                </div>

                                <div
                                    className="
                                        w-full
                                        h-2
                                        rounded-full
                                        bg-[var(--input-bg)]
                                        overflow-hidden
                                    "
                                >
                                    <div
                                        className="
                                            h-full
                                            bg-blue-500
                                            rounded-full
                                        "
                                        style={{
                                            width:
                                                "70%",
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/packing-list"
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-[var(--border)]
                                    text-xs
                                    font-bold
                                    text-[var(--on-surface)]
                                    hover:bg-[var(--pill-bg)]
                                    transition-colors
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                                style={{
                                    padding:
                                        "10px 0",
                                    marginTop:
                                        "20px",
                                }}
                            >
                                Complete Checklist

                                <ArrowRight
                                    size={14}
                                />
                            </button>
                        </div>

                        {/* =================================================
                            BUDGET
                        ================================================= */}

                        <div
                            className="
                                rounded-3xl
                                border
                                border-[var(--border)]
                                bg-[var(--card-bg)]
                                shadow-lg
                                hover:shadow-xl
                                transition-all
                            "
                            style={{
                                padding: "24px",
                            }}
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                                style={{
                                    marginBottom:
                                        "16px",
                                }}
                            >
                                <h3
                                    className="
                                        font-bold
                                        text-lg
                                        text-[var(--on-surface)]
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <Wallet
                                        className="text-blue-500"
                                        size={22}
                                    />

                                    Budget Health
                                    Meter
                                </h3>

                                <span
                                    className={`
                                        text-xs
                                        font-bold
                                        rounded-full
                                        ${
                                            budgetHealth >
                                            90
                                                ? "bg-red-500/15 text-red-500"
                                                : "bg-emerald-500/15 text-emerald-500"
                                        }
                                    `}
                                    style={{
                                        padding:
                                            "4px 10px",
                                    }}
                                >
                                    {budgetHealth >
                                    90
                                        ? "High Spending"
                                        : "Healthy"}
                                </span>
                            </div>

                            <div
                                className="text-center"
                                style={{
                                    margin:
                                        "24px 0",
                                }}
                            >
                                <div
                                    className="
                                        text-3xl
                                        font-extrabold
                                        text-[var(--on-surface)]
                                    "
                                >
                                    ₹
                                    {spentBudget.toLocaleString()}

                                    <span
                                        className="
                                            text-sm
                                            text-[var(--on-surface-variant)]
                                            font-normal
                                        "
                                    >
                                        {" "}
                                        / ₹
                                        {totalBudget.toLocaleString()}
                                    </span>
                                </div>

                                <p
                                    className="
                                        text-xs
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        marginTop:
                                            "4px",
                                    }}
                                >
                                    {budgetHealth}% of
                                    total budget
                                    spent so far
                                </p>

                                <div
                                    className="
                                        w-full
                                        h-4
                                        rounded-full
                                        bg-[var(--input-bg)]
                                        overflow-hidden
                                        border
                                        border-[var(--border)]
                                    "
                                    style={{
                                        marginTop:
                                            "16px",
                                    }}
                                >
                                    <div
                                        className="
                                            h-full
                                            bg-gradient-to-r
                                            from-blue-500
                                            to-emerald-500
                                            rounded-full
                                        "
                                        style={{
                                            width: `${Math.min(
                                                budgetHealth,
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                className="
                                    grid
                                    grid-cols-2
                                    text-center
                                    text-xs
                                "
                                style={{
                                    gap: "8px",
                                    padding:
                                        "8px 0",
                                }}
                            >
                                <div
                                    className="
                                        rounded-xl
                                        bg-[var(--input-bg)]
                                    "
                                    style={{
                                        padding:
                                            "8px",
                                    }}
                                >
                                    <span className="block text-[var(--on-surface-variant)]">
                                        Lodging
                                    </span>

                                    <span className="font-bold text-[var(--on-surface)]">
                                        ₹12,000
                                    </span>
                                </div>

                                <div
                                    className="
                                        rounded-xl
                                        bg-[var(--input-bg)]
                                    "
                                    style={{
                                        padding:
                                            "8px",
                                    }}
                                >
                                    <span className="block text-[var(--on-surface-variant)]">
                                        Food & Fun
                                    </span>

                                    <span className="font-bold text-[var(--on-surface)]">
                                        ₹9,000
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/budget"
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-[var(--border)]
                                    text-xs
                                    font-bold
                                    text-[var(--on-surface)]
                                    hover:bg-[var(--pill-bg)]
                                    transition-colors
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                                style={{
                                    padding:
                                        "10px 0",
                                    marginTop:
                                        "12px",
                                }}
                            >
                                Open Budget
                                Calculator

                                <ArrowRight
                                    size={14}
                                />
                            </button>
                        </div>

                        {/* =================================================
                            SUSTAINABILITY
                        ================================================= */}

                        <div
                            className="
                                rounded-3xl
                                border
                                border-[var(--border)]
                                bg-[var(--card-bg)]
                                shadow-lg
                                hover:shadow-xl
                                transition-all
                            "
                            style={{
                                padding: "24px",
                            }}
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                                style={{
                                    marginBottom:
                                        "16px",
                                }}
                            >
                                <h3
                                    className="
                                        font-bold
                                        text-lg
                                        text-[var(--on-surface)]
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <Leaf
                                        className="text-emerald-500"
                                        size={22}
                                    />

                                    Sustainability
                                    Score
                                </h3>

                                <span
                                    className="
                                        text-xs
                                        font-bold
                                        rounded-full
                                        bg-emerald-500/15
                                        text-emerald-500
                                    "
                                    style={{
                                        padding:
                                            "4px 10px",
                                    }}
                                >
                                    Eco Badge 🌿
                                </span>
                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                "
                                style={{
                                    margin:
                                        "24px 0",
                                }}
                            >
                                <div
                                    className="
                                        relative
                                        w-36
                                        h-36
                                        flex
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-8
                                        border-emerald-500/20
                                        bg-emerald-500/5
                                    "
                                >
                                    <div className="text-center">
                                        <span
                                            className="
                                                text-4xl
                                                font-black
                                                text-emerald-500
                                            "
                                        >
                                            {
                                                sustainabilityScore
                                            }
                                        </span>

                                        <p
                                            className="
                                                text-[11px]
                                                text-[var(--on-surface-variant)]
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                            "
                                        >
                                            Eco Index
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="
                                    rounded-xl
                                    bg-emerald-500/10
                                    border
                                    border-emerald-500/20
                                    text-xs
                                    text-emerald-600
                                    dark:text-emerald-400
                                "
                                style={{
                                    padding: "12px",
                                }}
                            >
                                <span
                                    className="
                                        font-bold
                                        block
                                    "
                                    style={{
                                        marginBottom:
                                            "4px",
                                    }}
                                >
                                    🌿 Eco Tip for
                                    Active Trip:
                                </span>

                                Choosing train travel
                                reduced your carbon
                                emissions by 40%
                                compared to flight!
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/my-trips"
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-[var(--border)]
                                    text-xs
                                    font-bold
                                    text-[var(--on-surface)]
                                    hover:bg-[var(--pill-bg)]
                                    transition-colors
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                                style={{
                                    padding:
                                        "10px 0",
                                    marginTop:
                                        "16px",
                                }}
                            >
                                View Trip Progress

                                <ArrowRight
                                    size={14}
                                />
                            </button>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    ACTIVE TRIP
                ===================================================== */}

                {activeTrip && (
                    <section
                        className="
                            max-w-7xl
                            mx-auto
                        "
                        style={{
                            padding:
                                "0 24px",
                            marginBottom:
                                "48px",
                        }}
                    >
                        <div
                            className="
                                rounded-3xl
                                border
                                border-[var(--border)]
                                bg-[var(--card-bg)]
                                shadow-xl
                                flex
                                flex-col
                                md:flex-row
                                items-start
                                md:items-center
                                justify-between
                                gap-6
                            "
                            style={{
                                padding:
                                    "24px",
                            }}
                        >
                            <div
                                className="space-y-2"
                            >
                                <span
                                    className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-[var(--primary)]
                                        rounded-full
                                        bg-orange-500/15
                                        inline-block
                                    "
                                    style={{
                                        padding:
                                            "4px 12px",
                                    }}
                                >
                                    Active Trip
                                </span>

                                <h2
                                    className="
                                        text-2xl
                                        sm:text-3xl
                                        font-extrabold
                                        text-[var(--on-surface)]
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <MapPin
                                        className="
                                            text-[var(--primary)]
                                            shrink-0
                                        "
                                        size={28}
                                    />

                                    {activeTrip.destination}
                                </h2>

                                <p
                                    className="
                                        text-sm
                                        text-[var(--on-surface-variant)]
                                        flex
                                        items-center
                                        gap-4
                                        flex-wrap
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            items-center
                                            gap-1.5
                                        "
                                    >
                                        <Calendar
                                            size={16}
                                        />

                                        {
                                            activeTrip.duration
                                        }{" "}
                                        Days
                                    </span>

                                    <span>
                                        •
                                    </span>

                                    <span>
                                        {
                                            activeTrip.travelers
                                        }{" "}
                                        Travelers
                                    </span>

                                    <span>
                                        •
                                    </span>

                                    <span className="capitalize">
                                        {
                                            activeTrip.travelStyle
                                        }{" "}
                                        Style
                                    </span>
                                </p>
                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    flex-wrap
                                    w-full
                                    md:w-auto
                                "
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            `/itinerary/${activeTrip._id}`
                                        )
                                    }
                                    className="
                                        w-full
                                        md:w-auto
                                        rounded-2xl
                                        bg-gradient-to-r
                                        from-orange-500
                                        to-orange-600
                                        text-white
                                        font-bold
                                        text-sm
                                        shadow-md
                                        hover:scale-105
                                        transition-transform
                                    "
                                    style={{
                                        padding:
                                            "12px 24px",
                                    }}
                                >
                                    Interactive
                                    Itinerary
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* =====================================================
                    QUICK ACTIONS
                ===================================================== */}

                <section
                    className="
                        bg-[var(--background)]
                        text-[var(--on-background)]
                        transition-colors
                        duration-300
                    "
                    style={{
                        padding:
                            "0 24px 64px",
                    }}
                >
                    <div
                        className="
                            max-w-7xl
                            mx-auto
                        "
                    >
                        <h2
                            className="
                                text-2xl
                                sm:text-3xl
                                font-bold
                                text-center
                                text-[var(--on-surface)]
                            "
                            style={{
                                marginBottom:
                                    "32px",
                            }}
                        >
                            Centralized Trip Tools
                        </h2>

                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-5
                            "
                            style={{
                                gap: "24px",
                            }}
                        >
                            <ActionCard
                                icon={
                                    <PlusCircle
                                        size={28}
                                    />
                                }
                                title="New Trip"
                                description="Plan & organize destination and dates."
                                onClick={() =>
                                    navigate(
                                        "/plan-trip"
                                    )
                                }
                            />

                            <ActionCard
                                icon={
                                    <Wallet
                                        size={28}
                                    />
                                }
                                title="Budget Calculator"
                                description="Smart expense tracking & budget health."
                                onClick={() =>
                                    navigate(
                                        "/budget"
                                    )
                                }
                            />

                            <ActionCard
                                icon={
                                    <PlaneTakeoff
                                        size={28}
                                    />
                                }
                                title="My Trips"
                                description="Organize trips & track progress."
                                onClick={() =>
                                    navigate(
                                        "/my-trips"
                                    )
                                }
                            />

                            <ActionCard
                                icon={
                                    <Backpack
                                        size={28}
                                    />
                                }
                                title="Packing Checklist"
                                description="Smart packing assistant & checklist."
                                onClick={() =>
                                    navigate(
                                        "/packing-list"
                                    )
                                }
                            />

                            <ActionCard
                                icon={
                                    <Sun
                                        size={28}
                                    />
                                }
                                title="Weather Forecast"
                                description="Live forecast & travel advisories."
                                onClick={() =>
                                    navigate(
                                        "/weather"
                                    )
                                }
                            />
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default Dashboard;