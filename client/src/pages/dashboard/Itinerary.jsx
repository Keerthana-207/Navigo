import React, {
    useState,
    useRef,
    useMemo,
    useEffect
} from "react";

import { useParams } from "react-router-dom";

import {
    PlusIcon,
    SearchIcon
} from "lucide-react";

import Layout from "../../components/Layout/Layout";
import FilterTabs from "../../components/Itinerary/FilterTabs.jsx";
import PlaceCard from "../../components/Itinerary/PlaceCard";
import DayTabs from "../../components/Itinerary/DayTabs";
import DetailPanel from "../../components/Itinerary/DetailPanel";
import Schedule from "../../components/Itinerary/Schedule";
import ItineraryHero from "../../components/Itinerary/ItineraryHero";
import ItineraryFooter from "../../components/Itinerary/ItineraryFooter";

import {
    getTripById,
    getTripPlaces,
    generateTripItinerary
} from "../../services/tripApi.js";

const CATEGORIES = ["Beach", "Restaurant", "Shopping", "Adventure", "Historical"];
const FILTERS = ["All", "Beaches", "Restaurants", "Shopping", "Adventure", "Historical", "Planned", "Unplanned", "Visited", "Favorites"];
const FILTER_CATEGORY_MAP = { Beaches: "Beach", Restaurants: "Restaurant", Shopping: "Shopping", Adventure: "Adventure", Historical: "Historical" };
const PERIOD_ORDER = ["Morning", "Afternoon", "Evening", "Unscheduled"];

/* ============================================================
   HELPERS
============================================================ */
function fmtMoney(n) {
  return "₹" + Number(n || 0).toLocaleString("en-IN");
}
function parseTimeHour(t) {
  const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t || "");
  if (!m) return 12;
  let h = parseInt(m[1], 10);
  const isPM = /pm/i.test(m[3]);
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;
  return h;
}
function periodOf(place) {
  if (!place.time) return "Unscheduled";
  const h = parseTimeHour(place.time);
  if (h < 12) return "Morning";
  if (h < 17) return "Afternoon";
  return "Evening";
}

function PeriodTags({
    buckets,
    dragOverKey,
    setDragOverKey,
    activeDay,
    onDropTo,
    draggingId,
    onDragStartCard,
    onDragEndCard,
    selectedId,
    setSelectedId,
    onToggleVisited,
    fmtMoney
}) {
    const PERIOD_ORDER = [
        "Morning",
        "Afternoon",
        "Evening",
        "Unscheduled"
    ];

    return (
        <>
            {PERIOD_ORDER
                .filter((period) => buckets[period].length > 0)
                .map((period) => (
                    <div key={period}>

                        {/* Period Heading */}
                        <div
                            className="
                                text-[11.5px]
                                font-extrabold
                                tracking-[0.08em]
                                text-[var(--text-faint)]
                                uppercase
                            "
                            style={{
                                marginTop: "18px",
                                marginBottom: "10px"
                            }}
                        >
                            {period}
                        </div>

                        {/* Drop Area */}
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragOverKey(period);
                            }}
                            onDragLeave={() => {
                                setDragOverKey((key) =>
                                    key === period ? null : key
                                );
                            }}
                            onDrop={onDropTo(period, activeDay)}
                            className={`
                                flex
                                flex-col
                                gap-0.5
                                min-h-[60px]
                                rounded-xl
                                transition-colors
                                ${
                                    dragOverKey === period
                                        ? "bg-[var(--accent-soft)]"
                                        : ""
                                }
                            `}
                        >

                            {buckets[period].map((p) => (
                                <div
                                    key={p.id}
                                    draggable
                                    onDragStart={(e) => {
                                        onDragStartCard(p.id);

                                        e.dataTransfer.setData(
                                            "text/plain",
                                            String(p.id)
                                        );

                                        e.dataTransfer.effectAllowed = "move";
                                    }}
                                    onDragEnd={onDragEndCard}
                                    onClick={() => setSelectedId(p.id)}
                                    className={`
                                        bg-[var(--surface-2)]
                                        border
                                        rounded-xl
                                        cursor-grab
                                        transition-all
                                        border-l-[3px]
                                        ${
                                            selectedId === p.id
                                                ? "border-[var(--accent)] border-l-[var(--accent)]"
                                                : "border-[var(--border-soft)] border-l-transparent"
                                        }
                                        ${
                                            draggingId === p.id
                                                ? "opacity-40"
                                                : ""
                                        }
                                    `}
                                    style={{
                                        padding: "14px 16px",
                                        marginBottom: "12px"
                                    }}
                                >

                                    {/* Place Information */}
                                    <div
                                        className="
                                            flex
                                            items-start
                                            justify-between
                                            gap-3
                                        "
                                    >

                                        <div>
                                            <p
                                                className={`
                                                    text-[15px]
                                                    font-bold
                                                    m-0
                                                    mb-1
                                                    ${
                                                        p.status === "visited"
                                                            ? "text-[var(--text-faint)] line-through"
                                                            : "text-[var(--text)]"
                                                    }
                                                `}
                                            >
                                                {p.name}
                                            </p>

                                            <p
                                                className="
                                                    text-[12.5px]
                                                    text-[var(--text-faint)]
                                                    m-0
                                                "
                                            >
                                                {p.desc}
                                            </p>
                                        </div>

                                        {/* Visited Checkbox */}
                                        <label
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-[7px]
                                                text-xs
                                                text-[var(--text-dim)]
                                                whitespace-nowrap
                                                bg-[var(--surface)]
                                                border
                                                border-[var(--border)]
                                                rounded-lg
                                                shrink-0
                                            "
                                            style={{
                                                padding: "6px 10px"
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={
                                                    p.status === "visited"
                                                }
                                                onChange={(e) =>
                                                    onToggleVisited(
                                                        p.id,
                                                        e.target.checked
                                                    )
                                                }
                                                className="
                                                    w-3.5
                                                    h-3.5
                                                    accent-[var(--accent)]
                                                "
                                            />

                                            Mark as Visited
                                        </label>

                                    </div>

                                    {/* Time + Cost */}
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2.5
                                        "
                                        style={{
                                            marginTop: "12px"
                                        }}
                                    >

                                        {p.time && (
                                            <span
                                                className="
                                                    text-[11.5px]
                                                    font-bold
                                                    text-[var(--text-dim)]
                                                    bg-[var(--surface)]
                                                    border
                                                    border-[var(--border)]
                                                    rounded-[7px]
                                                    tabular-nums
                                                "
                                                style={{
                                                    padding: "6px 10px"
                                                }}
                                            >
                                                {p.time}

                                                {p.endTime
                                                    ? ` – ${p.endTime}`
                                                    : ""}
                                            </span>
                                        )}

                                        {!!p.estCost && (
                                            <span
                                                className="
                                                    text-[11.5px]
                                                    font-bold
                                                    text-[var(--accent)]
                                                    bg-[var(--accent-soft)]
                                                    rounded-[7px]
                                                "
                                                style={{
                                                    padding: "6px 10px"
                                                }}
                                            >
                                                Est: {fmtMoney(p.estCost)}
                                            </span>
                                        )}

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                ))}
        </>
    );
}



function ItineraryPlanner() {
  const [theme, setTheme] = useState("dark");
  const [places, setPlaces] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dirty, setDirty] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverKey, setDragOverKey] = useState(null);

  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const savedSnapshotRef = useRef("[]");
  const nextIdRef = useRef(7);

  const selected = useMemo(() => places.find((p) => p.id === selectedId) || null, [places, selectedId]);

  function markDirty() {
    setDirty(true);
  }

  function updatePlaces(updater) {
    setPlaces((prev) => {
      const next = updater(prev.map((p) => ({ ...p, essentials: p.essentials ? [...p.essentials] : [] })));
      return next;
    });
    markDirty();
  }

  function matchesFilter(p) {
    const f = activeFilter;
    if (f === "All") return true;
    if (f === "Planned") return p.status === "planned";
    if (f === "Unplanned") return p.status === "unplanned";
    if (f === "Visited") return p.status === "visited";
    if (f === "Favorites") return !!p.favorite;
    return p.category === FILTER_CATEGORY_MAP[f];
  }

  const filteredLibrary = useMemo(() => {
    const q = search.trim().toLowerCase();
    return places.filter((p) => matchesFilter(p) && (!q || p.name.toLowerCase().includes(q)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places, activeFilter, search]);

  const dayPlaces = useMemo(
    () => places.filter((p) => p.status !== "unplanned" && p.day === activeDay),
    [places, activeDay]
  );

  const buckets = useMemo(() => {
    const b = { Morning: [], Afternoon: [], Evening: [], Unscheduled: [] };
    dayPlaces.forEach((p) => b[periodOf(p)].push(p));
    return b;
  }, [dayPlaces]);

  /* ---------- actions ---------- */
  function addPlace(name) {
    const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const p = {
      id: nextIdRef.current++, name, category: cat, estCost: 0, actualCost: null, notes: "", duration: "",
      desc: "", status: "unplanned", day: null, time: null, endTime: null, favorite: false, essentials: [],
    };
    updatePlaces((prev) => [...prev, p]);
    setSelectedId(p.id);
  }

  function deletePlace(id) {
    if (!window.confirm("Delete this place from your trip?")) return;
    updatePlaces((prev) => prev.filter((p) => p.id !== id));
    setSelectedId((cur) => {
      if (cur !== id) return cur;
      const remaining = places.filter((p) => p.id !== id);
      return remaining[0] ? remaining[0].id : null;
    });
  }

  const PERIOD_TIMES = {
    Morning: "09:00 AM",
    Afternoon: "02:00 PM",
    Evening: "07:00 PM",
    Unscheduled: null
};

const onAssignToDay = (placeId, day, period) => {
    setPlaces((current) =>
        current.map((place) =>
            String(place.id) === String(placeId)
                ? {
                    ...place,
                    day,
                    period,
                    time: PERIOD_TIMES[period],
                    status: "planned"
                }
                : place
        )
    );

    markDirty();
};

  const onToggleVisited = (
      placeId,
      visited
  ) => {
      setPlaces((current) =>
          current.map((place) =>
              place.id === placeId
                  ? {
                      ...place,
                      status: visited
                          ? "visited"
                          : "planned"
                  }
                  : place
          )
      );
  };

  function updateField(id, field, value) {
    updatePlaces((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function toggleEssential(id, idx) {
    updatePlaces((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const essentials = p.essentials.map((es, i) => (i === idx ? { ...es, checked: !es.checked } : es));
        return { ...p, essentials };
      })
    );
  }

  function addEssential(id, label) {
    if (!label.trim()) return;
    updatePlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, essentials: [...(p.essentials || []), { label: label.trim(), checked: false }] } : p))
    );
  }

  function handleActualCost(id, raw) {
    const val = raw === "" ? null : parseFloat(raw);
    if (val != null && !isNaN(val)) {
      const category = places.find((p) => p.id === id)?.category;
      window.confirm(`Add ${fmtMoney(val)} to your Budget Tracker under "${category}"?`);
    }
    updateField(id, "actualCost", val != null && !isNaN(val) ? val : null);
  }

  function handleSave() {
    savedSnapshotRef.current = JSON.stringify(places);
    setDirty(false);
  }

  function handleDiscard() {
    if (!window.confirm("Discard all unsaved changes?")) return;
    setPlaces(JSON.parse(savedSnapshotRef.current));
    setDirty(false);
  }

  function handleExport() {
    const w = window.open("", "_blank");
    if (!w) return;
    const totalEst = places.reduce((s, p) => s + (p.estCost || 0), 0);
    const totalActual = places.reduce((s, p) => s + (p.actualCost || 0), 0);
    const esc = (s) => String(s || "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
    let daysHtml = "";
    for (let d = 1; d <= trip.days; d++) {
      const list = places.filter((p) => p.day === d && p.status !== "unplanned");
      daysHtml += `<h3>Day ${d}</h3>`;
      if (list.length === 0) {
        daysHtml += `<p style="color:#888">No places planned.</p>`;
        continue;
      }
      daysHtml += "<ul>";
      list.forEach((p) => {
        daysHtml += `<li><strong>${esc(p.name)}</strong> ${p.time ? `(${p.time}${p.endTime ? " - " + p.endTime : ""})` : ""}
          — ${p.status === "visited" ? "Visited" : "Planned"} ${p.estCost ? `— Est ${fmtMoney(p.estCost)}` : ""}
          ${p.notes ? `<br><em>${esc(p.notes)}</em>` : ""}</li>`;
      });
      daysHtml += "</ul>";
    }
    w.document.write(`
      <html><head><title>${esc(trip.name)} — Trip Plan</title>
      <style>body{font-family:Arial,sans-serif;padding:40px;color:#222;} h1{margin-bottom:0;} h3{border-bottom:1px solid #ddd;padding-bottom:4px;}
      ul{margin:0 0 16px;} .summary{background:#f5f5f5;padding:14px 18px;border-radius:10px;margin:20px 0;}</style>
      </head><body>
      <h1>${esc(trip.name)}</h1>
      <p>${trip.days} Days · ${trip.travelers} Travelers · Budget ${fmtMoney(trip.budget)}</p>
      <div class="summary">
        <strong>Budget Summary</strong><br>
        Estimated Total: ${fmtMoney(totalEst)}<br>
        Actual Spent: ${fmtMoney(totalActual)}<br>
        Places Completed: ${places.filter((p) => p.status === "visited").length} / ${places.length}
      </div>
      ${daysHtml}
      <script>window.onload = () => window.print();<\/script>
      </body></html>
    `);
    w.document.close();
  }

  async function handleRegenerateAI() {
    if (!tripId) return;
    try {
      setLoading(true);
      const generated = await generateTripItinerary(tripId);
      if (generated.success && generated.places) {
        const newPlaces = generated.places.map((place) => ({
          ...place,
          id: place._id || place.id,
          estCost: place.estimatedCost,
        }));
        setPlaces(newPlaces);
        savedSnapshotRef.current = JSON.stringify(newPlaces);
      }
    } catch (err) {
      alert(err.message || "Failed to regenerate itinerary");
    } finally {
      setLoading(false);
    }
  }

  /* ---------- derived: hero progress ---------- */
  const totalCount = places.length;
  const visitedCount = places.filter((p) => p.status === "visited").length;
  const heroPct = totalCount ? (visitedCount / totalCount) * 100 : 0;

  /* ---------- drag and drop ---------- */
  function onDragStartCard(id) {
    setDraggingId(id);
  }
  function onDragEndCard() {
    setDraggingId(null);
  }
  function onDropTo(key, day) {
    return (e) => {
        e.preventDefault();
        setDragOverKey(null);

        const id = e.dataTransfer.getData("text/plain");

        if (id) {
            onAssignToDay(id, day, key);
        }

        setDraggingId(null);
    };
}
  useEffect(() => {
    let cancelled = false;

    async function loadTrip() {
        try {
            setLoading(true);
            setError("");

            // ----------------------------------------
            // 1. Get Trip
            // ----------------------------------------

            const tripData = await getTripById(tripId);

            if (!tripData.success || !tripData.trip) {
                throw new Error("Trip not found");
            }

            let currentTrip = tripData.trip;

            if (cancelled) return;

            setTrip(currentTrip);


            // ----------------------------------------
            // 2. Get Existing Places
            // ----------------------------------------

            const placesData = await getTripPlaces(tripId);

            if (!placesData.success) {
                throw new Error(
                    placesData.message ||
                    "Failed to load places"
                );
            }

            let loadedPlaces = (placesData.places || []).map(
                (place) => ({
                    ...place,
                    id: place._id || place.id,
                    estCost:
                        place.estimatedCost ??
                        place.estCost ??
                        0,
                })
            );


            // ----------------------------------------
            // 3. Generate only when there are
            //    genuinely no existing places
            // ----------------------------------------

            if (
                loadedPlaces.length === 0 &&
                !currentTrip.itineraryGenerated
            ) {
                try {
                    console.log(
                        "No itinerary places found. Generating itinerary..."
                    );

                    const generated =
                        await generateTripItinerary(tripId);

                    if (
                        generated &&
                        generated.success &&
                        Array.isArray(generated.places)
                    ) {
                        loadedPlaces =
                            generated.places.map(
                                (place) => ({
                                    ...place,
                                    id:
                                        place._id ||
                                        place.id,
                                    estCost:
                                        place.estimatedCost ??
                                        place.estCost ??
                                        0,
                                })
                            );

                        currentTrip = {
                            ...currentTrip,
                            itineraryGenerated: true,
                        };

                        console.log(
                            "Itinerary generated successfully."
                        );
                    }
                } catch (generateError) {

                    // --------------------------------
                    // IMPORTANT:
                    // Backend says itinerary already
                    // exists -> fetch it again.
                    // --------------------------------

                    if (
                        generateError.message?.toLowerCase()
                            .includes("itinerary already exists")
                    ) {
                        console.log(
                            "Itinerary already exists. Loading existing itinerary..."
                        );

                        const existingPlacesData =
                            await getTripPlaces(tripId);

                        if (
                            existingPlacesData.success &&
                            Array.isArray(
                                existingPlacesData.places
                            )
                        ) {
                            loadedPlaces =
                                existingPlacesData.places.map(
                                    (place) => ({
                                        ...place,
                                        id:
                                            place._id ||
                                            place.id,
                                        estCost:
                                            place.estimatedCost ??
                                            place.estCost ??
                                            0,
                                    })
                                );

                            currentTrip = {
                                ...currentTrip,
                                itineraryGenerated: true,
                            };
                        } else {
                            throw new Error(
                                "Itinerary exists, but its places could not be loaded."
                            );
                        }
                    } else {
                        throw generateError;
                    }
                }
            }


            // ----------------------------------------
            // 4. Prevent state update after unmount
            // ----------------------------------------

            if (cancelled) return;


            // ----------------------------------------
            // 5. Set final state
            // ----------------------------------------

            setPlaces(loadedPlaces);

            setTrip(currentTrip);

            savedSnapshotRef.current =
                JSON.stringify(loadedPlaces);

            // Select first place if available
            if (
                loadedPlaces.length > 0 &&
                selectedId === null
            ) {
                setSelectedId(loadedPlaces[0].id);
            }

        } catch (error) {
            if (cancelled) return;

            console.error(
                "Load Itinerary Error:",
                error
            );

            setError(
                error.message ||
                "Failed to load itinerary."
            );
        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
    }

    if (tripId) {
        loadTrip();
    }

    return () => {
        cancelled = true;
    };

}, [tripId]);

if (loading) {
    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[var(--text-dim)]">
                    Loading itinerary...
                </p>
            </div>
        </Layout>
    );
}

if (error || !trip) {
    return (
        <Layout>
            <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-[var(--background)]
                    text-[var(--text)]
                "
            >
                <div
                    className="
                        text-center
                        max-w-[400px]
                    "
                >
                    <h2
                        className="text-xl font-bold"
                        style={{
                            marginBottom: "8px"
                        }}
                    >
                        Unable to Load Trip
                    </h2>

                    <p
                        className="
                            text-sm
                            text-[var(--text-dim)]
                        "
                    >
                        {error || "Trip not found."}
                    </p>
                </div>
            </div>
        </Layout>
    );
}
  return (
    <>
    <Layout>
    <div style={{padding: '40px 0'}} className="min-h-screen pb-10 bg-[var(--background)] text-[var(--text)] transition-colors duration-200 font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">      

      <div className="max-w-[1400px] mx-auto px-10 max-[640px]:px-[18px]" style={{margin: '0 auto', padding: '0 40px'}}>
        {/* ---------------- HERO ---------------- */}
        <ItineraryHero
            trip={trip}
            places={places}
          />
        

        {/* ---------------- MAIN GRID ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-[22px] mt-6 items-start" style={{marginTop: '24px'}}>
          {/* LIBRARY */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-[22px]" style={{ boxShadow: "var(--shadow)", padding: '22px' }}>
            <h2 className="text-[19px] font-extrabold m-0 mb-4" style={{marginBottom: '16px'}}>Places to Visit</h2>

            <div className="flex items-center gap-2 bg-[var(--surface-2)] border border-[var(--border)] rounded-[10px] px-3 py-2.5 mb-3.5" style={{padding: '10px 12px', marginBottom: '15px'}}>
              <SearchIcon className="shrink-0 text-[var(--text-faint)]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim()) {
                    addPlace(search.trim());
                    setSearch("");
                  }
                }}
                placeholder="Search or add a place"
                className="border-none bg-transparent outline-none text-[var(--text)] text-[13.5px] w-full placeholder:text-[var(--text-faint)]"
              />
            </div>

            <FilterTabs
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            <div className="flex flex-col gap-2.5 max-h-[560px] overflow-y-auto pr-0.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[var(--border)] [&::-webkit-scrollbar-thumb]:rounded-full" style={{paddingRight: '2px'}}>
              {filteredLibrary.length === 0 && (
                <div className="text-[var(--text-faint)] text-[13px] text-center py-[30px] px-2" style={{padding: '30px 8px'}}>No places found.</div>
              )}
              {filteredLibrary.map((p) => (
                  <PlaceCard
                      key={p.id}
                      place={p}
                      selected={selectedId === p.id}
                      dragging={draggingId === p.id}
                      onSelect={() => setSelectedId(p.id)}
                      onDelete={() => deletePlace(p.id)}
                      onDragStart={() => onDragStartCard(p.id)}
                      onDragEnd={onDragEndCard}
                  />
              ))}
            </div>

            <button
              onClick={() => {
                const name = window.prompt("Name of the place:");
                if (name && name.trim()) addPlace(name.trim());
              }}
              className="mt-3.5 w-full py-[11px] rounded-[10px] border border-dashed border-[var(--border)] bg-transparent text-[var(--text-dim)] text-[13px] font-semibold flex items-center justify-center gap-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              style={{marginTop: '15px'}}
            >
              <PlusIcon /> Add a place
            </button>
          </div>

          {/* SCHEDULE */}
            <div>
                <DayTabs
                    days={Number(trip?.duration) || Number(trip?.days) || 1}
                    activeDay={activeDay}
                    setActiveDay={setActiveDay}
                />

                <Schedule
                    trip={trip}
                    places={places}
                    activeDay={activeDay}
                    setActiveDay={setActiveDay}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    draggingId={draggingId}
                    setDraggingId={setDraggingId}
                    dragOverKey={dragOverKey}
                    setDragOverKey={setDragOverKey}
                    onAssignToDay={onAssignToDay}
                    onToggleVisited={onToggleVisited}
                />
            </div>


          {/* DETAIL */}
          <DetailPanel
              place={selected}
              allPlaces={places}
              onField={(field, value) =>
                  updateField(selected.id, field, value)
              }
              onToggleEssential={(idx) =>
                  toggleEssential(selected.id, idx)
              }
              onAddEssential={(label) =>
                  addEssential(selected.id, label)
              }
              onActualCost={(raw) =>
                  handleActualCost(selected.id, raw)
              }
          />
        </div>

        {/* ---------------- FOOTER ---------------- */}
        <ItineraryFooter
            dirty={dirty}
            onSave={handleSave}
            onDiscard={handleDiscard}
            onExport={handleExport}
        />
      </div>
    </div>
    </Layout>
    </>
  );
}


export default ItineraryPlanner;