import React, { useState, useMemo } from 'react';

// Self-contained SVG Icons
const Icons = {
  Sun: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-3 h-3">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-orange-500">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  PlusSmall: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Bed: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Food: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
      <path d="M3 2v7c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V2M7 2v20M17 2a5 5 0 0 0-5 5v6h4v9" />
    </svg>
  ),
  Plane: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.7.8c-.4.5-.2 1.2.3 1.5L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 2.7 5.9c.3.5 1 .7 1.5.3l.8-.7c.4-.3.6-.8.5-1.3z" />
    </svg>
  ),
  Activity: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="m6 21 3.5-6L8 12l1-4 3 2 3.5-1M9.5 15l3 1 2.5 5" />
    </svg>
  ),
  Tag: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
      <path d="M20.6 12.6 12 21.2 2.8 12A2 2 0 0 1 2.2 10.6L3 3l7.6-.8a2 2 0 0 1 1.4.6l8.6 8.6a2 2 0 0 1 0 2.2z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  ),
  Wallet: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M2 10h20" />
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a7 7 0 0 1 14 0v1" />
    </svg>
  ),
  BarChart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

const PALETTE = ['#3b82f6', '#f97316', '#ef4444', '#a855f7', '#14b8a6', '#eab308'];

const initialCategories = [
  { id: 'accommodation', name: 'Accommodation', icon: 'Bed', allocated: 20000, spent: 10000, color: '#3b82f6' },
  { id: 'food', name: 'Food & Dining', icon: 'Food', allocated: 15000, spent: 11250, color: '#f97316' },
  { id: 'transport', name: 'Transport', icon: 'Plane', allocated: 15000, spent: 13800, color: '#ef4444' },
  { id: 'activities', name: 'Activities', icon: 'Activity', allocated: 10000, spent: 2000, color: '#a855f7' },
];

const initialExpenses = [
  { id: '1', category: 'food', note: "Dinner at Britto's", amount: 3200, time: '2h ago' },
  { id: '2', category: 'transport', note: 'Taxi to Anjuna', amount: 850, time: '5h ago' },
  { id: '3', category: 'activities', note: 'Jet Ski Rental', amount: 2000, time: '1d ago' },
];

export default function NavigoBudget() {
  const [isDark, setIsDark] = useState(true);
  const [trip, setTrip] = useState({
    destination: 'Goa',
    days: 5,
    travelers: 3,
    style: 'Standard Trip',
  });
  const [categories, setCategories] = useState(initialCategories);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseNote, setExpenseNote] = useState('');
  const [saveStatus, setSaveStatus] = useState('Save Budget');
  const [showAllExpenses, setShowAllExpenses] = useState(false);

  // Formatting helpers
  const money = (n) => Math.round(n || 0).toLocaleString('en-IN');

  const usageColor = (pct) => {
    if (pct >= 90) return '#ef4444';
    if (pct >= 70) return '#f97316';
    return '#3b82f6';
  };

  // Calculations
  const totals = useMemo(() => {
    const allocated = categories.reduce((sum, c) => sum + c.allocated, 0);
    const spent = categories.reduce((sum, c) => sum + c.spent, 0);
    return {
      allocated,
      spent,
      remaining: allocated - spent,
      daily: trip.days > 0 ? allocated / trip.days : 0,
      perPerson: trip.travelers > 0 ? allocated / trip.travelers : 0,
      utilization: allocated > 0 ? Math.round((spent / allocated) * 100) : 0,
    };
  }, [categories, trip]);

  // Donut chart style calculation
  const donutGradient = useMemo(() => {
    if (totals.spent <= 0) return 'conic-gradient(#1e293b 0deg 360deg)';
    let cumulative = 0;
    const stops = categories
      .filter((cat) => cat.spent > 0)
      .map((cat) => {
        const start = (cumulative / totals.spent) * 360;
        cumulative += cat.spent;
        const end = (cumulative / totals.spent) * 360;
        return `${cat.color} ${start}deg ${end}deg`;
      });
    return `conic-gradient(${stops.join(', ')})`;
  }, [categories, totals.spent]);

  // Event handlers
  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);

    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const cat = categories.find((c) => c.id === selectedCategory);
    const noteText = expenseNote.trim() || (cat ? cat.name : 'Expense');

    // Update categories
    setCategories((prev) =>
      prev.map((c) => (c.id === selectedCategory ? { ...c, spent: c.spent + amount } : c))
    );

    // Add to recent expenses
    setExpenses((prev) => [
      {
        id: Date.now().toString(),
        category: selectedCategory,
        note: noteText,
        amount: amount,
        time: 'Just now',
      },
      ...prev,
    ]);

    setExpenseAmount('');
    setExpenseNote('');
  };

  const handleAddNewCategory = () => {
    const name = window.prompt('New category name:');
    if (!name || !name.trim()) return;
    const allocatedStr = window.prompt(`Allocated budget for "${name.trim()}" (₹):`, '5000');
    const allocated = parseFloat(allocatedStr);
    if (!allocated || allocated <= 0) return;

    const id = name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const color = PALETTE[categories.length % PALETTE.length];
    const newCat = {
      id,
      name: name.trim(),
      icon: 'Tag',
      allocated,
      spent: 0,
      color,
    };

    setCategories((prev) => [...prev, newCat]);
    setSelectedCategory(id);
  };

  const handleEditTrip = () => {
    const dest = window.prompt('Destination:', trip.destination);
    const daysStr = window.prompt('Trip duration (days):', trip.days.toString());
    const travelersStr = window.prompt('Number of travelers:', trip.travelers.toString());

    setTrip({
      destination: dest && dest.trim() ? dest.trim() : trip.destination,
      days: daysStr && parseFloat(daysStr) > 0 ? parseFloat(daysStr) : trip.days,
      travelers: travelersStr && parseFloat(travelersStr) > 0 ? parseFloat(travelersStr) : trip.travelers,
      style: trip.style,
    });
  };

  const handleSaveBudget = () => {
    setSaveStatus('Saved ✓');
    setTimeout(() => setSaveStatus('Save Budget'), 1400);
  };

  const visibleExpenses = showAllExpenses ? expenses : expenses.slice(0, 6);

  return (
    <div className={`${isDark ? 'dark bg-[#0a0d16] text-[#eef0f8]' : 'bg-[#eef0f6] text-[#161a23]'} min-h-screen font-sans transition-colors duration-300`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-6 md:px-12 py-6 border-b transition-colors duration-300 ${isDark ? 'bg-[#0a0d16] border-[#1c2130]' : 'bg-white border-[#e5e8f0]'}`}>
        <div className="text-2xl font-extrabold tracking-tight text-orange-500">Navigo</div>

        <nav className="hidden md:flex gap-9">
          <a href="#" className={`text-sm font-medium transition-colors hover:text-orange-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Home</a>
          <a href="#" className={`text-sm font-medium transition-colors hover:text-orange-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>My Trips</a>
          <a href="#" className={`text-sm font-semibold relative pb-1.5 text-orange-500 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-amber-400 after:rounded-full`}>Budget</a>
          <a href="#" className={`text-sm font-medium transition-colors hover:text-orange-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Explore</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isDark ? 'text-slate-400 hover:bg-[#1c2130] hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
          >
            {isDark ? <Icons.Moon /> : <Icons.Sun />}
          </button>
          <button
            aria-label="Notifications"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isDark ? 'text-slate-400 hover:bg-[#1c2130] hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
          >
            <Icons.Bell />
          </button>
          <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
            N
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1300px] mx-auto px-5 md:px-12 pt-8 pb-12">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-10 min-h-[190px] flex flex-col justify-center text-orange-50 shadow-2xl bg-gradient-to-br from-[#3a1f45] via-[#7a3b3b] to-[#f2a950]">
          {/* Palm leaves decorative overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 800 200" preserveAspectRatio="none">
            <g fill="#050308">
              <path d="M640 200 C636 150 645 120 660 100 C650 95 630 96 618 108 C622 90 640 74 662 70 C648 62 624 66 610 82 C608 62 622 40 648 30 C630 30 606 42 596 62 C600 40 618 20 644 12 C700 4 726 40 716 70 C744 66 762 84 762 108 C742 100 722 104 712 118 C700 108 682 106 670 118 C680 140 674 172 660 200 Z" />
              <rect x="654" y="96" width="10" height="104" />
              <path d="M90 200 C86 160 94 132 108 116 C96 112 78 116 68 128 C70 110 86 96 106 92 C92 86 72 92 60 106 C60 86 74 66 98 58 C82 58 60 70 50 88 C56 66 74 48 98 42 C150 34 174 68 164 96 C190 92 206 108 206 130 C188 122 170 126 160 138 C150 128 134 128 124 138 C132 158 126 182 114 200 Z" />
              <rect x="102" y="90" width="9" height="110" />
            </g>
          </svg>

          <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/90 backdrop-blur-md text-white">
                  {trip.destination}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white">
                  <Icons.Calendar />
                  {trip.days} Days
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white">
                  <Icons.Users />
                  {trip.travelers} Travelers
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white">
                  <Icons.Star />
                  {trip.style}
                </span>
              </div>
            </div>

            <button
              onClick={handleEditTrip}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xs font-semibold hover:bg-white/20 transition-all"
            >
              <Icons.Edit />
              Edit Trip
            </button>
          </div>

          <div className="relative z-10 mt-2">
            <div className="text-sm font-medium text-white/80 mb-1">Total Budget</div>
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              ₹{money(totals.allocated)}
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center gap-2.5 text-lg font-bold mt-9 mb-5">
          <Icons.Clock />
          Budget Allocation
        </div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => {
                const pct = Math.min(100, Math.round((cat.spent / cat.allocated) * 100));
                const remaining = cat.allocated - cat.spent;
                const barColor = usageColor(pct);
                const CategoryIcon = Icons[cat.icon] || Icons.Tag;

                return (
                  <div
                    key={cat.id}
                    className={`rounded-2xl p-5 border transition-all ${
                      isDark ? 'bg-[#131722] border-[#232838]' : 'bg-white border-[#e5e8f0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${cat.color}22`, color: cat.color }}
                        >
                          <CategoryIcon />
                        </div>
                        <span className="text-sm font-bold">{cat.name}</span>
                      </div>
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                        style={{ backgroundColor: `${barColor}22`, color: barColor }}
                      >
                        {pct}% used
                      </span>
                    </div>

                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <div className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Spent / Allocated
                        </div>
                        <div className="text-sm font-bold">
                          ₹{money(cat.spent)} / ₹{money(cat.allocated)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Remaining
                        </div>
                        <div className={`text-sm font-bold ${remaining < 0 ? 'text-red-500' : ''}`}>
                          ₹{money(remaining)}
                        </div>
                      </div>
                    </div>

                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#1c2130]' : 'bg-slate-200'}`}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: barColor }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Add Category Card Button */}
              <button
                onClick={handleAddNewCategory}
                className={`min-h-[150px] rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 text-xs font-semibold transition-all hover:border-orange-500 hover:text-orange-500 ${
                  isDark ? 'border-[#2b3142] text-slate-400' : 'border-slate-300 text-slate-500'
                }`}
              >
                <Icons.Plus />
                New Category
              </button>
            </div>

            {/* Track Expense Form */}
            <div className={`rounded-2xl p-7 border ${isDark ? 'bg-[#131722] border-[#232838]' : 'bg-white border-[#e5e8f0]'}`}>
              <h2 className="flex items-center gap-2.5 text-base font-bold mb-5">
                <Icons.PlusSmall />
                Track a New Expense
              </h2>

              <div className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Category
              </div>

              {/* Category Selection Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => {
                  const isSelected = cat.id === selectedCategory;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                        isSelected
                          ? 'bg-orange-500/15 border-orange-500 text-orange-500'
                          : isDark
                          ? 'bg-[#1c2130] border-[#2b3142] text-slate-300 hover:border-slate-600'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-dashed transition-all ${
                    isDark
                      ? 'bg-[#1c2130] border-[#2b3142] text-slate-400 hover:text-orange-500 hover:border-orange-500'
                      : 'bg-slate-100 border-slate-300 text-slate-600 hover:text-orange-500 hover:border-orange-500'
                  }`}
                >
                  <Icons.PlusSmall />
                  New Category
                </button>
              </div>

              <form onSubmit={handleAddExpense}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="1"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                        isDark ? 'bg-[#1a1f2e] border-[#2b3142] text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Note (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Seafood Dinner at Tito's"
                      value={expenseNote}
                      onChange={(e) => setExpenseNote(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
                        isDark ? 'bg-[#1a1f2e] border-[#2b3142] text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6.5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:brightness-105 active:scale-[0.98] transition-all"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Stat Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-[#131722] border-[#232838]' : 'bg-white border-[#e5e8f0]'}`}>
                <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center mx-auto mb-2.5 ${isDark ? 'bg-[#1c2130] text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                  <Icons.Wallet />
                </div>
                <div className={`text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Remaining</div>
                <div className={`text-base font-extrabold ${totals.remaining < 0 ? 'text-red-500' : ''}`}>
                  ₹{money(totals.remaining)}
                </div>
              </div>

              <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-[#131722] border-[#232838]' : 'bg-white border-[#e5e8f0]'}`}>
                <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center mx-auto mb-2.5 ${isDark ? 'bg-[#1c2130] text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                  <Icons.Clock />
                </div>
                <div className={`text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Daily Budget</div>
                <div className="text-base font-extrabold">₹{money(totals.daily)}</div>
              </div>

              <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-[#131722] border-[#232838]' : 'bg-white border-[#e5e8f0]'}`}>
                <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center mx-auto mb-2.5 ${isDark ? 'bg-[#1c2130] text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                  <Icons.User />
                </div>
                <div className={`text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Cost Per Person</div>
                <div className="text-base font-extrabold">₹{money(totals.perPerson)}</div>
              </div>

              <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-[#131722] border-[#232838]' : 'bg-white border-[#e5e8f0]'}`}>
                <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center mx-auto mb-2.5 ${isDark ? 'bg-[#1c2130] text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                  <Icons.BarChart />
                </div>
                <div className={`text-[11px] font-semibold mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Utilization</div>
                <div className="text-base font-extrabold">{totals.utilization}%</div>
              </div>
            </div>

            {/* Spend Distribution Card */}
            <div className={`rounded-2xl p-5 border ${isDark ? 'bg-[#131722] border-[#232838]' : 'bg-white border-[#e5e8f0]'}`}>
              <h3 className={`text-xs font-bold tracking-wider uppercase mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Spend Distribution
              </h3>

              <div className="flex items-center justify-center py-2">
                <div
                  className="w-42 h-42 rounded-full relative flex items-center justify-center transition-all duration-500"
                  style={{ background: donutGradient }}
                >
                  <div
                    className={`w-26 h-26 rounded-full flex flex-col items-center justify-center ${
                      isDark ? 'bg-[#131722]' : 'bg-white'
                    }`}
                  >
                    <span className={`text-[11px] font-semibold mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Spent</span>
                    <span className="text-base font-extrabold">₹{money(totals.spent)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-3">
                {categories
                  .filter((cat) => cat.spent > 0)
                  .map((cat) => (
                    <div key={cat.id} className="flex items-center gap-1.5 text-[11.5px] font-semibold">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{cat.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Expenses */}
            <div className={`rounded-2xl p-5 border ${isDark ? 'bg-[#131722] border-[#232838]' : 'bg-white border-[#e5e8f0]'}`}>
              <h3 className={`text-xs font-bold tracking-wider uppercase mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Recent Expenses
              </h3>

              <div className="divide-y divide-slate-200 dark:divide-[#232838]">
                {visibleExpenses.map((exp, idx) => {
                  const cat = categories.find((c) => c.id === exp.category);
                  const CategoryIcon = cat ? Icons[cat.icon] || Icons.Tag : Icons.Tag;

                  return (
                    <div key={exp.id} className="py-3 flex items-start justify-between gap-3 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            idx === 0 ? 'bg-orange-500' : isDark ? 'bg-slate-600' : 'bg-slate-400'
                          }`}
                        />
                        <div>
                          <div className="text-xs font-bold mb-0.5">{exp.note}</div>
                          <div className={`text-[11px] flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            <CategoryIcon />
                            <span>{cat ? cat.name : 'Other'}</span>
                            <span>·</span>
                            <span>{exp.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-red-500 whitespace-nowrap">
                        −₹{money(exp.amount)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {expenses.length > 6 && (
                <button
                  onClick={() => setShowAllExpenses(!showAllExpenses)}
                  className="w-full text-center text-xs font-bold text-orange-500 mt-3 hover:underline"
                >
                  {showAllExpenses ? 'Show Less' : 'View All History'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`px-6 md:px-12 py-5 border-t flex flex-wrap items-center justify-between gap-4 transition-colors duration-300 ${isDark ? 'bg-[#0a0d16] border-[#1c2130]' : 'bg-white border-[#e5e8f0]'}`}>
        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          © 2024 Navigo. Engineering the art of exploration.
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveBudget}
            className={`px-5.5 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
              isDark
                ? 'bg-[#1a1f2e] border-[#2b3142] text-white hover:border-slate-500'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:border-slate-400'
            }`}
          >
            {saveStatus}
          </button>
          <button className="flex items-center gap-2 px-5.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-[0.98] transition-all">
            Continue to Itinerary
            <Icons.ArrowRight />
          </button>
        </div>
      </footer>
    </div>
  );
}