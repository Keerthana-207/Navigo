import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Moon, Sun, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function FormInput({type, value, onChange, id, name, placeholder, autoComplete}) {
  return(
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full py-3.5 pl-10 pr-3.5 text-[14px] rounded-md outline-none border border-transparent transition-all duration-200 bg-[var(--surface-container-low)] text-[var(--on-surface)] placeholder-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[#e8823f]/25"
      style={{
        paddingTop: "14px",
        paddingBottom: "14px",
        paddingLeft: "40px",
        paddingRight: "14px",
        boxShadow: '0 0 0 4px color-mix(in srgb, var(--primary) 25%, transparent)'
      }}
    />
  )
}

function Login() {
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo only — no backend wired up.
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 md:p-10 font-sans transition-colors duration-400 bg-[var(--background)] text-[var(--on-background)] relative overflow-hidden" style={{padding: '20px'}}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_30%_15%,rgba(233,140,68,0.08),transparent)] dark:bg-[radial-gradient(ellipse_60%_45%_at_30%_20%,rgba(233,140,68,0.06),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(120,150,230,0.06),transparent)] dark:bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(80,110,200,0.05),transparent)]" />
          <div className="relative w-full max-w-[1100px]" style={{padding: '12px'}}>
        {/* Theme toggle */}
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="
              fixed
              top-6
              right-6
              z-50
              w-10
              h-10
              rounded-full
              border
              flex
              items-center
              justify-center
              transition-all
              duration-250
              hover:-translate-y-0.5
              border-[var(--outline-variant)]
              bg-[var(--surface-container-lowest)]
              text-[var(--on-surface)]
              shadow-lg
"
          >
            {theme === "dark"? (
              /* Sun Icon */
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              /* Moon Icon */
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            )}
          </button>

        <div className="flex flex-col md:flex-row rounded-[22px] overflow-hidden min-h-[780px] border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] transition-colors duration-400 bg-[var(--background)] border-[var(--outline)]">
          {/* LEFT PANEL */}
          <div className="w-full md:w-[46%] p-7 md:p-10 flex flex-col gap-7" style={{padding: '20px'}}>
              <div className="flex-1 min-h-[220px] md:min-h-[320px] rounded-[16px] border flex items-center justify-center overflow-hidden relative bg-[var(--surface-container)] border-[var(--outline)]">
                <img
                  className="w-[82%] h-[82%] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  src="/plane.svg"
                  alt="Animated illustration of travel around the globe"
                />
              </div>
              <div>
                <h2 className="text-[30px] font-extrabold tracking-[-0.01em] mb-2.5 text-[var(--on-surface)] dark:text-[#f4f6fa]" style={{marginBottom: '10px'}}>
                  Elevate Your Journey.
                </h2>
                <p className="text-[14.5px] leading-[1.6] max-w-[420px] text-[var(--text-secondary)] dark:text-[#8c96ab]">
                  Experience seamless, highly curated travel itineraries designed for the discerning explorer.
                </p>
              </div>
            </div>

          {/* RIGHT PANEL / CARD */}
          <div className="w-full md:w-[54%] p-8 md:p-[40px_48px] flex items-center justify-center" style={{padding: '30px'}}>
              <div className="w-full max-w-[360px]">
              {/* Brand */}
              <div className="flex items-center justify-center gap-2.5 mb-7" style={{marginBottom: '24px'}}>
                  <span className="w-[34px] h-[34px] rounded-full bg-gradient-to-br flex items-center justify-center shrink-0" style={{background: `linear-gradient(
    135deg,
    var(--primary),
    var(--primary-hover)
)`}}>
                    <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.6" />
                      <path d="M15.5 8.5L13 13L8.5 15.5L11 11L15.5 8.5Z" fill="white" />
                    </svg>
                  </span>
                  <span className="text-[19px] font-extrabold tracking-[-0.01em] text-[var(--on-surface)] dark:text-[#f4f6fa]">
                    Navigo
                  </span>
                </div>

              <h1 className="text-center text-[27px] font-extrabold tracking-[-0.01em] mb-2 text-[var(--on-surface)] dark:text-[#f4f6fa]" style={{marginBottom: '8px'}}>
                Welcome Back
              </h1>
              <p className="text-center mb-7 text-[14px] text-[var(--text-secondary)] dark:text-[#717d93]" style={{marginBottom: '20px'}}>
                Sign in to manage your luxury itineraries.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-[18px]" style={{marginBottom: '18px'}}>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-bold tracking-[0.07em] uppercase mb-2 text-[var(--text-secondary)] dark:text-[#7c8698]" style={{marginBottom: '8px'}}
                  >
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      
                    />
                    {/* <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="explorer@luminatravel.com"
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl text-sm outline-none border border-transparent transition-shadow focus:shadow-[0_0_0_3px_rgba(244,161,92,0.18)] focus:border-[#f4a15c]"
                      style={{
                        background: t.inputBg,
                        color: t.inputText,
                      }}
                    /> */}
                    <FormInput id="email" type="email" name="email" autoComplete="email" placeholder="[EMAIL_ADDRESS]" value={email} onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-1">
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-bold tracking-[0.07em] uppercase mb-2 text-[var(--text-secondary)] dark:text-[#7c8698]" style={{marginBottom: '8px'}}
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      
                    />
                    {/* <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl text-sm outline-none border border-transparent transition-shadow focus:shadow-[0_0_0_3px_rgba(244,161,92,0.18)] focus:border-[#f4a15c]"
                      style={{
                        background: t.inputBg,
                        color: t.inputText,
                      }}
                    /> */}
                    <FormInput id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 p-1 flex cursor-pointer text-[#a2a8b6] dark:text-[#b7bcc7] hover:text-[var(--on-surface)]"
                        style={{padding: '4px'}}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Remember / Forgot */}
                <div className="flex items-center justify-between my-5" style={{margin: '20px 0'}}>
                  <label
                    className="flex items-center gap-2 text-[13px] cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-[15px] h-[15px] rounded cursor-pointer accent-[#e8823e]"
                    />
                    Remember Me
                  </label>
                  <a
                    href="#"
                    className="text-[13px] font-semibold hover:underline"
                    
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    style={{padding: '15px 18px', marginTop: '22px', background: `linear-gradient(135deg, var(--primary), var(--primary-hover))`}}
                    className="w-full mt-[22px] py-3.5 px-[18px] rounded-md border-none font-bold text-[15px] cursor-pointer flex items-center justify-center gap-2 text-[#231204] shadow-[0_12px_24px_-10px_rgba(232,130,63,0.55)] hover:shadow-[0_16px_28px_-10px_rgba(232,130,63,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                  >
                  Sign In
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-[14px] my-[22px] before:flex-1 before:h-px before:bg-[var(--outline-variant)] dark:before:bg-[#1d2740] after:flex-1 after:h-px after:bg-[var(--outline-variant)] dark:after:bg-[#1d2740]"
                style={{margin: '22px 0'}}>
                  <span className="text-[11px] font-bold tracking-[0.08em] text-[var(--text-secondary)] dark:text-[#717d93]">
                    OR
                  </span>
              </div>

              {/* Google */}
              <button
                type="button"
                className="w-full py-3.5 px-[18px] rounded-md font-semibold text-[14px] flex items-center justify-center gap-[10px] cursor-pointer border transition-all duration-150 hover:-translate-y-0.5 bg-[var(--surface-container-lowest)] border-[var(--outline-variant)] text-[var(--on-surface)]"
                style={{padding: '15px 18px'}}
              >
                <svg viewBox="0 0 48 48" width="17" height="17">
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5h-1.9V20.4H24v7.2h11.3c-1.6 4.6-6 7.9-11.3 7.9-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.1-5.1C33.6 6 29 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l5.9 4.3C13.9 15.6 18.6 12 24 12c3.1 0 5.9 1.2 8 3.1l5.1-5.1C33.6 6 29 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5 0 9.5-1.9 12.9-5.1l-6-5.1C29 35.6 26.6 36.5 24 36.5c-5.3 0-9.7-3.4-11.3-8.1l-6 4.7C9.6 39.6 16.2 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H24v7.2h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6 5.1C40.8 35.6 44 30.4 44 24c0-1.2-.1-2.4-.4-3.5z"
                  />
                </svg>
                Sign in with Google
              </button>

              <p
                className="text-center mt-[22px] text-[13.5px] text-[var(--text-secondary)]" style={{padding: '15px 18px'}}
              >
                Don't have an account?{" "}
                <a href="#" className="font-bold hover:underline">
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;