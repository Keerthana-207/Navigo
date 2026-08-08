import { NotebookPen } from "lucide-react";

function NotesInput({
    value,
    onChange
}) {
    return (
        <div className="mb-5">
            {/* Label */}
            <div
                className="
                    flex
                    items-center
                    gap-1.5
                    text-[13px]
                    font-bold
                    text-[var(--on-surface-variant)]
                    mb-2
                "
            >
                <NotebookPen size={16} />

                <span>
                    Notes
                </span>
            </div>

            {/* Notes Input */}
            <textarea
                value={value ?? ""}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="Add a note..."
                className="
                    w-full
                    min-h-[96px]
                    resize-y
                    bg-[var(--surface-container-low)]
                    border
                    border-[var(--outline-variant)]
                    rounded-[var(--radius-lg)]
                    text-[var(--on-surface)]
                    text-[13px]
                    leading-relaxed
                    outline-none
                    font-[inherit]
                    transition-colors
                    placeholder:text-[var(--text-muted)]
                    focus:border-[var(--primary)]
                "
                style={{
                    padding: "13px"
                }}
                aria-label="Notes"
            />
        </div>
    );
}

export default NotesInput;