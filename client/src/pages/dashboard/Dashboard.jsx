import { useState, useEffect } from "react";
import { 
    Search, PlusCircle, Wallet, PlaneTakeoff, Heart, Backpack, 
    Sun, AlertTriangle, ShieldCheck, Leaf, ArrowRight, Calendar, MapPin, TrendingUp
} from "lucide-react";
import '../css/Dashboard.css';
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { getMyTrips } from "../../services/tripApi";

function ActionCard({ icon, title, description, onClick }) {
    return (
        <div
            className="action-card glass-card glass-hover-lift cursor-pointer transition-all duration-300"
            onClick={onClick}
        >
            <div className="action-card__icon text-[var(--primary)]">
                {icon}
            </div>
            <div className="action-card__content">
                <h3 className="text-[var(--on-surface)] font-bold">{title}</h3>
                <p className="text-[var(--on-surface-variant)] text-sm">{description}</p>
            </div>
        </div>
    );
}

function Dashboard() {
    const navigate = useNavigate();
    const [searchDest, setSearchDest] = useState("");
    
    const [user] = useState(() => {
        const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTrips() {
            try {
                const data = await getMyTrips();
                if (data.success) {
                    setTrips(data.trips || []);
                }
            } catch (error) {
                console.error("Failed to load trips:", error);
            } finally {
                setLoading(false);
            }
        }
        loadTrips();
    }, []);

    const activeTrip = trips.length > 0 ? trips[0] : null;

    // Computed scores for the active trip (or default overview)
    const readinessScore = activeTrip ? (activeTrip.travelReadinessScore || 78) : 85;
    const sustainabilityScore = activeTrip ? (activeTrip.sustainabilityScore || 82) : 88;
    const totalBudget = activeTrip?.budget || 50000;
    const spentBudget = activeTrip ? Math.round(totalBudget * 0.42) : 21000;
    const budgetHealth = Math.round((spentBudget / totalBudget) * 100);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchDest.trim()) {
            navigate(`/plan-trip?destination=${encodeURIComponent(searchDest)}`);
        } else {
            navigate('/plan-trip');
        }
    };

    return (
        <Layout>
            <main className="flex-grow pt-20 min-h-screen bg-[var(--background)] text-[var(--on-background)] transition-colors duration-300">

                {/* HERO SEARCH SECTION */}
                <section className="relative w-full h-[55vh] min-h-[460px] flex flex-col items-center justify-center px-6 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Bright travel sunrise"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKNb1yW3eLi1Ae5Z2dg0g4UxO1NPCaVycGImUSPdc0FGNeBEUGJadTg0HYqD7BlAmh5AZ59AG73hKAgJdWX8D4jLQHK1ACuqsMa_LLwqZobpTUKUiD577l6k5Z0a2fXJCeLBQ6gTUB9bEPGa1P9Suu7LJkUJ1KNif0-i2VeLchzqmjmdM6fYbSe8vlOR_E9r6H_8U0xMqo3fHElnQAxGqt2RFCyl48EwDmazjJ_Drwe3Xx92f3iUiAOQ"
                        />
                        <div className="absolute inset-0 backdrop-blur-[4px]" style={{ background: "var(--hero-overlay)" }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 50%, var(--background) 100%)" }} />
                    </div>

                    <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center">
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--on-surface)] tracking-tight mb-4 drop-shadow-md">
                            Where will your next adventure take you?
                        </h1>
                        <p className="text-base sm:text-lg text-[var(--on-surface-variant)] max-w-xl mb-8">
                            Plan your journey, manage your budget, and track travel readiness in one place.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl flex flex-col sm:flex-row items-center glass-card rounded-full shadow-2xl p-2 gap-3 border border-[var(--border)]">
                            <div className="flex-grow flex items-center w-full px-4">
                                <Search size={22} className="shrink-0 text-[var(--on-surface-variant)] mr-3" />
                                <input
                                    className="w-full bg-transparent border-none text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)] outline-none py-3 text-base"
                                    placeholder="Where to? (e.g. Goa, Paris, Tokyo)..."
                                    type="text"
                                    value={searchDest}
                                    onChange={(e) => setSearchDest(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold px-8 py-3.5 hover:scale-105 transition-transform shrink-0 shadow-lg"
                            >
                                Plan Trip
                            </button>
                        </form>
                    </div>
                </section>


                {/* SMART ALERTS BANNER */}
                <div className="max-w-7xl mx-auto px-6 mb-8">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                            <div>
                                <span className="font-bold text-amber-500 mr-2">Smart Emergency Advisory:</span>
                                <span className="text-[var(--on-surface)]">Light rain forecasted for Day 2 of your trip. Check packed gear.</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate('/weather')}
                            className="text-xs font-bold text-amber-500 underline hover:opacity-80 shrink-0"
                        >
                            View Weather Details →
                        </button>
                    </div>
                </div>


                {/* CENTRALIZED DASHBOARD METRICS GRID */}
                <section className="max-w-7xl mx-auto px-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* 1. TRAVEL READINESS SCORE METER */}
                        <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] shadow-lg hover:shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-[var(--on-surface)] flex items-center gap-2">
                                    <ShieldCheck className="text-orange-500" size={22} />
                                    Travel Readiness Score
                                </h3>
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-500">
                                    Ready to Go!
                                </span>
                            </div>

                            <div className="flex items-center justify-center my-6">
                                <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-8 border-orange-500/20 bg-orange-500/5">
                                    <div className="text-center">
                                        <span className="text-4xl font-black text-[var(--primary)]">{readinessScore}%</span>
                                        <p className="text-[11px] text-[var(--on-surface-variant)] font-semibold uppercase tracking-wider">Score</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between text-[var(--on-surface-variant)]">
                                    <span>Packing Progress</span>
                                    <span className="font-bold text-[var(--on-surface)]">85%</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-[var(--input-bg)] overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                                </div>

                                <div className="flex justify-between text-[var(--on-surface-variant)] pt-1">
                                    <span>Itinerary Scheduled</span>
                                    <span className="font-bold text-[var(--on-surface)]">70%</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-[var(--input-bg)] overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate('/packing-list')}
                                className="w-full mt-5 py-2.5 rounded-xl border border-[var(--border)] text-xs font-bold text-[var(--on-surface)] hover:bg-[var(--pill-bg)] transition-colors flex items-center justify-center gap-2"
                            >
                                Complete Checklist <ArrowRight size={14} />
                            </button>
                        </div>


                        {/* 2. BUDGET HEALTH METER */}
                        <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] shadow-lg hover:shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-[var(--on-surface)] flex items-center gap-2">
                                    <Wallet className="text-blue-500" size={22} />
                                    Budget Health Meter
                                </h3>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${budgetHealth > 90 ? 'bg-red-500/15 text-red-500' : 'bg-emerald-500/15 text-emerald-500'}`}>
                                    {budgetHealth > 90 ? 'High Spending' : 'Healthy'}
                                </span>
                            </div>

                            <div className="my-6 text-center">
                                <div className="text-3xl font-extrabold text-[var(--on-surface)]">
                                    ₹{spentBudget.toLocaleString()} <span className="text-sm text-[var(--on-surface-variant)] font-normal">/ ₹{totalBudget.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-[var(--on-surface-variant)] mt-1">42% of total budget spent so far</p>

                                <div className="w-full h-4 rounded-full bg-[var(--input-bg)] overflow-hidden mt-4 p-0.5 border border-[var(--border)]">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{ width: `${budgetHealth}%` }} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-center text-xs py-2">
                                <div className="p-2 rounded-xl bg-[var(--input-bg)]">
                                    <span className="block text-[var(--on-surface-variant)]">Lodging</span>
                                    <span className="font-bold text-[var(--on-surface)]">₹12,000</span>
                                </div>
                                <div className="p-2 rounded-xl bg-[var(--input-bg)]">
                                    <span className="block text-[var(--on-surface-variant)]">Food & Fun</span>
                                    <span className="font-bold text-[var(--on-surface)]">₹9,000</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate('/budget')}
                                className="w-full mt-3 py-2.5 rounded-xl border border-[var(--border)] text-xs font-bold text-[var(--on-surface)] hover:bg-[var(--pill-bg)] transition-colors flex items-center justify-center gap-2"
                            >
                                Open Budget Calculator <ArrowRight size={14} />
                            </button>
                        </div>


                        {/* 3. SUSTAINABILITY SCORE */}
                        <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] shadow-lg hover:shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-[var(--on-surface)] flex items-center gap-2">
                                    <Leaf className="text-emerald-500" size={22} />
                                    Sustainability Score
                                </h3>
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-500">
                                    Eco Badge 🌿
                                </span>
                            </div>

                            <div className="flex items-center justify-center my-6">
                                <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-8 border-emerald-500/20 bg-emerald-500/5">
                                    <div className="text-center">
                                        <span className="text-4xl font-black text-emerald-500">{sustainabilityScore}</span>
                                        <p className="text-[11px] text-[var(--on-surface-variant)] font-semibold uppercase tracking-wider">Eco Index</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400">
                                <span className="font-bold block mb-1">🌿 Eco Tip for Active Trip:</span>
                                Choosing train travel reduced your carbon emissions by 40% compared to flight!
                            </div>

                            <button 
                                onClick={() => navigate('/my-trips')}
                                className="w-full mt-4 py-2.5 rounded-xl border border-[var(--border)] text-xs font-bold text-[var(--on-surface)] hover:bg-[var(--pill-bg)] transition-colors flex items-center justify-center gap-2"
                            >
                                View Trip Progress <ArrowRight size={14} />
                            </button>
                        </div>

                    </div>
                </section>


                {/* ACTIVE / RECENT TRIP CARD */}
                {activeTrip && (
                    <section className="max-w-7xl mx-auto px-6 mb-12">
                        <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] px-3 py-1 rounded-full bg-[rgba(249,115,22,0.15)]">
                                    Active Trip
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--on-surface)] flex items-center gap-2">
                                    <MapPin className="text-[var(--primary)] shrink-0" size={28} />
                                    {activeTrip.destination}
                                </h2>
                                <p className="text-sm text-[var(--on-surface-variant)] flex items-center gap-4 flex-wrap">
                                    <span className="flex items-center gap-1.5"><Calendar size={16}/> {activeTrip.duration} Days</span>
                                    <span>•</span>
                                    <span>{activeTrip.travelers} Travelers</span>
                                    <span>•</span>
                                    <span className="capitalize">{activeTrip.travelStyle} Style</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
                                <button 
                                    onClick={() => navigate(`/itinerary/${activeTrip._id}`)}
                                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform"
                                >
                                    Interactive Itinerary
                                </button>
                            </div>
                        </div>
                    </section>
                )}


                {/* QUICK ACTIONS GRID */}
                <section className="dashboard-section bg-[var(--background)] text-[var(--on-background)] transition-colors duration-300 pb-16">
                    <h2 className="headline-lg text-center text-[var(--on-surface)] mb-8">
                        Centralized Trip Tools
                    </h2>

                    <div className="actions-grid">
                        <ActionCard
                            icon={<PlusCircle size={28} />}
                            title="New Trip"
                            description="Plan & organize destination and dates."
                            onClick={() => navigate('/plan-trip')}
                        />
                        <ActionCard
                            icon={<Wallet size={28} />}
                            title="Budget Calculator"
                            description="Smart expense tracking & budget health."
                            onClick={() => navigate('/budget')}
                        />
                        <ActionCard
                            icon={<PlaneTakeoff size={28} />}
                            title="My Trips"
                            description="Organize trips & track progress."
                            onClick={() => navigate('/my-trips')}
                        />
                        <ActionCard
                            icon={<Backpack size={28} />}
                            title="Packing Checklist"
                            description="Smart packet assistant & checklist."
                            onClick={() => navigate('/packing-list')}
                        />
                        <ActionCard
                            icon={<Sun size={28} />}
                            title="Weather Forecast"
                            description="Live forecast & travel advisories."
                            onClick={() => navigate('/weather')}
                        />
                    </div>
                </section>

            </main>
        </Layout>
    );
}

export default Dashboard;
