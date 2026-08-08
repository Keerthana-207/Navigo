import { Search, Plus } from "lucide-react";
import PlaceCard from "./PlaceCard";
import FilterTabs from "./FilterTabs";

function PlacesLibrary({
    places,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    selectedId,
    setSelectedId,
    draggingId,
    setDraggingId,
    onAddPlace,
    onDeletePlace
}) {

    return (
        <section
            className="
                bg-[var(--surface)]
                border
                border-[var(--border)]
                rounded-2xl
            "
            style={{
                padding: "22px",
                boxShadow: "var(--shadow)"
            }}
        >

            <h2
                className="
                    text-[19px]
                    font-extrabold
                "
                style={{
                    margin: "0 0 16px 0"
                }}
            >
                Places to Visit
            </h2>

            {/* Search */}

            <div
                className="
                    flex
                    items-center
                    bg-[var(--surface-2)]
                    border
                    border-[var(--border)]
                    rounded-[10px]
                "
                style={{
                    gap: "8px",
                    padding: "10px 12px",
                    marginBottom: "14px"
                }}
            >
                <Search
                    size={15}
                    className="text-[var(--text-faint)]"
                />

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search or add a place"
                    className="
                        w-full
                        border-none
                        outline-none
                        bg-transparent
                        text-[var(--text)]
                        placeholder:text-[var(--text-faint)]
                    "
                />
            </div>

            <FilterTabs
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            <div
                className="
                    flex
                    flex-col
                    overflow-y-auto
                "
                style={{
                    gap: "10px",
                    maxHeight: "560px"
                }}
            >
                {places.map((place) => (
                    <PlaceCard
                        key={place.id}
                        place={place}
                        selected={selectedId === place.id}
                        dragging={draggingId === place.id}
                        onSelect={() =>
                            setSelectedId(place.id)
                        }
                        onDelete={() =>
                            onDeletePlace(place.id)
                        }
                        onDragStart={() =>
                            setDraggingId(place.id)
                        }
                        onDragEnd={() =>
                            setDraggingId(null)
                        }
                    />
                ))}
            </div>

            <button
                onClick={() => {
                    const name = window.prompt(
                        "Name of the place:"
                    );

                    if (name?.trim()) {
                        onAddPlace(name.trim());
                    }
                }}
                className="
                    w-full
                    border
                    border-dashed
                    border-[var(--border)]
                    rounded-[10px]
                    bg-transparent
                    text-[var(--text-dim)]
                    font-semibold
                    flex
                    items-center
                    justify-center
                    hover:border-[var(--accent)]
                    hover:text-[var(--accent)]
                    transition-colors
                "
                style={{
                    padding: "11px",
                    marginTop: "14px",
                    gap: "6px"
                }}
            >
                <Plus size={14} />
                Add a place
            </button>

        </section>
    );
}

export default PlacesLibrary;