function ScheduledPlaceCard({
    place,
    selected,
    dragging,
    onSelect,
    onDragStart,
    onDragEnd,
    onToggleVisited
}) {
    return (
        <div
            draggable
            onDragStart={(e) => {
                onDragStart();

                e.dataTransfer.setData(
                    "text/plain",
                    String(place.id)
                );

                e.dataTransfer.effectAllowed = "move";
            }}
            onDragEnd={onDragEnd}
            onClick={onSelect}
            className={`
                bg-[var(--surface-container-low)]
                border
                border-l-[3px]
                rounded-xl
                cursor-grab
                transition-all
                ${
                    selected
                        ? "border-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]"
                        : "border-[var(--outline-variant)] hover:border-[var(--accent)]"
                }
                ${dragging ? "opacity-40" : ""}
            `}
            style={{
                padding: "14px 16px",
                marginBottom: "12px"
            }}
        >
            <div
                className="
                    flex
                    items-start
                    justify-between
                "
                style={{
                    gap: "12px"
                }}
            >
                <div className="min-w-0">
                    <p
                        className={`
                            text-[15px]
                            font-bold
                            text-[var(--on-surface)]
                            ${
                                place.status === "visited"
                                    ? "text-[var(--on-surface-variant)] line-through"
                                    : ""
                            }
                        `}
                        style={{
                            margin: "0 0 4px 0"
                        }}
                    >
                        {place.name}
                    </p>

                    <p
                        className="
                            text-[12.5px]
                            text-[var(--on-surface-variant)]
                        "
                        style={{
                            margin: 0
                        }}
                    >
                        {place.desc}
                    </p>
                </div>

                <label
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                    className="
                        flex
                        items-center
                        text-xs
                        text-[var(--on-surface-variant)]
                        whitespace-nowrap
                        bg-[var(--surface)]
                        border
                        border-[var(--outline-variant)]
                        rounded-lg
                        shrink-0
                    "
                    style={{
                        gap: "7px",
                        padding: "6px 10px"
                    }}
                >
                    <input
                        type="checkbox"
                        checked={
                            place.status === "visited"
                        }
                        onChange={(e) =>
                            onToggleVisited(
                                place.id,
                                e.target.checked
                            )
                        }
                    />

                    Mark as Visited
                </label>
            </div>

            <div
                className="
                    flex
                    items-center
                    flex-wrap
                "
                style={{
                    gap: "10px",
                    marginTop: "12px"
                }}
            >
                {place.time && (
                    <span
                        className="
                            text-[11.5px]
                            font-bold
                            text-[var(--on-surface-variant)]
                            bg-[var(--surface)]
                            border
                            border-[var(--outline-variant)]
                            rounded-[7px]
                        "
                        style={{
                            padding: "6px 10px"
                        }}
                    >
                        {place.time}

                        {place.endTime &&
                            ` – ${place.endTime}`}
                    </span>
                )}

                {!!place.estCost && (
                    <span
                        className="
                            text-[11.5px]
                            font-bold
                            text-[var(--primary)]
                            bg-[var(--primary-container)]
                            rounded-[7px]
                        "
                        style={{
                            padding: "6px 10px"
                        }}
                    >
                        Est: ₹
                        {place.estCost.toLocaleString(
                            "en-IN"
                        )}
                    </span>
                )}
            </div>
        </div>
    );
}

export default ScheduledPlaceCard;