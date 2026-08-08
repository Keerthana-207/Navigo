import React, { useState, useMemo, useEffect } from "react";
import Layout from '../../components/Layout/Layout'
import { useTheme } from "../../context/ThemeContext";
// Self-contained SVG Icons
const Icons = {
    Sun: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    ),

    Moon: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    ),

    Bell: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    ),

    Calendar: () => (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M16 2v4" />
            <path d="M8 2v4" />
            <path d="M3 10h18" />
        </svg>
    ),

    Users: () => (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),

    Star: () => (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),

    Edit: () => (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
    ),

    Clock: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </svg>
    ),

    Plus: () => (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </svg>
    ),

    PlusSmall: () => (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </svg>
    ),

    Bed: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M3 7v10" />
            <path d="M21 7v10" />
            <path d="M3 12h18" />
            <path d="M5 12V9a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3" />
            <path d="M12 12V9a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3" />
        </svg>
    ),

    Food: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M3 2v20" />
            <path d="M8 2v20" />
            <path d="M3 7h5" />
            <path d="M16 2v7a4 4 0 0 0 4 4h1" />
            <path d="M21 2v20" />
            <path d="M16 13v9" />
        </svg>
    ),

    Plane: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M17.8 19.2 16 11l4.7-4.7a1 1 0 0 0-1.4-1.4L14.6 9.6 6.4 7.8 4 9l6 3-3 3-3-.5L3 16l5 1 1 5 1.5-3.4-.5-3 3-3 3 6Z" />
        </svg>
    ),

    Activity: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M3 12h4l3-9 4 18 3-9h4" />
        </svg>
    ),

    Tag: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M20.59 13.41 11 3.83V3H4v7h.83l9.58 9.59a2 2 0 0 0 2.83 0l3.35-3.35a2 2 0 0 0 0-2.83Z" />
            <circle cx="7.5" cy="6.5" r=".5" />
        </svg>
    ),

    Wallet: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M20 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v8a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7" />
            <path d="M16 13h2" />
        </svg>
    ),

    User: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
        </svg>
    ),

    BarChart: () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M3 3v18h18" />
            <path d="M7 16v-5" />
            <path d="M12 16V7" />
            <path d="M17 16v-8" />
        </svg>
    ),

    ArrowRight: () => (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    ),
};

const PALETTE = [
    "#3b82f6",
    "#f97316",
    "#ef4444",
    "#a855f7",
    "#14b8a6",
    "#eab308",
];

const initialCategories = [
    {
        id: "accommodation",
        name: "Accommodation",
        icon: "Bed",
        allocated: 20000,
        spent: 10000,
        color: "#3b82f6",
    },
    {
        id: "food",
        name: "Food & Dining",
        icon: "Food",
        allocated: 15000,
        spent: 11250,
        color: "#f97316",
    },
    {
        id: "transport",
        name: "Transport",
        icon: "Plane",
        allocated: 15000,
        spent: 13800,
        color: "#ef4444",
    },
    {
        id: "activities",
        name: "Activities",
        icon: "Activity",
        allocated: 10000,
        spent: 2000,
        color: "#a855f7",
    },
];

const initialExpenses = [
    {
        id: "1",
        category: "food",
        note: "Dinner at Britto's",
        amount: 3200,
        time: "2h ago",
    },
    {
        id: "2",
        category: "transport",
        note: "Taxi to Anjuna",
        amount: 850,
        time: "5h ago",
    },
    {
        id: "3",
        category: "activities",
        note: "Jet Ski Rental",
        amount: 2000,
        time: "1d ago",
    },
];

import { getMyTrips } from "../../services/tripApi";
import {
    getTripBudget,
    addExpense,
    addBudgetCategory,
} from "../../services/budgetApi";

export default function NavigoBudget() {
    const { isDark } = useTheme();
    const [trip, setTrip] = useState({
        destination: "Goa",
        days: 5,
        travelers: 3,
        style: "Standard Trip",
    });
    const [tripId, setTripId] = useState(null);
    const [loadingBudget, setLoadingBudget] = useState(true);

    const formatExpenseTime = (date) => {
    if (!date) return "Recently";

    const diff =
        Date.now() -
        new Date(date).getTime();

    const minutes = Math.floor(
        diff / 60000
    );

    if (minutes < 1) {
        return "Just now";
    }

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(
        minutes / 60
    );

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(
        hours / 24
    );

    return `${days}d ago`;
};

    useEffect(() => {
    async function loadActiveTrip() {
        try {
            setLoadingBudget(true);

            const res = await getMyTrips();

            if (
                res?.success &&
                Array.isArray(res.trips) &&
                res.trips.length > 0
            ) {
                const latest = res.trips[0];

                setTripId(latest._id);

                setTrip({
                    destination:
                        latest.destination || "Trip",

                    days:
                        Number(latest.duration) || 1,

                    travelers:
                        Number(latest.travelers) || 1,

                    style: `${latest.travelStyle || "Standard"} Trip`,
                });

                const budgetDetails =
                    latest.budgetDetails || {};

                const loadedCategories =
                    Array.isArray(
                        budgetDetails.categories
                    )
                        ? budgetDetails.categories
                        : [];

                const loadedExpenses =
                    Array.isArray(
                        budgetDetails.expenses
                    )
                        ? budgetDetails.expenses
                        : [];

                setCategories(
                    loadedCategories
                );

                setExpenses(
                    loadedExpenses.map(
                        (expense, index) => ({
                            id:
                                expense._id ||
                                `${Date.now()}-${index}`,

                            category:
                                expense.category,

                            note:
                                expense.note ||
                                "Expense",

                            amount:
                                Number(
                                    expense.amount
                                ) || 0,

                            time: formatExpenseTime(
                                expense.createdAt
                            ),
                        })
                    )
                );

                if (
                    loadedCategories.length > 0
                ) {
                    setSelectedCategory(
                        loadedCategories[0].id
                    );
                }
            }
        } catch (error) {
            console.error(
                "Budget load error:",
                error
            );
        } finally {
            setLoadingBudget(false);
        }
    }

    loadActiveTrip();
}, []);

    const [categories, setCategories] =
        useState(initialCategories);

    const [expenses, setExpenses] =
        useState(initialExpenses);

    const [selectedCategory, setSelectedCategory] =
        useState("food");

    const [expenseAmount, setExpenseAmount] =
        useState("");

    const [expenseNote, setExpenseNote] =
        useState("");

    const [saveStatus, setSaveStatus] =
        useState("Save Budget");

    const [showAllExpenses, setShowAllExpenses] =
        useState(false);

    const money = (n) =>
        Math.round(n || 0).toLocaleString("en-IN");

    const usageColor = (pct) => {
        if (pct >= 90) return "#ef4444";
        if (pct >= 70) return "#f97316";
        return "#3b82f6";
    };

    const totals = useMemo(() => {
        const allocated = categories.reduce(
            (sum, c) => sum + c.allocated,
            0
        );

        const spent = categories.reduce(
            (sum, c) => sum + c.spent,
            0
        );

        return {
            allocated,
            spent,
            remaining: allocated - spent,
            daily:
                trip.days > 0
                    ? allocated / trip.days
                    : 0,
            perPerson:
                trip.travelers > 0
                    ? allocated / trip.travelers
                    : 0,
            utilization:
                allocated > 0
                    ? Math.round(
                          (spent / allocated) * 100
                      )
                    : 0,
        };
    }, [categories, trip]);

    const donutGradient = useMemo(() => {
        if (totals.spent <= 0) {
            return "conic-gradient(#1e293b 0deg 360deg)";
        }

        let cumulative = 0;

        const stops = categories
            .filter((cat) => cat.spent > 0)
            .map((cat) => {
                const start =
                    (cumulative / totals.spent) *
                    360;

                cumulative += cat.spent;

                const end =
                    (cumulative / totals.spent) *
                    360;

                return `${cat.color} ${start}deg ${end}deg`;
            });

        return `conic-gradient(${stops.join(", ")})`;
    }, [categories, totals.spent]);

    const handleAddExpense = async (e) => {
    e.preventDefault();

    const amount = Number(expenseAmount);

    if (!tripId) {
        alert("No trip selected");
        return;
    }

    if (!selectedCategory) {
        alert("Please select a category");
        return;
    }

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const cat = categories.find(
        (c) => c.id === selectedCategory
    );

    const noteText =
        expenseNote.trim() ||
        (cat ? cat.name : "Expense");

    try {
        const res = await addExpense(
            tripId,
            {
                category: selectedCategory,
                note: noteText,
                amount,
            }
        );

        if (res.success) {
            setCategories(
                res.budgetDetails.categories
            );

            setExpenses(
                res.budgetDetails.expenses.map(
                    (expense, index) => ({
                        id:
                            expense._id ||
                            `${Date.now()}-${index}`,

                        category:
                            expense.category,

                        note:
                            expense.note ||
                            "Expense",

                        amount:
                            Number(
                                expense.amount
                            ),

                        time: formatExpenseTime(
                            expense.createdAt
                        ),
                    })
                )
            );

            setExpenseAmount("");
            setExpenseNote("");
        }
    } catch (error) {
        console.error(
            "Add expense error:",
            error
        );

        alert(
            error.message ||
                "Failed to add expense"
        );
    }
};

    const handleAddNewCategory = async () => {
    if (!tripId) {
        alert("No trip selected");
        return;
    }

    const name = window.prompt(
        "New category name:"
    );

    if (!name || !name.trim()) {
        return;
    }

    const allocatedStr = window.prompt(
        `Allocated budget for "${name.trim()}" (₹):`,
        "5000"
    );

    const allocated =
        Number(allocatedStr);

    if (!allocated || allocated <= 0) {
        return;
    }

    const color =
        PALETTE[
            categories.length %
                PALETTE.length
        ];

    try {
        const res =
            await addBudgetCategory(
                tripId,
                {
                    name: name.trim(),
                    allocated,
                    icon: "Tag",
                    color,
                }
            );

        if (res.success) {
            setCategories(
                res.budgetDetails.categories
            );

            const newCategory =
                res.budgetDetails.categories[
                    res.budgetDetails.categories.length - 1
                ];

            setSelectedCategory(
                newCategory.id
            );
        }
    } catch (error) {
        console.error(
            "Add category error:",
            error
        );

        alert(
            error.message ||
                "Failed to add category"
        );
    }
};

    const handleEditTrip = () => {
        const dest = window.prompt(
            "Destination:",
            trip.destination
        );

        const daysStr = window.prompt(
            "Trip duration (days):",
            trip.days.toString()
        );

        const travelersStr = window.prompt(
            "Number of travelers:",
            trip.travelers.toString()
        );

        setTrip({
            destination:
                dest && dest.trim()
                    ? dest.trim()
                    : trip.destination,

            days:
                daysStr &&
                parseFloat(daysStr) > 0
                    ? parseFloat(daysStr)
                    : trip.days,

            travelers:
                travelersStr &&
                parseFloat(travelersStr) > 0
                    ? parseFloat(
                          travelersStr
                      )
                    : trip.travelers,

            style: trip.style,
        });
    };

    const handleSaveBudget = () => {
        setSaveStatus("Saved ✓");

        setTimeout(
            () => setSaveStatus("Save Budget"),
            1400
        );
    };

    const visibleExpenses = showAllExpenses
        ? expenses
        : expenses.slice(0, 6);

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-sans transition-colors duration-300">
            <Layout>

            <main
                className="w-full mx-auto"
                style={{
                    padding:
                        "32px 48px 48px",
                }}
            >
               

                <div
                    className="relative rounded-3xl overflow-hidden min-h-[190px] flex flex-col justify-center text-orange-50 shadow-2xl bg-gradient-to-br from-[var(--primary-container)] via-[var(--primary-fixed-dim)] to-[var(--primary)]"
                    style={{
                        padding: "40px",
                    }}
                >
                    <svg
                        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
                        viewBox="0 0 800 200"
                        preserveAspectRatio="none"
                    >
                        <g fill="#050308">
                            <path d="M640 200 C636 150 645 120 660 100 C650 95 630 96 618 108 C622 90 640 74 662 70 C648 62 624 66 610 82 C608 62 622 40 648 30 C630 30 606 42 596 62 C600 40 618 20 644 12 C700 4 726 40 716 70 C744 66 762 84 762 108 C742 100 722 104 712 118 C700 108 682 106 670 118 C680 140 674 172 660 200 Z" />

                            <rect
                                x="654"
                                y="96"
                                width="10"
                                height="104"
                            />

                            <path d="M90 200 C86 160 94 132 108 116 C96 112 78 116 68 128 C70 110 86 96 106 92 C92 86 72 92 60 106 C60 86 74 66 98 58 C82 58 60 70 50 88 C56 66 74 48 98 42 C150 34 174 68 164 96 C190 92 206 108 206 130 C188 122 170 126 160 138 C150 128 134 128 124 138 C132 158 126 182 114 200 Z" />

                            <rect
                                x="102"
                                y="90"
                                width="9"
                                height="110"
                            />
                        </g>
                    </svg>

                    <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <div
                                className="flex flex-wrap items-center gap-2"
                                style={{
                                    marginBottom:
                                        "16px",
                                }}
                            >
                                <span className="flex items-center gap-1.5 text-xs font-semibold rounded-full bg-orange-500/90 backdrop-blur-md text-white"
                                    style={{
                                        padding:
                                            "4px 12px",
                                    }}
                                >
                                    {
                                        trip.destination
                                    }
                                </span>

                                <span className="flex items-center gap-1.5 text-xs font-semibold rounded-full bg-white/15 backdrop-blur-md text-white"
                                    style={{
                                        padding:
                                            "4px 12px",
                                    }}
                                >
                                    <Icons.Calendar />
                                    {trip.days} Days
                                </span>

                                <span className="flex items-center gap-1.5 text-xs font-semibold rounded-full bg-white/15 backdrop-blur-md text-white"
                                    style={{
                                        padding:
                                            "4px 12px",
                                    }}
                                >
                                    <Icons.Users />
                                    {
                                        trip.travelers
                                    } Travelers
                                </span>

                                <span className="flex items-center gap-1.5 text-xs font-semibold rounded-full bg-white/15 backdrop-blur-md text-white"
                                    style={{
                                        padding:
                                            "4px 12px",
                                    }}
                                >
                                    <Icons.Star />
                                    {trip.style}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={
                                handleEditTrip
                            }
                            className="flex items-center gap-2 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xs font-semibold hover:bg-white/20 transition-all"
                            style={{
                                padding:
                                    "8px 16px",
                            }}
                        >
                            <Icons.Edit />
                            Edit Trip
                        </button>
                    </div>

                    <div
                        className="relative z-10"
                        style={{
                            marginTop: "8px",
                        }}
                    >
                        <div
                            className="text-sm font-medium text-white/80"
                            style={{
                                marginBottom:
                                    "4px",
                            }}
                        >
                            Total Budget
                        </div>

                        <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                            ₹
                            {money(
                                totals.allocated
                            )}
                        </div>
                    </div>
                </div>

                {/* =================================================
                    SECTION HEADING
                ================================================= */}

                <div
                    className="flex items-center gap-2.5 text-lg font-bold"
                    style={{
                        marginTop: "36px",
                        marginBottom: "20px",
                    }}
                >
                    <Icons.Clock />
                    Budget Allocation
                </div>

                {/* =================================================
                    BODY GRID
                ================================================= */}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
                    {/* LEFT COLUMN */}

                    <div
                        className="flex flex-col gap-6"
                    >
                        {/* CATEGORY GRID */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {categories.map(
                                (cat) => {
                                    const pct =
                                        cat.allocated > 0
                                            ? Math.min(
                                                100,
                                                Math.round(
                                                    (Number(cat.spent || 0) /
                                                        Number(cat.allocated)) *
                                                        100
                                                )
                                            )
                                            : 0;

                                    const remaining =
                                        Number(cat.allocated || 0) -
                                        Number(cat.spent || 0);

                                    const barColor =
                                        usageColor(
                                            pct
                                        );

                                    const CategoryIcon =
                                        Icons[
                                            cat.icon
                                        ] ||
                                        Icons.Tag;

                                    return (
                                        <div
                                            key={
                                                cat.id
                                            }
                                            className="rounded-2xl border transition-all bg-[var(--card-bg)] border-[var(--card-border)]"
                                            style={{
                                                padding:
                                                    "20px",
                                            }}
                                        >
                                            <div
                                                className="flex items-center justify-between"
                                                style={{
                                                    marginBottom:
                                                        "16px",
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                                                        style={{
                                                            backgroundColor: `${cat.color}22`,
                                                            color: cat.color,
                                                        }}
                                                    >
                                                        <CategoryIcon />
                                                    </div>

                                                    <span className="text-sm font-bold">
                                                        {
                                                            cat.name
                                                        }
                                                    </span>
                                                </div>

                                                <span
                                                    className="text-[11px] font-bold rounded-full whitespace-nowrap"
                                                    style={{
                                                        padding:
                                                            "4px 10px",
                                                        backgroundColor: `${barColor}22`,
                                                        color: barColor,
                                                    }}
                                                >
                                                    {
                                                        pct
                                                    }
                                                    % used
                                                </span>
                                            </div>

                                            <div
                                                className="flex items-end justify-between"
                                                style={{
                                                    marginBottom:
                                                        "12px",
                                                }}
                                            >
                                                <div>
                                                    <div
                                                        className={`text-[11px] font-semibold uppercase tracking-wider ${
                                                            isDark
                                                                ? "text-slate-400"
                                                                : "text-slate-500"
                                                        }`}
                                                        style={{
                                                            marginBottom:
                                                                "4px",
                                                        }}
                                                    >
                                                        Spent /
                                                        Allocated
                                                    </div>

                                                    <div className="text-sm font-bold">
                                                        ₹
                                                        {money(
                                                            cat.spent
                                                        )}{" "}
                                                        / ₹
                                                        {money(
                                                            cat.allocated
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div
                                                        className={`text-[11px] font-semibold uppercase tracking-wider ${
                                                            isDark
                                                                ? "text-slate-400"
                                                                : "text-slate-500"
                                                        }`}
                                                        style={{
                                                            marginBottom:
                                                                "4px",
                                                        }}
                                                    >
                                                        Remaining
                                                    </div>

                                                    <div
                                                        className={`text-sm font-bold ${
                                                            remaining <
                                                            0
                                                                ? "text-red-500"
                                                                : ""
                                                        }`}
                                                    >
                                                        ₹
                                                        {money(
                                                            remaining
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="w-full h-1.5 rounded-full overflow-hidden bg-[var(--pill-bg)]"
                                            >
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${pct}%`,
                                                        backgroundColor:
                                                            barColor,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            )}

                            {/* ADD CATEGORY */}

                            <button
                                onClick={
                                    handleAddNewCategory
                                }
                                className="min-h-[150px] rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 text-xs font-semibold transition-all border-[var(--input-border)] text-[var(--text-secondary-plan)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                            >
                                <Icons.Plus />
                                New Category
                            </button>
                        </div>

                        {/* TRACK EXPENSE */}

                        <div
                            className="rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]"
                            style={{
                                padding: "28px",
                            }}
                        >
                            <h2
                                className="flex items-center gap-2.5 text-base font-bold"
                                style={{
                                    marginBottom:
                                        "20px",
                                }}
                            >
                                <Icons.PlusSmall />
                                Track a New Expense
                            </h2>

                            <div
                                className={`text-xs font-bold uppercase tracking-wider ${
                                    isDark
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                }`}
                                style={{
                                    marginBottom:
                                        "10px",
                                }}
                            >
                                Category
                            </div>

                            <div
                                className="flex flex-wrap gap-2"
                                style={{
                                    marginBottom:
                                        "24px",
                                }}
                            >
                                {categories.map(
                                    (cat) => {
                                        const isSelected =
                                            cat.id ===
                                            selectedCategory;

                                        return (
                                            <button
                                                key={
                                                    cat.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        cat.id
                                                    )
                                                }
                                                className={`text-xs font-semibold rounded-full border transition-all ${isSelected
                                                        ? "bg-orange-500/15 border-[var(--primary)] text-[var(--primary)]"
                                                        : "bg-[var(--pill-bg)] border-[var(--pill-border)] text-[var(--pill-text)] hover:border-[var(--outline)]"
                                                    }`}
                                                style={{
                                                    padding:
                                                        "8px 16px",
                                                }}
                                            >
                                                {
                                                    cat.name
                                                }
                                            </button>
                                        );
                                    }
                                )}

                                <button
                                    type="button"
                                    onClick={
                                        handleAddNewCategory
                                    }
                                    className="flex items-center gap-1.5 text-xs font-semibold rounded-full border border-dashed transition-all bg-[var(--pill-bg)] border-[var(--pill-border)] text-[var(--text-secondary-plan)] hover:text-[var(--primary)] hover:border-[var(--primary)]"
                                    style={{
                                        padding:
                                            "8px 16px",
                                    }}
                                >
                                    <Icons.PlusSmall />
                                    New Category
                                </button>
                            </div>

                            <form
                                onSubmit={
                                    handleAddExpense
                                }
                            >
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                                    style={{
                                        marginBottom:
                                            "24px",
                                    }}
                                >
                                    <div>
                                        <label
                                            className={`block text-xs font-bold uppercase tracking-wider ${
                                                isDark
                                                    ? "text-slate-400"
                                                    : "text-slate-500"
                                            }`}
                                            style={{
                                                marginBottom:
                                                    "10px",
                                            }}
                                        >
                                            Amount (₹)
                                        </label>

                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            min="0"
                                            step="1"
                                            value={
                                                expenseAmount
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setExpenseAmount(
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-xl border text-sm outline-none transition-all bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--input-border-focus)] focus:ring-2 focus:ring-orange-500/20"
                                            style={{
                                                padding:
                                                    "12px 16px",
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className={`block text-xs font-bold uppercase tracking-wider ${
                                                isDark
                                                    ? "text-slate-400"
                                                    : "text-slate-500"
                                            }`}
                                            style={{
                                                marginBottom:
                                                    "10px",
                                            }}
                                        >
                                            Note (Optional)
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="e.g. Seafood Dinner at Tito's"
                                            value={
                                                expenseNote
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setExpenseNote(
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-xl border text-sm outline-none transition-all bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--input-border-focus)] focus:ring-2 focus:ring-orange-500/20"
                                            style={{
                                                padding:
                                                    "12px 16px",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:brightness-105 active:scale-[0.98] transition-all"
                                        style={{
                                            padding:
                                                "12px 26px",
                                        }}
                                    >
                                        Add Expense
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* =================================================
                        RIGHT SIDEBAR
                    ================================================= */}

                    <div className="flex flex-col gap-4">
                        {/* STAT GRID */}

                        <div className="grid grid-cols-2 gap-3.5">
                            <StatCard
                                isDark={isDark}
                                icon={
                                    <Icons.Wallet />
                                }
                                label="Remaining"
                                value={`₹${money(
                                    totals.remaining
                                )}`}
                                valueClass={
                                    totals.remaining <
                                    0
                                        ? "text-red-500"
                                        : ""
                                }
                            />

                            <StatCard
                                isDark={isDark}
                                icon={
                                    <Icons.Clock />
                                }
                                label="Daily Budget"
                                value={`₹${money(
                                    totals.daily
                                )}`}
                            />

                            <StatCard
                                isDark={isDark}
                                icon={
                                    <Icons.User />
                                }
                                label="Cost Per Person"
                                value={`₹${money(
                                    totals.perPerson
                                )}`}
                            />

                            <StatCard
                                isDark={isDark}
                                icon={
                                    <Icons.BarChart />
                                }
                                label="Utilization"
                                value={`${totals.utilization}%`}
                            />
                        </div>

                        {/* SPEND DISTRIBUTION */}

                        <div
                            className="rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]"
                            style={{
                                padding: "20px",
                            }}
                        >
                            <h3
                                className={`text-xs font-bold tracking-wider uppercase ${
                                    isDark
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                }`}
                                style={{
                                    marginBottom:
                                        "16px",
                                }}
                            >
                                Spend Distribution
                            </h3>

                            <div
                                className="flex items-center justify-center"
                                style={{
                                    padding:
                                        "8px 0",
                                }}
                            >
                                <div
                                    className="w-[168px] h-[168px] rounded-full relative flex items-center justify-center transition-all duration-500"
                                    style={{
                                        background:
                                            donutGradient,
                                    }}
                                >
                                    <div
                                        className="w-[104px] h-[104px] rounded-full flex flex-col items-center justify-center bg-[var(--card-bg)]"
                                    >
                                        <span
                                            className={`text-[11px] font-semibold ${
                                                isDark
                                                    ? "text-slate-400"
                                                    : "text-slate-500"
                                            }`}
                                            style={{
                                                marginBottom:
                                                    "2px",
                                            }}
                                        >
                                            Spent
                                        </span>

                                        <span className="text-base font-extrabold">
                                            ₹
                                            {money(
                                                totals.spent
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="flex flex-wrap gap-x-4 gap-y-2 justify-center"
                                style={{
                                    marginTop: "12px",
                                }}
                            >
                                {categories
                                    .filter(
                                        (
                                            cat
                                        ) =>
                                            cat.spent >
                                            0
                                    )
                                    .map(
                                        (
                                            cat
                                        ) => (
                                            <div
                                                key={
                                                    cat.id
                                                }
                                                className="flex items-center gap-1.5 text-[11.5px] font-semibold"
                                            >
                                                <span
                                                    className="w-2 h-2 rounded-full shrink-0"
                                                    style={{
                                                        backgroundColor:
                                                            cat.color,
                                                    }}
                                                />

                                                <span
                                                    className={
                                                        isDark
                                                            ? "text-slate-300"
                                                            : "text-slate-700"
                                                    }
                                                >
                                                    {
                                                        cat.name
                                                    }
                                                </span>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>

                        {/* RECENT EXPENSES */}

                        <div
                            className="rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]"
                            style={{
                                padding: "20px",
                            }}
                        >
                            <h3
                                className={`text-xs font-bold tracking-wider uppercase ${
                                    isDark
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                }`}
                                style={{
                                    marginBottom:
                                        "16px",
                                }}
                            >
                                Recent Expenses
                            </h3>

                            <div className="divide-y divide-slate-200 dark:divide-[#232838]">
                                {visibleExpenses.map(
                                    (
                                        exp,
                                        idx
                                    ) => {
                                        const cat =
                                            categories.find(
                                                (
                                                    c
                                                ) =>
                                                    c.id ===
                                                    exp.category
                                            );

                                        const CategoryIcon =
                                            cat
                                                ? Icons[
                                                      cat
                                                          .icon
                                                  ] ||
                                                  Icons.Tag
                                                : Icons.Tag;

                                        return (
                                            <div
                                                key={
                                                    exp.id
                                                }
                                                className="py-3 flex items-start justify-between gap-3 first:pt-0 last:pb-0"
                                                style={{padding: '15px', paddingBottom: '0'}}
                                            >
                                                <div className="flex items-start gap-2.5">
                                                    <span
                                                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                                            idx ===
                                                            0
                                                                ? "bg-orange-500"
                                                                : isDark
                                                                ? "bg-slate-600"
                                                                : "bg-slate-400"
                                                        }`}
                                                    />

                                                    <div>
                                                        <div
                                                            className="text-xs font-bold"
                                                            style={{
                                                                marginBottom:
                                                                    "2px",
                                                                paddingBottom: "5px"
                                                            }}
                                                        >
                                                            {
                                                                exp.note
                                                            }
                                                        </div>

                                                        <div
                                                            className={`text-[11px] flex items-center gap-1 ${
                                                                isDark
                                                                    ? "text-slate-400"
                                                                    : "text-slate-500"
                                                            }`}
                                                        >
                                                            <CategoryIcon />

                                                            <span>
                                                                {cat
                                                                    ? cat.name
                                                                    : "Other"}
                                                            </span>

                                                            <span>
                                                                ·
                                                            </span>

                                                            <span>
                                                                {
                                                                    exp.time
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-xs font-bold text-red-500 whitespace-nowrap">
                                                    −₹
                                                    {money(
                                                        exp.amount
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            {expenses.length >
                                6 && (
                                <button
                                    onClick={() =>
                                        setShowAllExpenses(
                                            !showAllExpenses
                                        )
                                    }
                                    className="w-full text-center text-xs font-bold text-orange-500 hover:underline"
                                    style={{
                                        marginTop:
                                            "12px",
                                    }}
                                >
                                    {showAllExpenses
                                        ? "Show Less"
                                        : "View All History"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            </Layout>
        </div>
    );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
    isDark,
    icon,
    label,
    value,
    valueClass = "",
}) {
    return (
        <div
            className="rounded-xl text-center border bg-[var(--card-bg)] border-[var(--card-border)]"
            style={{
                padding: "16px",
            }}
        >
            <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto bg-[var(--pill-bg)] text-[var(--text-secondary-plan)]"
                style={{
                    marginBottom: "10px",
                }}
            >
                {icon}
            </div>

            <div
                className={`text-[11px] font-semibold ${
                    isDark
                        ? "text-slate-400"
                        : "text-slate-500"
                }`}
                style={{
                    marginBottom: "4px",
                }}
            >
                {label}
            </div>

            <div
                className={`text-base font-extrabold ${valueClass}`}
            >
                {value}
            </div>
        </div>
    );
}