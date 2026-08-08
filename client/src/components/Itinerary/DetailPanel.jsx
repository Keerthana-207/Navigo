import CategoryProgress from "./CategoryProgress";
import CostInput from "./CostInput";
import DurationInput from "./DurationInput";
import NotesInput from "./NotesInput";
import EssentialsList from "./EssentialsLists";
import ActualCostInput from "./ActualCostInput";

function DetailPanel({
    place,
    allPlaces,
    onField,
    onToggleEssential,
    onAddEssential,
    onActualCost
}) {

    if (!place) {
        return (
            <section
                className="
                    bg-[var(--surface)]
                    border
                    border-[var(--outline-variant)]
                    rounded-[var(--radius-lg)]
                "
                style={{
                    padding: "22px",
                    boxShadow: "var(--plan-shadow)"
                }}
            >
                <div
                    className="
                        text-[var(--on-surface-variant)]
                        text-[13.5px]
                        text-center
                    "
                    style={{
                        padding: "60px 10px",
                        lineHeight: "1.6"
                    }}
                >
                    Select a place from the library
                    <br />
                    or your schedule to see details.
                </div>
            </section>
        );
    }

    return (
        <section
            className="
                bg-[var(--surface)]
                border
                border-[var(--outline-variant)]
                rounded-[var(--radius-lg)]
            "
            style={{
                padding: "22px",
                boxShadow: "var(--plan-shadow)"
            }}
        >
            {/* Category Progress */}
            <CategoryProgress
                place={place}
                allPlaces={allPlaces}
            />

            {/* Place Name */}
            <h3
                className="
                    text-[var(--on-surface)]
                    text-[22px]
                    font-extrabold
                "
                style={{
                    margin: "14px 0 16px"
                }}
            >
                {place.name}
            </h3>

            {/* Cost + Duration */}
            <div
                className="flex"
                style={{
                    gap: "10px",
                    marginBottom: "18px"
                }}
            >
                <CostInput
                    value={place.estCost}
                    onChange={(value) =>
                        onField("estCost", value)
                    }
                />

                <DurationInput
                    value={place.duration}
                    onChange={(value) =>
                        onField("duration", value)
                    }
                />
            </div>

            {/* Notes */}
            <NotesInput
                value={place.notes}
                onChange={(value) =>
                    onField("notes", value)
                }
            />

            {/* Essentials */}
            <EssentialsList
                essentials={place.essentials}
                onToggle={onToggleEssential}
                onAdd={onAddEssential}
            />

            {/* Actual Cost */}
            <ActualCostInput
                value={place.actualCost}
                onChange={onActualCost}
            />
        </section>
    );
}

export default DetailPanel;