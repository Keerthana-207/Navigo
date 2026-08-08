function DayTabs({
    days,
    activeDay,
    setActiveDay
}) {

    return (
        <div
            className="
                flex
                overflow-x-auto
                bg-[var(--surface-container)]
                rounded-xl
                border
                border-[var(--outline-variant)]
            "
            style={{
                padding: "5px",
                gap: "4px",
                marginBottom: "20px"
            }}
        >
            {Array.from(
                { length: days },
                (_, index) => index + 1
            ).map((day) => {

                const active = day === activeDay;

                return (
                    <button
                        key={day}
                        onClick={() =>
                            setActiveDay(day)
                        }
                        className={`
                            rounded-[9px]
                            text-[13.5px]
                            font-bold
                            whitespace-nowrap
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
                            padding: "10px 18px",
                            transitionDuration:
                                "var(--transition-fast)"
                        }}
                    >
                        <span
                            className={`
                                border-b-2
                                pb-0.5
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