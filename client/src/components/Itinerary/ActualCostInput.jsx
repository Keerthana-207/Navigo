import { Wallet } from "lucide-react";

function ActualCostInput({
    value,
    onChange
}) {
    return (
        <div
            style={{
                marginTop: "20px"
            }}
        >
            {/* Label */}
            <div
                className="
                    flex
                    items-center
                    gap-1.5
                    text-[13px]
                    font-bold
                    text-[var(--on-surface-variant)]
                "
                style={{
                    marginBottom: "8px"
                }}
            >
                <Wallet size={16} />

                <span>
                    Actual Cost
                </span>
            </div>

            {/* Input */}
            <div className="relative">
                <span
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-[13.5px]
                        font-semibold
                        text-[var(--on-surface-variant)]
                    "
                >
                    ₹
                </span>

                <input
                    type="number"
                    min="0"
                    value={value ?? ""}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    placeholder="Enter actual amount spent"
                    className="
                        w-full
                        bg-[var(--surface-container-low)]
                        border
                        border-[var(--outline-variant)]
                        rounded-[var(--radius)]
                        text-[var(--on-surface)]
                        text-[13.5px]
                        outline-none
                        transition-colors
                        placeholder:text-[var(--text-muted)]
                        focus:border-[var(--primary)]
                    "
                    style={{
                        padding: "10px 12px 10px 28px"
                    }}
                    aria-label="Actual cost"
                />
            </div>
        </div>
    );
}

export default ActualCostInput;