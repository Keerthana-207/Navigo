import { Clock } from "lucide-react";

function DurationInput({
    value,
    onChange
}) {
    return (
        <div
            className="
                flex-1
                bg-[var(--surface-container-low)]
                border
                border-[var(--outline-variant)]
                rounded-[var(--radius-lg)]
            "
            style={{
                padding: "12px"
            }}
        >
            {/* Icon */}
            <div
                className="
                    text-[var(--primary)]
                    mb-2
                "
            >
                <Clock size={18} />
            </div>

            {/* Label */}
            <div
                className="
                    text-[11px]
                    text-[var(--on-surface-variant)]
                    mb-0.5
                "
            >
                Duration
            </div>

            {/* Input */}
            <input
                type="text"
                value={value ?? ""}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="e.g. 2 Hrs"
                className="
                    border-none
                    bg-transparent
                    text-[var(--on-surface)]
                    text-[15px]
                    font-extrabold
                    w-full
                    outline-none
                    placeholder:text-[var(--text-muted)]
                "
                aria-label="Duration"
            />
        </div>
    );
}

export default DurationInput;