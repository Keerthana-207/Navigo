import { Grip, Trash2 } from "lucide-react";
import { fmtMoney } from "../../utils/itinerary";

function PlaceCard({
    place,
    selected,
    dragging,
    onSelect,
    onDelete,
    onDragStart,
    onDragEnd
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
                group
                bg-[var(--surface-container)]
                border
                rounded-xl
                cursor-grab
                flex
                items-center
                transition-all
                ${
                    selected
                        ? `
                            border-[var(--primary)]
                            shadow-[0_0_0_1px_var(--primary)]
                        `
                        : `
                            border-[var(--outline-variant)]
                            hover:border-[var(--primary)]
                        `
                }
                ${dragging ? "opacity-40" : ""}
            `}
            style={{
                padding: "12px",
                gap: "10px",
                transitionDuration:
                    "var(--transition-fast)"
            }}
        >

            {/* Drag Handle */}
            <Grip
                size={14}
                className="
                    text-[var(--on-surface-variant)]
                    shrink-0
                "
            />

            {/* Place Information */}
            <div className="flex-1 min-w-0">

                <p
                    className="
                        text-sm
                        font-bold
                        text-[var(--on-surface)]
                        whitespace-nowrap
                        overflow-hidden
                        text-ellipsis
                    "
                    style={{
                        margin: "0 0 2px 0"
                    }}
                >
                    {place.name}
                </p>

                <p
                    className="
                        text-xs
                        text-[var(--on-surface-variant)]
                    "
                    style={{
                        margin: 0
                    }}
                >
                    {place.estCost
                        ? fmtMoney(place.estCost)
                        : "Free"}
                </p>

            </div>

            {/* Status Indicator */}
            <span
                title={place.status}
                className={`
                    w-2
                    h-2
                    rounded-full
                    shrink-0
                    ${
                        place.status === "planned"
                            ? "bg-[var(--tertiary)]"
                            : place.status === "visited"
                                ? "bg-[var(--primary)]"
                                : "bg-[var(--on-surface-variant)]"
                    }
                `}
            />

            {/* Delete */}
            <button
                type="button"
                title="Delete"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="
                    opacity-0
                    group-hover:opacity-100
                    text-[var(--on-surface-variant)]
                    hover:text-[var(--error)]
                    transition-colors
                    rounded-md
                    p-0.5
                "
                style={{
                    transitionDuration:
                        "var(--transition-fast)"
                }}
            >
                <Trash2 size={14} />
            </button>

        </div>
    );
}

export default PlaceCard;