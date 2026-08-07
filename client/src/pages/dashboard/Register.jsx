import React, { useState } from 'react';

export default function NavigoCreateAccount() {
  const [isDark, setIsDark] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Password strength logic
  const getPasswordStrength = (val) => {
    if (!val) {
      return {
        percent: '18%',
        label: 'WEAK',
        gradient: 'from-[#e2543f] to-[#e8823f]',
        textColor: 'text-[#e2543f]',
      };
    }

    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
    if (/\d/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (score <= 1) {
      return {
        percent: '25%',
        label: 'WEAK',
        gradient: 'from-[#e2543f] to-[#e8823f]',
        textColor: 'text-[#e2543f]',
      };
    }
    if (score <= 3) {
      return {
        percent: '60%',
        label: 'FAIR',
        gradient: 'from-[#e8823f] to-[#f2c14e]',
        textColor: 'text-[#e8823f]',
      };
    }
    return {
      percent: '100%',
      label: 'STRONG',
      gradient: 'from-[#4cc985] to-[#2fae6c]',
      textColor: 'text-[#4cc985]',
    };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { fullName, email, password });
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      {/* Background Wrapper */}
      <div className="min-h-screen flex items-center justify-center p-5 md:p-10 font-sans transition-colors duration-400 bg-[#eceff5] dark:bg-[#060911] text-[#171b26] dark:text-[#f4f6fa] relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_30%_15%,rgba(233,140,68,0.08),transparent)] dark:bg-[radial-gradient(ellipse_60%_45%_at_30%_20%,rgba(233,140,68,0.06),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(120,150,230,0.06),transparent)] dark:bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(80,110,200,0.05),transparent)]" />

        <div className="relative w-full max-w-[1100px]">
          
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle light and dark theme"
            className="absolute -top-14 right-1 md:right-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-250 hover:-translate-y-0.5 border-[#e3e7ef] dark:border-[#1e2740] bg-white dark:bg-[#0d1425] text-[#4c5568] dark:text-[#cfd6e3]"
          >
            {isDark ? (
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

          {/* Auth Shell Container */}
          <div className="flex flex-col md:flex-row rounded-[22px] overflow-hidden min-h-[780px] border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] transition-colors duration-400 bg-white dark:bg-[#0a0e18] border-[#e3e7ef] dark:border-[#161d2e]">
            
            {/* Visual / Left Panel */}
            <div className="w-full md:w-[46%] p-7 md:p-10 flex flex-col gap-7">
              <div className="flex-1 min-h-[220px] md:min-h-[320px] rounded-[16px] border flex items-center justify-center overflow-hidden relative bg-[#eef1f7] dark:bg-[#0d1425] border-[#dde2ec] dark:border-[#1b2439]">
                <img
                  className="w-[82%] h-[82%] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  src="travel_the_globe.svg"
                  alt="Animated illustration of travel around the globe"
                />
              </div>
              <div>
                <h2 className="text-[30px] font-extrabold tracking-[-0.01em] mb-2.5 text-[#171b26] dark:text-[#f4f6fa]">
                  Elevate Your Journey.
                </h2>
                <p className="text-[14.5px] leading-[1.6] max-w-[420px] text-[#6b7386] dark:text-[#8c96ab]">
                  Experience seamless, highly curated travel itineraries designed for the discerning explorer.
                </p>
              </div>
            </div>

            {/* Form / Right Panel */}
            <div className="w-full md:w-[54%] p-8 md:p-[40px_48px] flex items-center justify-center">
              <div className="w-full max-w-[360px]">
                
                {/* Brand Logo */}
                <div className="flex items-center justify-center gap-2.5 mb-7">
                  <span className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#f9a663] to-[#e8823f] flex items-center justify-center shrink-0">
                    <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.6" />
                      <path d="M15.5 8.5L13 13L8.5 15.5L11 11L15.5 8.5Z" fill="white" />
                    </svg>
                  </span>
                  <span className="text-[19px] font-extrabold tracking-[-0.01em] text-[#171b26] dark:text-[#f4f6fa]">
                    Navigo
                  </span>
                </div>

                {/* Form Heading */}
                <h1 className="text-center text-[27px] font-extrabold tracking-[-0.01em] mb-2 text-[#171b26] dark:text-[#f4f6fa]">
                  Create Account
                </h1>
                <p className="text-center mb-7 text-[14px] text-[#7a8398] dark:text-[#717d93]">
                  Join us to craft your next elevated expedition.
                </p>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} noValidate>
                  
                  {/* Full Name Field */}
                  <div className="mb-[18px]">
                    <label htmlFor="fullName" className="block text-[11px] font-bold tracking-[0.07em] uppercase mb-2 text-[#6b7386] dark:text-[#7c8698]">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <svg className="absolute left-3.5 w-4 h-4 pointer-events-none text-[#a2a8b6] dark:text-[#b7bcc7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21a8 8 0 1 0-16 0" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jane Doe"
                        autoComplete="name"
                        className="w-full py-3.5 pl-10 pr-3.5 text-[14px] rounded-md outline-none border border-transparent transition-all duration-200 bg-[#f4f6fa] dark:bg-white text-[#171b26] placeholder-[#9aa1b0] dark:placeholder-[#a7adba] focus:border-[#e8823f] focus:ring-4 focus:ring-[#e8823f]/25"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="mb-[18px]">
                    <label htmlFor="email" className="block text-[11px] font-bold tracking-[0.07em] uppercase mb-2 text-[#6b7386] dark:text-[#7c8698]">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <svg className="absolute left-3.5 w-4 h-4 pointer-events-none text-[#a2a8b6] dark:text-[#b7bcc7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m2 7 10 6 10-6" />
                      </svg>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        autoComplete="email"
                        className="w-full py-3.5 pl-10 pr-3.5 text-[14px] rounded-md outline-none border border-transparent transition-all duration-200 bg-[#f4f6fa] dark:bg-white text-[#171b26] placeholder-[#9aa1b0] dark:placeholder-[#a7adba] focus:border-[#e8823f] focus:ring-4 focus:ring-[#e8823f]/25"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-[18px]">
                    <label htmlFor="password" className="block text-[11px] font-bold tracking-[0.07em] uppercase mb-2 text-[#6b7386] dark:text-[#7c8698]">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <svg className="absolute left-3.5 w-4 h-4 pointer-events-none text-[#a2a8b6] dark:text-[#b7bcc7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="10" width="16" height="10" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      </svg>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="w-full py-3.5 pl-10 pr-10 text-[14px] rounded-md outline-none border border-transparent transition-all duration-200 bg-[#f4f6fa] dark:bg-white text-[#171b26] placeholder-[#9aa1b0] dark:placeholder-[#a7adba] focus:border-[#e8823f] focus:ring-4 focus:ring-[#e8823f]/25"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 p-1 flex cursor-pointer text-[#a2a8b6] dark:text-[#b7bcc7] hover:text-[#171b26]"
                      >
                        {showPassword ? (
                          /* Eye Off Icon */
                          <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.4 21.4 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.4 21.4 0 0 1-3.22 4.44M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                            <path d="M1 1l22 22" />
                          </svg>
                        ) : (
                          /* Eye Icon */
                          <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Strength Indicator */}
                    <div className="flex justify-between text-[10.5px] font-bold tracking-[0.06em] mt-2.5 mb-1.5 text-[#7a8398] dark:text-[#717d93]">
                      <span>STRENGTH</span>
                      <span className={`transition-colors duration-200 ${strength.textColor}`}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden bg-[#e6e9f1] dark:bg-[#1b2438]">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${strength.gradient} transition-all duration-250 ease-out`}
                        style={{ width: strength.percent }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-[22px] py-3.5 px-[18px] rounded-md border-none font-bold text-[15px] cursor-pointer flex items-center justify-center gap-2 text-[#231204] bg-gradient-to-r from-[#f9a663] to-[#e8823f] shadow-[0_12px_24px_-10px_rgba(232,130,63,0.55)] hover:shadow-[0_16px_28px_-10px_rgba(232,130,63,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                  >
                    Create Account
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-[14px] my-[22px] before:flex-1 before:h-px before:bg-[#e5e8f0] dark:before:bg-[#1d2740] after:flex-1 after:h-px after:bg-[#e5e8f0] dark:after:bg-[#1d2740]">
                  <span className="text-[11px] font-bold tracking-[0.08em] text-[#7a8398] dark:text-[#717d93]">
                    OR
                  </span>
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  className="w-full py-3.5 px-[18px] rounded-md font-semibold text-[14px] flex items-center justify-center gap-[10px] cursor-pointer border transition-all duration-150 hover:-translate-y-0.5 bg-white dark:bg-[#0c1120] border-[#e2e6ef] dark:border-[#232d45] text-[#333a4a] dark:text-[#e7eaf1]"
                >
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20.5H42V20.5H24v7h11.3C33.7 32 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.5l5.3-5.3C32.9 6.6 28.7 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z" />
                    <path fill="#FF3D00" d="M6.3 14.7l5.8 4.2C13.6 15.6 18.4 12 24 12c2.6 0 5 .9 6.9 2.5l5.3-5.3C32.9 6.6 28.7 5 24 5c-7.1 0-13.3 3.9-16.7 9.7z" />
                    <path fill="#4CAF50" d="M24 45c5.2 0 9.9-1.7 13.6-4.8l-6.3-5.3C29.4 36.6 26.8 37.5 24 37.5c-5.2 0-9.7-3-11.4-7.4l-6.5 5C9.5 40.6 16.2 45 24 45z" />
                    <path fill="#1976D2" d="M43.6 20.5H42V20.5H24v7h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.3 5.3C41 35.4 44 30.6 44 25c0-1.3-.1-2.5-.4-4.5z" />
                  </svg>
                  Sign up with Google
                </button>

                {/* Footer Link */}
                <p className="text-center mt-[22px] text-[13.5px] text-[#7a8398] dark:text-[#717d93]">
                  Already have an account?
                  <a href="#" className="ml-1 font-bold text-[#171b26] dark:text-[#f4f6fa] hover:underline">
                    Log In
                  </a>
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}