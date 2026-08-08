import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../../services/tripApi";
import {TRIP_DURATION_OPTIONS, ACCOMMODATION_OPTIONS, TRANSPORT_OPTIONS, TRAVEL_STYLES} from "../../constants";
import Layout from "../../components/Layout/Layout";
import { MapPin, PiggyBank, HomeIcon, Plane, TrainFront, Car } from "lucide-react";
import { IoDiamondOutline } from "react-icons/io5";

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
  const [travelersCount, setTravelersCount] = useState(2);
  const [duration, setDuration] = useState(2);
  const [travelStyle, setTravelStyle] = useState("standard");
  const [transport, setTransport] = useState("flight");
  const [accommodation, setAccommodation] = useState("hotel");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();
const [creatingTrip, setCreatingTrip] = useState(false);
const [error, setError] = useState("");
  const styleIcons = {
    budget: (
      <PiggyBank size={25}/>
    ),
    standard: (
        <HomeIcon size={25}/> 
    ),
    luxury: (
        <IoDiamondOutline size={25}/>
    ),
  }

  const transportIcons = {
    "flight": (<Plane size={16}/>),
    "train": (<TrainFront size={16}/>),
    "car": (<Car size={16}/>) 
  }

  const handleContinue = async () => {
    if (!destination.trim()) {
        setError("Please enter a destination.");
        return;
    }

    setError("");
    setCreatingTrip(true);

    const tripData = {
        destination: destination.trim(),
        travelers: travelersCount,
        duration,
        travelStyle,
        budget: budget === "" ? null : Number(budget),
        transport,
        accommodation,
    };

    try {
        const data = await createTrip(tripData);

        /*
            Backend should return:

            {
                success: true,
                trip: {...}
            }
        */

        if (data.success && data.trip) {
            navigate(`/itinerary/${data.trip._id}`);
        }
    } catch (error) {
        console.error("Create Trip Error:", error);

        setError(
            error.message ||
            "Unable to create trip. Please try again."
        );
    } finally {
        setCreatingTrip(false);
    }
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
      <Layout>
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
                  {TRIP_DURATION_OPTIONS.map((chip) => (
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
                {TRAVEL_STYLES.map((s) => (
                  <StyleCard
                    key={s.type}
                    type={s.type}
                    label={s.label}
                    icon={styleIcons[s.type]}
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
                  {TRANSPORT_OPTIONS.map((t) => (
                    <TransportPill
                      key={t.type}
                      type={t.type}
                      label={t.label}
                      icon={transportIcons[t.type]}
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
                {ACCOMMODATION_OPTIONS.map((a) => (
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

            {error && (
                <p
                    role="alert"
                    style={{
                        marginTop: "18px",
                        marginBottom: "0",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        background: "rgba(239,68,68,0.10)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#ef4444",
                        fontSize: "13px",
                        fontWeight: "600",
                    }}
                >
                    {error}
                </p>
            )}

            {/* CTA */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={creatingTrip}
              className="
                  w-full
                  border-0
                  rounded-[14px]
                  cursor-pointer
                  text-base
                  font-bold
                  tracking-[0.01em]
                  text-white
                  transition-all
                  duration-150
                  hover:brightness-110
                  hover:-translate-y-[1px]
                  active:translate-y-0
                  active:scale-[0.99]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
              "
              style={{
                  marginTop: "28px",
                  padding: "17px",
                  background:
                      "linear-gradient(135deg,#f97316,#ea580c)",
                  boxShadow:
                      "0 12px 28px -10px rgba(249,115,22,0.55)",
              }}
          >
              {creatingTrip
                  ? "Creating Trip..."
                  : "Continue to Itinerary"}
          </button>
          </div>
        </div>
      </div>
      </Layout>
    </div>
  );
}

export default PlanTrip;