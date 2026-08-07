import { useState } from "react";
import {
  MapPin,
  Bell,
  Moon,
  Sun,
} from "lucide-react";

/* ─────────────────────────────────────
   Sub-components
───────────────────────────────────── */

function StepButton({ ariaLabel, onClick, children }) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className="
        flex h-[34px] w-[34px] items-center justify-center
        rounded-[9px] border-0
        bg-[var(--pill-bg)] text-[18px] text-[var(--text-primary)]
        cursor-pointer transition-all duration-150
        hover:bg-[var(--input-border)] active:scale-[0.92]
      "
    >
      {children}
    </button>
  );
}

function FieldInput({ children }) {
  return (
    <div
      className="
        w-full flex items-center gap-[10px]
        bg-[var(--input-bg)] border border-[var(--input-border)]
        rounded-xl
        transition-[border-color,box-shadow] duration-200
        focus-within:border-[var(--input-border-focus)]
        focus-within:ring-[3px] focus-within:ring-[rgba(79,124,255,0.12)]
      "
      style={{ padding: "13px 16px" }}
    >
      {children}
    </div>
  );
}

function TripChip({ name, selected, days, onClick }) {
  return (
    <span
      onClick={onClick}
      data-days={days}
      className={`
        text-xs font-semibold rounded-full border cursor-pointer
        transition-all duration-150
        ${
          selected
            ? "bg-gradient-to-br from-orange-500 to-orange-400 border-transparent text-white"
            : "bg-[var(--pill-bg)] border-[var(--pill-border)] text-[var(--pill-text)] hover:border-[var(--input-border-focus)]"
        }
      `}
      style={{ padding: "6px 12px" }}
    >
      {name}
    </span>
  );
}

function StyleCard({ type, label, icon, selected, onClick }) {
  const iconColorMap = {
    budget: "#4f7cff",
    standard: "#f97316",
    luxury: "#34d399",
  };
  const iconColor = selected ? "#f97316" : iconColorMap[type];

  return (
    <div
      onClick={onClick}
      data-style={type}
      className={`
        flex flex-col items-center gap-[10px] rounded-[14px]
        border-[1.5px] cursor-pointer
        transition-all duration-200
        ${
          selected
            ? "border-[#f97316] bg-[rgba(249,115,22,0.08)] shadow-[inset_0_0_0_1px_#f97316]"
            : "border-[var(--input-border)] bg-[var(--input-bg)] hover:border-[var(--input-border-focus)]"
        }
      `}
      style={{ padding: "20px 8px" }}
    >
      <span style={{ width: "22px", height: "22px", color: iconColor, display: "block" }}>
        {icon}
      </span>
      <span
        className="text-[13.5px] font-bold"
        style={{ color: selected ? "#f97316" : "var(--text-primary)" }}
      >
        {label}
      </span>
    </div>
  );
}

function TransportPill({ type, label, icon, selected, onClick }) {
  return (
    <span
      onClick={onClick}
      data-transport={type}
      className={`
        flex items-center gap-[6px] cursor-pointer rounded-[10px] border
        text-[12.5px] font-semibold
        transition-all duration-150
        ${
          selected
            ? "bg-[rgba(249,115,22,0.12)] border-[#f97316] text-[#f97316]"
            : "bg-[var(--pill-bg)] border-[var(--pill-border)] text-[var(--pill-text)] hover:border-[var(--input-border-focus)]"
        }
      `}
      style={{ padding: "9px 14px" }}
    >
      <span style={{ width: "14px", height: "14px", flexShrink: 0, display: "block" }}>{icon}</span>
      {label}
    </span>
  );
}

function SegButton({ text, data, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      data-acc={data}
      className={`
        flex-1 text-center text-[13px] font-bold rounded-[9px] cursor-pointer
        transition-all duration-200
        ${
          selected
            ? "bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-[0_6px_16px_-6px_rgba(249,115,22,0.6)]"
            : "text-[var(--text-secondary-plan)] hover:text-[var(--text-primary)]"
        }
      `}
      style={{ padding: "11px 8px" }}
    >
      {text}
    </div>
  );
}

/* ─────────────────────────────────────
   Main Page Component
───────────────────────────────────── */

function PlanTrip() {
  const [theme, setTheme] = useState("dark");
  const [travelersCount, setTravelersCount] = useState(2);
  const [duration, setDuration] = useState(2);
  const [travelStyle, setTravelStyle] = useState("standard");
  const [transport, setTransport] = useState("flight");
  const [accommodation, setAccommodation] = useState("hotel");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const CHIPS = [
    { name: "Weekend", days: 2 },
    { name: "3 Days", days: 3 },
    { name: "5 Days", days: 5 },
    { name: "1 Week", days: 7 },
  ];

  const STYLES = [
    {
      type: "budget",
      label: "Budget",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-1.5h3V20h4v-4c1-.5 2-1.5 2-3h1V9h-2c0-1-.5-1.7-1-2z"/>
          <path d="M2 9v1h3"/>
          <circle cx="8" cy="14" r="1.5"/>
        </svg>
      ),
    },
    {
      type: "standard",
      label: "Standard",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <path d="M9 18h6"/>
          <path d="M10 22h4"/>
          <path d="M12 2a7 7 0 0 0-4 12.7c.7.5 1 1.2 1 2.05V17h6v-2.25c0-.85.3-1.55 1-2.05A7 7 0 0 0 12 2z"/>
        </svg>
      ),
    },
    {
      type: "luxury",
      label: "Luxury",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <path d="M6 3h12l4 6-10 12L2 9z"/>
          <path d="M11 3 8 9l4 12 4-12-3-6"/>
          <path d="M2 9h20"/>
        </svg>
      ),
    },
  ];

  const TRANSPORTS = [
    {
      type: "flight",
      label: "Flight",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.7.8c-.4.5-.2 1.2.3 1.5L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 2.7 5.9c.3.5 1 .7 1.5.3l.8-.7c.4-.3.6-.8.5-1.3z"/>
        </svg>
      ),
    },
    {
      type: "train",
      label: "Train",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <rect x="4" y="3" width="16" height="14" rx="3"/>
          <path d="M4 11h16"/>
          <circle cx="8.5" cy="14.5" r="0.6" fill="currentColor"/>
          <circle cx="15.5" cy="14.5" r="0.6" fill="currentColor"/>
          <path d="m8 21-2 2M16 21l2 2"/>
        </svg>
      ),
    },
    {
      type: "car",
      label: "Car",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <path d="M5 17h14M5 17a2 2 0 1 1-4 0M5 17V9l2-4h10l2 4v8M19 17a2 2 0 1 0 4 0"/>
        </svg>
      ),
    },
  ];

  const ACCOMMODATIONS = [
    { data: "hotel", text: "Hotel" },
    { data: "homestay", text: "Homestay" },
    { data: "hostel", text: "Hostel" },
    { data: "camping", text: "Camping" },
  ];

  const handleContinue = () => {
    const tripData = {
      destination,
      travelers: travelersCount,
      duration,
      travelStyle,
      budget,
      transport,
      accommodation,
    };
    console.log("Trip Data:", tripData);
    // TODO: navigate to itinerary page with tripData
  };

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        color: "var(--text-primary)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        transition: "background 0.35s ease, color 0.35s ease",
      }}
    >
      {/* ── Header ── */}
      <header
        className="flex items-center justify-between"
        style={{
          padding: "28px 56px",
          background: "var(--header-bg)",
          borderBottom: "1px solid var(--header-border)",
          transition: "background 0.35s ease, border-color 0.35s ease",
        }}
      >
        {/* Logo */}
        <div
          className="text-[22px] font-extrabold tracking-[-0.02em]"
          style={{ color: "var(--logo-color)" }}
        >
          Navigo
        </div>

        {/* Nav */}
        <nav className="hidden md:flex" style={{ gap: "36px" }}>
          {["Home", "My Trips", "Budget"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[14px] font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
              style={{ color: "var(--text-secondary-plan)", paddingBottom: "6px", textDecoration: "none" }}
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            className="text-[14px] font-semibold relative"
            style={{ color: "var(--text-primary)", paddingBottom: "6px", textDecoration: "none" }}
          >
            Explore
            <span
              className="absolute left-0 right-0 rounded-[2px]"
              style={{
                bottom: "-2px",
                height: "2px",
                background: "linear-gradient(90deg,#4f7cff,#7aa2ff)",
              }}
            />
          </a>
        </nav>

        {/* Icons */}
        <div className="flex items-center" style={{ gap: "20px" }}>
          {/* Theme toggle */}
          <button
            id="theme-toggle"
            aria-label="Toggle theme"
            title="Toggle light / dark theme"
            onClick={toggleTheme}
            className="
              w-[36px] h-[36px] rounded-full flex items-center justify-center
              border-0 bg-transparent cursor-pointer
              transition-all duration-200
              hover:bg-[var(--pill-bg)]
            "
            style={{ color: "var(--text-secondary-plan)" }}
          >
            {theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}
          </button>

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="
              w-[36px] h-[36px] rounded-full flex items-center justify-center
              border-0 bg-transparent cursor-pointer
              transition-all duration-200
              hover:bg-[var(--pill-bg)]
            "
            style={{ color: "var(--text-secondary-plan)" }}
          >
            <Bell size={19} />
          </button>

          {/* Avatar */}
          <div
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#f97316,#fb923c)" }}
          >
            N
          </div>
        </div>
      </header>

      {/* ── Two-column page layout ── */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          maxWidth: "1300px",
          margin: "0 auto",
          minHeight: "calc(100vh - 85px)",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: Illustration + quote ── */}
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{ padding: "60px 40px", gap: "28px" }}
        >
          <div
            className="flex items-center justify-center"
            style={{ width: "280px", height: "280px" }}
          >
            <img
              src="/travel_tickets.svg"
              alt="Animated travel illustration"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="font-extrabold leading-[1.35] tracking-[-0.01em]"
            style={{
              fontSize: "26px",
              maxWidth: "400px",
              color: "var(--text-primary)",
            }}
          >
            "Every great journey begins with a single plan."
          </div>
          <div
            style={{
              fontSize: "14.5px",
              color: "var(--text-secondary-plan)",
              maxWidth: "340px",
              lineHeight: "1.6",
            }}
          >
            Navigo makes your exploration seamless, personalized, and unforgettable.
          </div>
        </div>

        {/* ── RIGHT: Form card ── */}
        <div
          className="flex justify-center"
          style={{ padding: "48px 40px" }}
        >
          <div
            className="w-full rounded-[22px] border"
            style={{
              maxWidth: "610px",
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
              padding: "40px 44px 44px",
              boxShadow: "var(--plan-shadow)",
              transition: "background 0.35s ease, border-color 0.35s ease",
            }}
          >
            <h1
              className="font-extrabold tracking-[-0.02em]"
              style={{ fontSize: "32px", marginBottom: "8px" }}
            >
              Plan Your Trip
            </h1>
            <p
              style={{
                fontSize: "14.5px",
                color: "var(--text-secondary-plan)",
                marginBottom: "28px",
              }}
            >
              Tell us a few details to personalize your journey.
            </p>

            {/* Destination */}
            <div style={{ marginBottom: "22px" }}>
              <label
                htmlFor="destination"
                className="block text-[13px] font-bold"
                style={{ marginBottom: "9px", color: "var(--text-primary)" }}
              >
                Destination
              </label>
              <FieldInput>
                <MapPin
                  style={{ width: "17px", height: "17px", flexShrink: 0, color: "var(--text-muted)" }}
                />
                <input
                  id="destination"
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none"
                  style={{
                    fontSize: "14.5px",
                    color: "var(--text-primary)",
                    fontFamily: "inherit",
                  }}
                />
              </FieldInput>
            </div>

            {/* Travelers + Duration */}
            <div
              className="grid grid-cols-2"
              style={{ gap: "20px", marginBottom: "22px" }}
            >
              {/* Travelers */}
              <div>
                <label
                  className="block text-[13px] font-bold"
                  style={{ marginBottom: "9px", color: "var(--text-primary)" }}
                >
                  Travelers
                </label>
                <div
                  className="flex items-center justify-between rounded-xl border"
                  style={{
                    background: "var(--input-bg)",
                    borderColor: "var(--input-border)",
                    padding: "8px 10px",
                  }}
                >
                  <StepButton
                    ariaLabel="Decrease travelers"
                    onClick={() => setTravelersCount((c) => Math.max(1, c - 1))}
                  >
                    −
                  </StepButton>
                  <span
                    id="travelers-count"
                    className="text-base font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {travelersCount}
                  </span>
                  <StepButton
                    ariaLabel="Increase travelers"
                    onClick={() => setTravelersCount((c) => Math.min(20, c + 1))}
                  >
                    +
                  </StepButton>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-[13px] font-bold"
                  style={{ marginBottom: "9px", color: "var(--text-primary)" }}
                >
                  Trip Duration
                </label>
                <FieldInput>
                  <input
                    id="duration"
                    type="text"
                    placeholder="Days"
                    readOnly
                    value={
                      duration === 2
                        ? "Weekend"
                        : duration === 7
                        ? "1 Week"
                        : `${duration} Days`
                    }
                    className="flex-1 bg-transparent border-none outline-none"
                    style={{
                      fontSize: "14.5px",
                      color: "var(--text-primary)",
                      fontFamily: "inherit",
                    }}
                  />
                </FieldInput>
                <div
                  className="flex flex-wrap"
                  style={{ gap: "8px", marginTop: "10px" }}
                >
                  {CHIPS.map((chip) => (
                    <TripChip
                      key={chip.days}
                      name={chip.name}
                      days={chip.days}
                      selected={duration === chip.days}
                      onClick={() => setDuration(chip.days)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Style */}
            <div style={{ marginBottom: "22px" }}>
              <label
                className="block text-[13px] font-bold"
                style={{ marginBottom: "9px", color: "var(--text-primary)" }}
              >
                Travel Style
              </label>
              <div className="grid grid-cols-3" style={{ gap: "14px" }}>
                {STYLES.map((s) => (
                  <StyleCard
                    key={s.type}
                    type={s.type}
                    label={s.label}
                    icon={s.icon}
                    selected={travelStyle === s.type}
                    onClick={() => setTravelStyle(s.type)}
                  />
                ))}
              </div>
            </div>

            {/* Budget + Transport */}
            <div
              className="grid grid-cols-2"
              style={{ gap: "20px", marginBottom: "22px" }}
            >
              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-[13px] font-bold"
                  style={{ marginBottom: "9px", color: "var(--text-primary)" }}
                >
                  Total Budget (Optional)
                </label>
                <FieldInput>
                  <span style={{ color: "var(--text-muted)", fontSize: "14.5px" }}>₹</span>
                  <input
                    id="budget"
                    type="text"
                    placeholder="Enter amount"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none"
                    style={{
                      fontSize: "14.5px",
                      color: "var(--text-primary)",
                      fontFamily: "inherit",
                    }}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "17px", height: "17px", flexShrink: 0, color: "var(--text-muted)" }}
                  >
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </FieldInput>
              </div>

              {/* Transport */}
              <div>
                <label
                  className="block text-[13px] font-bold"
                  style={{ marginBottom: "9px", color: "var(--text-primary)" }}
                >
                  Preferred Transport
                </label>
                <div
                  className="flex flex-wrap"
                  style={{ gap: "8px", marginTop: "10px" }}
                >
                  {TRANSPORTS.map((t) => (
                    <TransportPill
                      key={t.type}
                      type={t.type}
                      label={t.label}
                      icon={t.icon}
                      selected={transport === t.type}
                      onClick={() => setTransport(t.type)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Accommodation */}
            <div style={{ marginBottom: "0" }}>
              <label
                className="block text-[13px] font-bold"
                style={{ marginBottom: "9px", color: "var(--text-primary)" }}
              >
                Accommodation Preference
              </label>
              <div
                className="flex rounded-xl border"
                style={{
                  background: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  padding: "4px",
                  gap: "4px",
                }}
              >
                {ACCOMMODATIONS.map((a) => (
                  <SegButton
                    key={a.data}
                    text={a.text}
                    data={a.data}
                    selected={accommodation === a.data}
                    onClick={() => setAccommodation(a.data)}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleContinue}
              className="
                w-full border-0 rounded-[14px] cursor-pointer
                text-base font-bold tracking-[0.01em] text-white
                transition-all duration-150
                hover:brightness-110 hover:-translate-y-[1px]
                active:translate-y-0 active:scale-[0.99]
              "
              style={{
                marginTop: "28px",
                padding: "17px",
                background: "linear-gradient(135deg,#f97316,#ea580c)",
                boxShadow: "0 12px 28px -10px rgba(249,115,22,0.55)",
              }}
            >
              Continue to Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanTrip;