import { Search, PlusCircle, Wallet, PlaneTakeoff, Heart, Backpack } from "lucide-react";
import '../css/Dashboard.css'
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMyTrips } from "../../services/tripApi";

function ActionCard({
    icon,
    title,
    description,
    href = "#",
    onClick
}) {
    return (
        <a
            href={href}
            className="action-card glass-card glass-hover-lift"
            onClick={onClick}
        >
            <div className="action-card__icon">
                {icon}
            </div>

            <div className="action-card__content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </a>
    );
}

function Dashboard() {
    const navigate = useNavigate();
    
    const [user] = useState(() => {
        const storedUser =
            localStorage.getItem("user") ||
            sessionStorage.getItem("user");

        return storedUser
            ? JSON.parse(storedUser)
            : null;
    });

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTrips() {
            try {
                const data = await getMyTrips();

                if (data.success) {
                    setTrips(data.trips);
                }
            } catch (error) {
                console.error(
                    "Failed to load trips:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadTrips();
    }, []);
    return (
        <>
            <Layout>

            <main
                className="
                    flex-grow
                    pt-20
                    min-h-screen
                    bg-[var(--background)]
                    text-[var(--on-background)]
                    transition-colors
                    duration-300
                "
            >

                {/* ========================================
                    HERO SECTION
                ======================================== */}

                <section
                    className="
                        relative
                        w-full
                        h-[60vh]
                        min-h-[500px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        px-container-padding
                        overflow-hidden
                    "
                >

                    {/* Background Image */}

                    <div className="absolute inset-0 z-0">

                        <img
                            alt="Bright sunrise over a mountain lake"
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKNb1yW3eLi1Ae5Z2dg0g4UxO1NPCaVycGImUSPdc0FGNeBEUGJadTg0HYqD7BlAmh5AZ59AG73hKAgJdWX8D4jLQHK1ACuqsMa_LLwqZobpTUKUiD577l6k5Z0a2fXJCeLBQ6gTUB9bEPGa1P9Suu7LJkUJ1KNif0-i2VeLchzqmjmdM6fYbSe8vlOR_E9r6H_8U0xMqo3fHElnQAxGqt2RFCyl48EwDmazjJ_Drwe3Xx92f3iUiAOQ"
                        />

                        {/* Theme Overlay */}

                        <div
                            className="
                                absolute
                                inset-0
                                backdrop-blur-[4px]
                            "
                            style={{
                                background:
                                    "var(--hero-overlay)"
                            }}
                        />

                        {/* Bottom Fade */}

                        <div
                            className="
                                absolute
                                inset-0
                                pointer-events-none
                            "
                            style={{
                                background:
                                    "linear-gradient(to bottom, transparent 55%, var(--background) 100%)"
                            }}
                        />

                    </div>


                    {/* Hero Content */}

                    <div
                        className="
                            relative
                            z-10
                            w-full
                            max-w-3xl
                            mx-auto
                            text-center
                            flex
                            flex-col
                            items-center
                        "
                    >

                        <h1
                            className="
                                font-display-lg
                                display-lg-mobile
                                md:display-lg
                                text-[var(--on-surface)]
                                drop-shadow-sm
                                transition-colors
                                duration-300
                            "
                            style={{
                                marginBottom: "24px"
                            }}
                        >
                            Where will your next adventure take you?
                        </h1>


                        <p
                            className="
                                font-body-md
                                text-body-md
                                text-[var(--on-surface-variant)]
                                max-w-xl
                                transition-colors
                                duration-300
                            "
                            style={{
                                marginBottom: "40px"
                            }}
                        >
                            Plan your journey, manage your budget,
                            and create unforgettable experiences.
                        </p>


                        {/* Search */}

                        <div
                            className="
                                w-full
                                max-w-2xl
                                flex
                                flex-col
                                sm:flex-row
                                items-center
                                glass-card
                                rounded-full
                                shadow-lg
                                transition-all
                                duration-300
                            "
                            style={{
                                padding: "8px",
                                gap: "16px"
                            }}
                        >

                            <div
                                className="
                                    flex-grow
                                    flex
                                    items-center
                                    w-full
                                "
                                style={{
                                    padding: "0 16px"
                                }}
                            >

                                <Search
                                    size={20}
                                    className="
                                        shrink-0
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        marginRight: "12px"
                                    }}
                                />

                                <input
                                    className="
                                        w-full
                                        bg-transparent
                                        border-none
                                        text-[var(--on-surface)]
                                        placeholder:text-[var(--on-surface-variant)]
                                        outline-none
                                        focus:outline-none
                                        focus:ring-0
                                    "
                                    style={{
                                        padding: "12px 0"
                                    }}
                                    placeholder="Enter your destination..."
                                    type="text"
                                />

                            </div>


                            <button
                                className="
                                    primary-gradient-btn
                                    text-white
                                    rounded-full
                                    font-bold
                                    tracking-wide
                                    hover:scale-105
                                    transition-transform
                                    duration-300
                                    w-full
                                    sm:w-auto
                                    flex-shrink-0
                                    whitespace-nowrap
                                "
                                style={{
                                    padding: "16px 32px"
                                }}
                            >
                                Start Planning
                            </button>

                        </div>

                    </div>

                </section>


                {/* ========================================
                    QUICK ACTIONS
                ======================================== */}

                <section
                    className="
                        dashboard-section
                        bg-[var(--background)]
                        text-[var(--on-background)]
                        transition-colors
                        duration-300
                    "
                >

                    <h2
                        className="
                            headline-lg
                            text-center
                            text-[var(--on-surface)]
                        "
                    >
                        Quick Actions
                    </h2>


                    <div className="actions-grid">

                        <ActionCard
                            icon={<PlusCircle />}
                            title="New Trip"
                            description="Start a blank canvas."
                            onClick={() => navigate('/plan-trip')}
                        />

                        <ActionCard
                            icon={<Wallet />}
                            title="Budget Calculator"
                            description="Estimate costs accurately."
                        />

                        <ActionCard
                            icon={<PlaneTakeoff />}
                            title="My Trips"
                            description="View active itineraries."
                        />

                        <ActionCard
                            icon={<Heart />}
                            title="Saved Places"
                            description="Inspirations & bookmarks."
                        />

                        <ActionCard
                            icon={<Backpack />}
                            title="Packing List"
                            description="Never forget essentials."
                        />

                    </div>

                </section>

            </main>

        </Layout>
        </>
    );
}

export default Dashboard;

