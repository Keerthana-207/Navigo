import { FILTERS } from "../../../src/constants";

function FilterTabs({
    activeFilter,
    setActiveFilter
}) {

    return (
        <div
            className="
                flex
                flex-wrap
            "
            style={{
                gap: "8px",
                marginBottom: "16px"
            }}
        >
            {FILTERS.map((filter) => {

                const active =
                    activeFilter === filter;

                return (
                    <button
                        key={filter}
                        onClick={() =>
                            setActiveFilter(filter)
                        }
                        className={`
                            rounded-full
                            text-[12.5px]
                            font-semibold
                            whitespace-nowrap
                            border
                            transition-colors
                            ${
                                active
                                    ? `
                                        bg-[var(--primary)]
                                        text-[var(--on-primary)]
                                        border-[var(--primary)]
                                    `
                                    : `
                                        bg-[var(--surface-container)]
                                        text-[var(--on-surface-variant)]
                                        border-[var(--outline-variant)]
                                        hover:bg-[var(--surface-container-high)]
                                        hover:text-[var(--on-surface)]
                                        hover:border-[var(--outline)]
                                    `
                            }
                        `}
                        style={{
                            padding: "6px 13px",
                            transitionDuration:
                                "var(--transition-fast)"
                        }}
                    >
                        {filter}
                    </button>
                );
            })}
        </div>
    );
}

export default FilterTabs;