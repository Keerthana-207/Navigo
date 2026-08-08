import ScheduledPlaceCard from "./ScheduledPlaceCard";

function SchedulePeriod({
    title,
    places,
    active,
    selectedId,
    draggingId,
    onSelect,
    onDragStart,
    onDragEnd,
    onToggleVisited,
    onDragOver,
    onDragLeave,
    onDrop
}) {
    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                onDragOver();
            }}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`
                rounded-xl
                transition-colors
                ${
                    active
                        ? "bg-[var(--primary-container)]"
                        : ""
                }
            `}
            style={{
                marginBottom: "18px",
                minHeight: "70px",
                padding: active
                    ? "10px"
                    : "0"
            }}
        >
            <div
                className="
                    text-[11.5px]
                    font-extrabold
                    tracking-[0.08em]
                    text-[var(--on-surface-variant)]
                    uppercase
                "
                style={{
                    marginBottom: "10px"
                }}
            >
                {title}
            </div>

            <div
                className="flex flex-col"
                style={{
                    gap: "3px"
                }}
            >
                {places.length > 0 ? (
                    places.map((place) => (
                        <ScheduledPlaceCard
                            key={place.id}
                            place={place}
                            selected={
                                selectedId === place.id
                            }
                            dragging={
                                draggingId === place.id
                            }
                            onSelect={() =>
                                onSelect(place.id)
                            }
                            onDragStart={() =>
                                onDragStart(place.id)
                            }
                            onDragEnd={onDragEnd}
                            onToggleVisited={
                                onToggleVisited
                            }
                        />
                    ))
                ) : (
                    <div
                        className="
                            border
                            border-dashed
                            border-[var(--outline-variant)]
                            rounded-lg
                            text-center
                            text-[12px]
                            text-[var(--on-surface-variant)]
                        "
                        style={{
                            padding: "14px 10px"
                        }}
                    >
                        Drop places here
                    </div>
                )}
            </div>
        </div>
    );
}

export default SchedulePeriod;