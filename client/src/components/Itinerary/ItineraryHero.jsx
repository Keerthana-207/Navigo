import { fmtMoney } from "../../utils/itinerary";

function ItineraryHero({ trip, places }) {
    const totalCount = places.length;

    const visitedCount = places.filter(
        (place) => place.status === "visited"
    ).length;

    const percentage = totalCount
        ? (visitedCount / totalCount) * 100
        : 0;

    return (
        <section
            className="
                rounded-3xl
                border
                border-[var(--border)]
                flex
                items-center
                justify-between
                flex-wrap
            "
            style={{
                padding: "34px 40px",
                gap: "20px",
                background: `
                    radial-gradient(
                        circle at 15% 20%,
                        var(--bg-hero-1),
                        transparent 55%
                    ),
                    radial-gradient(
                        circle at 85% 100%,
                        var(--bg-hero-2),
                        transparent 55%
                    ),
                    var(--surface)
                `,
                boxShadow: "var(--shadow)"
            }}
        >
            {/* Trip Information */}
            <div
                style={{
                    minWidth: "220px",
                    flex: "1 1 300px"
                }}
            >
                <h1
                    className="
                        text-[38px]
                        max-[640px]:text-[28px]
                        font-extrabold
                        text-[var(--text)]
                    "
                    style={{
                        margin: "0 0 10px 0"
                    }}
                >
                    {trip.name}
                </h1>

                <div
                    className="
                        flex
                        flex-wrap
                        text-[var(--text-dim)]
                        text-sm
                    "
                    style={{
                        gap: "18px"
                    }}
                >
                    <span>
                        📅 {trip.days} Days
                    </span>

                    <span>
                        👥 {trip.travelers} Travelers
                    </span>

                    <span>
                        💳 Budget{" "}
                        {fmtMoney(trip.budget)}
                    </span>
                </div>
            </div>


            {/* Progress */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "280px",
                    minWidth: "230px",
                    flex: "0 1 280px"
                }}
            >
                <div
                    className="
                        text-sm
                        text-[var(--text-dim)]
                        text-right
                    "
                    style={{
                        marginBottom: "10px"
                    }}
                >
                    <b
                        className="
                            text-[var(--text)]
                            text-[17px]
                        "
                    >
                        {visitedCount}
                    </b>{" "}
                    / {totalCount} Places Completed
                </div>

                {/* Progress Track */}
                <div
                    className="
                        w-full
                        h-[7px]
                        rounded-md
                        overflow-hidden
                        bg-[var(--surface-3)]
                    "
                >
                    {/* Progress */}
                    <div
                        className="
                            h-full
                            rounded-md
                            transition-[width]
                            duration-500
                            ease-out
                        "
                        style={{
                            width: `${percentage}%`,
                            background:
                                "linear-gradient(90deg,var(--accent),var(--purple))"
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

export default ItineraryHero;

