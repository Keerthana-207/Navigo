import DayTabs from "./DayTabs";
import SchedulePeriod from "./SchedulePeriod";
import DropZone from "./DropZone";

function Schedule({
    trip,
    places,
    activeDay,
    setActiveDay,
    selectedId,
    setSelectedId,
    draggingId,
    setDraggingId,
    dragOverKey,
    setDragOverKey,
    onAssignToDay,
    onToggleVisited
}) {
    const dayPlaces = places.filter(
        (place) =>
            place.status !== "unplanned" &&
            place.day === activeDay
    );

    const getPeriodPlaces = (period) => {
        return dayPlaces.filter(
            (place) =>
                place.period === period
        );
    };

    const handleDrop = (period) => (e) => {
        e.preventDefault();

        const id = parseInt(
            e.dataTransfer.getData(
                "text/plain"
            ),
            10
        );

        if (!isNaN(id)) {
            onAssignToDay(
                id,
                activeDay,
                period
            );
        }

        setDragOverKey(null);
        setDraggingId(null);
    };

    const handleDragOver = (key) => () => {
        setDragOverKey(key);
    };

    const handleDragLeave = () => {
        setDragOverKey(null);
    };

    return (
        <section
            className="
                bg-[var(--surface)]
                border
                border-[var(--outline-variant)]
                rounded-2xl
            "
            style={{
                padding: "22px",
                boxShadow:
                    "0 8px 24px var(--shadow)"
            }}
        >
            <DayTabs
                days={trip.days}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
            />

            <SchedulePeriod
                title="Morning"
                places={getPeriodPlaces(
                    "morning"
                )}
                active={
                    dragOverKey ===
                    "morning"
                }
                selectedId={selectedId}
                draggingId={draggingId}
                onSelect={setSelectedId}
                onDragStart={setDraggingId}
                onDragEnd={() => {
                    setDraggingId(null);
                    setDragOverKey(null);
                }}
                onToggleVisited={
                    onToggleVisited
                }
                onDragOver={handleDragOver(
                    "morning"
                )}
                onDragLeave={
                    handleDragLeave
                }
                onDrop={handleDrop(
                    "morning"
                )}
            />

            <SchedulePeriod
                title="Afternoon"
                places={getPeriodPlaces(
                    "afternoon"
                )}
                active={
                    dragOverKey ===
                    "afternoon"
                }
                selectedId={selectedId}
                draggingId={draggingId}
                onSelect={setSelectedId}
                onDragStart={setDraggingId}
                onDragEnd={() => {
                    setDraggingId(null);
                    setDragOverKey(null);
                }}
                onToggleVisited={
                    onToggleVisited
                }
                onDragOver={handleDragOver(
                    "afternoon"
                )}
                onDragLeave={
                    handleDragLeave
                }
                onDrop={handleDrop(
                    "afternoon"
                )}
            />

            <SchedulePeriod
                title="Evening"
                places={getPeriodPlaces(
                    "evening"
                )}
                active={
                    dragOverKey ===
                    "evening"
                }
                selectedId={selectedId}
                draggingId={draggingId}
                onSelect={setSelectedId}
                onDragStart={setDraggingId}
                onDragEnd={() => {
                    setDraggingId(null);
                    setDragOverKey(null);
                }}
                onToggleVisited={
                    onToggleVisited
                }
                onDragOver={handleDragOver(
                    "evening"
                )}
                onDragLeave={
                    handleDragLeave
                }
                onDrop={handleDrop(
                    "evening"
                )}
            />

            <SchedulePeriod
                title="Unscheduled"
                places={getPeriodPlaces(
                    "unscheduled"
                )}
                active={
                    dragOverKey ===
                    "unscheduled"
                }
                selectedId={selectedId}
                draggingId={draggingId}
                onSelect={setSelectedId}
                onDragStart={setDraggingId}
                onDragEnd={() => {
                    setDraggingId(null);
                    setDragOverKey(null);
                }}
                onToggleVisited={
                    onToggleVisited
                }
                onDragOver={handleDragOver(
                    "unscheduled"
                )}
                onDragLeave={
                    handleDragLeave
                }
                onDrop={handleDrop(
                    "unscheduled"
                )}
            />

            <DropZone
                active={
                    dragOverKey ===
                    "dropzone"
                }
                onDragOver={() =>
                    setDragOverKey(
                        "dropzone"
                    )
                }
                onDragLeave={() =>
                    setDragOverKey(null)
                }
                onDrop={(e) => {
                    e.preventDefault();

                    const id = parseInt(
                        e.dataTransfer.getData(
                            "text/plain"
                        ),
                        10
                    );

                    if (!isNaN(id)) {
                        onAssignToDay(
                            id,
                            activeDay,
                            "unscheduled"
                        );
                    }

                    setDragOverKey(null);
                    setDraggingId(null);
                }}
            />
        </section>
    );
}

export default Schedule;