import './Navigo.css'

function Navigo() {
  return (
    <a 
      href="/" 
      className="inline-flex items-center gap-3.5 group text-decoration-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-xl"
    >
      {/* Brand Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary)] text-white shadow-md shadow-[var(--shadow)] group-hover:bg-[var(--primary-hover)] transition-all duration-200">
        
        {/* Custom Travel Needle SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-5 h-5 transition-transform duration-300 ease-out group-hover:rotate-45"
        >
          {/* Compass ring */}
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" className="opacity-40" />
          {/* North needle */}
          <path d="M12 5L15 12H12V5Z" fill="currentColor" />
          {/* South needle */}
          <path d="M12 19L9 12H12V19Z" fill="currentColor" className="opacity-50" />
        </svg>

        {/* Minimal Accent Indicator */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--accent)] border-2 border-[var(--background)]" />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span className="text-[22px] leading-tight font-extrabold tracking-[-0.03em] font-['Plus_Jakarta_Sans'] text-[var(--text)]">
          Navi<span className="text-[var(--primary)] font-black">go</span>
        </span>
        <span className="text-[9px] font-bold tracking-[0.2em] font-['Space_Grotesk'] uppercase text-[var(--text-secondary)] opacity-80">
          Travel Planner
        </span>
      </div>
    </a>
  )
}

export default Navigo