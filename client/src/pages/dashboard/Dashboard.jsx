import { useState, useEffect, useMemo } from "react";
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
    CloudRain,
    Thermometer,
    Umbrella,
    TrendingDown,
    CircleDollarSign,
    TreePine,
    Train,
    Wind,
    CheckCircle2,
    Clock,
} from "lucide-react";

import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { getMyTrips } from "../../services/tripApi";
import "../css/Dashboard.css";


/* ============================================================
   ACTION CARD
============================================================ */

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
                padding: "22px",
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


/* ============================================================
   DASHBOARD
============================================================ */

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


    /* ============================================================
       LOAD TRIPS
    ============================================================ */

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


    /* ============================================================
       ACTIVE TRIP
    ============================================================ */

    const activeTrip =
        trips.length > 0
            ? trips[0]
            : null;


    /* ============================================================
       DASHBOARD VALUES
    ============================================================ */

    const readinessScore =
        activeTrip?.travelReadinessScore ?? 78;

    const sustainabilityScore =
        activeTrip?.sustainabilityScore ?? 82;

    const totalBudget =
        activeTrip?.budget ?? 50000;

    const spentBudget =
        activeTrip
            ? Math.round(totalBudget * 0.42)
            : 21000;

    const remainingBudget =
        Math.max(
            totalBudget - spentBudget,
            0
        );

    const budgetHealth =
        totalBudget > 0
            ? Math.round(
                  (spentBudget / totalBudget) *
                      100
              )
            : 0;


    /* ============================================================
       USER NAME
    ============================================================ */

    const firstName =
        user?.name?.split(" ")[0] ||
        user?.username?.split(" ")[0] ||
        "Traveler";


    /* ============================================================
       SEARCH
    ============================================================ */

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


    /* ============================================================
       BUDGET CATEGORY DATA
    ============================================================ */

    const budgetCategories = useMemo(
        () => [
            {
                name: "Lodging",
                amount: 12000,
                percentage: 57,
            },
            {
                name: "Food & Fun",
                amount: 9000,
                percentage: 43,
            },
        ],
        []
    );


    return (
        <Layout>

            {/* ====================================================
                PAGE
            ==================================================== */}

            <div
                className="
                    dashboard-page
                    min-h-screen
                    bg-[var(--background)]
                    text-[var(--on-background)]
                    transition-colors
                    duration-300
                "
            >

                {/* =================================================
                    HERO
                ================================================= */}

                <section
                    className="
                        relative
                        w-full
                        min-h-[500px]
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                    "
                    style={{
                        padding:
                            "70px 24px 100px",
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
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKNb1yW3eLi1Ae5Z2dg0g4UxO1NPCaVycGImUSPdc0FGNeBEUGJadTg0HYqD7BlAmh5AZ59AG73hKAgJdWX8D4jLQHK1ACuqsMa_LLwqZobpTUKUiD577l6k5Z0a2fXJCeLBQ6gTUB9bEPGa1P9Suu7LJkUJ1KNif0-i2VeLchzqmjmdM6fYbSe8vlOR_E9r6H_8U0xMqo3fHElnQAxGqt2RFCyl48EwDmazjJ_Drwe3Xx92f3iUiAOQ"
                            alt="Travel landscape"
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />

                        <div
                            className="
                                absolute
                                inset-0
                                backdrop-blur-[3px]
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
                            "
                            style={{
                                background:
                                    "linear-gradient(to bottom, transparent 45%, var(--background) 100%)",
                            }}
                        />
                    </div>


                    {/* Hero content */}

                    <div
                        className="
                            relative
                            z-10
                            w-full
                            max-w-4xl
                            mx-auto
                            text-center
                            flex
                            flex-col
                            items-center
                        "
                    >

                        <span
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-[var(--card-bg)]
                                border
                                border-[var(--border)]
                                text-[var(--on-surface)]
                                text-xs
                                font-bold
                                shadow-lg
                            "
                            style={{
                                padding:
                                    "8px 14px",
                                marginBottom:
                                    "20px",
                            }}
                        >
                            <PlaneTakeoff
                                size={15}
                                className="text-[var(--primary)]"
                            />

                            Welcome back, {firstName}
                        </span>


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
                                marginBottom:
                                    "16px",
                            }}
                        >
                            Where will your next
                            <br className="hidden sm:block" />
                            adventure take you?
                        </h1>


                        <p
                            className="
                                text-base
                                sm:text-lg
                                text-[var(--on-surface-variant)]
                                max-w-2xl
                            "
                            style={{
                                marginBottom:
                                    "30px",
                            }}
                        >
                            Plan your journey,
                            manage your budget,
                            monitor your weather,
                            and stay travel-ready
                            from one dashboard.
                        </p>


                        {/* Search */}

                        <form
                            onSubmit={
                                handleSearchSubmit
                            }
                            className="
                                w-full
                                max-w-3xl
                                flex
                                flex-col
                                sm:flex-row
                                items-center
                                rounded-3xl
                                sm:rounded-full
                                border
                                border-[var(--border)]
                                bg-[var(--card-bg)]
                                shadow-2xl
                                gap-2
                            "
                            style={{
                                padding: "8px",
                            }}
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    flex-1
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
                                            "13px 0",
                                    }}
                                    placeholder="Where to? Goa, Paris, Tokyo..."
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
                                    rounded-2xl
                                    sm:rounded-full
                                    font-bold
                                    shadow-lg
                                    hover:scale-[1.02]
                                    transition-transform
                                    shrink-0
                                "
                                style={{
                                    padding:
                                        "14px 30px",
                                }}
                            >
                                Plan Trip
                            </button>
                        </form>
                    </div>
                </section>


                {/* =================================================
                    MAIN CONTENT WRAPPER
                ================================================= */}

                <div
                    className="
                        w-full
                        max-w-7xl
                        mx-auto
                    "
                    style={{
                        padding:
                            "0 24px 70px",
                    }}
                >

                    {/* =================================================
                        SMART WEATHER ALERT
                    ================================================= */}

                    <section
                        style={{
                            marginBottom:
                                "28px",
                        }}
                    >
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-amber-500/30
                                bg-amber-500/10
                                shadow-md
                            "
                            style={{
                                padding:
                                    "20px 22px",
                            }}
                        >

                            <div
                                className="
                                    flex
                                    flex-col
                                    lg:flex-row
                                    lg:items-center
                                    justify-between
                                    gap-5
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-start
                                        gap-4
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-amber-500/15
                                            text-amber-500
                                            shrink-0
                                        "
                                        style={{
                                            width:
                                                "48px",
                                            height:
                                                "48px",
                                        }}
                                    >
                                        <CloudRain
                                            size={24}
                                        />
                                    </div>

                                    <div>
                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                flex-wrap
                                            "
                                        >
                                            <h3
                                                className="
                                                    font-bold
                                                    text-[var(--on-surface)]
                                                "
                                            >
                                                Weather Advisory
                                            </h3>

                                            <span
                                                className="
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-amber-500
                                                    bg-amber-500/10
                                                    rounded-full
                                                "
                                                style={{
                                                    padding:
                                                        "4px 8px",
                                                }}
                                            >
                                                Day 2
                                            </span>
                                        </div>

                                        <p
                                            className="
                                                text-sm
                                                text-[var(--on-surface-variant)]
                                            "
                                            style={{
                                                marginTop:
                                                    "5px",
                                            }}
                                        >
                                            Light rain is
                                            expected during
                                            your trip. Keep
                                            a compact umbrella
                                            and waterproof
                                            layer ready.
                                        </p>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-4
                                                flex-wrap
                                                text-xs
                                                text-[var(--on-surface-variant)]
                                            "
                                            style={{
                                                marginTop:
                                                    "10px",
                                            }}
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <CloudRain
                                                    size={14}
                                                />
                                                65% rain
                                            </span>

                                            <span className="flex items-center gap-1.5">
                                                <Thermometer
                                                    size={14}
                                                />
                                                24°C
                                            </span>

                                            <span className="flex items-center gap-1.5">
                                                <Wind
                                                    size={14}
                                                />
                                                Moderate wind
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        flex-wrap
                                    "
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                "/packing-list"
                                            )
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-[var(--border)]
                                            bg-[var(--card-bg)]
                                            text-[var(--on-surface)]
                                            text-xs
                                            font-bold
                                            hover:bg-[var(--pill-bg)]
                                        "
                                        style={{
                                            padding:
                                                "10px 14px",
                                        }}
                                    >
                                        <Umbrella
                                            size={15}
                                        />

                                        Check Gear
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                "/weather"
                                            )
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            bg-amber-500
                                            text-white
                                            text-xs
                                            font-bold
                                            hover:opacity-90
                                        "
                                        style={{
                                            padding:
                                                "10px 14px",
                                        }}
                                    >
                                        Weather Details

                                        <ArrowRight
                                            size={15}
                                        />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </section>


                    {/* =================================================
                        DASHBOARD METRICS
                    ================================================= */}

                    <section
                        style={{
                            marginBottom:
                                "32px",
                        }}
                    >
                        <div
                            className="
                                grid
                                grid-cols-1
                                lg:grid-cols-3
                                gap-6
                            "
                        >

                            {/* =========================================
                                READINESS
                            ========================================= */}

                            <div
                                className="
                                    rounded-3xl
                                    border
                                    border-[var(--border)]
                                    bg-[var(--card-bg)]
                                    shadow-lg
                                "
                                style={{
                                    padding:
                                        "24px",
                                }}
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-[var(--on-surface-variant)]
                                            "
                                        >
                                            Travel Status
                                        </p>

                                        <h3
                                            className="
                                                text-xl
                                                font-bold
                                                text-[var(--on-surface)]
                                            "
                                            style={{
                                                marginTop:
                                                    "4px",
                                            }}
                                        >
                                            Readiness Score
                                        </h3>
                                    </div>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-1.5
                                            text-emerald-500
                                            text-xs
                                            font-bold
                                        "
                                    >
                                        <CheckCircle2
                                            size={16}
                                        />

                                        Ready
                                    </div>
                                </div>


                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-6
                                    "
                                    style={{
                                        margin:
                                            "26px 0",
                                    }}
                                >
                                    <div
                                        className="
                                            relative
                                            w-32
                                            h-32
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            border-[10px]
                                            border-orange-500/20
                                            bg-orange-500/5
                                            shrink-0
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
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-[var(--on-surface-variant)]
                                                "
                                            >
                                                Ready
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="
                                            flex-1
                                            space-y-4
                                        "
                                    >
                                        <div>
                                            <div
                                                className="
                                                    flex
                                                    justify-between
                                                    text-xs
                                                    mb-2
                                                "
                                            >
                                                <span className="text-[var(--on-surface-variant)]">
                                                    Packing
                                                </span>

                                                <span className="font-bold text-[var(--on-surface)]">
                                                    85%
                                                </span>
                                            </div>

                                            <div
                                                className="
                                                    h-2
                                                    rounded-full
                                                    bg-[var(--input-bg)]
                                                    overflow-hidden
                                                "
                                            >
                                                <div
                                                    className="
                                                        h-full
                                                        rounded-full
                                                        bg-emerald-500
                                                    "
                                                    style={{
                                                        width:
                                                            "85%",
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div
                                                className="
                                                    flex
                                                    justify-between
                                                    text-xs
                                                    mb-2
                                                "
                                            >
                                                <span className="text-[var(--on-surface-variant)]">
                                                    Itinerary
                                                </span>

                                                <span className="font-bold text-[var(--on-surface)]">
                                                    70%
                                                </span>
                                            </div>

                                            <div
                                                className="
                                                    h-2
                                                    rounded-full
                                                    bg-[var(--input-bg)]
                                                    overflow-hidden
                                                "
                                            >
                                                <div
                                                    className="
                                                        h-full
                                                        rounded-full
                                                        bg-blue-500
                                                    "
                                                    style={{
                                                        width:
                                                            "70%",
                                                    }}
                                                />
                                            </div>
                                        </div>
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
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-[var(--border)]
                                        text-xs
                                        font-bold
                                        text-[var(--on-surface)]
                                        hover:bg-[var(--pill-bg)]
                                    "
                                    style={{
                                        padding:
                                            "11px",
                                    }}
                                >
                                    Complete Checklist

                                    <ArrowRight
                                        size={14}
                                    />
                                </button>
                            </div>


                            {/* =========================================
                                BUDGET
                            ========================================= */}

                            <div
                                className="
                                    rounded-3xl
                                    border
                                    border-[var(--border)]
                                    bg-[var(--card-bg)]
                                    shadow-lg
                                "
                                style={{
                                    padding:
                                        "24px",
                                }}
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-[var(--on-surface-variant)]
                                            "
                                        >
                                            Financial Overview
                                        </p>

                                        <h3
                                            className="
                                                text-xl
                                                font-bold
                                                text-[var(--on-surface)]
                                            "
                                            style={{
                                                marginTop:
                                                    "4px",
                                            }}
                                        >
                                            Budget Health
                                        </h3>
                                    </div>

                                    <div
                                        className={`
                                            flex
                                            items-center
                                            gap-1
                                            text-xs
                                            font-bold
                                            rounded-full
                                            ${
                                                budgetHealth >
                                                80
                                                    ? "bg-amber-500/15 text-amber-500"
                                                    : "bg-emerald-500/15 text-emerald-500"
                                            }
                                        `}
                                        style={{
                                            padding:
                                                "6px 10px",
                                        }}
                                    >
                                        <TrendingDown
                                            size={13}
                                        />

                                        {budgetHealth}%
                                    </div>
                                </div>


                                <div
                                    style={{
                                        margin:
                                            "25px 0 20px",
                                    }}
                                >
                                    <div
                                        className="
                                            flex
                                            items-end
                                            justify-between
                                            gap-3
                                        "
                                    >
                                        <div>
                                            <p
                                                className="
                                                    text-xs
                                                    text-[var(--on-surface-variant)]
                                                "
                                            >
                                                Spent
                                            </p>

                                            <p
                                                className="
                                                    text-3xl
                                                    font-black
                                                    text-[var(--on-surface)]
                                                "
                                            >
                                                ₹
                                                {spentBudget.toLocaleString()}
                                            </p>
                                        </div>

                                        <div
                                            className="
                                                text-right
                                            "
                                        >
                                            <p
                                                className="
                                                    text-xs
                                                    text-[var(--on-surface-variant)]
                                                "
                                            >
                                                Remaining
                                            </p>

                                            <p
                                                className="
                                                    text-lg
                                                    font-bold
                                                    text-emerald-500
                                                "
                                            >
                                                ₹
                                                {remainingBudget.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>


                                    <div
                                        className="
                                            w-full
                                            h-3
                                            rounded-full
                                            bg-[var(--input-bg)]
                                            overflow-hidden
                                        "
                                        style={{
                                            marginTop:
                                                "16px",
                                        }}
                                    >
                                        <div
                                            className="
                                                h-full
                                                rounded-full
                                                bg-gradient-to-r
                                                from-blue-500
                                                to-emerald-500
                                            "
                                            style={{
                                                width: `${Math.min(
                                                    budgetHealth,
                                                    100
                                                )}%`,
                                            }}
                                        />
                                    </div>

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            text-[11px]
                                            text-[var(--on-surface-variant)]
                                        "
                                        style={{
                                            marginTop:
                                                "7px",
                                        }}
                                    >
                                        <span>
                                            ₹0
                                        </span>

                                        <span>
                                            ₹
                                            {totalBudget.toLocaleString()}
                                        </span>
                                    </div>
                                </div>


                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        gap-3
                                    "
                                >
                                    {budgetCategories.map(
                                        (category) => (
                                            <div
                                                key={
                                                    category.name
                                                }
                                                className="
                                                    rounded-xl
                                                    bg-[var(--input-bg)]
                                                "
                                                style={{
                                                    padding:
                                                        "11px",
                                                }}
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                    "
                                                >
                                                    <span
                                                        className="
                                                            text-xs
                                                            text-[var(--on-surface-variant)]
                                                        "
                                                    >
                                                        {
                                                            category.name
                                                        }
                                                    </span>

                                                    <span
                                                        className="
                                                            text-[10px]
                                                            font-bold
                                                            text-[var(--on-surface-variant)]
                                                        "
                                                    >
                                                        {
                                                            category.percentage
                                                        }
                                                        %
                                                    </span>
                                                </div>

                                                <p
                                                    className="
                                                        font-bold
                                                        text-[var(--on-surface)]
                                                        text-sm
                                                    "
                                                    style={{
                                                        marginTop:
                                                            "4px",
                                                    }}
                                                >
                                                    ₹
                                                    {category.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        )
                                    )}
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
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-[var(--border)]
                                        text-xs
                                        font-bold
                                        text-[var(--on-surface)]
                                        hover:bg-[var(--pill-bg)]
                                    "
                                    style={{
                                        padding:
                                            "11px",
                                        marginTop:
                                            "14px",
                                    }}
                                >
                                    Open Budget Calculator

                                    <ArrowRight
                                        size={14}
                                    />
                                </button>
                            </div>


                            {/* =========================================
                                SUSTAINABILITY
                            ========================================= */}

                            <div
                                className="
                                    rounded-3xl
                                    border
                                    border-[var(--border)]
                                    bg-[var(--card-bg)]
                                    shadow-lg
                                "
                                style={{
                                    padding:
                                        "24px",
                                }}
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-[var(--on-surface-variant)]
                                            "
                                        >
                                            Eco Travel
                                        </p>

                                        <h3
                                            className="
                                                text-xl
                                                font-bold
                                                text-[var(--on-surface)]
                                            "
                                            style={{
                                                marginTop:
                                                    "4px",
                                            }}
                                        >
                                            Sustainability
                                        </h3>
                                    </div>

                                    <TreePine
                                        size={25}
                                        className="text-emerald-500"
                                    />
                                </div>


                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-5
                                    "
                                    style={{
                                        margin:
                                            "25px 0",
                                    }}
                                >
                                    <div
                                        className="
                                            w-28
                                            h-28
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            border-[9px]
                                            border-emerald-500/20
                                            bg-emerald-500/5
                                            shrink-0
                                        "
                                    >
                                        <div className="text-center">
                                            <span
                                                className="
                                                    text-3xl
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
                                                    text-[9px]
                                                    uppercase
                                                    font-bold
                                                    tracking-wider
                                                    text-[var(--on-surface-variant)]
                                                "
                                            >
                                                Eco Index
                                            </p>
                                        </div>
                                    </div>


                                    <div>
                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                text-emerald-500
                                                text-sm
                                                font-bold
                                            "
                                        >
                                            <Leaf
                                                size={16}
                                            />

                                            Excellent
                                        </div>

                                        <p
                                            className="
                                                text-xs
                                                leading-relaxed
                                                text-[var(--on-surface-variant)]
                                            "
                                            style={{
                                                marginTop:
                                                    "6px",
                                            }}
                                        >
                                            Your travel
                                            choices are
                                            reducing
                                            environmental
                                            impact.
                                        </p>
                                    </div>
                                </div>


                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        gap-3
                                    "
                                >
                                    <div
                                        className="
                                            rounded-xl
                                            bg-emerald-500/10
                                            border
                                            border-emerald-500/20
                                        "
                                        style={{
                                            padding:
                                                "11px",
                                        }}
                                    >
                                        <Train
                                            size={17}
                                            className="text-emerald-500"
                                        />

                                        <p
                                            className="
                                                text-[11px]
                                                text-[var(--on-surface-variant)]
                                            "
                                            style={{
                                                marginTop:
                                                    "5px",
                                            }}
                                        >
                                            Train Travel
                                        </p>

                                        <p
                                            className="
                                                text-sm
                                                font-bold
                                                text-[var(--on-surface)]
                                            "
                                        >
                                            -40% CO₂
                                        </p>
                                    </div>

                                    <div
                                        className="
                                            rounded-xl
                                            bg-emerald-500/10
                                            border
                                            border-emerald-500/20
                                        "
                                        style={{
                                            padding:
                                                "11px",
                                        }}
                                    >
                                        <Wind
                                            size={17}
                                            className="text-emerald-500"
                                        />

                                        <p
                                            className="
                                                text-[11px]
                                                text-[var(--on-surface-variant)]
                                            "
                                            style={{
                                                marginTop:
                                                    "5px",
                                            }}
                                        >
                                            Impact
                                        </p>

                                        <p
                                            className="
                                                text-sm
                                                font-bold
                                                text-[var(--on-surface)]
                                            "
                                        >
                                            Low
                                        </p>
                                    </div>
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
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-[var(--border)]
                                        text-xs
                                        font-bold
                                        text-[var(--on-surface)]
                                        hover:bg-[var(--pill-bg)]
                                    "
                                    style={{
                                        padding:
                                            "11px",
                                        marginTop:
                                            "14px",
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


                    {/* =================================================
                        ACTIVE TRIP
                    ================================================= */}

                    {activeTrip && (
                        <section
                            style={{
                                marginBottom:
                                    "32px",
                            }}
                        >
                            <div
                                className="
                                    rounded-3xl
                                    border
                                    border-[var(--border)]
                                    bg-[var(--card-bg)]
                                    shadow-lg
                                "
                                style={{
                                    padding:
                                        "24px",
                                }}
                            >
                                <div
                                    className="
                                        flex
                                        flex-col
                                        lg:flex-row
                                        lg:items-center
                                        justify-between
                                        gap-6
                                    "
                                >
                                    <div>
                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-[var(--primary)]
                                            "
                                        >
                                            <Clock
                                                size={15}
                                            />

                                            Active Trip
                                        </div>

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
                                            style={{
                                                marginTop:
                                                    "8px",
                                            }}
                                        >
                                            <MapPin
                                                size={26}
                                                className="text-[var(--primary)]"
                                            />

                                            {
                                                activeTrip.destination
                                            }
                                        </h2>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-4
                                                flex-wrap
                                                text-sm
                                                text-[var(--on-surface-variant)]
                                            "
                                            style={{
                                                marginTop:
                                                    "8px",
                                            }}
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <Calendar
                                                    size={15}
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
                                        </div>
                                    </div>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/itinerary/${activeTrip._id}`
                                            )
                                        }
                                        className="
                                            w-full
                                            lg:w-auto
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-2xl
                                            bg-gradient-to-r
                                            from-orange-500
                                            to-orange-600
                                            text-white
                                            font-bold
                                            text-sm
                                            shadow-md
                                            hover:scale-[1.02]
                                            transition-transform
                                        "
                                        style={{
                                            padding:
                                                "13px 22px",
                                        }}
                                    >
                                        Interactive Itinerary

                                        <ArrowRight
                                            size={16}
                                        />
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}


                    {/* =================================================
                        QUICK ACTIONS
                    ================================================= */}

                    <section>

                        <div
                            className="
                                flex
                                items-end
                                justify-between
                                gap-4
                                flex-wrap
                            "
                            style={{
                                marginBottom:
                                    "22px",
                            }}
                        >
                            <div>
                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-[var(--primary)]
                                    "
                                >
                                    Explore
                                </p>

                                <h2
                                    className="
                                        text-2xl
                                        sm:text-3xl
                                        font-bold
                                        text-[var(--on-surface)]
                                    "
                                >
                                    Centralized Trip Tools
                                </h2>
                            </div>

                            <p
                                className="
                                    text-sm
                                    text-[var(--on-surface-variant)]
                                "
                            >
                                Everything you need for your journey.
                            </p>
                        </div>


                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-5
                                gap-5
                            "
                        >
                            <ActionCard
                                icon={
                                    <PlusCircle
                                        size={27}
                                    />
                                }
                                title="New Trip"
                                description="Plan and organize a new destination."
                                onClick={() =>
                                    navigate(
                                        "/plan-trip"
                                    )
                                }
                            />

                            <ActionCard
                                icon={
                                    <CircleDollarSign
                                        size={27}
                                    />
                                }
                                title="Budget Calculator"
                                description="Track expenses and monitor spending."
                                onClick={() =>
                                    navigate(
                                        "/budget"
                                    )
                                }
                            />

                            <ActionCard
                                icon={
                                    <PlaneTakeoff
                                        size={27}
                                    />
                                }
                                title="My Trips"
                                description="Manage trips and track your progress."
                                onClick={() =>
                                    navigate(
                                        "/my-trips"
                                    )
                                }
                            />

                            <ActionCard
                                icon={
                                    <Backpack
                                        size={27}
                                    />
                                }
                                title="Packing Checklist"
                                description="Prepare everything you need before leaving."
                                onClick={() =>
                                    navigate(
                                        "/packing-list"
                                    )
                                }
                            />

                            <ActionCard
                                icon={
                                    <Sun
                                        size={27}
                                    />
                                }
                                title="Weather Forecast"
                                description="Check conditions and travel advisories."
                                onClick={() =>
                                    navigate(
                                        "/weather"
                                    )
                                }
                            />
                        </div>

                    </section>

                </div>
            </div>

        </Layout>
    );
}

export default Dashboard;