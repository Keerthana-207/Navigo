function CategoryProgress({
    place,
    allPlaces
}) {

    const categoryPlaces =
        allPlaces.filter(
            (item) =>
                item.category === place.category
        );

    const visited =
        categoryPlaces.filter(
            (item) =>
                item.status === "visited"
        ).length;

    const percentage =
        categoryPlaces.length
            ? Math.round(
                (visited /
                    categoryPlaces.length) *
                100
            )
            : 0;

    const radius = 22;

    const circumference =
        2 * Math.PI * radius;

    const dash =
        (circumference * percentage) / 100;

    return (
        <div
            className="
                flex
                items-center
                justify-between
            "
        >

            {/* Category Name */}
            <span
                className="
                    text-[var(--primary)]
                    text-xs
                    font-bold
                "
            >
                {place.category}
            </span>

            {/* Progress Circle */}
            <div className="relative">

                <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                >

                    {/* Background Circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        fill="none"
                        stroke="var(--surface-container-highest)"
                        strokeWidth="5"
                    />

                    {/* Progress Circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="5"
                        strokeDasharray={`${dash} ${
                            circumference - dash
                        }`}
                        strokeLinecap="round"
                        transform="rotate(-90 28 28)"
                    />

                </svg>

                {/* Percentage */}
                <span
                    className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        text-[11px]
                        font-bold
                        text-[var(--on-surface)]
                    "
                >
                    {percentage}%
                </span>

            </div>

        </div>
    );
}

export default CategoryProgress;