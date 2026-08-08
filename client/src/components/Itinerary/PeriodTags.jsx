function PeriodTags({
    activePeriod,
    setActivePeriod
}) {
    const periods = [
        "morning",
        "afternoon",
        "evening",
        "unscheduled"
    ];

    const labels = {
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
        unscheduled: "Unscheduled"
    };

    return (
        <div
            className="
                flex
                flex-wrap
                items-center
            "
            style={{
                gap: "8px",
                marginBottom: "16px"
            }}
        >
            {periods.map((period) => {
                const active =
                    activePeriod === period;

                return (
                    <button
                        key={period}
                        type="button"
                        onClick={() =>
                            setActivePeriod(period)
                        }
                        className={`
                            rounded-full
                            border
                            text-[12px]
                            font-semibold
                            whitespace-nowrap
                            transition-colors
                            ${
                                active
                                    ? `
                                        bg-[var(--primary)]
                                        text-[var(--on-primary)]
                                        border-[var(--primary)]
                                    `
                                    : `
                                        bg-[var(--surface-container-low)]
                                        text-[var(--on-surface-variant)]
                                        border-[var(--outline-variant)]
                                        hover:text-[var(--on-surface)]
                                        hover:border-[var(--outline)]
                                    `
                            }
                        `}
                        style={{
                            padding: "7px 13px",
                            transitionDuration:
                                "var(--transition-fast)"
                        }}
                    >
                        {labels[period]}
                    </button>
                );
            })}
        </div>
    );
}

export default PeriodTags;