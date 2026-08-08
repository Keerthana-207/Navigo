import { Wallet } from "lucide-react";

function CostInput({
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
                <Wallet size={18} />
            </div>

            {/* Label */}
            <div
                className="
                    text-[11px]
                    text-[var(--on-surface-variant)]
                    mb-0.5
                "
            >
                Est. Cost
            </div>

            {/* Input */}
            <div
                className="
                    flex
                    items-center
                    gap-1
                "
            >
                <span
                    className="
                        text-[15px]
                        font-extrabold
                        text-[var(--on-surface)]
                    "
                >
                    ₹
                </span>

                <input
                    type="number"
                    min="0"
                    value={value ?? 0}
                    onChange={(e) => {
                        const amount =
                            e.target.value === ""
                                ? 0
                                : parseFloat(e.target.value);

                        onChange(
                            Number.isNaN(amount)
                                ? 0
                                : amount
                        );
                    }}
                    className="
                        border-none
                        bg-transparent
                        text-[var(--on-surface)]
                        text-[15px]
                        font-extrabold
                        w-full
                        outline-none
                    "
                    aria-label="Estimated cost"
                />
            </div>
        </div>
    );
}

export default CostInput;