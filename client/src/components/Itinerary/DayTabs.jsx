function DayTabs({
    days,
    activeDay,
    setActiveDay
}) {
    const totalDays = Math.max(
        1,
        Number(days) || 1
    );

    return (
        <div
            className="
                flex
                w-full
                overflow-x-auto
                rounded-xl
                border
                border-[var(--outline-variant)]
                bg-[var(--surface-container)]
            "
            style={{
                padding: "5px",
                gap: "4px",
                marginBottom: "20px",
            }}
        >
            {Array.from(
                { length: totalDays },
                (_, index) => index + 1
            ).map((day) => {
                const active = day === activeDay;

                return (
                    <button
                        key={day}
                        type="button"
                        onClick={() =>
                            setActiveDay(day)
                        }
                        className={`
                            shrink-0
                            rounded-[9px]
                            whitespace-nowrap
                            text-[14px]
                            font-bold
                            transition-colors
                            ${
                                active
                                    ? `
                                        bg-[var(--surface-container-lowest)]
                                        text-[var(--primary)]
                                        shadow-[0_2px_8px_var(--shadow)]
                                    `
                                    : `
                                        text-[var(--on-surface-variant)]
                                        hover:bg-[var(--surface-container-high)]
                                        hover:text-[var(--on-surface)]
                                    `
                            }
                        `}
                        style={{
                            padding: "11px 20px",
                            transitionDuration:
                                "var(--transition-fast)",
                        }}
                    >
                        <span
                            className={`
                                border-b-2
                                pb-1
                                ${
                                    active
                                        ? "border-[var(--primary)]"
                                        : "border-transparent"
                                }
                            `}
                        >
                            Day {day}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default DayTabs;