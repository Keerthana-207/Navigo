import { useEffect, useState } from "react";
import {
    Plus,
    MapPin,
    CalendarDays,
    Plane,
    CheckCircle2,
    Clock3,
    WalletCards,
    ArrowRight,
    TrainFront,
    Car,
    TrashIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import { getMyTrips, deleteTrip } from "../../services/tripApi";

function MyTrips() {
    const navigate = useNavigate();
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
                    setError(
                        data.message || "Failed to fetch trips."
                    );
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

    const handleDeleteTrip = async (tripId) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this trip?"
            )
        ) {
            return;
        }

        try {
            await deleteTrip(tripId);

            setTrips((prev) =>
                prev.filter((t) => t._id !== tripId)
            );
        } catch (err) {
            alert(err.message || "Failed to delete trip");
        }
    };

    const getTripStatus = (trip) => {
        if (trip.status) return trip.status;

        if (trip.startDate && trip.endDate) {
            const now = new Date();
            const start = new Date(trip.startDate);
            const end = new Date(trip.endDate);

            if (now < start) return "upcoming";
            if (now >= start && now <= end) return "active";
            if (now > end) return "completed";
        }

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
                    background: "var(--background)",
                    color: "var(--text-primary)",
                    fontFamily:
                        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

                    padding:
                        "40px",

                    transition:
                        "background 0.35s ease, color 0.35s ease",
                }}
            >
                <div
                    className="mx-auto w-full"
                    style={{
                        maxWidth: "var(--container-width)",
                        padding: "10px 0 60px 0",
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
                            marginBottom: "48px",
                        }}
                    >
                        <div
                            style={{
                                padding: "4px 0",
                            }}
                        >
                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                "
                                style={{
                                    color: "var(--primary)",
                                    marginBottom: "12px",
                                }}
                            >
                                Your journeys
                            </p>

                            <h1
                                className="
                                    text-4xl
                                    font-bold
                                    md:text-6xl
                                "
                                style={{
                                    color: "var(--text-primary)",
                                    marginBottom: "14px",
                                    lineHeight: "1.1",
                                }}
                            >
                                My Trips
                            </h1>

                            <p
                                className="text-base md:text-lg"
                                style={{
                                    color:
                                        "var(--text-secondary-plan)",
                                    margin: "0",
                                    lineHeight: "1.7",
                                }}
                            >
                                Plan, track and relive your travel
                                experiences.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate('/plan-trip')
                            }
                            className="
                                btn-primary
                                flex
                                w-fit
                                items-center
                                gap-2
                                rounded-full
                                font-bold
                                text-white
                                text-sm
                                transition-transform
                                hover:-translate-y-0.5
                                cursor: pointer;
                            "
                            style={{
                                padding: "14px 24px",
                                fontSize: "15px",
                                marginTop: "8px",
                                background: "var(--primary)"
                            }}
                        >
                            <Plus size={19} />
                            Plan New Trip
                        </button>
                    </header>

                    {/* Stats */}
                    <section
                        className="
                            grid
                            grid-cols-1
                            gap-5
                            sm:grid-cols-3
                        "
                        style={{
                            marginBottom: "48px",
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
                            gap-5
                        "
                        style={{
                            marginBottom: "30px",
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
                                padding: "5px",
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
                                        text-sm
                                        font-semibold
                                        capitalize
                                        transition-all
                                    "
                                    style={{
                                        padding:
                                            "9px 18px",
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
                            className="text-sm"
                            style={{
                                color: "var(--text-muted)",
                                marginRight: "4px",
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
                            style={{
                                padding: "50px 20px",
                            }}
                        >
                            <p
                                className="text-base"
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
                                padding: "24px",
                                marginBottom: "30px",
                                borderColor:
                                    "rgba(239,68,68,0.25)",
                                background:
                                    "rgba(239,68,68,0.08)",
                                color: "#ef4444",
                                fontSize: "15px",
                                lineHeight: "1.6",
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
                                    gap-7
                                    md:grid-cols-2
                                    xl:grid-cols-3
                                "
                            >
                                {filteredTrips.map((trip) => (
                                    <TripCard
                                        key={trip._id}
                                        trip={trip}
                                        onDelete={handleDeleteTrip}
                                    />
                                ))}

                                {/* Create Trip Card */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate('/plan-trip')
                                    }
                                    className="
                                        group
                                        flex
                                        min-h-[440px]
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
                                            transition-transform
                                            group-hover:scale-110
                                        "
                                        style={{
                                            background:
                                                "var(--primary-container)",
                                            color:
                                                "var(--primary)",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <Plus size={27} />
                                    </div>

                                    <h3
                                        className="
                                            text-xl
                                            font-semibold
                                        "
                                        style={{
                                            color:
                                                "var(--text-primary)",
                                            marginBottom: "9px",
                                        }}
                                    >
                                        Create a new trip
                                    </h3>

                                    <p
                                        className="
                                            max-w-[250px]
                                            text-sm
                                            leading-6
                                        "
                                        style={{
                                            color:
                                                "var(--text-secondary-plan)",
                                            margin: "0",
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
                padding: "24px",
                minHeight: "120px",
            }}
        >
            <div
                className="flex items-center"
                style={{
                    gap: "16px",
                }}
            >
                <div
                    className="
                        flex
                        h-12
                        w-12
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
                    <Icon size={22} />
                </div>

                <div>
                    <p
                        className="
                            text-sm
                            uppercase
                            tracking-wide
                        "
                        style={{
                            color:
                                "var(--text-secondary-plan)",
                            marginBottom: "5px",
                        }}
                    >
                        {label}
                    </p>

                    <p
                        className="text-3xl font-bold"
                        style={{
                            color: "var(--text-primary)",
                            lineHeight: "1",
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

function TripCard({ trip, onDelete }) {
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
            ? `₹${Number(trip.budget).toLocaleString(
                  "en-IN"
              )}`
            : "Not specified";

    return (
        <article
            className="
                glass-card
                overflow-hidden
                rounded-[22px]
                transition-all
                hover:-translate-y-1
            "
        >
            {/* Image */}
            <div
                className="relative h-56 overflow-hidden"
            >
                <div
                    className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        bg-gradient-to-br
                        from-[#3a1f45]
                        via-[#7a3b3b]
                        to-[#f2a950]
                    "
                >
                    <MapPin
                        size={56}
                        className="text-white/80"
                    />
                </div>

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/75
                        via-black/15
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
                        padding: "7px 12px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                    }}
                >
                    {status}
                </span>

                <button
                    type="button"
                    onClick={() => {
                        if (onDelete) {
                            onDelete(trip._id);
                        }
                    }}
                    className="
                        absolute
                        right-3
                        top-3
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-black/40
                        text-white
                        backdrop-blur-md
                        transition-colors
                        hover:bg-black/70
                    "
                    aria-label="Trip options"
                >
                    <TrashIcon size={19} />
                </button>

                <div
                    className="
                        absolute
                        bottom-5
                        left-5
                        right-5
                    "
                >
                    <h2
                        className="text-2xl font-bold text-white"
                        style={{
                            marginBottom: "6px",
                            lineHeight: "1.2",
                        }}
                    >
                        {trip.destination}
                    </h2>

                    <div
                        className="
                            flex
                            items-center
                            gap-1
                            text-sm
                            text-white/80
                        "
                    >
                        <MapPin size={14} />
                        {trip.destination}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div
                style={{
                    padding: "24px",
                }}
            >
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-5
                    "
                    style={{
                        marginBottom: "22px",
                    }}
                >
                    {/* Duration */}
                    <div
                        className="flex items-center"
                        style={{
                            gap: "10px",
                        }}
                    >
                        <CalendarDays
                            size={19}
                            style={{
                                color: "var(--primary)",
                            }}
                        />

                        <div>
                            <p
                                className="
                                    text-sm
                                    font-semibold
                                "
                                style={{
                                    color:
                                        "var(--text-primary)",
                                    marginBottom: "4px",
                                }}
                            >
                                {trip.duration} days
                            </p>

                            <p
                                className="text-xs"
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
                    <div
                        className="flex items-center"
                        style={{
                            gap: "10px",
                        }}
                    >
                        <WalletCards
                            size={19}
                            style={{
                                color: "var(--tertiary)",
                            }}
                        />

                        <div>
                            <p
                                className="
                                    text-sm
                                    font-semibold
                                "
                                style={{
                                    color:
                                        "var(--text-primary)",
                                    marginBottom: "4px",
                                }}
                            >
                                {formattedBudget}
                            </p>

                            <p
                                className="text-xs"
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
                        marginBottom: "24px",
                    }}
                >
                    <span
                        className="
                            flex
                            items-center
                            gap-1
                            rounded-full
                            text-xs
                            font-semibold
                        "
                        style={{
                            padding: "7px 11px",
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
                            text-xs
                            font-semibold
                        "
                        style={{
                            padding: "7px 11px",
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
                            text-xs
                            font-semibold
                        "
                        style={{
                            padding: "7px 11px",
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
                <div
                    className="flex items-center justify-end"
                    style={{
                        paddingTop: "4px",
                    }}
                >
                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/itinerary/${trip._id}`)
                        }
                        className="
                            flex
                            items-center
                            gap-1
                            text-sm
                            font-semibold
                            transition-all
                            hover:gap-2
                        "
                        style={{
                            color: "var(--primary)",
                            padding: "5px 0",
                        }}
                    >
                        View Trip
                        <ArrowRight size={16} />
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
                min-h-[380px]
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
                padding: "50px 30px",
                marginTop: "10px",
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
                    marginBottom: "22px",
                }}
            >
                <Plane size={28} />
            </div>

            <h2
                className="text-2xl font-bold"
                style={{
                    color: "var(--text-primary)",
                    marginBottom: "10px",
                }}
            >
                No trips yet
            </h2>

            <p
                className="text-base"
                style={{
                    color:
                        "var(--text-secondary-plan)",
                    marginBottom: "24px",
                    lineHeight: "1.7",
                }}
            >
                Start planning your first adventure.
            </p>

            <button
                type="button"
                onClick={() =>
                    (window.location.href =
                        "/plan-trip")
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
                    padding: "13px 21px",
                    fontSize: "15px",
                }}
            >
                <Plus size={18} />
                Plan a Trip
            </button>
        </div>
    );
}

export default MyTrips;
