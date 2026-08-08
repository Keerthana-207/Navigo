import { Plus } from "lucide-react";

function DropZone({
    active,
    onDragOver,
    onDragLeave,
    onDrop
}) {

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                onDragOver();
            }}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`
                border-[1.5px]
                border-dashed
                rounded-[14px]
                text-center
                text-[13px]
                transition-colors
                ${
                    active
                        ? `
                            border-[var(--primary)]
                            text-[var(--primary)]
                            bg-[var(--primary-container)]
                        `
                        : `
                            border-[var(--outline-variant)]
                            text-[var(--on-surface-variant)]
                            hover:border-[var(--outline)]
                            hover:text-[var(--on-surface)]
                        `
                }
            `}
            style={{
                padding: "26px",
                marginTop: "10px",
                transitionDuration: "var(--transition-fast)"
            }}
        >
            <Plus
                size={18}
                className="mx-auto"
                style={{
                    marginBottom: "8px"
                }}
            />

            Drag places here to add to schedule
        </div>
    );
}

export default DropZone;