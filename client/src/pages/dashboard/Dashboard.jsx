import { useState, useEffect } from "react";
import {
    Search,
    PlusCircle,
    Wallet,
    PlaneTakeoff,
    Backpack,
    Sun,
    ArrowRight,
    Calendar,
    MapPin,
    CircleDollarSign,
    Clock,
    CheckCircle2,
    Map,
    Route,
    Users,
    Compass,
    ChevronRight,
    Loader2,
} from "lucide-react";

import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { getMyTrips } from "../../services/tripApi";
import "../css/Dashboard.css";

/* ============================================================
   API
============================================================ */

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

const SEARCH_API = `${API_URL}/places/search`;

function TripProgress({ trip }) {
    const steps = [
        {
            label: "Trip Created",
            completed: true,
            icon: <CheckCircle2 size={18} />,
        },
        {
            label: "Itinerary",
            completed: Boolean(
                trip?.itinerary?.length ||
                trip?.itinerary
            ),
            icon: <Route size={18} />,
        },
        {
            label: "Budget",
            completed: Boolean(trip?.budget),
            icon: <Wallet size={18} />,
        },
        {
            label: "Packing",
            completed: Boolean(
                trip?.packingList?.length
            ),
            icon: <Backpack size={18} />,
        },
        {
            label: "Ready",
            completed: false,
            icon: <PlaneTakeoff size={18} />,
        },
    ];

    return (
        <div
            className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card-bg)]
                shadow-lg
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
                    marginBottom: "24px",
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
                        Planning Progress
                    </p>

                    <h3
                        className="
                            text-xl
                            font-bold
                            text-[var(--on-surface)]
                        "
                        style={{
                            marginTop: "4px",
                        }}
                    >
                        Your trip journey
                    </h3>
                </div>

                <Compass
                    size={24}
                    className="text-[var(--primary)]"
                />
            </div>

            <div
                className="
                    flex
                    flex-col
                    gap-4
                "
            >
                {steps.map((step, index) => (
                    <div
                        key={step.label}
                        className="
                            flex
                            items-center
                            gap-4
                        "
                    >
                        <div
                            className={`
                                w-10
                                h-10
                                rounded-full
                                flex
                                items-center
                                justify-center
                                shrink-0
                                ${
                                    step.completed
                                        ? "bg-emerald-500/15 text-emerald-500"
                                        : "bg-[var(--input-bg)] text-[var(--on-surface-variant)]"
                                }
                            `}
                        >
                            {step.icon}
                        </div>

                        <div className="flex-1">
                            <p
                                className="
                                    text-sm
                                    font-bold
                                    text-[var(--on-surface)]
                                "
                            >
                                {step.label}
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-[var(--on-surface-variant)]
                                "
                                style={{
                                    marginTop: "2px",
                                }}
                            >
                                {step.completed
                                    ? "Completed"
                                    : "Not completed yet"}
                            </p>
                        </div>

                        {step.completed && (
                            <CheckCircle2
                                size={17}
                                className="text-emerald-500"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function TripSnapshot({ trip }) {
    if (!trip) return null;

    return (
        <div
            className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card-bg)]
                shadow-lg
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
                    marginBottom: "22px",
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
                        Trip Overview
                    </p>

                    <h3
                        className="
                            text-xl
                            font-bold
                            text-[var(--on-surface)]
                        "
                        style={{
                            marginTop: "4px",
                        }}
                    >
                        Trip Snapshot
                    </h3>
                </div>

                <Map
                    size={24}
                    className="text-[var(--primary)]"
                />
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-3
                "
            >
                <div
                    className="
                        rounded-2xl
                        bg-[var(--input-bg)]
                    "
                    style={{
                        padding: "14px",
                    }}
                >
                    <MapPin
                        size={18}
                        className="text-[var(--primary)]"
                    />

                    <p
                        className="
                            text-xs
                            text-[var(--on-surface-variant)]
                        "
                        style={{
                            marginTop: "8px",
                        }}
                    >
                        Destination
                    </p>

                    <p
                        className="
                            text-sm
                            font-bold
                            text-[var(--on-surface)]
                        "
                        style={{
                            marginTop: "3px",
                        }}
                    >
                        {trip.destination || "Not specified"}
                    </p>
                </div>

                <div
                    className="
                        rounded-2xl
                        bg-[var(--input-bg)]
                    "
                    style={{
                        padding: "14px",
                    }}
                >
                    <Calendar
                        size={18}
                        className="text-[var(--primary)]"
                    />

                    <p
                        className="
                            text-xs
                            text-[var(--on-surface-variant)]
                        "
                        style={{
                            marginTop: "8px",
                        }}
                    >
                        Duration
                    </p>

                    <p
                        className="
                            text-sm
                            font-bold
                            text-[var(--on-surface)]
                        "
                        style={{
                            marginTop: "3px",
                        }}
                    >
                        {trip.duration || 0} Days
                    </p>
                </div>

                <div
                    className="
                        rounded-2xl
                        bg-[var(--input-bg)]
                    "
                    style={{
                        padding: "14px",
                    }}
                >
                    <Users
                        size={18}
                        className="text-[var(--primary)]"
                    />

                    <p
                        className="
                            text-xs
                            text-[var(--on-surface-variant)]
                        "
                        style={{
                            marginTop: "8px",
                        }}
                    >
                        Travelers
                    </p>

                    <p
                        className="
                            text-sm
                            font-bold
                            text-[var(--on-surface)]
                        "
                        style={{
                            marginTop: "3px",
                        }}
                    >
                        {trip.travelers || 1}
                    </p>
                </div>

                <div
                    className="
                        rounded-2xl
                        bg-[var(--input-bg)]
                    "
                    style={{
                        padding: "14px",
                    }}
                >
                    <Wallet
                        size={18}
                        className="text-[var(--primary)]"
                    />

                    <p
                        className="
                            text-xs
                            text-[var(--on-surface-variant)]
                        "
                        style={{
                            marginTop: "8px",
                        }}
                    >
                        Budget
                    </p>

                    <p
                        className="
                            text-sm
                            font-bold
                            text-[var(--on-surface)]
                        "
                        style={{
                            marginTop: "3px",
                        }}
                    >
                        ₹
                        {Number(
                            trip.budget || 0
                        ).toLocaleString()}
                    </p>
                </div>
            </div>

            <div
                className="
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface-container-low)]
                "
                style={{
                    padding: "14px",
                    marginTop: "14px",
                }}
            >
                <div
                    className="
                        flex
                        items-center
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
                            Travel style
                        </p>

                        <p
                            className="
                                text-sm
                                font-bold
                                capitalize
                                text-[var(--on-surface)]
                            "
                            style={{
                                marginTop: "3px",
                            }}
                        >
                            {trip.travelStyle ||
                                "Not specified"}
                        </p>
                    </div>

                    <PlaneTakeoff
                        size={20}
                        className="text-[var(--primary)]"
                    />
                </div>
            </div>
        </div>
    );
}

function UpcomingActivities({ trip, navigate }) {
    const itinerary = Array.isArray(
        trip?.itinerary
    )
        ? trip.itinerary
        : [];

    const activities = itinerary.slice(0, 3);

    return (
        <div
            className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card-bg)]
                shadow-lg
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
                    marginBottom: "22px",
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
                        Your Journey
                    </p>

                    <h3
                        className="
                            text-xl
                            font-bold
                            text-[var(--on-surface)]
                        "
                        style={{
                            marginTop: "4px",
                        }}
                    >
                        Upcoming Activities
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            `/itinerary/${trip._id}`
                        )
                    }
                    className="
                        flex
                        items-center
                        gap-1
                        text-xs
                        font-bold
                        text-[var(--primary)]
                    "
                >
                    View all
                    <ChevronRight size={15} />
                </button>
            </div>

            {activities.length > 0 ? (
                <div className="space-y-3">
                    {activities.map(
                        (day, index) => (
                            <div
                                key={
                                    day._id ||
                                    day.id ||
                                    index
                                }
                                className="
                                    rounded-2xl
                                    bg-[var(--input-bg)]
                                    border
                                    border-[var(--border)]
                                "
                                style={{
                                    padding:
                                        "14px",
                                }}
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >
                                    <div
                                        className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-[var(--primary-container)]
                                            text-[var(--primary)]
                                            flex
                                            items-center
                                            justify-center
                                            shrink-0
                                        "
                                    >
                                        <Calendar
                                            size={
                                                18
                                            }
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <p
                                            className="
                                                text-sm
                                                font-bold
                                                text-[var(--on-surface)]
                                            "
                                        >
                                            {day.title ||
                                                `Day ${
                                                    index +
                                                    1
                                                }`}
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                text-[var(--on-surface-variant)]
                                            "
                                            style={{
                                                marginTop:
                                                    "3px",
                                            }}
                                        >
                                            {day.description ||
                                                day.date ||
                                                "Planned activity"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            ) : (
                <div
                    className="
                        rounded-2xl
                        bg-[var(--input-bg)]
                        text-center
                    "
                    style={{
                        padding: "30px 20px",
                    }}
                >
                    <Route
                        size={28}
                        className="
                            mx-auto
                            text-[var(--on-surface-variant)]
                        "
                    />

                    <p
                        className="
                            text-sm
                            font-bold
                            text-[var(--on-surface)]
                        "
                        style={{
                            marginTop: "10px",
                        }}
                    >
                        Your itinerary isn't ready yet
                    </p>

                    <p
                        className="
                            text-xs
                            text-[var(--on-surface-variant)]
                        "
                        style={{
                            marginTop: "5px",
                        }}
                    >
                        Start planning your daily activities.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/itinerary/${trip._id}`
                            )
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-[var(--primary)]
                            text-[var(--on-primary)]
                            text-xs
                            font-bold
                        "
                        style={{
                            padding:
                                "10px 14px",
                            marginTop: "14px",
                        }}
                    >
                        Build Itinerary
                        <ArrowRight size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}

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
   PLACE SEARCH SUGGESTION
============================================================ */

function PlaceSuggestion({
    place,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                w-full
                flex
                items-center
                gap-3
                text-left
                hover:bg-[var(--surface-container-high)]
                transition-colors
            "
            style={{
                padding: "12px 14px",
            }}
        >
            <div
                className="
                    shrink-0
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    bg-[var(--primary-container)]
                    text-[var(--primary)]
                "
                style={{
                    width: "36px",
                    height: "36px",
                }}
            >
                <MapPin size={17} />
            </div>

            <div className="min-w-0 flex-1">
                <p
                    className="
                        text-sm
                        font-bold
                        text-[var(--on-surface)]
                        truncate
                    "
                >
                    {place.name}
                </p>

                {(place.country || place.region) && (
                    <p
                        className="
                            text-xs
                            text-[var(--on-surface-variant)]
                            truncate
                        "
                        style={{
                            marginTop: "2px",
                        }}
                    >
                        {[
                            place.region,
                            place.country,
                        ]
                            .filter(Boolean)
                            .join(", ")}
                    </p>
                )}
            </div>

            <ChevronRight
                size={16}
                className="
                    shrink-0
                    text-[var(--on-surface-variant)]
                "
            />
        </button>
    );
}

/* ============================================================
   DASHBOARD
============================================================ */

function Dashboard() {
    const navigate = useNavigate();

    const [searchDest, setSearchDest] =
        useState("");

    const [suggestions, setSuggestions] =
        useState([]);

    const [searchLoading, setSearchLoading] =
        useState(false);

    const [showSuggestions, setShowSuggestions] =
        useState(false);

    const [user] = useState(() => {
        try {
            const storedUser =
                localStorage.getItem("user") ||
                sessionStorage.getItem("user");

            return storedUser
                ? JSON.parse(storedUser)
                : null;
        } catch {
            return null;
        }
    });

    const [trips, setTrips] = useState([]);

    const [loading, setLoading] =
        useState(true);

    /* ========================================================
       LOAD USER TRIPS
    ======================================================== */

    useEffect(() => {
        async function loadTrips() {
            try {
                const data =
                    await getMyTrips();

                if (data?.success) {
                    setTrips(
                        Array.isArray(data.trips)
                            ? data.trips
                            : []
                    );
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

    /* ========================================================
       ACTIVE / UPCOMING TRIP
    ======================================================== */

    const activeTrip =
        trips.length > 0
            ? trips[0]
            : null;

    /* ========================================================
       USER NAME
    ======================================================== */

    const firstName =
        user?.name?.split(" ")[0] ||
        user?.username?.split(" ")[0] ||
        "Traveler";

    /* ========================================================
       PLACE SEARCH
    ======================================================== */
        useEffect(() => {
            const query = searchDest.trim();

            if (query.length < 2) {
                setSuggestions([]);
                setSearchLoading(false);
                return;
            }

            const controller = new AbortController();

            const timer = setTimeout(async () => {
                try {
                    setSearchLoading(true);

                    const token =
                        localStorage.getItem("token") ||
                        sessionStorage.getItem("token");

                    const headers = {
                        Accept: "application/json",
                    };

                    if (token) {
                        headers.Authorization = `Bearer ${token}`;
                    }

                    const response = await fetch(
                        `${SEARCH_API}?q=${encodeURIComponent(query)}`,
                        {
                            method: "GET",
                            headers,
                            credentials: "include",
                            signal: controller.signal,
                        }
                    );

                    if (!response.ok) {
                        throw new Error(
                            `Place search failed: ${response.status}`
                        );
                    }

                    const data = await response.json();

                    console.log("Place search response:", data);

                    const places =
                        Array.isArray(data)
                            ? data
                            : Array.isArray(data?.places)
                            ? data.places
                            : Array.isArray(data?.results)
                            ? data.results
                            : Array.isArray(data?.data)
                            ? data.data
                            : Array.isArray(data?.data?.places)
                            ? data.data.places
                            : [];

                    setSuggestions(places);
                } catch (error) {
                    if (error.name !== "AbortError") {
                        console.error(
                            "Place search error:",
                            error
                        );

                        setSuggestions([]);
                    }
                } finally {
                    setSearchLoading(false);
                }
            }, 300);

            return () => {
                clearTimeout(timer);
                controller.abort();
            };
        }, [searchDest]);

    /* ========================================================
       SEARCH SUBMIT
    ======================================================== */

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const destination =
            searchDest.trim();

        if (!destination) {
            navigate("/plan-trip");
            return;
        }

        navigate(
            `/plan-trip?destination=${encodeURIComponent(
                destination
            )}`
        );

        setShowSuggestions(false);
    };

    /* ========================================================
       SELECT SEARCH SUGGESTION
    ======================================================== */

    const handleSelectSuggestion =
        (place) => {
            const destination =
                place.name || "";

            setSearchDest(destination);
            setShowSuggestions(false);

            navigate(
                `/plan-trip?destination=${encodeURIComponent(
                    destination
                )}`
            );
        };

    /* ========================================================
       TRIP VALUES
    ======================================================== */

    const tripDays =
        activeTrip?.duration ??
        activeTrip?.days ??
        0;

    const travelers =
        activeTrip?.travelers ?? 0;

    const budget =
        Number(activeTrip?.budget || 0);

    const travelStyle =
        activeTrip?.travelStyle ||
        "Not specified";

    /* ========================================================
       TRIP PROGRESS

       If backend provides progress fields, use them.
       Otherwise show a neutral value rather than fake data.
    ======================================================== */

    const tripProgress =
        typeof activeTrip?.progress === "number"
            ? Math.min(
                  Math.max(
                      activeTrip.progress,
                      0
                  ),
                  100
              )
            : typeof activeTrip?.completionPercentage ===
              "number"
            ? Math.min(
                  Math.max(
                      activeTrip.completionPercentage,
                      0
                  ),
                  100
              )
            : 0;

    /* ========================================================
       RENDER
    ======================================================== */

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
                    KEPT AS-IS
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

                        <div
                            className="
                                relative
                                w-full
                                max-w-3xl
                            "
                        >
                            <form
                                onSubmit={
                                    handleSearchSubmit
                                }
                                className="
                                    w-full
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
                                        value={
                                            searchDest
                                        }
                                        onFocus={() =>
                                            setShowSuggestions(
                                                true
                                            )
                                        }
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
                                        bg-[var(--primary)]
                                        hover:bg-[var(--primary-hover)]
                                        text-[var(--on-primary)]
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

                            {/* Search Suggestions */}

                            {showSuggestions &&
                                searchDest.trim()
                                    .length >= 2 && (
                                    <div
                                        className="
                                            absolute
                                            top-full
                                            left-0
                                            right-0
                                            z-50
                                            mt-2
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-[var(--border)]
                                            bg-[var(--card-bg)]
                                            shadow-2xl
                                            text-left
                                        "
                                    >
                                        {searchLoading && (
                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    text-[var(--on-surface-variant)]
                                                "
                                                style={{
                                                    padding:
                                                        "16px",
                                                }}
                                            >
                                                <Loader2
                                                    size={
                                                        17
                                                    }
                                                    className="animate-spin"
                                                />

                                                Searching
                                                places...
                                            </div>
                                        )}

                                        {!searchLoading &&
                                            suggestions.length >
                                                0 &&
                                            suggestions.map(
                                                (
                                                    place,
                                                    index
                                                ) => (
                                                    <PlaceSuggestion
                                                        key={
                                                            place.id ||
                                                            place._id ||
                                                            `${place.name}-${index}`
                                                        }
                                                        place={
                                                            place
                                                        }
                                                        onClick={() =>
                                                            handleSelectSuggestion(
                                                                place
                                                            )
                                                        }
                                                    />
                                                )
                                            )}

                                        {!searchLoading &&
                                            suggestions.length ===
                                                0 && (
                                                <div
                                                    className="
                                                        text-sm
                                                        text-[var(--on-surface-variant)]
                                                    "
                                                    style={{
                                                        padding:
                                                            "16px",
                                                    }}
                                                >
                                                    No destinations
                                                    found.
                                                </div>
                                            )}
                                    </div>
                                )}
                        </div>
                    </div>
                </section>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div
                    className="
                        w-full
                        
                        mx-auto
                        justify-center
                    "
                    style={{
                        padding:
                            "0 24px 70px",
                    }}
                >

                    {/* =================================================
                        NO TRIP
                    ================================================= */}

                    {!loading &&
                        !activeTrip && (
                            <section
                                style={{
                                    marginTop:
                                        "32px",
                                    marginBottom:
                                        "40px",
                                }}
                            >
                                <div
                                    className="
                                        rounded-3xl
                                        border
                                        border-[var(--border)]
                                        bg-[var(--card-bg)]
                                        shadow-lg
                                        text-center
                                    "
                                    style={{
                                        padding:
                                            "50px 30px",
                                    }}
                                >
                                    <div
                                        className="
                                            mx-auto
                                            flex
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[var(--primary-container)]
                                            text-[var(--primary)]
                                        "
                                        style={{
                                            width:
                                                "64px",
                                            height:
                                                "64px",
                                            marginBottom:
                                                "18px",
                                        }}
                                    >
                                        <Compass
                                            size={30}
                                        />
                                    </div>

                                    <h2
                                        className="
                                            text-2xl
                                            font-extrabold
                                            text-[var(--on-surface)]
                                        "
                                    >
                                        Your next adventure
                                        starts here
                                    </h2>

                                    <p
                                        className="
                                            max-w-lg
                                            mx-auto
                                            text-sm
                                            text-[var(--on-surface-variant)]
                                        "
                                        style={{
                                            marginTop:
                                                "8px",
                                            marginBottom:
                                                "22px",
                                        }}
                                    >
                                        You don't have an
                                        active trip yet.
                                        Search for a
                                        destination or
                                        create your first
                                        trip.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                "/plan-trip"
                                            )
                                        }
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            bg-[var(--primary)]
                                            text-[var(--on-primary)]
                                            font-bold
                                            text-sm
                                            hover:bg-[var(--primary-hover)]
                                        "
                                        style={{
                                            padding:
                                                "12px 18px",
                                        }}
                                    >
                                        <PlusCircle
                                            size={17}
                                        />

                                        Create New Trip
                                    </button>
                                </div>
                            </section>
                        )}


                    {/* =================================================
                        ACTIVE TRIP
                    ================================================= */}

                    {activeTrip && (
    <section
        style={{
            marginBottom: "32px",
        }}
    >
        {/* Active Trip Header */}
        <div
            className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card-bg)]
                shadow-lg
            "
            style={{
                padding: "28px",
                marginBottom: "20px",
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
                        <Clock size={15} />

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
                            marginTop: "8px",
                        }}
                    >
                        <MapPin
                            size={27}
                            className="text-[var(--primary)]"
                        />

                        {activeTrip.destination}
                    </h2>

                    <p
                        className="
                            text-sm
                            text-[var(--on-surface-variant)]
                        "
                        style={{
                            marginTop: "8px",
                        }}
                    >
                        Your current travel plan and
                        everything you need for your journey.
                    </p>
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
                        bg-[var(--primary)]
                        text-[var(--on-primary)]
                        font-bold
                        text-sm
                        shadow-md
                        hover:opacity-90
                        transition
                    "
                    style={{
                        padding: "13px 22px",
                    }}
                >
                    Open Trip

                    <ArrowRight size={16} />
                </button>
            </div>
        </div>

        {/* Trip Information */}
        <div
    className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-6
        items-start
"
>
    <div className="lg:col-span-5">
        <TripSnapshot trip={activeTrip} />
    </div>

    <div className="lg:col-span-3">
        <TripProgress trip={activeTrip} />
    </div>

    <div className="lg:col-span-4">
        <UpcomingActivities
            trip={activeTrip}
            navigate={navigate}
        />
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
                                Everything you need for
                                your journey.
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
                                description="Track expenses and manage your trip budget."
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
                                description="Manage all your trips and travel plans."
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