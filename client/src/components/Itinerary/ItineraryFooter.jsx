import {
    ChevronLeft,
    Download,
    Save,
    RotateCcw
} from "lucide-react";

function ItineraryFooter({
    dirty,
    onSave,
    onDiscard,
    onExport
}) {
    return (
        <footer
            className="
                border-t
                border-[var(--border)]
                flex
                items-center
                justify-between
                flex-wrap
            "
            style={{
                marginTop: "28px",
                paddingTop: "20px",
                gap: "16px"
            }}
        >

            {/* Back to Budget */}
            <button
                type="button"
                onClick={() => window.history.back()}
                className="
                    inline-flex
                    items-center
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-[var(--text-dim)]
                    font-semibold
                    text-[13px]
                    transition-all
                    duration-200
                    hover:border-[var(--accent)]
                    hover:text-[var(--text)]
                    hover:bg-[var(--surface-2)]
                    active:scale-[0.98]
                "
                style={{
                    padding: "11px 17px",
                    gap: "8px"
                }}
            >
                <ChevronLeft
                    size={16}
                    strokeWidth={2}
                />

                Back to Budget
            </button>


            {/* Save Status */}
            <div
                className={`
                    inline-flex
                    items-center
                    rounded-full
                    text-[12px]
                    font-bold
                    transition-all
                    duration-300

                    ${
                        dirty
                            ? `
                                border
                                border-[var(--accent)]
                                bg-[var(--accent-soft)]
                                text-[var(--accent)]
                            `
                            : `
                                text-[var(--text-faint)]
                                opacity-70
                            `
                    }
                `}
                style={{
                    padding: dirty
                        ? "8px 14px"
                        : "0",
                    gap: "8px"
                }}
            >
                <span
                    className={`
                        w-[7px]
                        h-[7px]
                        rounded-full
                        shrink-0

                        ${
                            dirty
                                ? `
                                    bg-[var(--accent)]
                                    animate-pulse
                                `
                                : `
                                    bg-[var(--text-faint)]
                                `
                        }
                    `}
                />

                {dirty
                    ? "Unsaved Changes"
                    : "All Changes Saved"}
            </div>


            {/* Action Buttons */}
            <div
                className="
                    flex
                    items-center
                    flex-wrap
                "
                style={{
                    gap: "8px"
                }}
            >

                {/* Discard */}
                <button
                    type="button"
                    disabled={!dirty}
                    onClick={onDiscard}
                    className="
                        inline-flex
                        items-center
                        rounded-xl
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        text-[var(--text-dim)]
                        font-semibold
                        text-[13px]
                        transition-all
                        duration-200
                        hover:border-[var(--text-faint)]
                        hover:text-[var(--text)]
                        hover:bg-[var(--surface-2)]
                        active:scale-[0.98]
                        disabled:opacity-35
                        disabled:pointer-events-none
                    "
                    style={{
                        padding: "11px 16px",
                        gap: "8px"
                    }}
                >
                    <RotateCcw
                        size={14}
                        strokeWidth={2}
                    />

                    Discard
                </button>


                {/* Save */}
                <button
                    type="button"
                    disabled={!dirty}
                    onClick={onSave}
                    className={`
                        inline-flex
                        items-center
                        rounded-xl
                        font-bold
                        text-[13px]
                        border
                        transition-all
                        duration-200
                        active:scale-[0.98]

                        ${
                            dirty
                                ? `
                                    border-[var(--accent)]
                                    bg-[var(--accent)]
                                    text-[#1a1206]
                                    hover:brightness-110
                                    hover:shadow-[0_4px_18px_rgba(0,0,0,0.16)]
                                `
                                : `
                                    border-[var(--border)]
                                    bg-[var(--surface-3)]
                                    text-[var(--text-faint)]
                                    opacity-50
                                `
                        }
                    `}
                    style={{
                        padding: "11px 17px",
                        gap: "8px"
                    }}
                >
                    <Save
                        size={14}
                        strokeWidth={2.2}
                    />

                    Save Itinerary
                </button>


                {/* Export */}
                <button
                    type="button"
                    onClick={onExport}
                    className="
                        inline-flex
                        items-center
                        rounded-xl
                        text-[#1a1206]
                        font-bold
                        text-[13px]
                        transition-all
                        duration-200
                        hover:brightness-110
                        hover:shadow-[0_4px_18px_rgba(0,0,0,0.16)]
                        active:scale-[0.98]
                    "
                    style={{
                        padding: "11px 18px",
                        gap: "8px",
                        background:
                            "linear-gradient(135deg,var(--accent),var(--accent-2))"
                    }}
                >
                    <Download
                        size={15}
                        strokeWidth={2.2}
                    />

                    Export Trip Plan
                </button>

            </div>

        </footer>
    );
}

export default ItineraryFooter;
