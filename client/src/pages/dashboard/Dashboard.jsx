import Navbar from "../../components/Navbar/Navbar";
import { Search, PlusCircle, Wallet, PlaneTakeoff, Heart, Backpack } from "lucide-react";
import '../css/Dashboard.css'

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
    const user = {
        name: "Krishna",
        avatar: "https://i.pravatar.cc/150?img=3"
    };

    return (
        <>
            <Navbar user={user} />
            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col items-center justify-center px-container-padding overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            alt="Bright sunrise over a mountain lake" 
                            className="w-full h-full object-cover" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKNb1yW3eLi1Ae5Z2dg0g4UxO1NPCaVycGImUSPdc0FGNeBEUGJadTg0HYqD7BlAmh5AZ59AG73hKAgJdWX8D4jLQHK1ACuqsMa_LLwqZobpTUKUiD577l6k5Z0a2fXJCeLBQ6gTUB9bEPGa1P9Suu7LJkUJ1KNif0-i2VeLchzqmjmdM6fYbSe8vlOR_E9r6H_8U0xMqo3fHElnQAxGqt2RFCyl48EwDmazjJ_Drwe3Xx92f3iUiAOQ"
                        />
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[4px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface"></div>
                    </div>
                    {/* Content */}
                    <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center">
                        <h1
                            className="font-display-lg display-lg-mobile md:display-lg text-slate-900 mb-6 drop-shadow-sm"
                        >
                            Where will your next adventure take you?
                        </h1>
                        <p
                            className="font-body-md text-body-md text-slate-700 mb-10 max-w-xl"
                        >
                            Plan your journey, manage your budget, and create unforgettable experiences.
                        </p>
                        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4 p-2 glass-card rounded-full shadow-lg">
                            <div className="flex-grow flex items-center px-4 w-full">
                                <span className="material-symbols-outlined text-slate-400 mr-3"><Search /></span>
                                <input
                                    className="
                                        w-full
                                        bg-transparent
                                        border-none
                                        text-slate-900
                                        placeholder:text-slate-500
                                        py-3
                                        px-0
                                        outline-none
                                        focus:outline-none
                                        focus:ring-0
                                        focus:border-none
                                        focus:shadow-none
                                    "
                                    placeholder="Enter your destination..."
                                    type="text"
                                    />
                            </div>
                            <button className="primary-gradient-btn text-white rounded-full px-8 py-4 font-bold tracking-wide hover:scale-105 transition-transform duration-300 w-full sm:w-auto flex-shrink-0 whitespace-nowrap">
                                Start Planning
                            </button>
                        </div>
                    </div>
                </section>
               <section className="dashboard-section">

                    <h2 className="headline-lg text-center">
                        Quick Actions
                    </h2>

                    <div className="actions-grid">

                        <ActionCard
                            icon={<PlusCircle />}
                            title="New Trip"
                            description="Start a blank canvas."
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
            
        </>
    );
}

export default Dashboard;

