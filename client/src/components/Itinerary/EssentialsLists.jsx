import { useState } from "react";
import { Plus } from "lucide-react";

function EssentialsList({
    essentials,
    onToggle,
    onAdd
}) {
    const [value, setValue] = useState("");

    function add() {
        if (!value.trim()) return;

        onAdd(value.trim());
        setValue("");
    }

    return (
        <div
            style={{
                marginTop: "20px"
            }}
        >
            {/* Heading */}
            <h4
                className="
                    text-[13px]
                    font-bold
                    text-[var(--on-surface-variant)]
                "
                style={{
                    margin: "0 0 10px"
                }}
            >
                ✓ Essentials
            </h4>

            {/* Essentials List */}
            <div
                className="
                    flex
                    flex-col
                "
                style={{
                    gap: "11px"
                }}
            >
                {essentials?.map((item, index) => (
                    <label
                        key={index}
                        className="
                            flex
                            items-center
                            text-[13.5px]
                            text-[var(--on-surface)]
                            cursor-pointer
                        "
                        style={{
                            gap: "10px"
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() =>
                                onToggle(index)
                            }
                            className="
                                w-4
                                h-4
                                rounded
                                accent-[var(--primary)]
                                cursor-pointer
                            "
                        />

                        <span
                            className={
                                item.checked
                                    ? `
                                        text-[var(--text-muted)]
                                        line-through
                                    `
                                    : ""
                            }
                        >
                            {item.label}
                        </span>
                    </label>
                ))}
            </div>

            {/* Add Essential */}
            <div
                className="
                    flex
                "
                style={{
                    gap: "8px",
                    marginTop: "12px"
                }}
            >
                <input
                    value={value}
                    onChange={(e) =>
                        setValue(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            add();
                        }
                    }}
                    placeholder="Add essential item..."
                    className="
                        flex-1
                        bg-[var(--surface-container-low)]
                        border
                        border-[var(--outline-variant)]
                        rounded-[var(--radius)]
                        text-[var(--on-surface)]
                        text-[12.5px]
                        outline-none
                        transition-colors
                        placeholder:text-[var(--text-muted)]
                        focus:border-[var(--primary)]
                    "
                    style={{
                        padding: "7px 10px"
                    }}
                    aria-label="Add essential item"
                />

                <button
                    type="button"
                    onClick={add}
                    className="
                        bg-[var(--surface-container-low)]
                        border
                        border-[var(--outline-variant)]
                        rounded-[var(--radius)]
                        text-[var(--on-surface-variant)]
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        transition-colors
                        hover:text-[var(--primary)]
                        hover:border-[var(--primary)]
                    "
                    style={{
                        padding: "0 12px"
                    }}
                    aria-label="Add essential"
                >
                    <Plus size={14} />
                </button>
            </div>
        </div>
    );
}

export default EssentialsList;