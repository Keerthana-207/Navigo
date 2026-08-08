import { useEffect, useState } from "react";
import {
    Plus,
    MapPin,
    CalendarDays,
    MoreHorizontal,
    Plane,
    CheckCircle2,
    Clock3,
    WalletCards,
    ArrowRight,
    TrainFront,
    Car,
} from "lucide-react";

import Layout from "../../components/Layout/Layout";
import { getMyTrips } from "../../services/tripApi";

function MyTrips() {
    const [trips, setTrips] = useState([]);
    const [filter, setFilter] = useState("all");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyTrips();

                if (data.success) {
                    setTrips(data.trips || []);
                } else {
                    setError(data.message || "Failed to fetch trips.");
                }
            } catch (err) {
                console.error("Fetch Trips Error:", err);

                setError(
                    err.message ||
                    "Unable to load your trips. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const getTripStatus = (trip) => {
        /*
         * Your current Trip model does not have startDate/endDate.
         * Therefore, until you add dates to the model, all newly
         * created trips will be considered upcoming.
         */
        return "upcoming";
    };

    const tripsWithStatus = trips.map((trip) => ({
        ...trip,
        status: getTripStatus(trip),
    }));

    const filteredTrips =
        filter === "all"
            ? tripsWithStatus
            : tripsWithStatus.filter(
                  (trip) => trip.status === filter
              );

    const upcomingCount = tripsWithStatus.filter(
        (trip) => trip.status === "upcoming"
    ).length;

    const completedCount = tripsWithStatus.filter(
        (trip) => trip.status === "completed"
    ).length;

    return (
        <Layout>
            <div
                style={{
                    minHeight: "100vh",
                    background: "var(--bg)",
                    color: "var(--text-primary)",
                    fontFamily:
                        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    padding:
                        "var(--section-padding-y) var(--section-padding-x)",
                    transition:
                        "background 0.35s ease, color 0.35s ease",
                }}
            >
                <div
                    className="mx-auto w-full"
                    style={{
                        maxWidth: "var(--container-width)",
                    }}
                >
                    {/* Header */}
                    <header
                        className="
                            flex
                            flex-col
                            gap-6
                            md:flex-row
                            md:items-center
                            md:justify-between
                        "
                        style={{
                            marginBottom: "40px",
                        }}
                    >
                        <div>
                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                "
                                style={{
                                    color: "var(--primary)",
                                    marginBottom: "8px",
                                }}
                            >
                                Your journeys
                            </p>

                            <h1
                                className="
                                    text-4xl
                                    font-bold
                                    md:text-5xl
                                "
                                style={{
                                    color: "var(--text-primary)",
                                    marginBottom: "10px",
                                }}
                            >
                                My Trips
                            </h1>

                            <p
                                className="text-sm md:text-base"
                                style={{
                                    color:
                                        "var(--text-secondary-plan)",
                                }}
                            >
                                Plan, track and relive your travel
                                experiences.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                (window.location.href = "/plan-trip")
                            }
                            className="
                                btn-primary
                                flex
                                w-fit
                                items-center
                                gap-2
                                rounded-full
                                font-semibold
                                text-sm
                                transition-transform
                                hover:-translate-y-0.5
                            "
                            style={{
                                padding: "12px 20px",
                            }}
                        >
                            <Plus size={18} />
                            Plan New Trip
                        </button>
                    </header>

                    {/* Stats */}
                    <section
                        className="
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-3
                        "
                        style={{
                            marginBottom: "40px",
                        }}
                    >
                        <StatCard
                            icon={Plane}
                            label="Total Trips"
                            value={trips.length}
                        />

                        <StatCard
                            icon={Clock3}
                            label="Upcoming"
                            value={upcomingCount}
                        />

                        <StatCard
                            icon={CheckCircle2}
                            label="Completed"
                            value={completedCount}
                        />
                    </section>

                    {/* Filters */}
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-4
                        "
                        style={{
                            marginBottom: "24px",
                        }}
                    >
                        <div
                            className="
                                flex
                                items-center
                                gap-1
                                rounded-full
                            "
                            style={{
                                background:
                                    "var(--pill-bg)",
                                border:
                                    "1px solid var(--pill-border)",
                                padding: "4px",
                            }}
                        >
                            {[
                                "all",
                                "upcoming",
                                "completed",
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        setFilter(item)
                                    }
                                    className="
                                        rounded-full
                                        text-xs
                                        font-semibold
                                        capitalize
                                        transition-all
                                    "
                                    style={{
                                        padding: "8px 16px",
                                        background:
                                            filter === item
                                                ? "var(--primary)"
                                                : "transparent",
                                        color:
                                            filter === item
                                                ? "#fff"
                                                : "var(--pill-text)",
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <span
                            className="text-xs"
                            style={{
                                color: "var(--text-muted)",
                            }}
                        >
                            {filteredTrips.length} trip
                            {filteredTrips.length !== 1
                                ? "s"
                                : ""}
                        </span>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div
                            className="
                                flex
                                min-h-[300px]
                                items-center
                                justify-center
                            "
                        >
                            <p
                                className="text-sm"
                                style={{
                                    color:
                                        "var(--text-secondary-plan)",
                                }}
                            >
                                Loading your trips...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div
                            className="rounded-2xl border"
                            style={{
                                padding: "20px",
                                borderColor:
                                    "rgba(239,68,68,0.25)",
                                background:
                                    "rgba(239,68,68,0.08)",
                                color: "#ef4444",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading &&
                        !error &&
                        trips.length === 0 && (
                            <EmptyTrips />
                        )}

                    {/* Trip Grid */}
                    {!loading &&
                        !error &&
                        filteredTrips.length > 0 && (
                            <section
                                className="
                                    grid
                                    grid-cols-1
                                    gap-6
                                    md:grid-cols-2
                                    xl:grid-cols-3
                                "
                            >
                                {filteredTrips.map((trip) => (
                                    <TripCard
                                        key={trip._id}
                                        trip={trip}
                                    />
                                ))}

                                {/* Create Trip Card */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        (window.location.href =
                                            "/plan-trip")
                                    }
                                    className="
                                        group
                                        flex
                                        min-h-[420px]
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-[22px]
                                        border
                                        border-dashed
                                        text-center
                                        transition-all
                                        hover:-translate-y-1
                                    "
                                    style={{
                                        borderColor:
                                            "var(--card-border)",
                                        background:
                                            "var(--card-bg)",
                                        padding: "32px",
                                    }}
                                >
                                    <div
                                        className="
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-full
                                            transition-transform
                                            group-hover:scale-110
                                        "
                                        style={{
                                            background:
                                                "var(--primary-container)",
                                            color:
                                                "var(--primary)",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        <Plus size={24} />
                                    </div>

                                    <h3
                                        className="
                                            text-lg
                                            font-semibold
                                        "
                                        style={{
                                            color:
                                                "var(--text-primary)",
                                            marginBottom: "6px",
                                        }}
                                    >
                                        Create a new trip
                                    </h3>

                                    <p
                                        className="
                                            max-w-[220px]
                                            text-xs
                                            leading-5
                                        "
                                        style={{
                                            color:
                                                "var(--text-secondary-plan)",
                                        }}
                                    >
                                        Start planning your next
                                        adventure.
                                    </p>
                                </button>
                            </section>
                        )}
                </div>
            </div>
        </Layout>
    );
}

/* -------------------------------------------------- */
/* Stat Card */
/* -------------------------------------------------- */

function StatCard({ icon: Icon, label, value }) {
    return (
        <div
            className="glass-card rounded-[22px]"
            style={{
                padding: "20px",
            }}
        >
            <div className="flex items-center gap-4">
                <div
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                    "
                    style={{
                        background:
                            "var(--primary-container)",
                        color: "var(--primary)",
                    }}
                >
                    <Icon size={20} />
                </div>

                <div>
                    <p
                        className="
                            text-xs
                            uppercase
                            tracking-wide
                        "
                        style={{
                            color:
                                "var(--text-secondary-plan)",
                            marginBottom: "3px",
                        }}
                    >
                        {label}
                    </p>

                    <p
                        className="text-2xl font-bold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------- */
/* Trip Card */
/* -------------------------------------------------- */

function TripCard({ trip }) {
    const status = trip.status || "upcoming";
    const isCompleted = status === "completed";

    const getTransportIcon = () => {
        switch (trip.transport) {
            case "train":
                return <TrainFront size={16} />;

            case "car":
                return <Car size={16} />;

            default:
                return <Plane size={16} />;
        }
    };

    const formattedBudget =
        trip.budget !== null &&
        trip.budget !== undefined
            ? `₹${Number(trip.budget).toLocaleString("en-IN")}`
            : "Not specified";

    return (
        <article className="glass-card overflow-hidden rounded-[22px]">
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <div
                    className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        bg-gradient-to-br
                        from-orange-400
                        to-orange-600
                    "
                >
                    <MapPin
                        size={52}
                        className="text-white/80"
                    />
                </div>

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/70
                        via-black/10
                        to-transparent
                    "
                />

                {/* Status */}
                <span
                    className={
                        isCompleted
                            ? "status-chip-completed"
                            : "status-chip-upcoming"
                    }
                    style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        fontSize: "10px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                    }}
                >
                    {status}
                </span>

                <button
                    type="button"
                    className="
                        absolute
                        right-3
                        top-3
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-black/40
                        text-white
                        backdrop-blur-md
                        transition-colors
                        hover:bg-black/70
                    "
                >
                    <MoreHorizontal size={18} />
                </button>

                <div
                    className="
                        absolute
                        bottom-4
                        left-4
                        right-4
                    "
                >
                    <h2 className="text-xl font-bold text-white">
                        {trip.destination}
                    </h2>

                    <div
                        className="
                            mt-1
                            flex
                            items-center
                            gap-1
                            text-xs
                            text-white/80
                        "
                    >
                        <MapPin size={13} />
                        {trip.destination}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div
                style={{
                    padding: "20px",
                }}
            >
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                    style={{
                        marginBottom: "18px",
                    }}
                >
                    {/* Duration */}
                    <div className="flex items-center gap-2">
                        <CalendarDays
                            size={16}
                            style={{
                                color: "var(--primary)",
                            }}
                        />

                        <div>
                            <p
                                className="
                                    text-xs
                                    font-semibold
                                "
                                style={{
                                    color:
                                        "var(--text-primary)",
                                }}
                            >
                                {trip.duration} days
                            </p>

                            <p
                                className="text-[10px]"
                                style={{
                                    color:
                                        "var(--text-muted)",
                                }}
                            >
                                {trip.travelers}{" "}
                                {trip.travelers === 1
                                    ? "traveler"
                                    : "travelers"}
                            </p>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="flex items-center gap-2">
                        <WalletCards
                            size={16}
                            style={{
                                color: "var(--tertiary)",
                            }}
                        />

                        <div>
                            <p
                                className="
                                    text-xs
                                    font-semibold
                                "
                                style={{
                                    color:
                                        "var(--text-primary)",
                                }}
                            >
                                {formattedBudget}
                            </p>

                            <p
                                className="text-[10px]"
                                style={{
                                    color:
                                        "var(--text-muted)",
                                }}
                            >
                                Budget
                            </p>
                        </div>
                    </div>
                </div>

                {/* Travel details */}
                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    "
                    style={{
                        marginBottom: "18px",
                    }}
                >
                    <span
                        className="
                            flex
                            items-center
                            gap-1
                            rounded-full
                            text-[10px]
                            font-semibold
                        "
                        style={{
                            padding: "6px 9px",
                            background:
                                "var(--pill-bg)",
                            color:
                                "var(--pill-text)",
                        }}
                    >
                        {getTransportIcon()}
                        {trip.transport}
                    </span>

                    <span
                        className="
                            rounded-full
                            text-[10px]
                            font-semibold
                        "
                        style={{
                            padding: "6px 9px",
                            background:
                                "var(--pill-bg)",
                            color:
                                "var(--pill-text)",
                        }}
                    >
                        {trip.travelStyle}
                    </span>

                    <span
                        className="
                            rounded-full
                            text-[10px]
                            font-semibold
                        "
                        style={{
                            padding: "6px 9px",
                            background:
                                "var(--pill-bg)",
                            color:
                                "var(--pill-text)",
                        }}
                    >
                        {trip.accommodation}
                    </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end">
                    <button
                        type="button"
                        onClick={() =>
                            (window.location.href =
                                `/itinerary/${trip._id}`)
                        }
                        className="
                            flex
                            items-center
                            gap-1
                            text-xs
                            font-semibold
                            transition-all
                            hover:gap-2
                        "
                        style={{
                            color: "var(--primary)",
                        }}
                    >
                        View Trip
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </article>
    );
}

/* -------------------------------------------------- */
/* Empty State */
/* -------------------------------------------------- */

function EmptyTrips() {
    return (
        <div
            className="
                flex
                min-h-[350px]
                flex-col
                items-center
                justify-center
                rounded-[22px]
                border
                border-dashed
                text-center
            "
            style={{
                borderColor: "var(--card-border)",
                background: "var(--card-bg)",
                padding: "40px",
            }}
        >
            <div
                className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                "
                style={{
                    background:
                        "var(--primary-container)",
                    color: "var(--primary)",
                    marginBottom: "18px",
                }}
            >
                <Plane size={28} />
            </div>

            <h2
                className="text-xl font-bold"
                style={{
                    color: "var(--text-primary)",
                    marginBottom: "8px",
                }}
            >
                No trips yet
            </h2>

            <p
                className="text-sm"
                style={{
                    color:
                        "var(--text-secondary-plan)",
                    marginBottom: "20px",
                }}
            >
                Start planning your first adventure.
            </p>

            <button
                type="button"
                onClick={() =>
                    (window.location.href = "/plan-trip")
                }
                className="
                    btn-primary
                    flex
                    items-center
                    gap-2
                    rounded-full
                    font-semibold
                "
                style={{
                    padding: "11px 18px",
                }}
            >
                <Plus size={17} />
                Plan a Trip
            </button>
        </div>
    );
}

export default MyTrips;