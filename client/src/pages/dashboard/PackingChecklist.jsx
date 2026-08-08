import React, { useMemo, useState } from "react";
import {
    Bell,
    UserCircle,
    Snowflake,
    Clock3,
    Mountain,
    Luggage,
    Shirt,
    Cable,
    Hand,
    Plus,
    Sparkles,
} from "lucide-react";
import Layout from "../../components/Layout/Layout";

const INITIAL_CATEGORIES = [
    {
        id: "essentials",
        title: "Essentials",
        icon: Luggage,
        items: [
            { id: "passport", name: "Passport", checked: false },
            { id: "tickets", name: "Tickets", checked: false },
            { id: "wallet", name: "Wallet", checked: false },
        ],
    },
    {
        id: "clothing",
        title: "Clothing",
        icon: Shirt,
        items: [
            {
                id: "thermal",
                name: "Thermal layers",
                checked: true,
            },
            {
                id: "jacket",
                name: "Waterproof jacket",
                checked: false,
            },
            {
                id: "boots",
                name: "Hiking boots",
                checked: false,
            },
        ],
    },
    {
        id: "electronics",
        title: "Electronics",
        icon: Cable,
        items: [
            {
                id: "adapter",
                name: "Universal adapter",
                checked: false,
            },
            {
                id: "powerbank",
                name: "Power bank",
                checked: false,
            },
            {
                id: "camera",
                name: "Camera",
                checked: false,
            },
        ],
    },
    {
        id: "personal-care",
        title: "Personal Care",
        icon: Hand,
        items: [
            {
                id: "sunscreen",
                name: "Sunscreen",
                checked: false,
            },
            {
                id: "first-aid",
                name: "First aid kit",
                checked: false,
            },
        ],
    },
];

function PackingChecklist() {
    const [categories, setCategories] = useState(
        INITIAL_CATEGORIES
    );

    const [suggestionMessage, setSuggestionMessage] =
        useState("");

    /*
    |--------------------------------------------------------------------------
    | Packing Progress
    |--------------------------------------------------------------------------
    */

    const progress = useMemo(() => {
        const allItems = categories.flatMap(
            (category) => category.items
        );

        const total = allItems.length;

        const packed = allItems.filter(
            (item) => item.checked
        ).length;

        const percentage =
            total > 0
                ? Math.round((packed / total) * 100)
                : 0;

        return {
            total,
            packed,
            percentage,
        };
    }, [categories]);

    /*
    |--------------------------------------------------------------------------
    | Toggle Checkbox
    |--------------------------------------------------------------------------
    */

    const handleToggleItem = (
        categoryId,
        itemId
    ) => {
        setCategories((previousCategories) =>
            previousCategories.map((category) => {
                if (category.id !== categoryId) {
                    return category;
                }

                return {
                    ...category,
                    items: category.items.map(
                        (item) =>
                            item.id === itemId
                                ? {
                                      ...item,
                                      checked:
                                          !item.checked,
                                  }
                                : item
                    ),
                };
            })
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Add Item
    |--------------------------------------------------------------------------
    */

    const handleAddItem = (categoryId) => {
        const category = categories.find(
            (item) => item.id === categoryId
        );

        if (!category) return;

        const itemName = window.prompt(
            `Add item to ${category.title}:`
        );

        if (!itemName || !itemName.trim()) {
            return;
        }

        const newItem = {
            id: `${categoryId}-${Date.now()}`,
            name: itemName.trim(),
            checked: false,
        };

        setCategories((previousCategories) =>
            previousCategories.map((category) =>
                category.id === categoryId
                    ? {
                          ...category,
                          items: [
                              ...category.items,
                              newItem,
                          ],
                      }
                    : category
            )
        );
    };

    /*
    |--------------------------------------------------------------------------
    | AI Suggest More
    |--------------------------------------------------------------------------
    */

    const handleSuggestMore = () => {
        setSuggestionMessage(
            "Consider packing a headlamp, thermal socks, sunglasses, and a reusable water bottle."
        );

        setTimeout(() => {
            setSuggestionMessage("");
        }, 5000);
    };

    /*
    |--------------------------------------------------------------------------
    | Circular Progress
    |--------------------------------------------------------------------------
    */

    const circleRadius = 40;
    const circleCircumference =
        2 * Math.PI * circleRadius;

    const progressOffset =
        circleCircumference -
        (progress.percentage / 100) *
            circleCircumference;

    return (
        <div
            className="
                min-h-screen
                flex
                flex-col
                bg-[var(--background)]
                text-[var(--on-background)]
                font-sans
            "
            style={{
                paddingTop: "80px",
            }}
        >
            <Layout>

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main
                className="
                    flex-grow
                    w-full
                    max-w-[1440px]
                    mx-auto
                    flex
                    flex-col
                    lg:flex-row
                "
                style={{
                    padding:
                        "64px 40px",
                    gap: "64px",
                }}
            >
                {/* =================================================
                    LEFT CONTENT
                ================================================= */}

                <div
                    className="
                        flex-1
                        flex
                        flex-col
                    "
                    style={{
                        gap: "64px",
                    }}
                >
                    {/* =================================================
                        HERO
                    ================================================= */}

                    <section
                        className="
                            flex
                            flex-col
                        "
                        style={{
                            gap: "8px",
                        }}
                    >
                        <h1
                            className="
                                font-bold
                                text-[var(--primary)]
                                tracking-tight
                            "
                            style={{
                                fontSize:
                                    "clamp(36px, 5vw, 48px)",
                                lineHeight: "1.1",
                            }}
                        >
                            Smart Packing List
                        </h1>

                        <p
                            className="
                                text-[var(--on-surface-variant)]
                            "
                            style={{
                                fontSize: "16px",
                                lineHeight: "1.6",
                            }}
                        >
                            AI-powered essentials
                            for your Alpine Escape.
                        </p>
                    </section>

                    {/* =================================================
                        SMART SUGGESTIONS
                    ================================================= */}

                    <section
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                        "
                        style={{
                            gap: "24px",
                        }}
                    >
                        {/* Weather */}

                        <div
                            className="
                                rounded-xl
                                flex
                                items-center
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                border
                                border-white/10
                            "
                            style={{
                                padding: "24px",
                                gap: "8px",
                                background:
                                    "var(--surface-bright)",
                                backdropFilter:
                                    "blur(30px)",
                                WebkitBackdropFilter:
                                    "blur(30px)",
                            }}
                        >
                            <Snowflake
                                size={24}
                                fill="currentColor"
                                className="
                                    text-[var(--tertiary)]
                                    shrink-0
                                "
                            />

                            <div>
                                <p
                                    className="
                                        uppercase
                                        tracking-wider
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        fontSize:
                                            "12px",
                                        lineHeight:
                                            "1",
                                        marginBottom:
                                            "6px",
                                    }}
                                >
                                    Weather
                                </p>

                                <p
                                    className="
                                        font-semibold
                                    "
                                    style={{
                                        fontSize:
                                            "16px",
                                    }}
                                >
                                    Snowy (-2°C)
                                </p>
                            </div>
                        </div>

                        {/* Duration */}

                        <div
                            className="
                                rounded-xl
                                flex
                                items-center
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                border
                                border-white/10
                            "
                            style={{
                                padding: "24px",
                                gap: "8px",
                                background:
                                    "rgba(39, 54, 71, 0.6)",
                                backdropFilter:
                                    "blur(30px)",
                                WebkitBackdropFilter:
                                    "blur(30px)",
                            }}
                        >
                            <Clock3
                                size={24}
                                className="
                                    text-[var(--primary)]
                                    shrink-0
                                "
                            />

                            <div>
                                <p
                                    className="
                                        uppercase
                                        tracking-wider
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        fontSize:
                                            "12px",
                                        lineHeight:
                                            "1",
                                        marginBottom:
                                            "6px",
                                    }}
                                >
                                    Duration
                                </p>

                                <p
                                    className="
                                        font-semibold
                                    "
                                    style={{
                                        fontSize:
                                            "16px",
                                    }}
                                >
                                    8 Days
                                </p>
                            </div>
                        </div>

                        {/* Activity */}

                        <div
                            className="
                                rounded-xl
                                flex
                                items-center
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                border
                                border-white/10
                            "
                            style={{
                                padding: "24px",
                                gap: "8px",
                                background:
                                    "rgba(39, 54, 71, 0.6)",
                                backdropFilter:
                                    "blur(30px)",
                                WebkitBackdropFilter:
                                    "blur(30px)",
                            }}
                        >
                            <Mountain
                                size={24}
                                fill="currentColor"
                                className="
                                    text-[var(--secondary)]
                                    shrink-0
                                "
                            />

                            <div>
                                <p
                                    className="
                                        uppercase
                                        tracking-wider
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        fontSize:
                                            "12px",
                                        lineHeight:
                                            "1",
                                        marginBottom:
                                            "6px",
                                    }}
                                >
                                    Activity
                                </p>

                                <p
                                    className="
                                        font-semibold
                                    "
                                    style={{
                                        fontSize:
                                            "16px",
                                    }}
                                >
                                    Hiking &amp; Skiing
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        PACKING CATEGORIES
                    ================================================= */}

                    <section
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                        "
                        style={{
                            gap: "24px",
                        }}
                    >
                        {categories.map(
                            (category) => {
                                const CategoryIcon =
                                    category.icon;

                                return (
                                    <div
                                        key={
                                            category.id
                                        }
                                        className="
                                            rounded-xl
                                            flex
                                            flex-col
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            border
                                            border-white/10
                                        "
                                        style={{
                                            padding:
                                                "24px",
                                            gap:
                                                "24px",
                                            background:
                                                "rgba(39, 54, 71, 0.6)",
                                            backdropFilter:
                                                "blur(30px)",
                                            WebkitBackdropFilter:
                                                "blur(30px)",
                                        }}
                                    >
                                        {/* Category Header */}

                                        <div
                                            className="
                                                flex
                                                justify-between
                                                items-center
                                                border-b
                                                border-[color:var(--outline-variant)]
                                                border-opacity-20
                                            "
                                            style={{
                                                paddingBottom:
                                                    "8px",
                                            }}
                                        >
                                            <h2
                                                className="
                                                    flex
                                                    items-center
                                                    font-semibold
                                                "
                                                style={{
                                                    gap:
                                                        "8px",
                                                    fontSize:
                                                        "24px",
                                                    lineHeight:
                                                        "1.2",
                                                }}
                                            >
                                                <CategoryIcon
                                                    size={
                                                        22
                                                    }
                                                    className="
                                                        text-[var(--primary)]
                                                        shrink-0
                                                    "
                                                />

                                                {
                                                    category.title
                                                }
                                            </h2>
                                        </div>

                                        {/* Items */}

                                        <ul
                                            className="
                                                flex
                                                flex-col
                                            "
                                            style={{
                                                gap:
                                                    "12px",
                                            }}
                                        >
                                            {category.items.map(
                                                (
                                                    item
                                                ) => (
                                                    <li
                                                        key={
                                                            item.id
                                                        }
                                                        className="
                                                            flex
                                                            items-center
                                                        "
                                                        style={{
                                                            gap:
                                                                "12px",
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                item.checked
                                                            }
                                                            onChange={() =>
                                                                handleToggleItem(
                                                                    category.id,
                                                                    item.id
                                                                )
                                                            }
                                                            className="
                                                                w-5
                                                                h-5
                                                                shrink-0
                                                                rounded
                                                                border
                                                                border-[var(--outline)]
                                                                bg-[var(--surface-container)]
                                                                accent-[var(--primary)]
                                                                focus:ring-2
                                                                focus:ring-[var(--primary)]
                                                                focus:ring-offset-2
                                                                focus:ring-offset-[var(--background)]
                                                                cursor-pointer
                                                            "
                                                            style={{
                                                                accentColor:
                                                                    "var(--primary)",
                                                            }}
                                                        />

                                                        <span
                                                            className={`
                                                                transition-all
                                                                duration-200
                                                                ${
                                                                    item.checked
                                                                        ? "line-through text-[var(--on-surface-variant)]"
                                                                        : "text-[var(--on-background)]"
                                                                }
                                                            `}
                                                            style={{
                                                                fontSize:
                                                                    "16px",
                                                                lineHeight:
                                                                    "1.6",
                                                            }}
                                                        >
                                                            {
                                                                item.name
                                                            }
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>

                                        {/* Add Item */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleAddItem(
                                                    category.id
                                                )
                                            }
                                            className="
                                                mt-auto
                                                flex
                                                items-center
                                                justify-center
                                                rounded-full
                                                border
                                                border-[var(--primary-container)]
                                                text-[var(--primary)]
                                                hover:bg-[var(--primary-container)]/10
                                                transition-colors
                                                font-medium
                                                tracking-wider
                                            "
                                            style={{
                                                gap:
                                                    "8px",
                                                padding:
                                                    "8px 16px",
                                                fontSize:
                                                    "12px",
                                            }}
                                        >
                                            <Plus
                                                size={
                                                    18
                                                }
                                            />

                                            Add Item
                                        </button>
                                    </div>
                                );
                            }
                        )}
                    </section>

                    {/* =================================================
                        AI SUGGEST MORE
                    ================================================= */}

                    <div
                        className="
                            flex
                            flex-col
                            items-center
                        "
                        style={{
                            marginTop: "-40px",
                        }}
                    >
                        <button
                            type="button"
                            onClick={
                                handleSuggestMore
                            }
                            className="
                                flex
                                items-center
                                rounded-full
                                text-white
                                uppercase
                                tracking-wider
                                font-medium
                                transition-transform
                                hover:scale-105
                                shadow-lg
                            "
                            style={{
                                gap: "8px",
                                padding:
                                    "12px 32px",
                                fontSize:
                                    "12px",
                                background:
                                    "linear-gradient(135deg, var(--primary) 0%, #fb923c 100%)",
                                textShadow:
                                    "0 1px 2px rgba(0,0,0,0.2)",
                            }}
                        >
                            <Sparkles
                                size={18}
                                fill="currentColor"
                            />

                            Suggest More Items
                        </button>

                        {suggestionMessage && (
                            <p
                                className="
                                    text-center
                                    text-[var(--on-surface-variant)]
                                "
                                style={{
                                    marginTop:
                                        "16px",
                                    maxWidth:
                                        "600px",
                                    padding:
                                        "0 16px",
                                    fontSize:
                                        "14px",
                                }}
                            >
                                {
                                    suggestionMessage
                                }
                            </p>
                        )}
                    </div>
                </div>

                {/* =================================================
                    SIDEBAR PROGRESS
                ================================================= */}

                <aside
                    className="
                        w-full
                        lg:w-80
                        shrink-0
                    "
                >
                    <div
                        className="
                            rounded-xl
                            sticky
                            top-28
                            flex
                            flex-col
                            items-center
                            border
                            border-white/10
                        "
                        style={{
                            padding: "24px",
                            gap: "24px",
                            background:
                                "rgba(39, 54, 71, 0.6)",
                            backdropFilter:
                                "blur(30px)",
                            WebkitBackdropFilter:
                                "blur(30px)",
                        }}
                    >
                        <h3
                            className="
                                text-center
                                font-semibold
                            "
                            style={{
                                fontSize:
                                    "24px",
                                lineHeight:
                                    "1.2",
                            }}
                        >
                            Packing Progress
                        </h3>

                        {/* Circular Progress */}

                        <div
                            className="
                                relative
                                w-48
                                h-48
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <svg
                                className="
                                    w-full
                                    h-full
                                    -rotate-90
                                "
                                viewBox="0 0 100 100"
                            >
                                {/* Background */}

                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    className="
                                        text-[var(--surface-container-high)]
                                    "
                                />

                                {/* Progress */}

                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={
                                        circleCircumference
                                    }
                                    strokeDashoffset={
                                        progressOffset
                                    }
                                    className="
                                        text-[var(--primary)]
                                        transition-all
                                        duration-500
                                    "
                                />
                            </svg>

                            <div
                                className="
                                    absolute
                                    flex
                                    flex-col
                                    items-center
                                "
                            >
                                <span
                                    className="
                                        font-bold
                                        text-[var(--primary)]
                                    "
                                    style={{
                                        fontSize:
                                            "48px",
                                        lineHeight:
                                            "1.1",
                                    }}
                                >
                                    {
                                        progress.percentage
                                    }
                                    %
                                </span>

                                <span
                                    className="
                                        text-[var(--on-surface-variant)]
                                        uppercase
                                        tracking-wider
                                    "
                                    style={{
                                        marginTop:
                                            "4px",
                                        fontSize:
                                            "12px",
                                    }}
                                >
                                    {
                                        progress.packed
                                    }
                                    /
                                    {
                                        progress.total
                                    }{" "}
                                    Packed
                                </span>
                            </div>
                        </div>

                        <p
                            className="
                                text-center
                                text-[var(--on-surface-variant)]
                            "
                            style={{
                                fontSize:
                                    "16px",
                                lineHeight:
                                    "1.6",
                            }}
                        >
                            {progress.percentage ===
                            100
                                ? "Everything is packed! You're ready for your Alpine Escape."
                                : "You're doing great! Don't forget your thermal layers for the cold alpine nights."}
                        </p>
                    </div>
                </aside>
            </main>

            </Layout>
        </div>
    );
}

export default PackingChecklist;